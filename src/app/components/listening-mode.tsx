import { useState, useEffect } from "react";
import { Mic, Pause, X, Check, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { useVoiceChat } from "@/hooks/useVoiceChat";
import { structureSOAP } from "@/services/soap";

interface ListeningModeProps {
  onNavigate: (screen: string) => void;
}

export function ListeningMode({ onNavigate }: ListeningModeProps) {
  console.log('🎯 ListeningMode renderizando...');
  
  const {
    isConnected,
    isRecording,
    isListening,
    isSpeaking,
    transcription,
    connect,
    disconnect,
    startVoiceMode,
    stopVoiceMode,
    error,
  } = useVoiceChat({
    strategy: 'sofya',
    language: 'pt-BR',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Solicitar microfone imediatamente ao montar (sem esperar WebSocket)
  useEffect(() => {
    console.log('🚀 ===== COMPONENTE LISTENING MODE MONTADO =====');
    console.log('📍 URL atual:', window.location.href);
    console.log('🎤 Tentando solicitar microfone em 1 segundo...');
    
    // Tentar iniciar modo de voz imediatamente (para testar microfone)
    const initVoice = async () => {
      try {
        console.log('🎤 ===== INICIANDO MODO DE VOZ =====');
        console.log('📱 Verificando se getUserMedia está disponível...');
        console.log('navigator.mediaDevices:', navigator.mediaDevices);
        console.log('getUserMedia disponível:', !!navigator.mediaDevices?.getUserMedia);
        
        await startVoiceMode();
        console.log('✅ Modo de voz iniciado com sucesso!');
      } catch (err) {
        console.error('❌ ERRO ao iniciar modo de voz:', err);
        console.error('Stack:', err instanceof Error ? err.stack : 'N/A');
        alert(`Erro: ${err instanceof Error ? err.message : 'Erro desconhecido'}\n\nVerifique o console para mais detalhes.`);
      }
    };

    // Aguardar um pouco para garantir que o componente está montado
    const timer = setTimeout(() => {
      console.log('⏰ Timer disparado, iniciando modo de voz...');
      initVoice();
    }, 1000);

    // Também tentar conectar WebSocket em paralelo (não bloqueia)
    console.log('📡 Tentando conectar WebSocket em paralelo...');
    connect().catch((err) => {
      console.warn('⚠️ WebSocket não conectou (não é crítico):', err);
    });

    return () => {
      console.log('🧹 Limpando componente ListeningMode...');
      clearTimeout(timer);
      disconnect();
    };
  }, [connect, disconnect, startVoiceMode]);

  const handleFinalize = async () => {
    if (!transcription.trim()) {
      alert("Nenhuma transcrição disponível. Por favor, grave algo primeiro.");
      return;
    }

    try {
      setIsProcessing(true);
      // Estruturar em SOAP
      const soapResult = await structureSOAP({
        transcription,
        format: 'SOAP',
      });

      // Navegar para tela SOAP com os dados estruturados
      // Você pode passar os dados via estado global ou contexto
      onNavigate("soap");
    } catch (err) {
      console.error("Error structuring SOAP:", err);
      alert("Erro ao estruturar a transcrição. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0056D2] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <button
          onClick={() => onNavigate("dashboard")}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Waveform Animation */}
        <div className="mb-12">
          <div className="flex items-end justify-center gap-1 h-32">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-white rounded-full"
                animate={{
                  height: isRecording
                    ? [
                        `${20 + Math.random() * 80}%`,
                        `${20 + Math.random() * 80}%`,
                      ]
                    : "20%",
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        </div>

        {/* Recording Indicator */}
        <div className="flex items-center gap-3 mb-8">
          {error ? (
            <>
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <p className="text-white font-medium">
                Erro de conexão. Tentando reconectar...
              </p>
            </>
          ) : !isConnected ? (
            <>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <p className="text-white font-medium">Conectando...</p>
            </>
          ) : (
            <>
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                isRecording ? "bg-red-500" : isSpeaking ? "bg-blue-500" : "bg-gray-400"
              }`}></div>
              <p className="text-white font-medium">
                {isSpeaking ? "Ouvindo resposta..." : isRecording ? "Gravando..." : "Pausado"}
              </p>
            </>
          )}
        </div>

        {/* Transcription Display */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 min-h-[200px]">
          <p className="text-white/90 text-sm leading-relaxed">
            {transcription || "Comece a falar..."}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-center gap-6 mb-4">
          <button
            onClick={() => {
              if (isRecording) {
                stopVoiceMode();
              } else {
                startVoiceMode();
              }
            }}
            disabled={!isConnected}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRecording ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>

          <button
            onClick={handleFinalize}
            disabled={!transcription.trim() || isProcessing}
            className="w-20 h-20 bg-[#00C853] rounded-full flex items-center justify-center shadow-lg hover:bg-[#00B347] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check className="w-10 h-10 text-white" />
            )}
          </button>

          <button
            onClick={() => onNavigate("dashboard")}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-8 h-8 text-white" />
          </button>
        </div>

        <p className="text-center text-white/80 text-sm">
          Finalizar e Estruturar
        </p>
      </div>
    </div>
  );
}
