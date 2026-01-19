/**
 * Serviço de Transcrição STT da Sofya
 * Conecta ao WebSocket /scribe/ws/transcriber para transcrição em tempo real
 */

export interface TranscriptionResponse {
  status: 'partial' | 'final';
  data: {
    text: string;
    words?: Array<{
      word: string;
      start: number;
      end: number;
    }>;
  };
  time?: number; // tempo de processamento em ms
}

export class SofyaTranscriberService {
  private ws: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private isRecording = false;
  private chunkSize = 4096; // 4KB chunks
  
  private onTranscriptionCallback: ((text: string, isFinal: boolean) => void) | null = null;
  private onErrorCallback: ((error: Error) => void) | null = null;
  private onStatusCallback: ((status: 'connecting' | 'recording' | 'processing' | 'idle') => void) | null = null;

  constructor(
    private wsUrl: string = 'wss://clinical-services.aiaas.mv.com.br/scribe/ws/transcriber'
  ) {}

  /**
   * Define callback para transcrições
   */
  setOnTranscription(callback: (text: string, isFinal: boolean) => void): void {
    this.onTranscriptionCallback = callback;
  }

  /**
   * Define callback para erros
   */
  setOnError(callback: (error: Error) => void): void {
    this.onErrorCallback = callback;
  }

  /**
   * Define callback para mudanças de status
   */
  setOnStatus(callback: (status: 'connecting' | 'recording' | 'processing' | 'idle') => void): void {
    this.onStatusCallback = callback;
  }

  /**
   * Conecta ao WebSocket
   */
  private async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.wsUrl);
        
        this.ws.onopen = () => {
          console.log('✅ WebSocket STT conectado');
          this.onStatusCallback?.('recording');
          resolve();
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event);
        };

        this.ws.onerror = (error) => {
          console.error('❌ Erro WebSocket STT:', error);
          const err = new Error('Erro na conexão WebSocket');
          this.onErrorCallback?.(err);
          reject(err);
        };

        this.ws.onclose = () => {
          console.log('🔌 WebSocket STT desconectado');
          this.onStatusCallback?.('idle');
        };
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Erro ao conectar WebSocket');
        this.onErrorCallback?.(err);
        reject(err);
      }
    });
  }

  /**
   * Processa mensagens recebidas do servidor
   */
  private handleMessage(event: MessageEvent): void {
    try {
      const data: TranscriptionResponse = JSON.parse(event.data);
      
      if (data.status === 'partial' || data.status === 'final') {
        const text = data.data?.text || '';
        const isFinal = data.status === 'final';
        
        console.log(`📝 Transcrição ${isFinal ? 'FINAL' : 'PARCIAL'}:`, text);
        
        if (this.onTranscriptionCallback) {
          this.onTranscriptionCallback(text, isFinal);
        }
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  }

  /**
   * Inicia captura de áudio e transcrição
   */
  async startTranscription(): Promise<void> {
    if (this.isRecording) {
      console.warn('⚠️ Já está gravando');
      return;
    }

    try {
      this.onStatusCallback?.('connecting');
      
      // Solicitar permissão de microfone
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      console.log('🎤 Permissão de microfone concedida');

      // Conectar ao WebSocket
      await this.connect();

      // Criar AudioContext
      this.audioContext = new AudioContext({ sampleRate: 16000 });
      
      // Criar ScriptProcessorNode para capturar áudio
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.scriptProcessor = this.audioContext.createScriptProcessor(this.chunkSize, 1, 1);
      
      this.scriptProcessor.onaudioprocess = (event) => {
        if (!this.isRecording || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
          return;
        }

        const inputBuffer = event.inputBuffer.getChannelData(0);
        
        // Converter Float32 para Int16 PCM
        const pcmData = this.floatTo16BitPCM(inputBuffer);
        
        // Enviar chunk binário
        try {
          this.ws.send(pcmData);
        } catch (error) {
          console.error('Erro ao enviar chunk:', error);
        }
      };

      source.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioContext.destination);

      this.isRecording = true;
      console.log('✅ Transcrição iniciada');
      
    } catch (error) {
      console.error('Erro ao iniciar transcrição:', error);
      const err = error instanceof Error ? error : new Error('Erro ao iniciar transcrição');
      this.onErrorCallback?.(err);
      this.onStatusCallback?.('idle');
      throw err;
    }
  }

  /**
   * Para transcrição e finaliza
   */
  async stopTranscription(): Promise<void> {
    if (!this.isRecording) {
      return;
    }

    this.isRecording = false;
    this.onStatusCallback?.('processing');

    // Enviar comando de finalização
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify({ action: 'finish' }));
        console.log('📤 Comando de finalização enviado');
        
        // Aguardar respostas finais (até 5 segundos para garantir todas as respostas)
        await new Promise((resolve) => {
          let finalReceived = false;
          const timeout = setTimeout(() => {
            if (!finalReceived) {
              console.log('⏱️ Timeout aguardando transcrições finais');
            }
            resolve(null);
          }, 5000);
          
          const originalCallback = this.onTranscriptionCallback;
          this.onTranscriptionCallback = (text, isFinal) => {
            originalCallback?.(text, isFinal);
            // Aguardar um pouco mais após receber final para garantir que não há mais
            if (isFinal) {
              finalReceived = true;
              setTimeout(() => {
                clearTimeout(timeout);
                resolve(null);
              }, 500); // Aguarda 500ms após última final
            }
          };
        });
      } catch (error) {
        console.error('Erro ao finalizar:', error);
      }
    }

    // Limpar recursos
    this.cleanup();
  }

  /**
   * Limpa recursos
   */
  private cleanup(): void {
    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
      this.ws = null;
    }

    this.onStatusCallback?.('idle');
    console.log('🧹 Recursos limpos');
  }

  /**
   * Converte Float32Array para Int16 PCM
   */
  private floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    let offset = 0;
    
    for (let i = 0; i < float32Array.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    
    return buffer;
  }

  /**
   * Verifica se está gravando
   */
  getIsRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Desconecta e limpa tudo
   */
  disconnect(): void {
    this.isRecording = false;
    this.cleanup();
  }
}
