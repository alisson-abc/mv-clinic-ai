/**
 * Serviço de Chat por Voz (Orb de Voz)
 * WebSocket para chat em tempo real com TTS e STT integrados
 * Baseado na implementação do chat-marketplace-front
 */

import { API_CONFIG } from './config';

export interface VoiceChatMessage {
  transcription?: string;
  audio_response?: string; // Base64 encoded audio
  strategy?: 'dialogflow' | 'notebookmv' | 'sofya';
  timestamp?: string;
}

export interface VoiceChatConfig {
  strategy?: 'dialogflow' | 'notebookmv' | 'sofya';
  workspace_uuid?: string;
  language?: 'pt-BR' | 'en-US';
}

export interface WebSocketMessage {
  type: 'audio_chunk' | 'text' | 'clear_buffer' | 'end_of_speech' | 'error' | 'session_id';
  data?: string | ArrayBuffer; // Base64 para áudio, string para texto
  sessionId?: string;
}

export class VoiceChatService {
  private ws: WebSocket | null = null;
  private sessionId: string | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  // Callbacks
  private onMessageCallback: ((message: VoiceChatMessage) => void) | null = null;
  private onAudioCallback: ((audioData: ArrayBuffer) => void) | null = null;
  private onTextCallback: ((text: string) => void) | null = null;
  private onTranscriptionCallback: ((text: string) => void) | null = null;
  private onErrorCallback: ((error: Error) => void) | null = null;
  private onCloseCallback: (() => void) | null = null;

  constructor(
    onMessage?: (message: VoiceChatMessage) => void,
    onError?: (error: Error) => void,
    onClose?: () => void,
    private config?: VoiceChatConfig
  ) {
    this.onMessageCallback = onMessage || null;
    this.onErrorCallback = onError || null;
    this.onCloseCallback = onClose || null;
  }

  /**
   * Define callback para áudio recebido
   */
  setOnAudio(callback: (audioData: ArrayBuffer) => void): void {
    this.onAudioCallback = callback;
  }

  /**
   * Define callback para texto recebido
   */
  setOnText(callback: (text: string) => void): void {
    this.onTextCallback = callback;
  }

  /**
   * Define callback para transcrição recebida
   */
  setOnTranscription(callback: (text: string) => void): void {
    this.onTranscriptionCallback = callback;
  }

  /**
   * Conecta ao WebSocket de chat por voz
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const url = new URL(API_CONFIG.VOICE_CHAT_WS);
        if (this.config?.workspace_uuid) {
          url.searchParams.set('workspace_uuid', this.config.workspace_uuid);
        }
        if (this.config?.strategy) {
          url.searchParams.set('strategy', this.config.strategy);
        }
        if (this.config?.language) {
          url.searchParams.set('language', this.config.language);
        }

        this.ws = new WebSocket(url.toString());

        this.ws.onopen = () => {
          console.log('Voice Chat WebSocket connected');
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event);
        };

        this.ws.onerror = (error) => {
          console.error('Voice Chat WebSocket error:', error);
          if (this.onErrorCallback) {
            this.onErrorCallback(new Error('WebSocket connection error'));
          }
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('Voice Chat WebSocket closed');
          if (this.onCloseCallback) {
            this.onCloseCallback();
          }
          // Tentar reconectar
          this.attemptReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Handlers de mensagens recebidas
   */
  private handleMessage(event: MessageEvent): void {
    try {
      // Se for ArrayBuffer (áudio binário)
      if (event.data instanceof ArrayBuffer) {
        console.log('Áudio recebido como ArrayBuffer:', event.data.byteLength, 'bytes');
        if (this.onAudioCallback) {
          this.onAudioCallback(event.data);
        }
        return;
      }

      // Se for Blob (áudio binário)
      if (event.data instanceof Blob) {
        console.log('Áudio recebido como Blob:', event.data.size, 'bytes');
        event.data.arrayBuffer().then(buffer => {
          if (this.onAudioCallback) {
            this.onAudioCallback(buffer);
          }
        });
        return;
      }

      // Se for JSON
      const data = JSON.parse(event.data);
      console.log('Mensagem JSON recebida:', data.type, data);
      
      if (data.type === 'audio_chunk' || data.type === 'audio_response') {
        // Trata ambos os formatos: audio_chunk e audio_response
        let audioData: string | undefined;
        
        if (data.type === 'audio_response') {
          // Formato: {type: "audio_response", data: {audio: "base64..."}}
          audioData = data.data?.audio || data.audio;
        } else {
          // Formato: {type: "audio_chunk", data: "base64..."}
          audioData = data.data;
        }
        
        if (audioData && audioData.trim() !== '') {
          try {
            // Converte Base64 para ArrayBuffer
            const audioBuffer = this.base64ToArrayBuffer(audioData);
            console.log('Áudio convertido de Base64, tamanho:', audioBuffer.byteLength, 'bytes');
            if (this.onAudioCallback) {
              this.onAudioCallback(audioBuffer);
            }
          } catch (error) {
            console.error('Erro ao converter Base64 para ArrayBuffer:', error);
            if (this.onErrorCallback) {
              this.onErrorCallback(new Error('Erro ao processar áudio recebido'));
            }
          }
        } else {
          console.warn('Mensagem de áudio recebida mas sem dados de áudio. Estrutura completa:', JSON.stringify(data, null, 2));
        }
      } else if (data.type === 'text' || data.type === 'bot_response') {
        // Trata tanto 'text' quanto 'bot_response'
        const text = data.message || data.data?.text || data.data?.message || data.data;
        if (text && this.onTextCallback) {
          this.onTextCallback(typeof text === 'string' ? text : JSON.stringify(text));
        }
        // Também chama callback de mensagem para compatibilidade
        if (this.onMessageCallback) {
          this.onMessageCallback({ transcription: typeof text === 'string' ? text : JSON.stringify(text) });
        }
      } else if (data.type === 'transcription') {
        // Transcrição do que o usuário falou
        const transcriptionText = data.data?.text || data.data?.transcription || data.data || data.message;
        if (transcriptionText) {
          console.log('📝 Transcrição recebida:', transcriptionText);
          // Chama callback específico de transcrição
          if (this.onTranscriptionCallback) {
            this.onTranscriptionCallback(typeof transcriptionText === 'string' ? transcriptionText : JSON.stringify(transcriptionText));
          }
        }
      } else if (data.type === 'session_id' || data.type === 'session_start') {
        // Session ID ou início de sessão
        this.sessionId = data.sessionId || data.session_id || data.data?.session_id;
        if (this.sessionId) {
          console.log('🆔 Session ID recebido:', this.sessionId);
        }
      } else if (data.type === 'error') {
        const errorMsg = data.message || data.data?.message || data.data?.error || 'Erro desconhecido';
        // Ignorar erros relacionados a clear_buffer (são apenas confirmações do servidor)
        if (errorMsg.includes('clear_buffer') || errorMsg.includes('MessageType')) {
          console.log('ℹ️ Mensagem de erro ignorada (clear_buffer):', errorMsg);
          return;
        }
        console.warn('⚠️ Erro recebido do servidor:', errorMsg);
        if (this.onErrorCallback) {
          this.onErrorCallback(new Error(errorMsg));
        }
      } else {
        // Log para debug de tipos não tratados
        console.log('⚠️ Tipo de mensagem não tratado:', data.type, data);
        // Tenta chamar callback de mensagem genérico
        if (this.onMessageCallback) {
          this.onMessageCallback(data);
        }
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      if (this.onErrorCallback) {
        this.onErrorCallback(error as Error);
      }
    }
  }

  /**
   * Envia chunk de áudio PCM (Base64)
   */
  sendAudioChunk(audioData: ArrayBuffer): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      // Converte ArrayBuffer para Base64
      const base64 = this.arrayBufferToBase64(audioData);
      const message: WebSocketMessage = {
        type: 'audio_chunk',
        data: base64,
        sessionId: this.sessionId || undefined
      };
      this.ws.send(JSON.stringify(message));
    }
  }

  /**
   * Envia texto para o servidor (fallback)
   */
  sendTextMessage(text: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type: 'text',
        data: text,
        sessionId: this.sessionId || undefined
      };
      this.ws.send(JSON.stringify(message));
    }
  }

  /**
   * Sinaliza para limpar buffer (Barge-in)
   */
  clearBuffer(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type: 'clear_buffer',
        sessionId: this.sessionId || undefined
      };
      this.ws.send(JSON.stringify(message));
    }
  }

  /**
   * Sinaliza fim de fala
   */
  endOfSpeech(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type: 'end_of_speech',
        sessionId: this.sessionId || undefined
      };
      this.ws.send(JSON.stringify(message));
    }
  }

  /**
   * Utilitários de conversão
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    try {
      // Remove possíveis espaços e quebras de linha
      const cleanBase64 = base64.trim().replace(/\s/g, '');
      
      if (!cleanBase64) {
        throw new Error('String Base64 vazia');
      }
      
      const binaryString = atob(cleanBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    } catch (error) {
      console.error('Erro na conversão Base64:', error, 'String recebida:', base64.substring(0, 100));
      throw error;
    }
  }

  /**
   * Desconecta do WebSocket
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Verifica se está conectado
   */
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * Tenta reconectar automaticamente
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
        this.connect().catch((error) => {
          console.error('Reconnection failed:', error);
        });
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  /**
   * Obtém o session ID atual
   */
  getSessionId(): string | null {
    return this.sessionId;
  }

  /**
   * Define o session ID
   */
  setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }
}
