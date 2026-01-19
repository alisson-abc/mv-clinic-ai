/**
 * Serviço de Reprodução de Áudio
 * Reproduz áudio recebido do servidor em streaming
 * Baseado na implementação do chat-marketplace-front
 */

export class AudioPlaybackService {
  private audioContext: AudioContext | null = null;
  private activeSources: AudioBufferSourceNode[] = []; // Múltiplos sources para streaming
  private isPlaying = false;
  private audioQueue: ArrayBuffer[] = [];
  private isProcessingQueue = false;
  private onPlaybackStopCallback: (() => void) | null = null;

  /**
   * Inicia reprodução de áudio em streaming
   */
  async initialize(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext({ sampleRate: 24000 });
      console.log('🎵 AudioContext criado, estado:', this.audioContext.state);
    }
    
    // Retomar AudioContext se estiver suspenso (requerido por navegadores modernos)
    if (this.audioContext.state === 'suspended') {
      console.log('▶️ Retomando AudioContext suspenso...');
      await this.audioContext.resume();
      console.log('✅ AudioContext retomado, estado:', this.audioContext.state);
    }
  }

  /**
   * Adiciona chunk de áudio ao buffer e reproduz
   */
  async playAudioChunk(audioData: ArrayBuffer): Promise<void> {
    if (!this.audioContext) {
      await this.initialize();
    }

    // No iOS, garantir que AudioContext está rodando antes de adicionar à fila
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && this.audioContext.state === 'suspended') {
      console.log('📱 iOS: Retomando AudioContext antes de reproduzir...');
      try {
        await this.audioContext.resume();
        console.log('✅ iOS: AudioContext retomado');
      } catch (error) {
        console.error('❌ iOS: Erro ao retomar AudioContext:', error);
      }
    }

    // Adiciona à fila
    this.audioQueue.push(audioData);
    
    // Processa fila se não estiver processando
    if (!this.isProcessingQueue) {
      this.processAudioQueue();
    }
  }

  /**
   * Processa fila de áudio sequencialmente
   */
  private async processAudioQueue(): Promise<void> {
    if (this.isProcessingQueue || this.audioQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    while (this.audioQueue.length > 0) {
      const audioData = this.audioQueue.shift();
      if (!audioData) break;

      try {
        console.log('Tentando decodificar áudio, tamanho:', audioData.byteLength, 'bytes');
        
        // Verifica se o buffer não está vazio
        if (audioData.byteLength === 0) {
          console.warn('Buffer de áudio vazio, ignorando');
          continue;
        }
        
        // Tenta decodificar como áudio (WebM, MP3, etc)
        try {
          const audioBuffer = await this.audioContext!.decodeAudioData(audioData.slice(0));
          console.log('Áudio decodificado com sucesso:', audioBuffer.duration, 'segundos');
          
          // Garantir que AudioContext está rodando
          if (this.audioContext!.state === 'suspended') {
            console.log('▶️ Retomando AudioContext antes de reproduzir...');
            await this.audioContext!.resume();
            console.log('✅ AudioContext retomado, estado:', this.audioContext!.state);
          }
          
          // Cria source e reproduz
          const source = this.audioContext!.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(this.audioContext!.destination);
          
          // Salva referência para poder parar (Barge-in)
          this.activeSources.push(source);
          
          console.log('🔊 Iniciando reprodução de áudio, duração:', audioBuffer.duration, 'segundos');
          console.log('📊 AudioContext estado:', this.audioContext!.state);
          console.log('📊 Sample rate:', this.audioContext!.sampleRate, 'Hz');
          console.log('📊 Canais:', audioBuffer.numberOfChannels);
          
          await new Promise<void>((resolve) => {
            source.onended = () => {
              console.log('✅ Áudio terminou de reproduzir');
              // Remove da lista quando terminar
              const index = this.activeSources.indexOf(source);
              if (index > -1) {
                this.activeSources.splice(index, 1);
              }
              
              // Se não houver mais sources, marca como não reproduzindo
              if (this.activeSources.length === 0) {
                this.isPlaying = false;
                // Dispara callback se fornecido
                if (this.onPlaybackStopCallback) {
                  this.onPlaybackStopCallback();
                }
              }
              resolve();
            };

            this.isPlaying = true;
            try {
              source.start(0);
              console.log('✅ Áudio iniciado com sucesso');
            } catch (error) {
              console.error('❌ Erro ao iniciar reprodução:', error);
              resolve();
            }
          });
        } catch (decodeError) {
          // Se não for áudio válido, tenta como PCM raw
          console.warn('Erro ao decodificar áudio como formato comprimido, tentando como PCM:', decodeError);
          await this.playPCMAudio(audioData);
        }
      } catch (error) {
        console.error('Erro ao processar áudio:', error);
      }
    }

    this.isProcessingQueue = false;
  }

  /**
   * Reproduz áudio PCM raw
   */
  private async playPCMAudio(pcmData: ArrayBuffer): Promise<void> {
    if (!this.audioContext) {
      await this.initialize();
    }
    
    // Garantir que AudioContext está rodando
    if (this.audioContext.state === 'suspended') {
      console.log('▶️ Retomando AudioContext antes de reproduzir PCM...');
      await this.audioContext.resume();
      console.log('✅ AudioContext retomado, estado:', this.audioContext.state);
    }

    console.log('Reproduzindo PCM raw, tamanho:', pcmData.byteLength, 'bytes');
    
    // Verifica se o tamanho é válido para Int16Array
    if (pcmData.byteLength % 2 !== 0) {
      console.error('Tamanho de buffer PCM inválido (deve ser múltiplo de 2)');
      return;
    }

    const int16Array = new Int16Array(pcmData);
    const float32Array = new Float32Array(int16Array.length);
    
    // Converte Int16 para Float32
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
    }

    // Usa sample rate da configuração (24kHz conforme especificação)
    const sampleRate = 24000;
    const audioBuffer = this.audioContext!.createBuffer(1, float32Array.length, sampleRate);
    audioBuffer.copyToChannel(float32Array, 0);
    
    console.log('Buffer PCM criado:', audioBuffer.duration, 'segundos a', sampleRate, 'Hz');

    const source = this.audioContext!.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext!.destination);
    
    // Salva referência para poder parar (Barge-in)
    this.activeSources.push(source);

    console.log('🔊 Iniciando reprodução de áudio PCM, duração:', audioBuffer.duration, 'segundos');
    this.isPlaying = true;
    source.start(0);
    console.log('✅ Áudio PCM iniciado com sucesso');

    return new Promise<void>((resolve) => {
      source.onended = () => {
        // Remove da lista quando terminar
        const index = this.activeSources.indexOf(source);
        if (index > -1) {
          this.activeSources.splice(index, 1);
        }
        
        // Se não houver mais sources, marca como não reproduzindo
        if (this.activeSources.length === 0) {
          this.isPlaying = false;
          // Dispara callback se fornecido
          if (this.onPlaybackStopCallback) {
            this.onPlaybackStopCallback();
          }
        }
        resolve();
      };

      this.isPlaying = true;
      source.start(0);
    });
  }

  /**
   * Para reprodução atual (Barge-in)
   */
  stopPlayback(): void {
    // Para todos os sources ativos
    this.activeSources.forEach(source => {
      try {
        source.stop();
      } catch (e) {
        // Pode já estar parado ou não iniciado
      }
    });
    this.activeSources = [];
    
    // Limpa fila
    this.audioQueue = [];
    this.isProcessingQueue = false;
    this.isPlaying = false;
    
    // Dispara callback
    if (this.onPlaybackStopCallback) {
      this.onPlaybackStopCallback();
    }
  }

  /**
   * Verifica se está reproduzindo
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Define callback para quando playback parar
   */
  onPlaybackStop(callback: () => void): void {
    this.onPlaybackStopCallback = callback;
  }
}
