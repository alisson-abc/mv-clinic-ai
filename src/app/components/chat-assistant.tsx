import { useState } from "react";
import { ArrowLeft, Send, Paperclip, CheckCircle2 } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";

interface ChatAssistantProps {
  onNavigate: (screen: string) => void;
}

interface Message {
  type: "user" | "assistant";
  text: string;
  references?: Array<{ title: string; page: number }>;
}

export function ChatAssistant({ onNavigate }: ChatAssistantProps) {
  const [messages] = useState<Message[]>([
    {
      type: "assistant",
      text: "Olá, Dr. Silva! Como posso ajudá-lo hoje?",
    },
    {
      type: "user",
      text: "Qual é o protocolo atual para tratamento de sepse?",
    },
    {
      type: "assistant",
      text: "Para o manejo de sepse, seguindo o protocolo Surviving Sepsis Campaign 2024:\n\n1. Reconhecimento precoce (qSOFA ≥ 2 ou SOFA ≥ 2)\n2. Coleta de culturas antes de antibióticos\n3. Antibioticoterapia de amplo espectro na primeira hora\n4. Ressuscitação volêmica inicial com 30 ml/kg de cristaloides\n5. Controle do foco infeccioso\n6. Uso de vasopressores se hipotensão persistir (alvo PAM ≥ 65 mmHg)\n\nÉ fundamental iniciar o tratamento na primeira hora (golden hour).",
      references: [
        { title: "Protocolo Sepse 2024", page: 12 },
        { title: "Surviving Sepsis Campaign", page: 8 },
      ],
    },
    {
      type: "user",
      text: "Qual o antibiótico de primeira escolha?",
    },
    {
      type: "assistant",
      text: "A escolha do antibiótico depende do foco infeccioso e do perfil de resistência local, mas as recomendações gerais incluem:\n\n• Sepse sem foco definido: Piperacilina-tazobactam + Vancomicina\n• Sepse de origem urinária: Ceftriaxona ou Piperacilina-tazobactam\n• Sepse respiratória: Ceftriaxona + Azitromicina\n• Sepse abdominal: Piperacilina-tazobactam ou Meropenem\n\nSempre considere o antibiograma local e ajuste conforme culturas.",
      references: [{ title: "Protocolo Antibioticoterapia Empírica", page: 23 }],
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("dashboard")}
            className="w-10 h-10 bg-[#F4F6F8] rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-[#1A1A1A]">
              Ask Sofya AI
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
              <span className="text-xs text-[#5E6C84]">
                Baseado em Evidência
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] ${
                message.type === "user"
                  ? "bg-[#0056D2] text-white"
                  : "bg-white border border-gray-200"
              } rounded-2xl p-4`}
            >
              <p
                className={`text-sm leading-relaxed ${
                  message.type === "user" ? "text-white" : "text-[#1A1A1A]"
                } whitespace-pre-line`}
              >
                {message.text}
              </p>

              {message.references && message.references.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                  <p className="text-xs font-medium text-[#5E6C84] mb-2">
                    Referências:
                  </p>
                  {message.references.map((ref, refIndex) => (
                    <Badge
                      key={refIndex}
                      variant="outline"
                      className="mr-2 bg-[#0056D2]/5 text-[#0056D2] border-[#0056D2]/20 text-xs"
                    >
                      {ref.title} • pág {ref.page}
                    </Badge>
                  ))}
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle2 className="w-3 h-3 text-[#00C853]" />
                    <span className="text-xs text-[#00C853]">Verificado</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-[#F4F6F8] rounded-full flex items-center justify-center">
            <Paperclip className="w-5 h-5 text-[#5E6C84]" />
          </button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua dúvida clínica..."
            className="flex-1 border-gray-200"
          />
          <button className="w-10 h-10 bg-[#0056D2] rounded-full flex items-center justify-center hover:bg-[#0047B3] transition-colors">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
