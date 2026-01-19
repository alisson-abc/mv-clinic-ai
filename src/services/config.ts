/**
 * Configuração dos serviços do Marketplace MV
 */

export const API_CONFIG = {
  // Chat Marketplace Voice Chat (Orb de Voz)
  VOICE_CHAT_WS: import.meta.env.VITE_VOICE_CHAT_WS_URL || 
    'wss://chat-marketplace-back-335214030459.us-central1.run.app/ws/voice-chat',
  VOICE_CHAT_API: import.meta.env.VITE_VOICE_CHAT_API_URL || 
    'https://chat-marketplace-back-335214030459.us-central1.run.app',
  
  // API Gateway Base URL
  GATEWAY_API: import.meta.env.VITE_GATEWAY_API_URL || 
    'https://marketplace-gateway-hml-4yixfev4.uc.gateway.dev',
  
  // Ask Sofya Chat SDK - Endereço direto (POC)
  ASK_SOFYA_API: import.meta.env.VITE_ASK_SOFYA_API_URL || 
    'https://clinical-llm.aiaas.mv.com.br/v1/responses',
  
  // API Gateway (alternativa, se necessário)
  GATEWAY_SOFYA_API: import.meta.env.VITE_GATEWAY_SOFYA_API_URL || 
    'https://marketplace-gateway-hml-4yixfev4.uc.gateway.dev/api/sofya/llm/responses',
  
  // Estruturação SOAP
  SOAP_API: import.meta.env.VITE_SOAP_API_URL || 
    'https://api.marketplace.mv.com.br/soap',
  
  // Sofya Prescriber API
  PRESCRIBER_API: import.meta.env.VITE_PRESCRIBER_API_URL || 
    'https://api.marketplace.mv.com.br/prescriptions',
  
  // Kadok OCR
  KADOK_API: import.meta.env.VITE_KADOK_API_URL || 
    'https://api.marketplace.mv.com.br/kadok',
  
  // Transcrição de áudio
  TRANSCRIPTION_API: import.meta.env.VITE_TRANSCRIPTION_API_URL || 
    'https://api.marketplace.mv.com.br/transcription',
  
  // Sofya STT Transcriber (WebSocket)
  SOFYA_STT_WS: import.meta.env.VITE_SOFYA_STT_WS_URL || 
    'wss://clinical-services.aiaas.mv.com.br/scribe/ws/transcriber',
  
  // Notebook MV
  NOTEBOOK_MV_API: import.meta.env.VITE_NOTEBOOK_MV_API_URL || 
    'https://api.marketplace.mv.com.br/notebook',
};

export const API_KEYS = {
  MARKETPLACE_API_KEY: import.meta.env.VITE_MARKETPLACE_API_KEY || '',
  WORKSPACE_UUID: import.meta.env.VITE_WORKSPACE_UUID || '',
};

/**
 * Configuração do VAD (Voice Activity Detection) para o Orb
 * Ajuste estes valores para melhorar a detecção de silêncio e reduzir ruído
 * 
 * Para ajustar via variáveis de ambiente, adicione ao .env:
 * VITE_VAD_SILENCE_DURATION=600
 * VITE_VAD_THRESHOLD=0.025
 * VITE_VAD_CHECK_INTERVAL=100
 */
export const VAD_CONFIG = {
  // Duração de silêncio para considerar fim de fala (em milissegundos)
  // Valores menores = mais responsivo, mas pode cortar pausas naturais
  // Valores maiores = mais tolerante a pausas, mas pode demorar para detectar fim
  // Padrão: 1000ms (1 segundo) | Ajustado: 600ms para melhor responsividade
  SILENCE_DURATION: Number(import.meta.env.VITE_VAD_SILENCE_DURATION) || 600,
  
  // Threshold de sensibilidade do VAD (0.0 a 1.0)
  // Valores menores = mais sensível (captura mais ruído)
  // Valores maiores = menos sensível (pode perder fala baixa)
  // Padrão automático: 0.025 (desktop) / 0.045 (iOS) - aumentado para reduzir ruído
  // Se definido, sobrescreve o padrão automático
  VAD_THRESHOLD: import.meta.env.VITE_VAD_THRESHOLD 
    ? Number(import.meta.env.VITE_VAD_THRESHOLD) 
    : undefined, // undefined = usa padrão automático
  
  // Intervalo de verificação do VAD (em milissegundos)
  // Valores menores = mais preciso, mas usa mais CPU
  // Valores maiores = menos preciso, mas usa menos CPU
  // Padrão: 100ms | Recomendado: manter 100ms
  CHECK_INTERVAL: Number(import.meta.env.VITE_VAD_CHECK_INTERVAL) || 100,
};

/**
 * Headers padrão para requisições
 */
export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  ...(API_KEYS.MARKETPLACE_API_KEY && {
    'x-api-key': API_KEYS.MARKETPLACE_API_KEY,
  }),
});
