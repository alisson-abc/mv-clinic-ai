import { MessageSquare, Mic, X, Keyboard, Square } from "lucide-react";
import { useState, useEffect } from "react";
import svgPaths from "@/imports/svg-quqbpcgsif";

// Sofya Logo Component
function SofyaIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 200.152 73.9452">
      <g>
        <path d={svgPaths.p2f16cb70} fill="#08194D" />
        <g>
          <path d={svgPaths.pd6cacc0} fill="#B55CAF" />
          <path d={svgPaths.p2f4f1300} fill="#35D3C7" />
          <path d={svgPaths.p32f02a80} fill="#365FD7" />
          <path d={svgPaths.p18b86280} fill="#0B4796" />
          <path d={svgPaths.p399c1080} fill="#0B4796" />
        </g>
      </g>
    </svg>
  );
}

// Waveform Animation Component - Mobile optimized
function VoiceWaveform() {
  const [bars, setBars] = useState<number[]>(Array(15).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(Array(15).fill(0).map(() => Math.random()));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-1.5 h-24 md:h-32">
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-2 rounded-full transition-all duration-100"
          style={{
            height: `${20 + height * 80}%`,
            background: `linear-gradient(to top, #008C77, #214B63)`,
            opacity: 0.6 + height * 0.4,
          }}
        />
      ))}
    </div>
  );
}

export function SofyaFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceState, setVoiceState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [transcript, setTranscript] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: "user" | "assistant"; text: string }>>([]);

  // Simulate voice interaction
  const handleVoiceToggle = () => {
    if (voiceState === "idle" || voiceState === "speaking") {
      setVoiceState("listening");
      setTranscript("");
      // Simulate STT
      setTimeout(() => {
        setTranscript("Como estão os exames da Dona Maria...");
        setTimeout(() => {
          setVoiceState("thinking");
          setTimeout(() => {
            setMessages([
              { type: "user", text: "Como estão os exames da Dona Maria do leito 204?" },
              {
                type: "assistant",
                text: "A Dona Maria de Lourdes apresenta uma melhora. A Troponina negativou nas últimas 12 horas e o Hemograma está estável. Porém, a Creatinina subiu levemente para 1.4, o que sugere atenção à hidratação.",
              },
            ]);
            setVoiceState("speaking");
            setTranscript("");
          }, 2000);
        }, 2000);
      }, 1000);
    } else if (voiceState === "listening") {
      setVoiceState("idle");
      setTranscript("");
    }
  };

  // Breathing animation for the orb
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        const orb = document.getElementById("sofya-orb");
        if (orb) {
          orb.classList.add("scale-110");
          setTimeout(() => orb.classList.remove("scale-110"), 500);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <>
      {/* The Orb - Floating Button */}
      <button
        id="sofya-orb"
        onClick={() => {
          setIsOpen(true);
        }}
        className={`
          fixed bottom-6 right-6 z-40
          w-16 h-16 rounded-full
          bg-gradient-to-br from-[#008C77] to-[#214B63]
          shadow-2xl
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          hover:scale-110 hover:shadow-[0_0_30px_rgba(0,140,119,0.5)]
          ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        <div className="relative">
          <SofyaIcon className="w-8 h-8" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#35D3C7] rounded-full animate-pulse"></div>
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* The Sheet - Voice Chat Modal - Mobile First */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center md:justify-end md:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="
              w-full md:w-[420px] 
              h-[92vh] md:h-[85vh] md:max-h-[700px]
              bg-[#1A1D21]/98 backdrop-blur-xl
              rounded-t-[24px] md:rounded-[24px]
              shadow-2xl
              border-t border-x md:border border-white/10
              overflow-hidden
              flex flex-col
            "
          >
            {/* Header - Fixed */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-full flex items-center justify-center p-2.5">
                  <SofyaIcon className="w-full h-auto" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Ask Sofya</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#35D3C7] rounded-full animate-pulse"></div>
                    <span className="text-white/60 text-xs">
                      {voiceState === "listening" && "Ouvindo..."}
                      {voiceState === "thinking" && "Processando..."}
                      {voiceState === "speaking" && "Respondendo..."}
                      {voiceState === "idle" && "Disponível"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors active:scale-95"
              >
                <X className="w-6 h-6 text-white/80" />
              </button>
            </div>

            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-full flex items-center justify-center mx-auto mb-4 p-4">
                    <SofyaIcon className="w-full h-auto" />
                  </div>
                  <p className="text-white/70 text-base px-4">
                    Olá! Estou aqui para ajudá-lo com informações clínicas baseadas em evidências.
                  </p>
                  <p className="text-white/40 text-sm mt-3">
                    Toque no microfone para começar
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[85%] rounded-2xl px-4 py-3.5
                        ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-[#008C77] to-[#214B63] text-white"
                            : "bg-white/10 text-white border border-white/10"
                        }
                      `}
                    >
                      <p className="text-[15px] leading-relaxed">{message.text}</p>
                      {message.type === "assistant" && (
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <div className="bg-white/10 rounded-xl p-3.5 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/60">Troponina</span>
                              <span className="text-base font-bold text-[#35D3C7]">0.01 ng/mL</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#008C77] to-[#35D3C7] rounded-full" style={{ width: "70%" }}></div>
                              </div>
                              <span className="text-xs font-semibold text-[#35D3C7]">-30%</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <button className="flex-1 px-3 py-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-xl text-xs font-medium text-white transition-colors">
                              Ver Exame Completo
                            </button>
                            <button className="flex-1 px-3 py-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-xl text-xs font-medium text-white transition-colors">
                              Ver Curva Renal
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Transcript Display */}
            {transcript && voiceState === "listening" && (
              <div className="px-5 py-3 bg-white/5 border-t border-white/10 flex-shrink-0">
                <p className="text-white/80 text-sm text-center italic">{transcript}</p>
              </div>
            )}

            {/* Voice Waveform Area */}
            {voiceState !== "idle" && !showKeyboard && (
              <div className="px-5 py-5 border-t border-white/10 flex-shrink-0">
                <VoiceWaveform />
                {voiceState === "thinking" && (
                  <div className="text-center mt-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-full flex items-center justify-center mx-auto mb-2 animate-spin p-3">
                      <SofyaIcon className="w-full h-auto" />
                    </div>
                    <p className="text-white/70 text-sm">Analisando prontuário...</p>
                  </div>
                )}
              </div>
            )}

            {/* Input Area - Fixed at bottom */}
            <div className="px-5 py-5 border-t border-white/10 flex-shrink-0 bg-[#1A1D21]">
              {showKeyboard ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Digite sua pergunta..."
                    className="flex-1 bg-white/10 text-white placeholder:text-white/40 px-4 py-3.5 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#008C77] text-base"
                  />
                  <button 
                    className="w-14 h-14 bg-gradient-to-r from-[#008C77] to-[#214B63] rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-6 h-6 text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-6 md:gap-8">
                  <button
                    onClick={() => setShowKeyboard(true)}
                    className="w-14 h-14 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center transition-all active:scale-95"
                    title="Modo texto"
                  >
                    <Keyboard className="w-7 h-7 text-white/60" />
                  </button>

                  <button
                    onClick={handleVoiceToggle}
                    className={`
                      w-20 h-20 rounded-full flex items-center justify-center
                      transition-all duration-300 shadow-xl active:scale-95
                      ${
                        voiceState === "listening"
                          ? "bg-[#E74C3C] hover:bg-[#C0392B] animate-pulse shadow-[0_0_30px_rgba(231,76,60,0.5)]"
                          : "bg-gradient-to-r from-[#008C77] to-[#214B63] hover:scale-105 shadow-[0_0_20px_rgba(0,140,119,0.4)]"
                      }
                    `}
                  >
                    {voiceState === "listening" ? (
                      <Square className="w-7 h-7 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-white" />
                    )}
                  </button>

                  <div className="w-14"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
