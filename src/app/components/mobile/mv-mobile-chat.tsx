import { ArrowLeft, Mic, Send, FileText, BookOpen, CheckCircle2, Home, Users, MessageSquare, Menu } from "lucide-react";
import { useState } from "react";
import svgPaths from "@/imports/svg-quqbpcgsif";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";

interface MVMobileChatProps {
  onNavigate: (screen: string) => void;
}

// Sofya Logo Component
function SofyaIcon({ className = "w-8 h-8" }: { className?: string }) {
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

interface Message {
  type: "user" | "assistant";
  text: string;
  references?: Array<{ title: string; category: string }>;
  timestamp: string;
}

export function MVMobileChat({ onNavigate }: MVMobileChatProps) {
  const [messages] = useState<Message[]>([
    {
      type: "assistant",
      text: "Olá! Sou a Sofya, sua assistente clínica baseada em evidências. Como posso ajudá-lo?",
      timestamp: "14:30",
    },
    {
      type: "user",
      text: "Protocolo de sepse em idosos >65 anos?",
      timestamp: "14:32",
    },
    {
      type: "assistant",
      text: "Para manejo de sepse em idosos, seguindo Surviving Sepsis Campaign 2024:\n\n**Bundle da Primeira Hora:**\n• Culturas antes ATB\n• Lactato sérico\n• ATB amplo espectro\n• Ressuscitação 30ml/kg\n\n**Antibióticos:**\n• Piperacilina-tazobactam 4,5g 6/6h\n• Ajustar por função renal\n\n**Considerações:**\n• Maior risco disfunção orgânica\n• Atenção delirium\n• Avaliar fragilidade",
      references: [
        { title: "Surviving Sepsis Campaign 2024", category: "Guideline" },
        { title: "Sepse em Idosos - AMIB", category: "Consenso" },
      ],
      timestamp: "14:33",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const quickChips = [
    "Gerar Prescrição",
    "Ver Protocolo",
    "Copiar p/ PEP",
  ];

  return (
    <div className="relative w-[390px] h-[844px] bg-[#F5F7FA] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008C77] to-[#214B63] px-4 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => onNavigate("mobile-home")}
            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-2">
            <SofyaIcon className="w-full h-auto" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">Ask Sofya</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#35D3C7] rounded-full animate-pulse"></div>
              <span className="text-white/80 text-xs">Baseado em Evidências</span>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm text-xs">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Verificado
          </Badge>
        </div>
      </div>

      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-36">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "assistant" && (
                <div className="w-8 h-8 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-lg flex items-center justify-center flex-shrink-0 p-1.5">
                  <SofyaIcon className="w-full h-auto" />
                </div>
              )}

              <div
                className={`max-w-[280px] rounded-2xl p-4 ${
                  message.type === "user"
                    ? "bg-[#008C77] text-white"
                    : "bg-white border border-gray-100"
                }`}
              >
                <p
                  className={`text-sm leading-relaxed whitespace-pre-line ${
                    message.type === "user" ? "text-white" : "text-[#1A1D21]"
                  }`}
                >
                  {message.text}
                </p>

                {message.references && message.references.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#008C77] uppercase">
                      <BookOpen className="w-3 h-3" />
                      Referências
                    </div>
                    {message.references.map((ref, refIndex) => (
                      <div
                        key={refIndex}
                        className="bg-[#F5F7FA] rounded-lg p-2 text-xs"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-[#008C77] flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[#1A1D21] mb-0.5">
                              {ref.title}
                            </p>
                            <Badge
                              variant="outline"
                              className="bg-[#008C77]/5 text-[#008C77] border-[#008C77]/20 text-xs"
                            >
                              {ref.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-[#706F6F] mt-2">
                  {message.timestamp}
                </p>
              </div>

              {message.type === "user" && (
                <div className="w-8 h-8 bg-gradient-to-br from-[#214B63] to-[#008C77] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">DS</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="absolute bottom-24 left-0 right-0 px-4 pb-3 bg-gradient-to-t from-[#F5F7FA] to-transparent pt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickChips.map((chip, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-white border-2 border-[#008C77] text-[#008C77] rounded-lg text-sm font-medium whitespace-nowrap active:scale-95 transition-transform"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area - Voice First */}
      <div className="absolute bottom-14 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#F5F7FA] rounded-xl px-4 py-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite ou fale..."
              className="bg-transparent border-0 focus-visible:ring-0 px-0 h-auto text-sm p-0"
            />
          </div>
          {/* Voice Button - Larger and more prominent */}
          <button className="w-12 h-12 bg-[#008C77] rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
            <Mic className="w-6 h-6 text-white" />
          </button>
          <button className="w-12 h-12 bg-[#214B63] rounded-xl flex items-center justify-center active:scale-95 transition-transform">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-xs text-center text-[#706F6F] mt-2">
          Respostas baseadas em literatura médica comprovada
        </p>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-6 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
        <div className="grid grid-cols-4 h-14">
          <button
            onClick={() => onNavigate("mobile-home")}
            className="flex flex-col items-center justify-center gap-1"
          >
            <Home className="w-6 h-6 text-[#706F6F]" />
            <span className="text-xs text-[#706F6F]">Home</span>
          </button>
          <button
            onClick={() => onNavigate("mobile-patients")}
            className="flex flex-col items-center justify-center gap-1"
          >
            <Users className="w-6 h-6 text-[#706F6F]" />
            <span className="text-xs text-[#706F6F]">Pacientes</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <MessageSquare className="w-6 h-6 text-[#008C77]" />
            <span className="text-xs font-medium text-[#008C77]">Sofya</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <Menu className="w-6 h-6 text-[#706F6F]" />
            <span className="text-xs text-[#706F6F]">Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
