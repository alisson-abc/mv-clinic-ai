import { Home, Users, MessageSquare, Settings, Menu, X, Calendar, Bell, Send, Paperclip, Mic, CheckCircle2, BookOpen, FileText, ChevronRight } from "lucide-react";
import { useState } from "react";
import svgPaths from "@/imports/svg-quqbpcgsif";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import imgMVLogo from "figma:asset/f07ce0ef45a6df48f6c586d9ef7ccd7274d5089a.png";
import { SofyaFloating } from "@/app/components/sofya-floating";

interface MVChatSofyaProps {
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
  references?: Array<{ title: string; page: number; category: string }>;
  timestamp: string;
}

export function MVChatSofya({ onNavigate }: MVChatSofyaProps) {
  const [messages] = useState<Message[]>([
    {
      type: "assistant",
      text: "Olá, Dr. Silva! Sou a Sofya, sua assistente clínica baseada em evidências científicas. Como posso ajudá-lo hoje?",
      timestamp: "14:30",
    },
    {
      type: "user",
      text: "Qual é o protocolo atual para tratamento de sepse em pacientes com mais de 65 anos?",
      timestamp: "14:32",
    },
    {
      type: "assistant",
      text: "Para o manejo de sepse em pacientes idosos (>65 anos), seguindo o protocolo Surviving Sepsis Campaign 2024 com considerações geriátricas:\n\n**1. Reconhecimento Precoce**\n• qSOFA ≥ 2 ou SOFA ≥ 2 pontos\n• Atenção: idosos podem apresentar sintomas atípicos\n\n**2. Bundle da Primeira Hora (Golden Hour)**\n• Coleta de culturas (antes dos antibióticos)\n• Lactato sérico\n• Antibioticoterapia de amplo espectro\n• Ressuscitação volêmica: 30 ml/kg de cristaloides\n  - Atenção: ajustar volume em pacientes com IC\n\n**3. Antibioticoterapia Empírica**\n• Sem foco definido: Piperacilina-tazobactam 4,5g 6/6h + Vancomicina\n• Foco urinário: Ceftriaxona 2g/dia ou Piperacilina-tazobactam\n• Foco respiratório: Ceftriaxona + Azitromicina\n• Ajustar dose conforme função renal (comum em idosos)\n\n**4. Vasopressores**\n• Noradrenalina se PAM < 65 mmHg após ressuscitação\n• Alvo de PAM pode ser individualizado (considerar HAS prévia)\n\n**5. Controle do Foco Infeccioso**\n• Drenagem/desbridamento se indicado\n• Remoção de dispositivos invasivos\n\n**Considerações Especiais em Idosos:**\n• Maior risco de disfunção orgânica\n• Atenção à função renal e hepática\n• Risco aumentado de delirium\n• Avaliar fragilidade e objetivos de cuidado",
      references: [
        { title: "Surviving Sepsis Campaign 2024", page: 12, category: "Guideline Internacional" },
        { title: "Protocolo Sepse em Idosos - AMIB", page: 8, category: "Consenso Nacional" },
        { title: "Antimicrobial Therapy in Elderly", page: 23, category: "Revisão Sistemática" },
      ],
      timestamp: "14:33",
    },
    {
      type: "user",
      text: "Qual antibiótico é mais seguro em paciente com clearance de creatinina de 35 ml/min?",
      timestamp: "14:35",
    },
    {
      type: "assistant",
      text: "Para paciente com clearance de creatinina de 35 ml/min (Doença Renal Crônica Estágio 3B), as opções mais seguras com ajuste de dose são:\n\n**Opções Preferenciais:**\n\n**1. Ceftriaxona**\n• Dose: 1-2g/dia (não requer ajuste até ClCr >10)\n• Excreção biliar predominante\n• Excelente opção para foco urinário ou respiratório\n• Evitar em pacientes com doença hepática grave\n\n**2. Piperacilina-tazobactam (com ajuste)**\n• ClCr 20-40: 3,375g a cada 6h\n• Espectro amplo\n• Monitorar função renal durante uso\n\n**3. Meropenem (com ajuste)**\n• ClCr 26-50: 1g a cada 12h\n• Reservar para infecções graves/resistentes\n\n**Evitar ou Usar com Extrema Cautela:**\n• Aminoglicosídeos (gentamicina, amicacina) - nefrotóxicos\n• Vancomicina - ajustar dose e monitorar nível sérico\n• Fluoroquinolonas - ajustar dose\n\n**Recomendações Adicionais:**\n• Solicitar função renal basal e controles a cada 48-72h\n• Considerar interconsulta com nefrologista\n• Ajustar doses conforme evolução da função renal\n• Avaliar necessidade de hemodiálise se piora",
      references: [
        { title: "Drug Dosing in Renal Impairment - UpToDate", page: 45, category: "Base de Dados" },
        { title: "Antimicrobianos em Insuficiência Renal", page: 67, category: "Consenso Brasileiro" },
      ],
      timestamp: "14:36",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const quickPrompts = [
    "Protocolo de dor torácica",
    "Interações medicamentosas",
    "Diretrizes de hipertensão",
    "Manejo de diabetes tipo 2",
  ];

  return (
    <div className="flex h-screen bg-[#F5F7FA]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} 
        w-64 bg-[#214B63] flex flex-col fixed lg:static inset-y-0 left-0 z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        transition-all duration-300
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 bg-white">
          {!isSidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <img 
                src={imgMVLogo} 
                alt="MV Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-[#214B63] font-bold text-lg">ClinicAI</h1>
                <p className="text-[#706F6F] text-xs">by MV Tecnologia</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <img 
                src={imgMVLogo} 
                alt="MV Logo" 
                className="h-10 w-auto"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => onNavigate("dashboard")}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors`}
          >
            <Home className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Dashboard</span>}
          </button>
          <button 
            onClick={() => onNavigate("patients")}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors`}
          >
            <Users className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Pacientes</span>}
          </button>
          <button className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white bg-[#008C77] rounded-lg transition-colors`}>
            <MessageSquare className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Ask Sofya</span>}
          </button>
          <button 
            onClick={() => onNavigate("agenda")}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors`}
          >
            <Calendar className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Agenda</span>}
          </button>
          <button 
            onClick={() => onNavigate("notificacoes")}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors relative`}
          >
            <Bell className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Notificações</span>}
            {!isSidebarCollapsed && <Badge className="ml-auto bg-[#E74C3C] text-white border-0">5</Badge>}
            {isSidebarCollapsed && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#E74C3C] rounded-full flex items-center justify-center text-white text-xs font-bold">
                5
              </div>
            )}
          </button>
          <button 
            onClick={() => onNavigate("configuracoes")}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors`}
          >
            <Settings className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Configurações</span>}
          </button>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          {!isSidebarCollapsed ? (
            <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-[#008C77] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">DS</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Dr. Silva</p>
                <p className="text-white/60 text-xs">Cardiologia</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center px-4 py-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-[#008C77] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">DS</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#214B63] text-white p-2 rounded-full shadow-lg hover:bg-[#008C77] transition-colors"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop Collapse Toggle */}
      <button 
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="hidden lg:block fixed top-4 left-4 z-50 bg-[#214B63] text-white p-2 rounded-full shadow-lg hover:bg-[#008C77] transition-all"
        style={{
          left: isSidebarCollapsed ? '68px' : '244px',
          transition: 'left 0.3s ease'
        }}
      >
        <ChevronRight className={`w-5 h-5 transition-transform ${isSidebarCollapsed ? '' : 'rotate-180'}`} />
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#008C77] to-[#214B63] shadow-lg">
          <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex-1 flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                  <SofyaIcon className="w-full h-auto" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-bold text-white truncate">Ask Sofya</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-[#35D3C7] rounded-full animate-pulse flex-shrink-0"></div>
                    <span className="text-white/80 text-xs md:text-sm truncate">Baseado em Evidências Científicas</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">Verificado</span>
                  <span className="md:hidden">✓</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 md:gap-4 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "assistant" && (
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                    <SofyaIcon className="w-full h-auto" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] md:max-w-3xl ${
                    message.type === "user"
                      ? "bg-[#008C77] text-white"
                      : "bg-white border border-gray-100"
                  } rounded-2xl p-4 md:p-5 shadow-sm`}
                >
                  <p
                    className={`text-sm md:text-base leading-relaxed whitespace-pre-line ${
                      message.type === "user" ? "text-white" : "text-[#1A1D21]"
                    }`}
                  >
                    {message.text}
                  </p>

                  {message.references && message.references.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#008C77] uppercase tracking-wide">
                        <BookOpen className="w-4 h-4" />
                        Referências Científicas
                      </div>
                      <div className="space-y-2">
                        {message.references.map((ref, refIndex) => (
                          <div
                            key={refIndex}
                            className="bg-[#F5F7FA] rounded-lg p-3 hover:bg-[#E8ECEF] active:bg-[#E0E4E8] transition-colors cursor-pointer"
                          >
                            <div className="flex items-start gap-2 md:gap-3">
                              <FileText className="w-4 h-4 text-[#008C77] flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm font-bold text-[#1A1D21] mb-1 line-clamp-2">
                                  {ref.title}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-[#706F6F] flex-wrap">
                                  <span>Página {ref.page}</span>
                                  <span className="hidden md:inline">•</span>
                                  <Badge
                                    variant="outline"
                                    className="bg-[#008C77]/5 text-[#008C77] border-[#008C77]/20 text-xs"
                                  >
                                    {ref.category}
                                  </Badge>
                                </div>
                              </div>
                              <CheckCircle2 className="w-4 h-4 text-[#008C77] flex-shrink-0" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-[#706F6F] mt-3">
                    {message.timestamp}
                  </p>
                </div>

                {message.type === "user" && (
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-[#214B63] to-[#008C77] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">DS</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="px-4 md:px-6 lg:px-8 pb-3 md:pb-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-[#706F6F] uppercase tracking-wide mb-2 md:mb-3">
              Sugestões Rápidas
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:pb-0">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="px-3 md:px-4 py-2 bg-white border border-gray-200 text-[#1A1D21] rounded-lg text-xs md:text-sm font-medium hover:border-[#008C77] hover:text-[#008C77] active:bg-[#F5F7FA] transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end gap-3">
              <button className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center hover:bg-[#E8ECEF] transition-colors">
                <Paperclip className="w-5 h-5 text-[#706F6F]" />
              </button>
              <div className="flex-1 bg-[#F5F7FA] rounded-xl p-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite sua dúvida clínica baseada em evidências..."
                  className="bg-transparent border-0 focus-visible:ring-0 px-0"
                />
              </div>
              <button className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center hover:bg-[#E8ECEF] transition-colors">
                <Mic className="w-5 h-5 text-[#706F6F]" />
              </button>
              <button className="w-12 h-12 bg-[#008C77] rounded-lg flex items-center justify-center hover:bg-[#007A68] transition-colors shadow-lg">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-xs text-[#706F6F] mt-3 text-center">
              Todas as respostas são baseadas em literatura médica comprovada e protocolos atualizados
            </p>
          </div>
        </div>
      </div>

      {/* Sofya Floating Assistant */}
      <SofyaFloating />
    </div>
  );
}