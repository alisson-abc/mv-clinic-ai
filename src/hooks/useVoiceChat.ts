/**
 * Hook React para Chat por Voz (Orb de Voz)
 * Integra VAD, captura de áudio PCM, reprodução e WebSocket
 * Baseado na implementação do chat-marketplace-front
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceChatService, VoiceChatConfig } from '@/services/voiceChat';
import { VadService } from '@/services/vad';
import { AudioCaptureService } from '@/services/audioCapture';
import { AudioPlaybackService } from '@/services/audioPlayback';
import { VAD_CONFIG } from '@/services/config';

export interface VoiceChatMessage {
  id: string;
  text: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export interface UseVoiceChatReturn {
  isConnected: boolean;
  isRecording: boolean;
  isListening: boolean; // VAD ativo
  isSpeaking: boolean; // Bot está falando
  transcription: string;
  messages: VoiceChatMessage[]; // Mensagens formatadas
  connect: () => Promise<void>;
  disconnect: () => void;
  startVoiceMode: () => Promise<void>;
  stopVoiceMode: () => void;
  sendText: (text: string) => void;
  error: Error | null;
}

export function useVoiceChat(
  config?: VoiceChatConfig
): UseVoiceChatReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [messages, setMessages] = useState<VoiceChatMessage[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [userIsSpeaking, setUserIsSpeaking] = useState(false); // Flag para detectar se usuário está falando AGORA

  // Refs para serviços
  const serviceRef = useRef<VoiceChatService | null>(null);
  const vadServiceRef = useRef<VadService | null>(null);
  const audioCaptureRef = useRef<AudioCaptureService | null>(null);
  const audioPlaybackRef = useRef<AudioPlaybackService | null>(null);
  
  // Refs para estado (para usar em callbacks)
  const transcriptionRef = useRef<string>('');
  const messagesRef = useRef<VoiceChatMessage[]>([]);
  const userIsSpeakingRef = useRef<boolean>(false);
  
  // Sincronizar refs com estado
  useEffect(() => {
    transcriptionRef.current = transcription;
  }, [transcription]);
  
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  /**
   * Handler: Barge-in (interrupção)
   */
  const handleBargeIn = useCallback(() => {
    if (audioPlaybackRef.current) {
      audioPlaybackRef.current.stopPlayback();
    }
    if (serviceRef.current) {
      serviceRef.current.clearBuffer();
    }
    setIsSpeaking(false);
  }, []);

  /**
   * Conecta ao WebSocket
   */
  const connect = useCallback(async () => {
    // Evitar múltiplas conexões
    if (serviceRef.current?.isConnected()) {
      console.log('ℹ️ WebSocket já está conectado, ignorando nova conexão');
      return;
    }
    
    try {
      console.log('🔌 Conectando ao WebSocket:', config);
      const service = new VoiceChatService(
        undefined, // onMessage não usado mais
        (err) => {
          console.error('❌ Erro WebSocket:', err);
          setError(err);
          setIsConnected(false);
        },
        () => {
          console.log('🔌 WebSocket desconectado');
          setIsConnected(false);
        },
        config
      );

      // Configurar callbacks de áudio e texto
      service.setOnAudio((audioData: ArrayBuffer) => {
        console.log('🔊 Áudio recebido do servidor:', audioData.byteLength, 'bytes');
        
        // Barge-in DESABILITADO para POC - sempre reproduz o áudio
        // TODO: Reativar Barge-in quando necessário
        // if (userIsSpeakingRef.current) {
        //   console.log('🛑 Barge-in: usuário está falando, parando reprodução');
        //   if (audioPlaybackRef.current) {
        //     audioPlaybackRef.current.stopPlayback();
        //   }
        //   if (serviceRef.current) {
        //     serviceRef.current.clearBuffer();
        //   }
        //   setIsSpeaking(false);
        //   return;
        // }
        
        // Reproduz chunk e atualiza estado
        console.log('▶️ Reproduzindo áudio (Barge-in desabilitado para POC)');
        if (audioPlaybackRef.current) {
          audioPlaybackRef.current.playAudioChunk(audioData).then(() => {
            if (audioPlaybackRef.current?.getIsPlaying()) {
              setIsSpeaking(true);
            }
          });
        }
      });

      // Callback para transcrição do usuário
      service.setOnTranscription((transcriptionText: string) => {
        console.log('📝 Transcrição do usuário recebida:', transcriptionText);
        setTranscription(transcriptionText);
      });

      // Callback para resposta do bot (texto)
      service.setOnText((text: string) => {
        console.log('📝 Texto recebido do servidor (bot_response):', text);
        
        // Usar refs para acessar valores atuais
        const currentTranscription = transcriptionRef.current;
        const currentMessages = messagesRef.current;
        
        // Se houver transcrição anterior (pergunta do usuário), adicionar como mensagem do usuário primeiro
        if (currentTranscription && currentTranscription.trim() && 
            !currentMessages.some(m => m.text === currentTranscription && m.type === 'user')) {
          const userMessage: VoiceChatMessage = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            text: currentTranscription,
            type: 'user',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, userMessage]);
        }
        
        // Adicionar como mensagem do assistente
        const assistantMessage: VoiceChatMessage = {
          id: `msg_${Date.now() + 1}_${Math.random().toString(36).substr(2, 9)}`,
          text,
          type: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        
        // Limpar transcrição para próxima pergunta
        setTranscription('');
        setIsSpeaking(false);
      });

      await service.connect();
      serviceRef.current = service;
      setIsConnected(true);
      setError(null);
      console.log('✅ WebSocket conectado com sucesso!');
    } catch (err) {
      console.error('❌ Erro ao conectar WebSocket:', err);
      setError(err as Error);
      setIsConnected(false);
    }
  }, [config]);

  /**
   * Handler: Usuário começa a falar
   */
  const handleSpeechStart = useCallback(() => {
    console.log('🗣️ Fala detectada pelo VAD');
    
    // Barge-in DESABILITADO para POC - não para reprodução
    // No iOS, o VAD pode detectar falsos positivos (ruído ambiente, feedback do áudio)
    // Por isso desabilitamos completamente o Barge-in
    // TODO: Reativar Barge-in com melhorias para iOS quando necessário
    
    // Apenas atualiza flag para logging, mas NÃO para reprodução
    setUserIsSpeaking(true);
    userIsSpeakingRef.current = true;
    
    // Barge-in desabilitado - comentado
    // if (audioPlaybackRef.current?.getIsPlaying()) {
    //   console.log('🛑 Barge-in: parando reprodução porque usuário começou a falar');
    //   handleBargeIn();
    // }
  }, []);

  /**
   * Handler: Usuário para de falar
   */
  const handleSpeechEnd = useCallback(() => {
    console.log('🔇 Fim de fala detectado - desativando flag');
    setUserIsSpeaking(false);
    userIsSpeakingRef.current = false;
    // Aguarda um pouco antes de finalizar (evita cortes)
    setTimeout(() => {
      if (vadServiceRef.current?.getIsListening() && serviceRef.current) {
        serviceRef.current.endOfSpeech();
      }
    }, 500);
  }, []);

  /**
   * Inicia modo de voz (Real-Time)
   */
  const startVoiceMode = useCallback(async () => {
    console.log('🎤 ===== INICIANDO MODO DE VOZ =====');
    
    // NÃO esperar WebSocket - solicitar microfone primeiro
    // Tentar conectar WebSocket em paralelo (não bloqueia)
    if (!serviceRef.current || !isConnected) {
      console.log('📡 Tentando conectar WebSocket em paralelo...');
      connect().catch((err) => {
        console.warn('⚠️ WebSocket não conectou (continuando mesmo assim):', err);
      });
    }

    try {
      console.log('🎙️ Solicitando permissão de microfone...');
      
      // Inicializar serviços
      if (!vadServiceRef.current) {
        // Configuração do VAD para melhor detecção de silêncio e redução de ruído
        vadServiceRef.current = new VadService({
          silenceDuration: VAD_CONFIG.SILENCE_DURATION,
          vadThreshold: VAD_CONFIG.VAD_THRESHOLD, // undefined = usa padrão automático (0.025 desktop / 0.045 iOS)
          checkInterval: VAD_CONFIG.CHECK_INTERVAL,
        });
        console.log('✅ VAD Service criado com configuração:', {
          silenceDuration: VAD_CONFIG.SILENCE_DURATION + 'ms',
          vadThreshold: VAD_CONFIG.VAD_THRESHOLD || 'automático (0.025 desktop / 0.045 iOS)',
          checkInterval: VAD_CONFIG.CHECK_INTERVAL + 'ms',
        });
      }
      if (!audioCaptureRef.current) {
        audioCaptureRef.current = new AudioCaptureService();
        console.log('✅ Audio Capture Service criado');
      }
      if (!audioPlaybackRef.current) {
        audioPlaybackRef.current = new AudioPlaybackService();
        await audioPlaybackRef.current.initialize();
        console.log('✅ Audio Playback Service inicializado');
        
        // Callback quando playback parar
        audioPlaybackRef.current.onPlaybackStop(() => {
          setIsSpeaking(false);
        });
      }

      // Configurar callbacks do VAD
      vadServiceRef.current.onSpeechStart(() => {
        console.log('🗣️ Fala detectada!');
        handleSpeechStart();
      });
      vadServiceRef.current.onSpeechEnd(() => {
        console.log('🔇 Fim de fala detectado');
        handleSpeechEnd();
      });

      // Iniciar VAD - isso vai solicitar permissão de microfone
      console.log('🎤 Iniciando VAD (isso solicitará permissão de microfone)...');
      await vadServiceRef.current.startListening();
      console.log('✅ VAD iniciado, permissão concedida');
      
      const vadStream = vadServiceRef.current.getAudioStream();
      
      if (!vadStream) {
        throw new Error('Não foi possível obter stream de áudio do VAD');
      }

      // Iniciar captura usando o stream do VAD
      console.log('🎙️ Iniciando captura de áudio...');
      await audioCaptureRef.current.startCapture(vadStream, (chunk: ArrayBuffer) => {
        // Envia chunk apenas se estiver gravando e conectado
        if (serviceRef.current?.isConnected()) {
          console.log('📤 Enviando chunk de áudio:', chunk.byteLength, 'bytes');
          serviceRef.current.sendAudioChunk(chunk);
        } else {
          console.log('⏸️ Chunk capturado mas WebSocket não conectado');
        }
      });
      
      console.log('✅ Modo de voz iniciado com sucesso!');
      setIsRecording(true);
      setIsListening(true);
    } catch (err) {
      console.error('❌ Erro ao iniciar modo voz:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(new Error(`Erro ao acessar microfone: ${errorMessage}. Verifique as permissões.`));
      alert(`Erro ao acessar microfone: ${errorMessage}\n\nVerifique se você permitiu o acesso ao microfone nas configurações do navegador.`);
    }
  }, [isConnected, connect, handleSpeechStart, handleSpeechEnd]);

  /**
   * Para modo de voz
   */
  const stopVoiceMode = useCallback(() => {
    if (audioCaptureRef.current) {
      audioCaptureRef.current.stopCapture();
    }
    if (vadServiceRef.current) {
      vadServiceRef.current.stopListening();
    }
    if (serviceRef.current) {
      serviceRef.current.endOfSpeech();
    }
    setIsRecording(false);
    setIsListening(false);
  }, []);

  /**
   * Desconecta
   */
  const disconnect = useCallback(() => {
    stopVoiceMode();
    
    if (serviceRef.current) {
      serviceRef.current.disconnect();
      serviceRef.current = null;
    }
    
    setIsConnected(false);
    setIsRecording(false);
    setIsListening(false);
    setIsSpeaking(false);
    setTranscription('');
  }, [stopVoiceMode]);

  /**
   * Envia mensagem de texto
   */
  const sendText = useCallback((text: string) => {
    if (serviceRef.current) {
      serviceRef.current.sendTextMessage(text);
    }
  }, []);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isRecording,
    isListening,
    isSpeaking,
    transcription,
    messages,
    connect,
    disconnect,
    startVoiceMode,
    stopVoiceMode,
    sendText,
    error,
  };
}
