import { Check, X, ChevronRight, Mic, FileText, Camera, Brain, Menu, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import svgPaths from "@/imports/svg-quqbpcgsif";
import imgHeroMockup from "figma:asset/7a8b2a18419f4c7048626a669ed24847627ca153.png";
import imgFeatures from "figma:asset/0a6c547bb66feece9a6d3b3e7159931622370dae.png";
import imgComparison from "figma:asset/cbd769bd7cdcf50070d5ae41a7c00212d040c267.png";
import imgCTA from "figma:asset/2cbd9e50846757a3f904d1d76a328df257538add.png";
import imgMVLogo from "figma:asset/f07ce0ef45a6df48f6c586d9ef7ccd7274d5089a.png";
import { useState } from "react";

interface MVLandingProps {
  onNavigate: (screen: string) => void;
}

// Sofya Logo Component
function SofyaLogo({ className = "w-32 h-auto" }: { className?: string }) {
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

export function MVLanding({ onNavigate }: MVLandingProps) {
  const [pricingPeriod, setPricingPeriod] = useState<"monthly" | "annual">("monthly");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-lg bg-white/90">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img 
                src={imgMVLogo} 
                alt="MV Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-[#214B63]">ClinicAI</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#recursos" className="text-sm font-medium text-[#214B63] hover:text-[#008C77] transition-colors">
                Recursos
              </a>
              <a href="#precos" className="text-sm font-medium text-[#214B63] hover:text-[#008C77] transition-colors">
                Preços
              </a>
              <a href="#sobre" className="text-sm font-medium text-[#214B63] hover:text-[#008C77] transition-colors">
                Sobre
              </a>
              <a href="#blog" className="text-sm font-medium text-[#214B63] hover:text-[#008C77] transition-colors">
                Blog
              </a>
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => onNavigate("dashboard")}
                className="px-4 py-2 text-sm font-medium text-[#214B63] border border-[#214B63] rounded-lg hover:bg-[#214B63] hover:text-white transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate("dashboard")}
                className="px-4 py-2 text-sm font-medium text-white bg-[#008C77] rounded-lg hover:bg-[#007A68] transition-colors"
              >
                Comece Grátis
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-[#214B63]" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <a href="#recursos" className="block text-sm font-medium text-[#214B63] py-2">
                Recursos
              </a>
              <a href="#precos" className="block text-sm font-medium text-[#214B63] py-2">
                Preços
              </a>
              <a href="#sobre" className="block text-sm font-medium text-[#214B63] py-2">
                Sobre
              </a>
              <button
                onClick={() => onNavigate("dashboard")}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-[#008C77] rounded-lg"
              >
                Comece Grátis
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#214B63] via-[#1A3A4D] to-[#1A1D21] overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#008C77]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#35D3C7]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="text-white">
              <Badge className="bg-[#008C77]/20 text-[#35D3C7] border-[#008C77] mb-6 text-sm">
                🚀 Novo: Ditado por Voz com IA
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                IA Clínica Baseada
                <br />
                em Evidências
              </h1>

              <h2 className="text-2xl text-white/80 mb-6 font-light">
                Pare de copiar e colar.
                <br />
                Comece a prescrever.
              </h2>

              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                O assistente clínico que entende seu prontuário, verifica evidências científicas
                e economiza <span className="text-[#35D3C7] font-bold">2 horas</span> do seu dia.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => onNavigate("dashboard")}
                  className="px-8 py-4 bg-[#008C77] text-white font-bold rounded-lg hover:bg-[#007A68] transition-all shadow-lg hover:shadow-xl"
                >
                  Comece Grátis
                </button>
                <button className="px-8 py-4 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                  Ver demonstração
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#008C77]" />
                  Integração MV
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#008C77]" />
                  LGPD Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#008C77]" />
                  Sem cartão
                </div>
              </div>
            </div>

            {/* Right - Mockup */}
            <div className="relative">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <img
                  src={imgHeroMockup}
                  alt="Dashboard ClinicAI"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
              {/* Sofya Mascot */}
              <div className="absolute -bottom-10 -left-10 z-20 animate-bounce">
                <div className="bg-white p-4 rounded-2xl shadow-xl">
                  <SofyaLogo className="w-24 h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <p className="text-[#706F6F] font-medium">
              Usado por médicos em <span className="text-[#008C77] font-bold">+50 hospitais</span>
            </p>
            <div className="flex items-center gap-6 opacity-50">
              <div className="w-24 h-8 bg-[#214B63]/10 rounded"></div>
              <div className="w-24 h-8 bg-[#214B63]/10 rounded"></div>
              <div className="w-24 h-8 bg-[#214B63]/10 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#214B63] mb-4">
              Por que trocar o ChatGPT?
            </h2>
            <p className="text-lg text-[#706F6F]">
              De IA genérica para IA clínica verticalizada
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* ChatGPT - Problemas */}
            <Card className="p-8 bg-[#F5F7FA] border-gray-200">
              <h3 className="text-2xl font-bold text-[#706F6F] mb-8 text-center">
                ChatGPT
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#E74C3C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <X className="w-6 h-6 text-[#E74C3C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1D21] mb-2">ALUCINAÇÃO</h4>
                    <p className="text-sm text-[#706F6F]">
                      Inventa referências médicas de forma convincente
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#E74C3C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <X className="w-6 h-6 text-[#E74C3C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1D21] mb-2">COPY-PASTE MANUAL</h4>
                    <p className="text-sm text-[#706F6F]">
                      Copiar do prontuário → Colar no chat → Copiar resposta
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#E74C3C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <X className="w-6 h-6 text-[#E74C3C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1D21] mb-2">GENERALISTA</h4>
                    <p className="text-sm text-[#706F6F]">
                      Treinado em toda a internet, não em medicina
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#E74C3C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <X className="w-6 h-6 text-[#E74C3C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1D21] mb-2">SEM AUDITORIA</h4>
                    <p className="text-sm text-[#706F6F]">
                      Desconectado do fluxo de trabalho
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* ClinicAI - Soluções */}
            <Card className="p-8 bg-[#008C77]/5 border-[#008C77]">
              <h3 className="text-2xl font-bold text-[#008C77] mb-8 text-center">
                ClinicAI
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#008C77]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-[#008C77]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1D21] mb-2">BASEADO EM EVIDÊNCIAS</h4>
                    <p className="text-sm text-[#706F6F]">
                      AI Judge verifica citações antes de responder
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#008C77]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-[#008C77]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1D21] mb-2">INTEGRAÇÃO NATIVA</h4>
                    <p className="text-sm text-[#706F6F]">
                      Lê o prontuário e insere no PEP com um clique
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#008C77]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-[#008C77]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1D21] mb-2">ESPECIALIZADO</h4>
                    <p className="text-sm text-[#706F6F]">
                      TUSS/CID, OCR de exames, ditado médico
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#008C77]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-[#008C77]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1D21] mb-2">COMPLIANCE LGPD</h4>
                    <p className="text-sm text-[#706F6F]">
                      Logs de auditoria e segurança garantidos
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Testimonial */}
          <Card className="p-6 bg-[#F5F7FA] border-0 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">CS</span>
              </div>
              <div>
                <p className="text-[#1A1D21] font-medium mb-1">
                  💬 "Economizei 2 horas por dia na documentação"
                </p>
                <p className="text-sm text-[#706F6F]">
                  — Dr. Carlos Silva, Cardiologista
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#214B63] mb-4">
              Recursos que economizam seu tempo
            </h2>
          </div>

          <div className="space-y-24">
            {/* Feature 1 - Dictation */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-[#008C77] rounded-2xl flex items-center justify-center mb-6">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#214B63] mb-4">
                  Ditado por Voz
                </h3>
                <p className="text-lg text-[#706F6F] leading-relaxed mb-6">
                  Fale naturalmente e veja o texto aparecer em tempo real.
                  <span className="text-[#008C77] font-bold"> Zero digitação</span> durante a consulta.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Reconhecimento de termos médicos
                  </li>
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Transcrição em tempo real
                  </li>
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Formatação automática SOAP
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#008C77]/10 to-[#214B63]/10 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-[#008C77] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Mic className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-[#706F6F] font-medium">Gravando...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 - Prescription */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <div className="w-16 h-16 bg-[#008C77] rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#214B63] mb-4">
                  Prescrição Digital
                </h3>
                <p className="text-lg text-[#706F6F] leading-relaxed mb-6">
                  Dite o medicamento e a IA estrutura automaticamente.
                  <span className="text-[#008C77] font-bold"> Assine com um toque.</span>
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Alerta de interações medicamentosas
                  </li>
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Adequação de dose por peso/idade
                  </li>
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Assinatura digital certificada
                  </li>
                </ul>
              </div>
              <div className="lg:order-1 relative">
                <img
                  src={imgFeatures}
                  alt="Prescrição Digital"
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
            </div>

            {/* Feature 3 - OCR */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-[#008C77] rounded-2xl flex items-center justify-center mb-6">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#214B63] mb-4">
                  Leitura de Exames (OCR)
                </h3>
                <p className="text-lg text-[#706F6F] leading-relaxed mb-6">
                  Aponte a câmera para o exame e a IA
                  <span className="text-[#008C77] font-bold"> extrai os dados automaticamente.</span>
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Reconhecimento de exames laboratoriais
                  </li>
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Extração de valores e unidades
                  </li>
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Integração direta ao prontuário
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src={imgComparison}
                  alt="OCR de Exames"
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
            </div>

            {/* Feature 4 - Ask Sofya */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <div className="w-16 h-16 bg-[#008C77] rounded-2xl flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#214B63] mb-4">
                  Ask Sofya
                </h3>
                <p className="text-lg text-[#706F6F] leading-relaxed mb-6">
                  Pergunte qualquer dúvida clínica e receba
                  <span className="text-[#008C77] font-bold"> respostas baseadas em evidências científicas.</span>
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Citações de literatura médica
                  </li>
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Protocolos e guidelines atualizados
                  </li>
                  <li className="flex items-center gap-3 text-[#706F6F]">
                    <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                    Contextualizado ao paciente
                  </li>
                </ul>
              </div>
              <div className="lg:order-1 relative">
                <div className="bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-2xl p-8">
                  <div className="bg-white rounded-xl p-6 mb-4">
                    <SofyaLogo className="w-32 h-auto mx-auto mb-4" />
                    <p className="text-center text-[#706F6F] text-sm">
                      Assistente baseado em evidências científicas
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
                      Qual o protocolo para sepse em idosos?
                    </div>
                    <div className="bg-white rounded-lg p-4 text-[#1A1D21] text-sm">
                      Seguindo o Surviving Sepsis Campaign 2024...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#214B63] mb-4">
              Escolha seu plano
            </h2>
            <p className="text-lg text-[#706F6F] mb-8">
              Comece grátis e escale conforme sua necessidade
            </p>

            {/* Period Toggle */}
            <div className="inline-flex items-center bg-[#F5F7FA] rounded-lg p-1">
              <button
                onClick={() => setPricingPeriod("monthly")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  pricingPeriod === "monthly"
                    ? "bg-white text-[#008C77] shadow-sm"
                    : "text-[#706F6F]"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setPricingPeriod("annual")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  pricingPeriod === "annual"
                    ? "bg-white text-[#008C77] shadow-sm"
                    : "text-[#706F6F]"
                }`}
              >
                Anual <span className="text-[#008C77] text-xs ml-1">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="p-8 border-[#E8ECEF]">
              <h3 className="text-2xl font-bold text-[#214B63] mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#1A1D21]">R$ 0</span>
                <span className="text-[#706F6F]">/mês</span>
              </div>
              <p className="text-[#706F6F] mb-6">Para estudantes e residentes</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Chat básico
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  20 consultas/mês
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Protocolos básicos
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  App mobile
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <X className="w-5 h-5 text-[#E74C3C] flex-shrink-0" />
                  Sem integração PEP
                </li>
              </ul>

              <button
                onClick={() => onNavigate("dashboard")}
                className="w-full py-3 border-2 border-[#214B63] text-[#214B63] font-bold rounded-lg hover:bg-[#214B63] hover:text-white transition-colors"
              >
                Começar Grátis
              </button>
            </Card>

            {/* Pro Plan - Highlighted */}
            <Card className="p-8 border-2 border-[#008C77] shadow-xl relative scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#008C77] text-white border-0 px-4 py-1">
                  ✨ MAIS POPULAR
                </Badge>
              </div>

              <h3 className="text-2xl font-bold text-[#008C77] mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#1A1D21]">
                  R$ {pricingPeriod === "monthly" ? "99" : "79"}
                </span>
                <span className="text-[#706F6F]">/mês</span>
              </div>
              <p className="text-[#706F6F] mb-6">Para médicos e consultórios</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Uso ilimitado
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Ditado por voz
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Prescrições digitais
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  OCR de exames
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  TUSS/CID integrado
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Suporte prioritário
                </li>
              </ul>

              <button
                onClick={() => onNavigate("dashboard")}
                className="w-full py-3 bg-[#008C77] text-white font-bold rounded-lg hover:bg-[#007A68] transition-colors shadow-lg"
              >
                Assinar Pro
              </button>
            </Card>

            {/* Enterprise Plan */}
            <Card className="p-8 border-[#E8ECEF]">
              <h3 className="text-2xl font-bold text-[#214B63] mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-2xl font-bold text-[#1A1D21]">Sob consulta</span>
              </div>
              <p className="text-[#706F6F] mb-6">Para hospitais e redes</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Tudo do Pro +
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Integração PEP MV
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Protocolos institucionais
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Analytics avançado
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  SSO/Compliance
                </li>
                <li className="flex items-center gap-3 text-[#706F6F]">
                  <Check className="w-5 h-5 text-[#008C77] flex-shrink-0" />
                  Gerente de conta
                </li>
              </ul>

              <button className="w-full py-3 border-2 border-[#214B63] text-[#214B63] font-bold rounded-lg hover:bg-[#214B63] hover:text-white transition-colors">
                Falar com Vendas
              </button>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-gradient-to-br from-[#214B63] via-[#1A3A4D] to-[#1A1D21] py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <img src={imgCTA} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Comece a economizar tempo hoje
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Junte-se a <span className="text-[#35D3C7] font-bold">+500 médicos</span> que já transformaram
            <br />
            sua rotina clínica com IA baseada em evidências.
          </p>

          <button
            onClick={() => onNavigate("dashboard")}
            className="px-12 py-5 bg-[#008C77] text-white font-bold rounded-lg hover:bg-[#007A68] transition-all shadow-2xl hover:shadow-3xl text-lg mb-8 inline-block"
          >
            Comece Grátis — É de graça
          </button>

          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-2xl p-6 inline-block">
              <SofyaLogo className="w-40 h-auto" />
            </div>
          </div>

          <p className="text-sm text-white/60">
            Sem cartão de crédito • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#214B63] text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Logo */}
            <div className="md:col-span-1">
              <img 
                src={imgMVLogo} 
                alt="MV Logo" 
                className="h-10 w-auto mb-4"
              />
              <p className="text-white/60 text-sm">Tecnologia para saúde</p>
            </div>

            {/* Produto */}
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#recursos" className="hover:text-[#008C77] transition-colors">Recursos</a></li>
                <li><a href="#precos" className="hover:text-[#008C77] transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-[#008C77] transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-[#008C77] transition-colors">Documentação</a></li>
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-[#008C77] transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-[#008C77] transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-[#008C77] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#008C77] transition-colors">Imprensa</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-[#008C77] transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-[#008C77] transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-[#008C77] transition-colors">LGPD</a></li>
                <li><a href="#" className="hover:text-[#008C77] transition-colors">Segurança</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>contato@mv.com.br</li>
                <li>(81) 3333-0000</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © 2026 MV Tecnologia. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/60 hover:text-[#008C77] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#008C77] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#008C77] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#008C77] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}