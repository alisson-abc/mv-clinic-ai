import { Mic, FileText, Camera, MessageSquare, User } from "lucide-react";
import { Card } from "@/app/components/ui/card";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const recentPatients = [
    { name: "Maria Silva", room: "Leito 204", time: "10:30" },
    { name: "João Santos", room: "Leito 105", time: "09:15" },
    { name: "Ana Costa", room: "Consultório 3", time: "08:45" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#1A1A1A]">
              Olá, Dr. Silva
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-[#00C853] rounded-full"></div>
              <span className="text-sm text-[#5E6C84]">Online</span>
            </div>
          </div>
          <button className="w-10 h-10 bg-[#F4F6F8] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[#5E6C84]" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pt-8 pb-24">
        {/* Hero Action - FAB */}
        <div className="mb-8 text-center">
          <button
            onClick={() => onNavigate("listening")}
            className="w-24 h-24 bg-[#0056D2] rounded-full shadow-lg flex items-center justify-center mx-auto hover:bg-[#0047B3] transition-colors"
          >
            <Mic className="w-12 h-12 text-white" />
          </button>
          <p className="mt-4 text-sm font-medium text-[#1A1A1A]">
            Ditado Imediato
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#5E6C84] mb-4 uppercase tracking-wide">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate("prescription")}
              className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-[#00C853]/10 rounded-full flex items-center justify-center">
                <FileText className="w-7 h-7 text-[#00C853]" />
              </div>
              <span className="text-xs font-medium text-[#1A1A1A] text-center">
                Nova Prescrição
              </span>
            </button>

            <button
              onClick={() => onNavigate("scanner")}
              className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-[#0056D2]/10 rounded-full flex items-center justify-center">
                <Camera className="w-7 h-7 text-[#0056D2]" />
              </div>
              <span className="text-xs font-medium text-[#1A1A1A] text-center">
                Ler Exame/Foto
              </span>
            </button>

            <button
              onClick={() => onNavigate("chat")}
              className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-[#0056D2]/10 rounded-full flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-[#0056D2]" />
              </div>
              <span className="text-xs font-medium text-[#1A1A1A] text-center">
                Dúvida Clínica
              </span>
            </button>
          </div>
        </div>

        {/* Recent Patients */}
        <div>
          <h2 className="text-sm font-semibold text-[#5E6C84] mb-4 uppercase tracking-wide">
            Pacientes Recentes
          </h2>
          <div className="space-y-3">
            {recentPatients.map((patient, index) => (
              <Card
                key={index}
                className="p-4 bg-white border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#1A1A1A]">
                      {patient.name}
                    </p>
                    <p className="text-sm text-[#5E6C84] mt-1">
                      {patient.room}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#5E6C84]">{patient.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
