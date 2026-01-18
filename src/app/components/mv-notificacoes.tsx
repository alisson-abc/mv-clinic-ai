import { Home, Users, MessageSquare, Settings, Menu, X, Calendar, Bell, Search, AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import imgMVLogo from "figma:asset/f07ce0ef45a6df48f6c586d9ef7ccd7274d5089a.png";
import { useState } from "react";
import { SofyaFloating } from "@/app/components/sofya-floating";

interface MVNotificacoesProps {
  onNavigate: (screen: string) => void;
}

export function MVNotificacoes({ onNavigate }: MVNotificacoesProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"todas" | "nao-lidas" | "alertas" | "sistema">("todas");

  const notifications = [
    {
      id: 1,
      type: "critical",
      icon: AlertTriangle,
      iconBg: "bg-[#E74C3C]",
      iconColor: "text-white",
      borderColor: "border-l-[#E74C3C]",
      title: "Alerta Crítico: João Silva",
      description: "Paciente João Silva necessita atenção imediata. Sinais vitais alterados.",
      time: "Há 5 min",
      unread: true,
      actions: [
        { label: "Ver paciente", variant: "primary" },
        { label: "Ignorar", variant: "secondary" }
      ]
    },
    {
      id: 2,
      type: "info",
      icon: Info,
      iconBg: "bg-[#3498DB]",
      iconColor: "text-white",
      borderColor: "border-l-[#3498DB]",
      title: "Exame Disponível",
      description: "Resultados laboratoriais de Ana Costa estão prontos para revisão.",
      time: "Há 1 hora",
      unread: true,
      actions: [
        { label: "Revisar", variant: "primary" },
        { label: "Ver detalhes", variant: "secondary" }
      ]
    },
    {
      id: 3,
      type: "success",
      icon: CheckCircle,
      iconBg: "bg-[#008C77]",
      iconColor: "text-white",
      borderColor: "border-l-[#008C77]",
      title: "Consulta Confirmada",
      description: "Consulta com Maria Oliveira confirmada para amanhã às 10h.",
      time: "Há 2 horas",
      unread: false,
      actions: [
        { label: "Ver detalhes", variant: "secondary" }
      ]
    },
    {
      id: 4,
      type: "info",
      icon: Info,
      iconBg: "bg-[#3498DB]",
      iconColor: "text-white",
      borderColor: "border-l-[#3498DB]",
      title: "Atualização do Sistema",
      description: "Nova versão 2.5 do ClinicAI já disponível com melhorias de desempenho.",
      time: "Ontem",
      unread: false,
      actions: [
        { label: "Ver detalhes", variant: "secondary" }
      ]
    },
    {
      id: 5,
      type: "warning",
      icon: AlertCircle,
      iconBg: "bg-[#F39C12]",
      iconColor: "text-white",
      borderColor: "border-l-[#F39C12]",
      title: "Lembrete de Prescrição",
      description: "Prescrição de Carlos Almeida expira em 3 dias. Renovar?",
      time: "Ontem",
      unread: false,
      actions: [
        { label: "Renovar", variant: "primary" },
        { label: "Ignorar", variant: "secondary" }
      ]
    }
  ];

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === "nao-lidas") return notif.unread;
    if (activeTab === "alertas") return notif.type === "critical" || notif.type === "warning";
    if (activeTab === "sistema") return notif.title.toLowerCase().includes("sistema") || notif.title.toLowerCase().includes("atualização");
    return true;
  });

  const unreadCount = notifications.filter(n => n.unread).length;
  const alertCount = notifications.filter(n => n.type === "critical" || n.type === "warning").length;

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
          <button 
            onClick={() => onNavigate("agenda")}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors`}
          >
            <Calendar className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Agenda</span>}
          </button>
          <button className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white bg-[#008C77] rounded-lg transition-colors relative`}>
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
        <MessageSquare className={`w-5 h-5 transition-transform ${isSidebarCollapsed ? '' : 'rotate-180'}`} />
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1D21]">Notificações</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-[#706F6F] absolute left-3 top-1/2 -translate-y-1/2" />
                <Input 
                  placeholder="Buscar pacientes, prontuários..."
                  className="pl-10 w-80 bg-[#F5F7FA] border-transparent"
                />
              </div>
              <button className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center hover:bg-[#E8ECEF] transition-colors relative">
                <Bell className="w-5 h-5 text-[#706F6F]" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#E74C3C] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {unreadCount}
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
              {/* Tabs and Actions */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                  <button
                    onClick={() => setActiveTab("todas")}
                    className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === "todas"
                        ? "border-[#008C77] text-[#008C77]"
                        : "border-transparent text-[#706F6F] hover:text-[#1A1D21]"
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setActiveTab("nao-lidas")}
                    className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === "nao-lidas"
                        ? "border-[#008C77] text-[#008C77]"
                        : "border-transparent text-[#706F6F] hover:text-[#1A1D21]"
                    }`}
                  >
                    Não lidas
                  </button>
                  <button
                    onClick={() => setActiveTab("alertas")}
                    className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === "alertas"
                        ? "border-[#008C77] text-[#008C77]"
                        : "border-transparent text-[#706F6F] hover:text-[#1A1D21]"
                    }`}
                  >
                    Alertas
                  </button>
                  <button
                    onClick={() => setActiveTab("sistema")}
                    className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === "sistema"
                        ? "border-[#008C77] text-[#008C77]"
                        : "border-transparent text-[#706F6F] hover:text-[#1A1D21]"
                    }`}
                  >
                    Sistema
                  </button>
                </div>
                <button className="text-[#008C77] text-xs md:text-sm font-medium hover:underline text-left md:text-right">
                  Marcar todas como lidas
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 mb-4 md:mb-6">
                <div className="text-xs md:text-sm">
                  <span className="text-[#706F6F]">Não lidas: </span>
                  <span className="font-bold text-[#1A1D21]">{unreadCount}</span>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="text-[#706F6F]">Alertas pendentes: </span>
                  <span className="font-bold text-[#E74C3C]">{alertCount}</span>
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-3 md:space-y-4">
                {filteredNotifications.map((notif) => {
                  const IconComponent = notif.icon;
                  return (
                    <Card key={notif.id} className={`p-4 md:p-6 border-0 shadow-sm border-l-4 ${notif.borderColor} ${notif.unread ? 'bg-white' : 'bg-[#F5F7FA]'}`}>
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 ${notif.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${notif.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-[#1A1D21] mb-1 text-sm md:text-base truncate">{notif.title}</h3>
                              <p className="text-xs md:text-sm text-[#706F6F] line-clamp-2 md:line-clamp-none">{notif.description}</p>
                            </div>
                            {notif.unread && (
                              <div className="w-2 h-2 bg-[#008C77] rounded-full flex-shrink-0 ml-3 mt-2"></div>
                            )}
                          </div>
                          <p className="text-xs text-[#706F6F] mb-3 md:mb-4">{notif.time}</p>
                          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                            {notif.actions.map((action, idx) => (
                              <button
                                key={idx}
                                className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                                  action.variant === "primary"
                                    ? "bg-[#008C77] text-white hover:bg-[#007461] active:bg-[#006B5D]"
                                    : "bg-transparent text-[#706F6F] hover:bg-[#F5F7FA] active:bg-[#E8ECEF] border border-gray-300"
                                }`}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {filteredNotifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-[#BDC3C7] mx-auto mb-4" />
                  <p className="text-[#706F6F]">Nenhuma notificação encontrada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sofya Floating Assistant */}
      <SofyaFloating />
    </div>
  );
}