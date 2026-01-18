import { Home, Users, MessageSquare, Menu, Mic, Activity, Bell, Calendar, FileText, Clock } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import svgPaths from "@/imports/svg-quqbpcgsif";

interface MVMobileHomeProps {
  onNavigate: (screen: string) => void;
}

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

export function MVMobileHome({ onNavigate }: MVMobileHomeProps) {
  const quickActions = [
    { icon: Users, label: "Pacientes", color: "#008C77", screen: "mobile-patients" },
    { icon: Bell, label: "Alertas", color: "#E74C3C", badge: "5" },
    { icon: Calendar, label: "Agenda", color: "#214B63" },
    { icon: FileText, label: "Exames", color: "#3498DB" },
  ];

  const recentPatients = [
    { name: "Maria Silva", room: "Leito 204", status: "Crítico", time: "15 min" },
    { name: "João Santos", room: "Leito 105", status: "Estável", time: "1h" },
    { name: "Ana Costa", room: "Consultório 3", status: "Em tratamento", time: "2h" },
  ];

  return (
    <div className="relative w-[390px] h-[844px] bg-[#F5F7FA] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[#214B63] px-4 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#008C77] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">DS</span>
          </div>
          <div>
            <p className="text-white text-base font-medium">Olá, Dr. Silva</p>
            <p className="text-white/60 text-xs">Terça, 18 Jan</p>
          </div>
        </div>
        <button className="relative w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <Bell className="w-5 h-5 text-white" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#E74C3C] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">5</span>
          </div>
        </button>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Ask Sofya Card */}
        <div className="px-4 pt-6 pb-4">
          <Card className="bg-gradient-to-br from-[#008C77] to-[#214B63] border-0 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                <SofyaIcon className="w-full h-auto" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">Ask Sofya</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-[#35D3C7] rounded-full animate-pulse"></div>
                  <p className="text-white/80 text-xs">Baseado em Evidências</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate("mobile-chat")}
              className="w-full bg-white text-[#008C77] font-bold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Iniciar Consulta
            </button>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="px-4 pb-4">
          <h3 className="text-xs font-bold text-[#706F6F] uppercase tracking-wide mb-3">Acesso Rápido</h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => action.screen && onNavigate(action.screen)}
                className="relative flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm active:scale-95 transition-transform"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <action.icon className="w-6 h-6" style={{ color: action.color }} />
                </div>
                <span className="text-xs font-medium text-[#1A1D21] text-center">{action.label}</span>
                {action.badge && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#E74C3C] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{action.badge}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-[#706F6F] uppercase tracking-wide">Pacientes Recentes</h3>
            <button 
              onClick={() => onNavigate("mobile-patients")}
              className="text-xs text-[#008C77] font-medium"
            >
              Ver todos
            </button>
          </div>
          <div className="space-y-3">
            {recentPatients.map((patient, index) => (
              <Card
                key={index}
                className="p-4 border-0 shadow-sm active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {patient.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-[#1A1D21] truncate">{patient.name}</h4>
                      <Badge className={`text-xs ${
                        patient.status === "Crítico" ? "bg-[#E74C3C] text-white border-0" :
                        patient.status === "Estável" ? "bg-[#008C77] text-white border-0" :
                        "bg-[#F5A623] text-white border-0"
                      }`}>
                        {patient.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#706F6F]">
                      <span>{patient.room}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        há {patient.time}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Voice FAB with Pulse Animation */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => onNavigate("mobile-dictation")}
          className="relative w-16 h-16 bg-[#008C77] rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-transform"
        >
          {/* Pulse Ring Animation */}
          <div className="absolute inset-0 rounded-full bg-[#008C77] opacity-30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-[#008C77] opacity-20 animate-pulse"></div>
          <Mic className="w-8 h-8 text-white relative z-10" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-6 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
        <div className="grid grid-cols-4 h-14">
          <button className="flex flex-col items-center justify-center gap-1">
            <Home className="w-6 h-6 text-[#008C77]" />
            <span className="text-xs font-medium text-[#008C77]">Home</span>
          </button>
          <button 
            onClick={() => onNavigate("mobile-patients")}
            className="flex flex-col items-center justify-center gap-1"
          >
            <Users className="w-6 h-6 text-[#706F6F]" />
            <span className="text-xs text-[#706F6F]">Pacientes</span>
          </button>
          <button 
            onClick={() => onNavigate("mobile-chat")}
            className="flex flex-col items-center justify-center gap-1"
          >
            <MessageSquare className="w-6 h-6 text-[#706F6F]" />
            <span className="text-xs text-[#706F6F]">Sofya</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <Menu className="w-6 h-6 text-[#706F6F]" />
            <span className="text-xs text-[#706F6F]">Menu</span>
          </button>
        </div>
      </div>

      {/* Add pulse animation styles */}
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}
