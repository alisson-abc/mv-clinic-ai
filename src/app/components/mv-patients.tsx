import { Search, Filter, Phone, Mail, Calendar, Grid, List, ChevronRight, Home, Users, MessageSquare, Settings, Menu, X, Bell } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import imgMVLogo from "figma:asset/f07ce0ef45a6df48f6c586d9ef7ccd7274d5089a.png";
import { useState } from "react";
import { SofyaFloating } from "@/app/components/sofya-floating";

interface MVPatientsProps {
  onNavigate: (screen: string) => void;
}

export function MVPatients({ onNavigate }: MVPatientsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const patients = [
    {
      name: "Maria Silva",
      age: 45,
      gender: "F",
      status: "Crítico",
      room: "Leito 204 - UTI",
      diagnosis: "Síndrome Coronariana Aguda",
      doctor: "Dr. Silva",
      lastUpdate: "há 15 min",
      phone: "(11) 98765-4321",
    },
    {
      name: "João Santos",
      age: 62,
      gender: "M",
      status: "Estável",
      room: "Leito 105 - Cardiologia",
      diagnosis: "Hipertensão Arterial",
      doctor: "Dr. Silva",
      lastUpdate: "há 1h",
      phone: "(11) 97654-3210",
    },
    {
      name: "Ana Costa",
      age: 38,
      gender: "F",
      status: "Em tratamento",
      room: "Consultório 3",
      diagnosis: "Diabetes Mellitus Tipo 2",
      doctor: "Dr. Silva",
      lastUpdate: "há 2h",
      phone: "(11) 96543-2109",
    },
    {
      name: "Pedro Oliveira",
      age: 55,
      gender: "M",
      status: "Estável",
      room: "Leito 301 - Neurologia",
      diagnosis: "AVC Isquêmico",
      doctor: "Dr. Silva",
      lastUpdate: "há 3h",
      phone: "(11) 95432-1098",
    },
    {
      name: "Juliana Mendes",
      age: 29,
      gender: "F",
      status: "Alta",
      room: "Ex-Leito 208",
      diagnosis: "Pneumonia",
      doctor: "Dr. Silva",
      lastUpdate: "há 5h",
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
          <button className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white bg-[#008C77] rounded-lg transition-colors`}>
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
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6">
            <div className="mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-[#1A1D21]">Meus Pacientes</h1>
              <p className="text-[#706F6F] text-xs md:text-sm mt-1">Gestão completa de pacientes ativos</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-[#706F6F] absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Buscar por nome, diagnóstico..."
                  className="pl-10 bg-[#F5F7FA] border-transparent"
                />
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5F7FA] rounded-lg hover:bg-[#E8ECEF] active:bg-[#E0E4E8] transition-colors">
                  <Filter className="w-5 h-5 text-[#706F6F]" />
                  <span className="font-medium text-[#1A1D21] text-sm md:text-base">Filtros</span>
                </button>
                <div className="flex items-center gap-2 bg-[#F5F7FA] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-white shadow-sm"
                        : "hover:bg-white/50"
                    }`}
                  >
                    <List className="w-5 h-5 text-[#1A1D21]" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid"
                        ? "bg-white shadow-sm"
                        : "hover:bg-white/50"
                    }`}
                  >
                    <Grid className="w-5 h-5 text-[#1A1D21]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Filters */}
          <div className="px-4 md:px-6 lg:px-8 pb-4 overflow-x-auto">
            <div className="flex items-center gap-2 md:gap-3 min-w-max">
              <button className="px-4 py-2 bg-[#008C77] text-white rounded-lg font-medium text-sm whitespace-nowrap">
                Todos (5)
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-[#706F6F] rounded-lg font-medium text-sm hover:border-[#008C77] hover:text-[#008C77] transition-colors whitespace-nowrap">
                Crítico (1)
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-[#706F6F] rounded-lg font-medium text-sm hover:border-[#008C77] hover:text-[#008C77] transition-colors whitespace-nowrap">
                Estável (2)
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-[#706F6F] rounded-lg font-medium text-sm hover:border-[#008C77] hover:text-[#008C77] transition-colors whitespace-nowrap">
                Em tratamento (1)
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-[#706F6F] rounded-lg font-medium text-sm hover:border-[#008C77] hover:text-[#008C77] transition-colors whitespace-nowrap">
                Alta (1)
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-24">
          {viewMode === "list" ? (
            <div className="space-y-3 md:space-y-4">
              {patients.map((patient, index) => (
                <Card
                  key={index}
                  className="p-4 md:p-6 border-0 shadow-sm hover:shadow-md active:shadow-lg transition-all cursor-pointer"
                  onClick={() => onNavigate("patient-profile")}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg md:text-xl">
                        {patient.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                        <h3 className="text-base md:text-lg font-bold text-[#1A1D21]">{patient.name}</h3>
                        <Badge className={`${getStatusColor(patient.status)} text-xs`}>
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 text-sm">
                        <div>
                          <p className="text-[#706F6F] text-xs mb-1">Idade/Sexo</p>
                          <p className="text-[#1A1D21] font-medium text-sm">
                            {patient.age} anos • {patient.gender}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#706F6F] text-xs mb-1">Localização</p>
                          <p className="text-[#1A1D21] font-medium text-sm truncate">{patient.room}</p>
                        </div>
                        <div>
                          <p className="text-[#706F6F] text-xs mb-1">Diagnóstico</p>
                          <p className="text-[#1A1D21] font-medium text-sm truncate">{patient.diagnosis}</p>
                        </div>
                        <div>
                          <p className="text-[#706F6F] text-xs mb-1">Última atualização</p>
                          <p className="text-[#1A1D21] font-medium text-sm">{patient.lastUpdate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end">
                      <button className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center hover:bg-[#008C77] active:bg-[#006B5D] hover:text-white transition-colors group">
                        <Phone className="w-5 h-5 text-[#706F6F] group-hover:text-white" />
                      </button>
                      <button className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center hover:bg-[#008C77] active:bg-[#006B5D] hover:text-white transition-colors group">
                        <Mail className="w-5 h-5 text-[#706F6F] group-hover:text-white" />
                      </button>
                      <button className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center hover:bg-[#008C77] active:bg-[#006B5D] hover:text-white transition-colors group">
                        <Calendar className="w-5 h-5 text-[#706F6F] group-hover:text-white" />
                      </button>
                      <ChevronRight className="w-5 h-5 text-[#706F6F] ml-2 hidden md:block" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {patients.map((patient, index) => (
                <Card
                  key={index}
                  className="p-5 md:p-6 border-0 shadow-sm hover:shadow-lg active:shadow-xl transition-all cursor-pointer"
                  onClick={() => onNavigate("patient-profile")}
                >
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-full flex items-center justify-center mb-3">
                      <span className="text-white font-bold text-2xl">
                        {patient.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[#1A1D21] mb-2">
                      {patient.name}
                    </h3>
                    <Badge className={`${getStatusColor(patient.status)} text-xs`}>
                      {patient.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#706F6F] text-xs">Idade</span>
                      <span className="text-[#1A1D21] font-medium text-sm">{patient.age} anos</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#706F6F] text-xs">Localização</span>
                      <span className="text-[#1A1D21] font-medium text-sm text-right truncate ml-2">{patient.room}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-[#706F6F] text-xs block mb-1">Diagnóstico</span>
                      <span className="text-[#1A1D21] font-medium text-sm line-clamp-2">{patient.diagnosis}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 py-2.5 bg-[#F5F7FA] rounded-lg flex items-center justify-center gap-2 hover:bg-[#008C77] active:bg-[#006B5D] hover:text-white transition-colors group">
                      <Phone className="w-4 h-4 text-[#706F6F] group-hover:text-white" />
                    </button>
                    <button className="flex-1 py-2.5 bg-[#F5F7FA] rounded-lg flex items-center justify-center gap-2 hover:bg-[#008C77] active:bg-[#006B5D] hover:text-white transition-colors group">
                      <Mail className="w-4 h-4 text-[#706F6F] group-hover:text-white" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sofya Floating Assistant */}
      <SofyaFloating />
    </div>
  );
}