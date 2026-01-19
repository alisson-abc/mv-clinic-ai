/**
 * Serviço de Captura de Áudio PCM
 * Captura áudio em tempo real e converte para PCM Int16
 * Baseado na implementação do chat-marketplace-front
 */

export interface AudioCaptureConfig {
  sampleRate?: number;
  channelCount?: number;
  volumeThreshold?: number; // Threshold para filtrar chunks silenciosos (0.0 a 1.0)
}

export class AudioCaptureService {
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private stream: MediaStream | null = null;
  private isCapturing = false;
  private volumeThreshold: number;
  private onChunkCallback: ((chunk: ArrayBuffer) => void) | null = null;

  constructor(config: AudioCaptureConfig = {}) {
    this.volumeThreshold = config.volumeThreshold ?? 0.01;
  }

  /**
   * Inicia captura contínua de áudio PCM
   * @param stream Stream de áudio (opcional, cria novo se não fornecido)
   * @param onChunk Callback chamado para cada chunk de áudio capturado
   */
  async startCapture(
    stream?: MediaStream,
    onChunk?: (chunk: ArrayBuffer) => void
  ): Promise<void> {
    if (this.isCapturing) return;

    try {
      // Usa o stream fornecido ou cria novo
      this.stream = stream || await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000, // 24kHz conforme especificação
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });

      this.audioContext = new AudioContext({ sampleRate: 24000 });
      const source = this.audioContext.createMediaStreamSource(this.stream);
      
      // ScriptProcessor para capturar chunks PCM
      // Nota: ScriptProcessorNode está deprecated, mas ainda funciona
      // Em produção, considere usar AudioWorklet
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      this.onChunkCallback = onChunk || null;

      this.processor.onaudioprocess = (event) => {
        if (!this.isCapturing) return;
        
        const inputBuffer = event.inputBuffer;
        const inputData = inputBuffer.getChannelData(0);
        
        // Calcula volume médio do chunk
        const volume = this.calculateVolume(inputData);
        
        // Filtra chunks muito silenciosos antes de enviar
        if (volume < this.volumeThreshold) {
          return; // Ignora chunk silencioso
        }
        
        // Converte Float32 para Int16 PCM
        const pcmData = this.floatTo16BitPCM(inputData);
        
        // Chama callback se fornecido
        if (this.onChunkCallback) {
          this.onChunkCallback(pcmData.buffer);
        }
      };

      source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
      this.isCapturing = true;
    } catch (error) {
      console.error('Erro ao iniciar captura:', error);
      throw error;
    }
  }

  /**
   * Para captura
   */
  stopCapture(): void {
    this.isCapturing = false;
    
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    this.onChunkCallback = null;
  }

  /**
   * Calcula o volume médio de um chunk de áudio
   */
  private calculateVolume(audioData: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      sum += Math.abs(audioData[i]);
    }
    return sum / audioData.length;
  }

  /**
   * Converte Float32 para Int16 PCM
   */
  private floatTo16BitPCM(float32Array: Float32Array): Int16Array {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return int16Array;
  }

  /**
   * Define o threshold de volume para filtrar chunks silenciosos
   * @param threshold Valor entre 0.0 e 1.0 (padrão: 0.01)
   * Valores menores = envia mais áudio
   * Valores maiores = só envia áudio com volume alto
   */
  setVolumeThreshold(threshold: number): void {
    if (threshold >= 0 && threshold <= 1) {
      this.volumeThreshold = threshold;
      console.log('Volume Threshold atualizado para:', threshold);
    } else {
      console.warn('Threshold deve estar entre 0.0 e 1.0');
    }
  }

  /**
   * Obtém o threshold atual de volume
   */
  getVolumeThreshold(): number {
    return this.volumeThreshold;
  }

  /**
   * Verifica se está capturando
   */
  getIsCapturing(): boolean {
    return this.isCapturing;
  }

  /**
   * Obtém o stream de áudio atual
   */
  getAudioStream(): MediaStream | null {
    return this.stream;
  }
}
