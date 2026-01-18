import { Home, Users, MessageSquare, Settings, Bell, Calendar, Plus, TrendingUp, Activity, AlertTriangle, CheckCircle, Clock, ChevronRight, Menu, X, Search, Mic, FileText } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import imgMVLogo from "figma:asset/f07ce0ef45a6df48f6c586d9ef7ccd7274d5089a.png";
import svgPaths from "@/imports/svg-quqbpcgsif";
import { useState } from "react";
import { SofyaFloating } from "@/app/components/sofya-floating";

interface MVDashboardProps {
  onNavigate: (screen: string) => void;
}

// Sofya Logo Component
function SofyaLogo({ className = "w-16 h-16" }: { className?: string }) {
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

export function MVDashboard({ onNavigate }: MVDashboardProps) {
  const stats = [
    { label: "Consultas Hoje", value: "12", icon: Activity, trend: "+3 desde ontem" },
    { label: "Pacientes Ativos", value: "47", icon: Users, trend: "8 críticos" },
    { label: "Alertas Pendentes", value: "5", icon: Bell, trend: "2 urgentes" },
    { label: "Taxa de Resolução", value: "94%", icon: FileText, trend: "+2% vs mês anterior" },
  ];

  const recentPatients = [
    { name: "Maria Silva", age: 45, status: "Crítico", room: "Leito 204", lastUpdate: "há 15 min" },
    { name: "João Santos", age: 62, status: "Estável", room: "Leito 105", lastUpdate: "há 1h" },
    { name: "Ana Costa", age: 38, status: "Em tratamento", room: "Consultório 3", lastUpdate: "há 2h" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
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
          <button className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white bg-[#008C77] rounded-lg transition-colors`}>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#1A1D21]">Bem-vindo, Dr. Silva</h2>
                <p className="text-[#706F6F] text-xs md:text-sm mt-1">Terça, 18 de Janeiro de 2026</p>
              </div>
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="md:hidden w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center hover:bg-[#E8ECEF] transition-colors"
              >
                <Search className="w-5 h-5 text-[#706F6F]" />
              </button>
            </div>
            <div className={`flex items-center gap-3 ${showSearch ? 'block' : 'hidden md:flex'}`}>
              <div className="relative flex-1 md:flex-initial">
                <Search className="w-5 h-5 text-[#706F6F] absolute left-3 top-1/2 -translate-y-1/2" />
                <Input 
                  placeholder="Buscar pacientes..."
                  className="pl-10 w-full md:w-80 bg-[#F5F7FA] border-transparent"
                />
              </div>
              <button className="hidden md:flex w-10 h-10 bg-[#F5F7FA] rounded-lg items-center justify-center hover:bg-[#E8ECEF] transition-colors">
                <Bell className="w-5 h-5 text-[#706F6F]" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="p-4 md:p-6 lg:p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-4 md:p-5 lg:p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2 md:mb-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-[#008C77]/10' : 
                      index === 1 ? 'bg-[#214B63]/10' : 
                      index === 2 ? 'bg-[#E74C3C]/10' : 'bg-[#3498DB]/10'
                    }`}>
                      <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${
                        index === 0 ? 'text-[#008C77]' : 
                        index === 1 ? 'text-[#214B63]' : 
                        index === 2 ? 'text-[#E74C3C]' : 'text-[#3498DB]'
                      }`} />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1A1D21] mb-1">{stat.value}</h3>
                  <p className="text-xs md:text-sm text-[#706F6F] mb-1 md:mb-2">{stat.label}</p>
                  <p className="text-[10px] md:text-xs text-[#008C77] truncate">{stat.trend}</p>
                </Card>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Recent Patients */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-base md:text-lg font-bold text-[#1A1D21]">Pacientes Recentes</h3>
                    <button 
                      onClick={() => onNavigate("patients")}
                      className="text-xs md:text-sm text-[#008C77] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Ver todos <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {recentPatients.map((patient, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#F5F7FA] rounded-lg hover:bg-[#E8ECEF] active:bg-[#E0E4E8] transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#214B63] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-[#1A1D21] text-sm md:text-base truncate">{patient.name}</h4>
                            <Badge className={`text-[10px] md:text-xs flex-shrink-0 ${
                              patient.status === 'Crítico' ? 'bg-[#E74C3C] text-white border-0' :
                              patient.status === 'Estável' ? 'bg-[#008C77] text-white border-0' :
                              'bg-[#F5A623] text-white border-0'
                            }`}>
                              {patient.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-[#706F6F]">
                            <span>{patient.age} anos</span>
                            <span className="hidden md:inline">•</span>
                            <span className="hidden md:inline">{patient.room}</span>
                            <span>•</span>
                            <span className="truncate">{patient.lastUpdate}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#706F6F] flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ask Sofya Panel */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-xl shadow-lg p-5 md:p-6 text-white">
                  <div className="flex items-center justify-center mb-4">
                    <SofyaLogo className="w-16 md:w-20 h-auto" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-center mb-2">Ask Sofya</h3>
                  <p className="text-white/80 text-sm text-center mb-5 md:mb-6">
                    Assistente clínico baseado em evidências científicas
                  </p>
                  <button 
                    onClick={() => onNavigate("chat")}
                    className="w-full bg-white text-[#008C77] font-bold py-3 rounded-lg hover:bg-white/90 active:bg-white/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Iniciar Consulta
                  </button>
                  <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <div className="w-2 h-2 bg-[#35D3C7] rounded-full animate-pulse"></div>
                      Baseado em literatura médica comprovada
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

      {/* Sofya Floating Assistant */}
      <SofyaFloating />
    </div>
  );
}
