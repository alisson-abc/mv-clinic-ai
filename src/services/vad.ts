/**
 * Serviço de Detecção de Atividade de Voz (VAD)
 * Detecta quando o usuário começa e para de falar
 * Baseado na implementação do chat-marketplace-front
 */

export interface VadConfig {
  vadThreshold?: number; // Threshold de sensibilidade (0.0 a 1.0, padrão: 0.025 desktop / 0.045 iOS)
  silenceDuration?: number; // Duração de silêncio para considerar fim de fala (ms, padrão: 1000)
  sampleRate?: number; // Sample rate do áudio (padrão: 24000)
  checkInterval?: number; // Intervalo de verificação do VAD (ms, padrão: 100)
}

export class VadService {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
  
  private isListening = false;
  private vadThreshold: number;
  private silenceDuration: number;
  private checkInterval: number;
  private lastSpeechTime = 0;
  private consecutiveSpeechCount = 0; // Contador para evitar falsos positivos
  private minConsecutiveChecks = 3; // Mínimo de checks consecutivos para considerar fala
  
  private onSpeechStartCallback: (() => void) | null = null;
  private onSpeechEndCallback: (() => void) | null = null;
  private vadCheckInterval: number | null = null;

  constructor(config: VadConfig = {}) {
    // Aumentar threshold no iOS para reduzir falsos positivos
    // Aumentado ligeiramente para reduzir captação de ruído
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const defaultThreshold = isIOS ? 0.045 : 0.025; // Threshold aumentado para reduzir ruído
    
    this.vadThreshold = config.vadThreshold ?? defaultThreshold;
    this.silenceDuration = config.silenceDuration ?? 1000;
    this.checkInterval = config.checkInterval ?? 100;
    
    if (isIOS) {
      console.log('📱 iOS detectado - usando threshold VAD aumentado:', this.vadThreshold);
    }
    console.log('🎤 VAD configurado:', {
      threshold: this.vadThreshold,
      silenceDuration: this.silenceDuration + 'ms',
      checkInterval: this.checkInterval + 'ms',
    });
  }

  /**
   * Inicia detecção de voz
   */
  async startListening(): Promise<void> {
    if (this.isListening) return;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000, // 24kHz conforme especificação
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      this.audioContext = new AudioContext({ sampleRate: 24000 });
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.8;
      
      this.microphone = this.audioContext.createMediaStreamSource(this.stream);
      this.microphone.connect(this.analyser);

      this.isListening = true;
      this.startVADCheck();
    } catch (error) {
      console.error('Erro ao iniciar VAD:', error);
      throw error;
    }
  }

  /**
   * Para detecção de voz
   */
  stopListening(): void {
    this.isListening = false;
    this.stopVADCheck();
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }
    
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  /**
   * Verifica atividade de voz periodicamente
   */
  private startVADCheck(): void {
    if (this.vadCheckInterval) return;

    this.vadCheckInterval = window.setInterval(() => {
      if (!this.analyser || !this.isListening) return;

      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);
      
      // Calcula energia média do sinal
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      const normalized = average / 255;

      if (normalized > this.vadThreshold) {
        // Incrementar contador de detecções consecutivas
        this.consecutiveSpeechCount++;
        
        // Só considerar fala se houver múltiplas detecções consecutivas
        // Isso reduz falsos positivos, especialmente no iOS
        if (this.lastSpeechTime === 0 && this.consecutiveSpeechCount >= this.minConsecutiveChecks) {
          console.log('🗣️ Fala confirmada após', this.consecutiveSpeechCount, 'detecções consecutivas');
          if (this.onSpeechStartCallback) {
            this.onSpeechStartCallback();
          }
          this.lastSpeechTime = Date.now();
        } else if (this.lastSpeechTime > 0) {
          // Se já estava falando, atualizar timestamp
          this.lastSpeechTime = Date.now();
        }
      } else {
        // Resetar contador quando não há detecção
        this.consecutiveSpeechCount = 0;
        
        // Silêncio detectado
        if (this.lastSpeechTime > 0) {
          const silenceTime = Date.now() - this.lastSpeechTime;
          if (silenceTime > this.silenceDuration) {
            if (this.onSpeechEndCallback) {
              this.onSpeechEndCallback();
            }
            this.lastSpeechTime = 0;
            this.consecutiveSpeechCount = 0;
          }
        }
      }
    }, this.checkInterval); // Verifica no intervalo configurado
  }

  private stopVADCheck(): void {
    if (this.vadCheckInterval) {
      clearInterval(this.vadCheckInterval);
      this.vadCheckInterval = null;
    }
    this.lastSpeechTime = 0;
    this.consecutiveSpeechCount = 0;
  }

  /**
   * Obtém o stream de áudio para captura PCM
   */
  getAudioStream(): MediaStream | null {
    return this.stream;
  }

  /**
   * Define callback para início de fala
   */
  onSpeechStart(callback: () => void): void {
    this.onSpeechStartCallback = callback;
  }

  /**
   * Define callback para fim de fala
   */
  onSpeechEnd(callback: () => void): void {
    this.onSpeechEndCallback = callback;
  }

  /**
   * Define o threshold de VAD (sensibilidade)
   * @param threshold Valor entre 0.0 e 1.0 (padrão: 0.02)
   * - Valores menores (0.01-0.02) = mais sensível (captura até ruídos baixos)
   * - Valores maiores (0.05-0.1) = menos sensível (só captura voz clara)
   */
  setVadThreshold(threshold: number): void {
    if (threshold >= 0 && threshold <= 1) {
      this.vadThreshold = threshold;
      console.log('VAD Threshold atualizado para:', threshold);
    } else {
      console.warn('Threshold deve estar entre 0.0 e 1.0');
    }
  }

  /**
   * Obtém o threshold atual de VAD
   */
  getVadThreshold(): number {
    return this.vadThreshold;
  }

  /**
   * Define a duração de silêncio para fim de fala
   * @param duration Duração em milissegundos
   */
  setSilenceDuration(duration: number): void {
    if (duration > 0) {
      this.silenceDuration = duration;
      console.log('Silence Duration atualizado para:', duration, 'ms');
    }
  }

  /**
   * Verifica se está escutando
   */
  getIsListening(): boolean {
    return this.isListening;
  }
}
