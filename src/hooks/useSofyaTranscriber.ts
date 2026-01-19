/**
 * Hook para usar o serviço de transcrição STT da Sofya
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { SofyaTranscriberService } from '@/services/sofyaTranscriber';
import { API_CONFIG } from '@/services/config';

export interface UseSofyaTranscriberReturn {
  isRecording: boolean;
  transcription: string;
  isProcessing: boolean;
  error: Error | null;
  startTranscription: () => Promise<void>;
  stopTranscription: () => Promise<void>;
  clearTranscription: () => void;
}

export function useSofyaTranscriber(
  wsUrl?: string
): UseSofyaTranscriberReturn {
  const url = wsUrl || API_CONFIG.SOFYA_STT_WS;
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const serviceRef = useRef<SofyaTranscriberService | null>(null);
  const transcriptionRef = useRef<string>('');
  const finalSegmentsRef = useRef<string[]>([]); // Armazena apenas segmentos finais
  const lastPartialRef = useRef<string>(''); // Última transcrição parcial (apenas para feedback visual)

  // Função para verificar se um texto contém outro (para evitar duplicatas)
  const containsText = useCallback((container: string, contained: string): boolean => {
    const containerLower = container.toLowerCase().trim();
    const containedLower = contained.toLowerCase().trim();
    
    // Se contém diretamente
    if (containerLower.includes(containedLower)) {
      return true;
    }
    
    // Verifica se mais de 80% das palavras do texto menor estão no maior
    const containerWords = containerLower.split(/\s+/).filter(w => w.length > 2);
    const containedWords = containedLower.split(/\s+/).filter(w => w.length > 2);
    
    if (containedWords.length === 0) return false;
    
    const foundWords = containedWords.filter(w => containerWords.includes(w));
    const ratio = foundWords.length / containedWords.length;
    
    return ratio > 0.8;
  }, []);

  // Função para construir texto completo - usa APENAS finais
  const buildFullText = useCallback(() => {
    // Usa apenas os segmentos finais, ignorando parciais
    const parts = finalSegmentsRef.current.filter(t => t && t.trim());
    return parts.join(' ');
  }, []);

  // Inicializar serviço
  useEffect(() => {
    serviceRef.current = new SofyaTranscriberService(url);
    
    // Configurar callbacks
    serviceRef.current.setOnTranscription((text, isFinal) => {
      if (!text || !text.trim()) return;
      
      const trimmedText = text.trim();
      
      if (isFinal) {
        // Transcrição FINAL - adiciona aos segmentos finais
        let finalText = trimmedText;
        
        // Se é a primeira FINAL e ela não começa do início (começa com vírgula/ponto)
        // E há uma parcial anterior que começa do início, preserva o início da parcial
        if (finalSegmentsRef.current.length === 0 && lastPartialRef.current) {
          const partialText = lastPartialRef.current.trim();
          const finalStartsWithPunctuation = /^[,\.;:]/.test(trimmedText);
          const partialStartsWithCapital = /^[A-ZÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ]/.test(partialText);
          
          // Se a FINAL começa com pontuação e a PARCIAL começa com maiúscula,
          // a FINAL provavelmente perdeu o início. Pega o início da parcial até a primeira pontuação.
          if (finalStartsWithPunctuation && partialStartsWithCapital) {
            // Pega tudo da parcial até a primeira vírgula, ponto, ponto e vírgula ou dois pontos
            const prefixMatch = partialText.match(/^[^,\.;:]+[,\.;:]?/);
            if (prefixMatch && prefixMatch[0]) {
              const prefix = prefixMatch[0].trim();
              // Se o prefixo termina com pontuação e a final começa com a mesma pontuação, remove a pontuação da final
              const prefixEndsWithPunctuation = /[,\.;:]$/.test(prefix);
              if (prefixEndsWithPunctuation && finalStartsWithPunctuation) {
                // Remove a pontuação do início da final para evitar duplicação
                const finalWithoutPunctuation = trimmedText.replace(/^[,\.;:\s]+/, '');
                finalText = `${prefix} ${finalWithoutPunctuation}`;
                console.log('🔧 Início preservado da parcial (pontuação removida):', prefix);
              } else {
                finalText = `${prefix} ${trimmedText}`;
                console.log('🔧 Início preservado da parcial:', prefix);
              }
            }
          }
        }
        
        // Limpa a parcial anterior (não será mais usada)
        lastPartialRef.current = '';
        
        // Remove finais que são contidas nesta nova final (mais completa)
        finalSegmentsRef.current = finalSegmentsRef.current.filter(seg => {
          // Se a nova final contém a existente, remove a existente
          if (containsText(finalText, seg)) {
            console.log('🗑️ Final removida (contida na nova):', seg.substring(0, 60) + '...');
            return false;
          }
          // Se a existente contém a nova, não adiciona a nova
          if (containsText(seg, finalText)) {
            console.log('⏭️ Final ignorada (já existe versão mais completa)');
            return true; // Mantém a existente
          }
          return true; // Mantém (são diferentes)
        });
        
        // Verifica se a nova final não foi descartada acima
        const wasDiscarded = finalSegmentsRef.current.some(seg => 
          containsText(seg, finalText)
        );
        
        if (!wasDiscarded) {
          finalSegmentsRef.current.push(finalText);
          console.log('✅ Final adicionada:', finalText.substring(0, 60) + '...');
        }
        
        // Constrói texto completo APENAS com finais
        const fullText = buildFullText();
        console.log('📝 Texto completo (apenas finais):', fullText.substring(0, 100) + '...');
        setTranscription(fullText);
        transcriptionRef.current = fullText;
        setIsProcessing(false);
      } else {
        // Transcrição PARCIAL - apenas para feedback visual em tempo real
        // NÃO é adicionada ao texto final, apenas atualiza a parcial para exibição
        lastPartialRef.current = trimmedText;
        
        // Mostra finais + parcial atual apenas para feedback visual
        // Mas apenas se a parcial não estiver contida nas finais já recebidas
        const fullText = buildFullText();
        const isPartialOverlapping = fullText && containsText(fullText, trimmedText);
        
        if (!isPartialOverlapping) {
          const displayText = fullText ? `${fullText} ${trimmedText}` : trimmedText;
          setTranscription(displayText);
          transcriptionRef.current = displayText;
        }
        // Se a parcial está sobreposta nas finais, não atualiza (evita duplicação visual)
      }
    });

    serviceRef.current.setOnError((err) => {
      console.error('Erro no transcriber:', err);
      setError(err);
      setIsRecording(false);
      setIsProcessing(false);
    });

    serviceRef.current.setOnStatus((status) => {
      if (status === 'recording') {
        setIsRecording(true);
        setIsProcessing(false);
      } else if (status === 'processing') {
        setIsRecording(false);
        setIsProcessing(true);
      } else {
        setIsRecording(false);
        setIsProcessing(false);
      }
    });

    return () => {
      if (serviceRef.current) {
        serviceRef.current.disconnect();
      }
    };
  }, [url, buildFullText, containsText]);

  /**
   * Inicia transcrição
   */
  const startTranscription = useCallback(async () => {
    try {
      setError(null);
      setTranscription('');
      transcriptionRef.current = '';
      finalSegmentsRef.current = [];
      lastPartialRef.current = '';
      
      if (serviceRef.current) {
        await serviceRef.current.startTranscription();
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro ao iniciar transcrição');
      setError(error);
      setIsRecording(false);
    }
  }, []);

  /**
   * Para transcrição
   */
  const stopTranscription = useCallback(async () => {
    try {
      if (serviceRef.current) {
        await serviceRef.current.stopTranscription();
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro ao parar transcrição');
      setError(error);
    }
  }, []);

  /**
   * Limpa transcrição
   */
  const clearTranscription = useCallback(() => {
    setTranscription('');
    transcriptionRef.current = '';
    finalSegmentsRef.current = [];
    lastPartialRef.current = '';
  }, []);

  return {
    isRecording,
    transcription,
    isProcessing,
    error,
    startTranscription,
    stopTranscription,
    clearTranscription,
  };
}
