/**
 * Hook React para Ask Sofya Chat
 */

import { useState, useCallback } from 'react';
import {
  sendMessageToSofya,
  createConversation,
  getConversationHistory,
  extractResponseText,
  AskSofyaMessage,
  AskSofyaRequest,
} from '@/services/askSofya';

export interface UseAskSofyaReturn {
  messages: AskSofyaMessage[];
  isLoading: boolean;
  error: Error | null;
  conversationId: string | null;
  sendMessage: (message: string) => Promise<void>;
  initializeConversation: () => Promise<void>;
  clearMessages: () => void;
}

export function useAskSofya(): UseAskSofyaReturn {
  const [messages, setMessages] = useState<AskSofyaMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const initializeConversation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { conversation_id } = createConversation();
      setConversationId(conversation_id);

      // Começar com mensagem de boas-vindas
      setMessages([
        {
          type: 'assistant',
          text: 'Olá! Sou a Sofya, sua assistente clínica baseada em evidências científicas. Como posso ajudá-lo hoje?',
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(err as Error);
      console.error('Error initializing conversation:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      // Adicionar mensagem do usuário
      const userMessage: AskSofyaMessage = {
        type: 'user',
        text: message,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        setIsLoading(true);
        setError(null);

        // Preparar histórico de conversa (últimas mensagens)
        const recentHistory = messages.slice(-10); // Últimas 10 mensagens para contexto

        const request: AskSofyaRequest = {
          message,
          conversationHistory: recentHistory,
          model: 'medium-reasoning',
          temperature: 0.1,
          maxOutputTokens: 1000,
        };

        const response = await sendMessageToSofya(request);

        // Log completo da resposta da API
        console.log('📥 Resposta completa da Sofya:', JSON.stringify(response, null, 2));
        console.log('📊 Status:', response.status);
        console.log('📊 Model:', response.model);
        console.log('📊 Outputs:', response.output?.length || 0);

        // Extrair texto da resposta
        const responseText = extractResponseText(response);
        console.log('📝 Texto extraído da resposta:', responseText);
        console.log('📏 Tamanho do texto:', responseText.length, 'caracteres');

        // Adicionar resposta do assistente
        const assistantMessage: AskSofyaMessage = {
          type: 'assistant',
          text: responseText,
          // Nota: A API não retorna referências diretamente, 
          // mas podemos extrair do reasoning se necessário
          timestamp: new Date().toISOString(),
        };
        console.log('💬 Mensagem do assistente criada:', assistantMessage);
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        setError(err as Error);
        console.error('Error sending message:', err);
        // Adicionar mensagem de erro
        const errorMessage: AskSofyaMessage = {
          type: 'assistant',
          text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Verifique se sua API Key está configurada corretamente.',
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    conversationId,
    sendMessage,
    initializeConversation,
    clearMessages,
  };
}
