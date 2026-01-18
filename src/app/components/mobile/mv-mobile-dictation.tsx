import { X, Pause, FileText, Pill, Save } from "lucide-react";
import { useState } from "react";

interface MVMobileDictationProps {
  onNavigate: (screen: string) => void;
}

export function MVMobileDictation({ onNavigate }: MVMobileDictationProps) {
  const [isListening] = useState(true);

  // Simulated real-time transcription
  const transcription = "Paciente apresenta quadro de dor torácica há 2 horas, irradiada para membro superior esquerdo. Refere sudorese fria e dispneia associada. ECG com supradesnivelamento de ST em parede anterior...";

  return (
    <div className="relative w-[390px] h-[844px] bg-black/50 flex items-end">
      {/* Bottom Sheet */}
      <div className="w-full bg-white rounded-t-3xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#E8ECEF] rounded-full"></div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8">
          {/* Status Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E74C3C] rounded-full flex items-center justify-center animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1A1D21]">
                  {isListening ? "Ouvindo..." : "Pausado"}
                </h3>
                <p className="text-xs text-[#706F6F]">Ditado Médico em Tempo Real</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate("mobile-home")}
              className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center"
            >
              <X className="w-5 h-5 text-[#706F6F]" />
            </button>
          </div>

          {/* Waveform Visualization */}
          <div className="mb-6">
            <div className="flex items-end justify-center gap-1 h-24 px-4">
              {[...Array(30)].map((_, i) => {
                const height = isListening
                  ? Math.sin(i * 0.5 + Date.now() * 0.005) * 40 + 50
                  : 20;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-all duration-150"
                    style={{
                      height: `${height}%`,
                      background: `linear-gradient(to top, #008C77, #214B63)`,
                      opacity: isListening ? 1 : 0.3,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Real-time Transcription */}
          <div className="bg-[#F5F7FA] rounded-xl p-4 mb-6 min-h-[120px] max-h-[200px] overflow-y-auto">
            <p className="text-base leading-relaxed text-[#1A1D21]">
              {transcription}
              {isListening && (
                <span className="inline-block w-1 h-5 bg-[#008C77] ml-1 animate-blink"></span>
              )}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-[#008C77] text-[#008C77] rounded-lg font-medium active:scale-95 transition-transform">
              <FileText className="w-5 h-5" />
              Adicionar ao PEP
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-[#214B63] text-[#214B63] rounded-lg font-medium active:scale-95 transition-transform">
              <Pill className="w-5 h-5" />
              Prescrição
            </button>
          </div>

          {/* Primary Action */}
          <button className="w-full h-14 bg-[#008C77] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform mb-4">
            <Save className="w-5 h-5" />
            Inserir no Prontuário
          </button>

          {/* Secondary Actions */}
          <div className="flex items-center justify-center gap-6">
            <button className="flex items-center gap-2 text-[#214B63] font-medium">
              <Pause className="w-5 h-5" />
              Pausar
            </button>
            <button
              onClick={() => onNavigate("mobile-home")}
              className="text-[#E74C3C] font-medium"
            >
              Cancelar
            </button>
          </div>

          {/* Help Text */}
          <p className="text-xs text-center text-[#706F6F] mt-4">
            Fale naturalmente. A IA converterá sua fala em texto formatado automaticamente.
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}
