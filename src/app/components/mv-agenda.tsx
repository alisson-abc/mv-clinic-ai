import { ChevronLeft, ChevronRight, Plus, Search, Bell, Home, Users, MessageSquare, Settings, Menu, X, Calendar } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import imgMVLogo from "figma:asset/f07ce0ef45a6df48f6c586d9ef7ccd7274d5089a.png";
import { useState } from "react";
import { SofyaFloating } from "@/app/components/sofya-floating";

interface MVAgendaProps {
  onNavigate: (screen: string) => void;
}

export function MVAgenda({ onNavigate }: MVAgendaProps) {
  const [viewMode, setViewMode] = useState<"week" | "month" | "day">("week");
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 18)); // 18 de Janeiro, 2026
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 07:00 to 20:00

  const appointments = [
    {
      id: 1,
      patient: "Maria Silva",
      type: "Primeira Consulta",
      time: "08:00-09:00",
      date: "2026-01-18",
      status: "Confirmado",
      color: "bg-[#008C77]",
      textColor: "text-[#008C77]",
      hour: 8,
    },
    {
      id: 2,
      patient: "João Santos",
      type: "Retorno",
      time: "10:30-11:30",
      date: "2026-01-18",
      status: "Pendente",
      color: "bg-[#3498DB]",
      textColor: "text-[#3498DB]",
      hour: 10.5,
    },
    {
      id: 3,
      patient: "Ana Costa",
      type: "Rotina",
      time: "14:00-15:00",
      date: "2026-01-18",
      status: "Realizado",
      color: "bg-[#95A5A6]",
      textColor: "text-[#95A5A6]",
      hour: 14,
    },
  ];

  const upcomingAppointments = [
    { patient: "Pedro Alves", type: "Retorno", time: "16:00", avatar: "PA" },
    { patient: "Pedro Alves", type: "Retorno", time: "16:00", avatar: "PA" },
    { patient: "João Santos", type: "Retorno", time: "17:00", avatar: "JS" },
    { patient: "Ana Costa", type: "Retorno", time: "19:00", avatar: "AC" },
  ];

  // Calendar days for January 2026
  const calendarDays = [
    { day: 30, isCurrentMonth: false },
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
  ];

  const weekDays = ["18 Jan", "19 Jan", "20 Jan", "21 Jan", "22 Jan", "23 Jan", "24 Jan"];

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
          <button 
            onClick={() => onNavigate("chat")}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors`}
          >
            <MessageSquare className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Ask Sofya</span>}
          </button>
          <button className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white bg-[#008C77] rounded-lg transition-colors`}>
            <Calendar className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Agenda</span>}
          </button>
          <button className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors relative`}>
            <Bell className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Notificações</span>}
            {!isSidebarCollapsed && <Badge className="ml-auto bg-[#E74C3C] text-white border-0">5</Badge>}
            {isSidebarCollapsed && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#E74C3C] rounded-full flex items-center justify-center text-white text-xs font-bold">
                5
              </div>
            )}
          </button>
          <button className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors`}>
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
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1D21]">Agenda</h2>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:flex-initial">
                <Search className="w-5 h-5 text-[#706F6F] absolute left-3 top-1/2 -translate-y-1/2" />
                <Input 
                  placeholder="Buscar..."
                  className="pl-10 w-full md:w-80 bg-[#F5F7FA] border-transparent"
                />
              </div>
              <button className="hidden md:flex w-10 h-10 bg-[#F5F7FA] rounded-lg items-center justify-center hover:bg-[#E8ECEF] transition-colors">
                <Bell className="w-5 h-5 text-[#706F6F]" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Main Calendar Area */}
              <div className="lg:col-span-2">
                <Card className="p-4 md:p-6 border-0 shadow-sm">
                  {/* Calendar Controls */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-4 md:mb-6">
                    <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
                      <button className="p-2 hover:bg-[#F5F7FA] active:bg-[#E8ECEF] rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-[#706F6F]" />
                      </button>
                      <h3 className="text-base md:text-lg font-bold text-[#1A1D21]">18 de Janeiro, 2026</h3>
                      <button className="p-2 hover:bg-[#F5F7FA] active:bg-[#E8ECEF] rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5 text-[#706F6F]" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                      <button
                        onClick={() => setViewMode("week")}
                        className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                          viewMode === "week"
                            ? "bg-[#F5F7FA] text-[#1A1D21]"
                            : "text-[#706F6F] hover:bg-[#F5F7FA]"
                        }`}
                      >
                        Semana
                      </button>
                      <button
                        onClick={() => setViewMode("month")}
                        className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                          viewMode === "month"
                            ? "bg-[#F5F7FA] text-[#1A1D21]"
                            : "text-[#706F6F] hover:bg-[#F5F7FA]"
                        }`}
                      >
                        Mês
                      </button>
                      <button
                        onClick={() => setViewMode("day")}
                        className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                          viewMode === "day"
                            ? "bg-[#F5F7FA] text-[#1A1D21]"
                            : "text-[#706F6F] hover:bg-[#F5F7FA]"
                        }`}
                      >
                        Dia
                      </button>
                      <button className="px-3 md:px-4 py-2 bg-[#008C77] text-white rounded-lg text-xs md:text-sm font-medium hover:bg-[#007461] active:bg-[#006B5D] transition-colors whitespace-nowrap flex-shrink-0">
                        Hoje
                      </button>
                    </div>
                  </div>

                  {/* Week View */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Week Header */}
                    <div className="grid grid-cols-8 border-b border-gray-200">
                      <div className="p-3 bg-[#F5F7FA]"></div>
                      {weekDays.map((day, index) => (
                        <div
                          key={index}
                          className={`p-3 text-center text-sm font-medium ${
                            index === 0 ? "bg-[#008C77] text-white" : "bg-[#F5F7FA] text-[#1A1D21]"
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Time Slots */}
                    <div className="max-h-[600px] overflow-y-auto">
                      {hours.map((hour) => (
                        <div key={hour} className="grid grid-cols-8 border-b border-gray-200">
                          <div className="p-3 bg-[#F5F7FA] text-sm text-[#706F6F] font-medium">
                            {hour.toString().padStart(2, "0")}:00
                          </div>
                          {weekDays.map((_, dayIndex) => {
                            const appointment = appointments.find(
                              (apt) => apt.hour === hour && dayIndex === 0
                            );
                            
                            return (
                              <div
                                key={dayIndex}
                                className="p-2 min-h-[60px] hover:bg-[#F5F7FA] transition-colors border-r border-gray-200 last:border-r-0"
                              >
                                {appointment && (
                                  <div
                                    className={`${appointment.color}/10 border-l-4 ${appointment.color} rounded p-2 h-full`}
                                  >
                                    <p className={`text-xs font-bold ${appointment.textColor}`}>
                                      {appointment.patient} - {appointment.type}
                                    </p>
                                    <p className="text-xs text-[#706F6F] mt-1">{appointment.time}</p>
                                    <Badge
                                      className={`text-xs mt-2 ${
                                        appointment.status === "Confirmado"
                                          ? "bg-[#008C77] text-white border-0"
                                          : appointment.status === "Pendente"
                                          ? "bg-[#3498DB] text-white border-0"
                                          : "bg-[#95A5A6] text-white border-0"
                                      }`}
                                    >
                                      {appointment.status}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Nova Consulta Button */}
                <button className="mt-4 w-full bg-[#008C77] text-white font-bold py-3 rounded-lg hover:bg-[#007461] transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Nova Consulta
                </button>
              </div>

              {/* Sidebar */}
              <div className="col-span-1 space-y-6">
                {/* Próximas Consultas */}
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="text-lg font-bold text-[#1A1D21] mb-4">Próximas Consultas</h3>
                  <div className="space-y-3">
                    {upcomingAppointments.map((apt, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#214B63] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{apt.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#1A1D21]">{apt.patient}</p>
                          <p className="text-xs text-[#706F6F]">{apt.type}</p>
                        </div>
                        <p className="text-sm text-[#706F6F]">{apt.time}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Mini Calendar */}
                <Card className="p-6 border-0 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-1 hover:bg-[#F5F7FA] rounded transition-colors">
                      <ChevronLeft className="w-4 h-4 text-[#706F6F]" />
                    </button>
                    <h3 className="text-sm font-bold text-[#1A1D21]">Janeiro 2026</h3>
                    <button className="p-1 hover:bg-[#F5F7FA] rounded transition-colors">
                      <ChevronRight className="w-4 h-4 text-[#706F6F]" />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {["Se", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"].map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-[#706F6F] py-1">
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((item, index) => (
                      <button
                        key={index}
                        className={`aspect-square text-xs rounded-lg transition-colors ${
                          item.day === 18 && item.isCurrentMonth
                            ? "bg-[#008C77] text-white font-bold"
                            : item.isCurrentMonth
                            ? "text-[#1A1D21] hover:bg-[#F5F7FA]"
                            : "text-[#BDC3C7]"
                        }`}
                      >
                        {item.day}
                      </button>
                    ))}
                  </div>

                  {/* Week Numbers */}
                  <div className="mt-4 text-xs text-[#706F6F] space-y-1">
                    <div className="flex justify-between">
                      <span>38</span>
                      <span>40</span>
                      <span>46</span>
                      <span>47</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sofya Floating Assistant */}
      <SofyaFloating />
    </div>
  );
}