import { ArrowLeft, Search, Filter, Phone, Mail, Calendar, Mic, Home, Users, MessageSquare, Menu } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { useState } from "react";

interface MVMobilePatientsProps {
  onNavigate: (screen: string) => void;
}

export function MVMobilePatients({ onNavigate }: MVMobilePatientsProps) {
  const [swipedIndex, setSwipedIndex] = useState<number | null>(null);

  const patients = [
    {
      name: "Maria Silva",
      age: 45,
      room: "Leito 204 - UTI",
      status: "Crítico",
      time: "há 15 min",
      phone: "(11) 98765-4321",
    },
    {
      name: "João Santos",
      age: 62,
      room: "Leito 105 - Cardiologia",
      status: "Estável",
      time: "há 1h",
      phone: "(11) 97654-3210",
    },
    {
      name: "Ana Costa",
      age: 38,
      room: "Consultório 3",
      status: "Em tratamento",
      time: "há 2h",
      phone: "(11) 96543-2109",
    },
    {
      name: "Pedro Oliveira",
      age: 55,
      room: "Leito 301 - Neurologia",
      status: "Estável",
      time: "há 3h",
      phone: "(11) 95432-1098",
    },
    {
      name: "Juliana Mendes",
      age: 29,
      room: "Ex-Leito 208",
      status: "Alta",
      time: "há 5h",
      phone: "(11) 94321-0987",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Crítico":
        return "bg-[#E74C3C] text-white border-0";
      case "Estável":
        return "bg-[#008C77] text-white border-0";
      case "Em tratamento":
        return "bg-[#F5A623] text-white border-0";
      case "Alta":
        return "bg-[#706F6F] text-white border-0";
      default:
        return "bg-gray-200 text-gray-700 border-0";
    }
  };

  return (
    <div className="relative w-[390px] h-[844px] bg-[#F5F7FA] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate("mobile-home")}
            className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1D21]" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#1A1D21]">Meus Pacientes</h1>
            <p className="text-xs text-[#706F6F]">5 ativos</p>
          </div>
          <button className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center active:scale-95 transition-transform">
            <Filter className="w-5 h-5 text-[#706F6F]" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#706F6F] absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Buscar pacientes..."
            className="pl-10 bg-[#F5F7FA] border-transparent h-12 text-base"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 py-3 bg-white border-b border-gray-100 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <button className="px-4 py-2 bg-[#008C77] text-white rounded-lg text-sm font-medium whitespace-nowrap">
            Todos (5)
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-[#706F6F] rounded-lg text-sm font-medium whitespace-nowrap">
            Crítico (1)
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-[#706F6F] rounded-lg text-sm font-medium whitespace-nowrap">
            Estável (2)
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-[#706F6F] rounded-lg text-sm font-medium whitespace-nowrap">
            Tratamento (1)
          </button>
        </div>
      </div>

      {/* Patient List - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        <div className="space-y-3">
          {patients.map((patient, index) => (
            <div
              key={index}
              className="relative"
              onTouchStart={(e) => {
                const startX = e.touches[0].clientX;
                const handleTouchMove = (e: TouchEvent) => {
                  const currentX = e.touches[0].clientX;
                  const diff = startX - currentX;
                  if (diff > 50) {
                    setSwipedIndex(index);
                  } else if (diff < -50) {
                    setSwipedIndex(null);
                  }
                };
                const handleTouchEnd = () => {
                  document.removeEventListener("touchmove", handleTouchMove);
                  document.removeEventListener("touchend", handleTouchEnd);
                };
                document.addEventListener("touchmove", handleTouchMove);
                document.addEventListener("touchend", handleTouchEnd);
              }}
            >
              {/* Swipe Action Buttons (Background) */}
              {swipedIndex === index && (
                <div className="absolute right-0 top-0 bottom-0 flex gap-2 pr-4">
                  <button className="w-16 bg-[#008C77] rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </button>
                  <button className="w-16 bg-[#214B63] rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}

              {/* Patient Card */}
              <Card
                className={`p-4 border-0 shadow-sm transition-transform ${
                  swipedIndex === index ? "-translate-x-36" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {patient.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-base text-[#1A1D21] truncate">
                        {patient.name}
                      </h3>
                      {patient.status === "Crítico" && (
                        <div className="w-2 h-2 bg-[#E74C3C] rounded-full animate-pulse flex-shrink-0"></div>
                      )}
                    </div>
                    <Badge className={`${getStatusColor(patient.status)} text-xs mb-2`}>
                      {patient.status}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-[#706F6F]">
                      <span className="truncate">{patient.room}</span>
                      <span>•</span>
                      <span className="whitespace-nowrap">{patient.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Voice FAB */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => onNavigate("mobile-dictation")}
          className="relative w-16 h-16 bg-[#008C77] rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-transform"
        >
          <div className="absolute inset-0 rounded-full bg-[#008C77] opacity-30 animate-ping"></div>
          <Mic className="w-8 h-8 text-white relative z-10" />
        </button>
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
          <button className="flex flex-col items-center justify-center gap-1">
            <Users className="w-6 h-6 text-[#008C77]" />
            <span className="text-xs font-medium text-[#008C77]">Pacientes</span>
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
