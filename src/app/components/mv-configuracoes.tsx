import { Home, Users, MessageSquare, Settings, Menu, X, Calendar, Bell, Search, User, CreditCard, Lock, Zap, Palette, HelpCircle, Upload, ChevronRight } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import imgMVLogo from "figma:asset/f07ce0ef45a6df48f6c586d9ef7ccd7274d5089a.png";
import { useState } from "react";
import { SofyaFloating } from "@/app/components/sofya-floating";

interface MVConfiguracoesProps {
  onNavigate: (screen: string) => void;
}

export function MVConfiguracoes({ onNavigate }: MVConfiguracoesProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("perfil");
  const [horarioAtendimento, setHorarioAtendimento] = useState(true);
  const [duracaoConsulta, setDuracaoConsulta] = useState("30");
  const [diasTrabalho, setDiasTrabalho] = useState({
    seg: true,
    ter: true,
    qua: true,
    qui: true,
    qui2: true,
    sex: true,
    sab: false,
  });

  const menuItems = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "conta", label: "Conta", icon: CreditCard },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "privacidade", label: "Privacidade", icon: Lock },
    { id: "integracoes", label: "Integrações", icon: Zap },
    { id: "aparencia", label: "Aparência", icon: Palette },
    { id: "ajuda", label: "Ajuda", icon: HelpCircle },
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
          <button className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white bg-[#008C77] rounded-lg transition-colors`}>
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1D21]">Configurações</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-[#706F6F] absolute left-3 top-1/2 -translate-y-1/2" />
                <Input 
                  placeholder="Buscar pacientes, prontuários..."
                  className="pl-10 w-80 bg-[#F5F7FA] border-transparent"
                />
              </div>
              <button className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center hover:bg-[#E8ECEF] transition-colors">
                <Bell className="w-5 h-5 text-[#706F6F]" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Settings Menu */}
              <div className="lg:col-span-1">
                <Card className="p-3 md:p-4 border-0 shadow-sm">
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-1 md:gap-2">
                    {menuItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                            activeSection === item.id
                              ? "bg-[#008C77] text-white"
                              : "text-[#1A1D21] hover:bg-[#F5F7FA] active:bg-[#E8ECEF]"
                          }`}
                        >
                          <IconComponent className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3 space-y-4 md:space-y-6">
                {activeSection === "perfil" && (
                  <>
                    {/* Profile Header */}
                    <Card className="p-4 md:p-6 border-0 shadow-sm">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                        <div className="relative flex-shrink-0">
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-[#214B63] rounded-full flex items-center justify-center">
                            <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
                          </div>
                          <button className="absolute bottom-0 right-0 bg-[#008C77] text-white p-2 rounded-full hover:bg-[#007461] active:bg-[#006B5D] transition-colors">
                            <Upload className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                        <div className="text-center md:text-left">
                          <h3 className="text-xl md:text-2xl font-bold text-[#1A1D21]">Dr. João Silva</h3>
                          <p className="text-[#706F6F] text-sm md:text-base">Cardiologia</p>
                          <button className="mt-2 px-4 py-2 bg-[#008C77] text-white rounded-lg text-xs md:text-sm font-medium hover:bg-[#007461] active:bg-[#006B5D] transition-colors">
                            Editar foto
                          </button>
                        </div>
                      </div>
                    </Card>

                    {/* Personal Information */}
                    <Card className="p-4 md:p-6 border-0 shadow-sm">
                      <h3 className="text-base md:text-lg font-bold text-[#1A1D21] mb-4">Informações Pessoais</h3>
                      <div className="space-y-3 md:space-y-4">
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-[#706F6F] mb-2">
                            Nome completo
                          </label>
                          <Input 
                            defaultValue="Dr. João Silva"
                            className="bg-white border-gray-300 text-sm md:text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-[#706F6F] mb-2">
                            Email
                          </label>
                          <Input 
                            defaultValue="joao.silva@clinical.com"
                            className="bg-white border-gray-300 text-sm md:text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-[#706F6F] mb-2">
                            Telefone
                          </label>
                          <Input 
                            defaultValue="(11) 98765-4321"
                            className="bg-white border-gray-300 text-sm md:text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-[#706F6F] mb-2">
                            CRM
                          </label>
                          <Input 
                            defaultValue="12345-SP"
                            className="bg-white border-gray-300 text-sm md:text-base"
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Work Preferences */}
                    <Card className="p-4 md:p-6 border-0 shadow-sm">
                      <h3 className="text-base md:text-lg font-bold text-[#1A1D21] mb-4">Preferências de Trabalho</h3>
                      
                      <div className="space-y-4 md:space-y-6">
                        {/* Horário de Atendimento */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#1A1D21] text-sm md:text-base">Horário de atendimento</p>
                          </div>
                          <button
                            onClick={() => setHorarioAtendimento(!horarioAtendimento)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                              horarioAtendimento ? "bg-[#008C77]" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                horarioAtendimento ? "translate-x-6" : ""
                              }`}
                            ></div>
                          </button>
                        </div>

                        {/* Duração padrão de consulta */}
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-[#706F6F] mb-2">
                            Duração padrão de consulta
                          </label>
                          <select
                            value={duracaoConsulta}
                            onChange={(e) => setDuracaoConsulta(e.target.value)}
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-white text-[#1A1D21] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#008C77]"
                          >
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="45">45 min</option>
                            <option value="60">60 min</option>
                          </select>
                        </div>

                        {/* Dias de trabalho */}
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-[#706F6F] mb-3">
                            Dias de trabalho
                          </label>
                          <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            {[
                              { key: "seg", label: "Seg" },
                              { key: "ter", label: "Ter" },
                              { key: "qua", label: "Qua" },
                              { key: "qui", label: "Qui" },
                              { key: "qui2", label: "Qui" },
                              { key: "sex", label: "Sex" },
                              { key: "sab", label: "Sáb" },
                            ].map((dia) => (
                              <button
                                key={dia.key}
                                onClick={() =>
                                  setDiasTrabalho({
                                    ...diasTrabalho,
                                    [dia.key]: !diasTrabalho[dia.key as keyof typeof diasTrabalho],
                                  })
                                }
                                className={`w-12 h-10 md:w-14 md:h-12 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                                  diasTrabalho[dia.key as keyof typeof diasTrabalho]
                                    ? "bg-[#008C77] text-white"
                                    : "bg-[#F5F7FA] text-[#706F6F] hover:bg-[#E8ECEF] active:bg-[#E0E4E8]"
                                }`}
                              >
                                {dia.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Digital Signature */}
                    <Card className="p-4 md:p-6 border-0 shadow-sm">
                      <h3 className="text-base md:text-lg font-bold text-[#1A1D21] mb-4">Assinatura Digital</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center">
                        <Upload className="w-10 h-10 md:w-12 md:h-12 text-[#706F6F] mx-auto mb-3" />
                        <p className="text-xs md:text-sm text-[#706F6F] mb-4">
                          Arraste ou clique para enviar sua assinatura digital
                        </p>
                      </div>
                      <button className="mt-4 w-full bg-[#008C77] text-white font-bold py-3 rounded-lg hover:bg-[#007461] active:bg-[#006B5D] transition-colors text-sm md:text-base">
                        Salvar Alterações
                      </button>
                    </Card>
                  </>
                )}

                {activeSection !== "perfil" && (
                  <Card className="p-8 md:p-12 border-0 shadow-sm text-center">
                    <Settings className="w-12 h-12 md:w-16 md:h-16 text-[#BDC3C7] mx-auto mb-4" />
                    <h3 className="text-lg md:text-xl font-bold text-[#1A1D21] mb-2">
                      {menuItems.find((item) => item.id === activeSection)?.label}
                    </h3>
                    <p className="text-sm md:text-base text-[#706F6F]">
                      Esta seção está em desenvolvimento
                    </p>
                  </Card>
                )}
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