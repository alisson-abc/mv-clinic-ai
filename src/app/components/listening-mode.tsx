import { useState, useEffect } from "react";
import { Mic, Pause, X, Check } from "lucide-react";
import { motion } from "motion/react";

interface ListeningModeProps {
  onNavigate: (screen: string) => void;
}

export function ListeningMode({ onNavigate }: ListeningModeProps) {
  const [isRecording, setIsRecording] = useState(true);
  const [transcription, setTranscription] = useState("");

  // Simulate real-time transcription
  useEffect(() => {
    if (!isRecording) return;

    const texts = [
      "Paciente João Oliveira, 45 anos...",
      "Queixa principal: dor torácica há 2 horas...",
      "Início súbito, irradiando para membro superior esquerdo...",
      "Paciente refere náuseas e sudorese...",
      "Histórico de hipertensão arterial controlada...",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < texts.length) {
        setTranscription((prev) => (prev ? prev + " " : "") + texts[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isRecording]);

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
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <p className="text-white font-medium">
            {isRecording ? "Gravando..." : "Pausado"}
          </p>
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
            onClick={() => setIsRecording(!isRecording)}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isRecording ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>

          <button
            onClick={() => onNavigate("soap")}
            className="w-20 h-20 bg-[#00C853] rounded-full flex items-center justify-center shadow-lg hover:bg-[#00B347] transition-colors"
          >
            <Check className="w-10 h-10 text-white" />
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
