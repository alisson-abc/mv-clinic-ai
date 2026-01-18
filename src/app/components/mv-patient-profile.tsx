import { ArrowLeft, Phone, Mail, Calendar, FileText, Activity, Heart, Droplet, Wind, Thermometer, MessageSquare } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import svgPaths from "@/imports/svg-quqbpcgsif";

interface MVPatientProfileProps {
  onNavigate: (screen: string) => void;
}

// Sofya Logo Component
function SofyaIcon({ className = "w-5 h-5" }: { className?: string }) {
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

export function MVPatientProfile({ onNavigate }: MVPatientProfileProps) {
  const vitalSigns = [
    { label: "Pressão Arterial", value: "150/95", unit: "mmHg", icon: Heart, status: "warning" },
    { label: "Frequência Cardíaca", value: "92", unit: "bpm", icon: Activity, status: "normal" },
    { label: "SpO2", value: "97", unit: "%", icon: Wind, status: "normal" },
    { label: "Temperatura", value: "36.8", unit: "°C", icon: Thermometer, status: "normal" },
  ];

  const consultations = [
    { date: "18 JAN, 08:00", type: "Cardiologia", doctor: "Dr. Silva", summary: "Avaliação de dor torácica" },
    { date: "17 JAN, 14:30", type: "Emergência", doctor: "Dr. Santos", summary: "Entrada por SCA" },
    { date: "15 JAN, 10:15", type: "Check-up", doctor: "Dr. Silva", summary: "Consulta de rotina" },
  ];

  const exams = [
    { name: "Troponina", value: "0.8 ng/mL", status: "Crítico", date: "18 JAN" },
    { name: "Hemograma Completo", value: "Ver resultados", status: "Normal", date: "18 JAN" },
    { name: "ECG 12 derivações", value: "Alterações de ST", status: "Atenção", date: "18 JAN" },
  ];

  const medications = [
    { name: "AAS", dose: "200mg", frequency: "1x ao dia", route: "VO" },
    { name: "Atorvastatina", dose: "80mg", frequency: "1x ao dia (noite)", route: "VO" },
    { name: "Losartana", dose: "50mg", frequency: "2x ao dia", route: "VO" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => onNavigate("patients")}
              className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center hover:bg-[#E8ECEF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#1A1D21]" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#1A1D21]">Perfil do Paciente</h1>
              <p className="text-[#706F6F] text-sm mt-1">Dados clínicos completos</p>
            </div>
            <button 
              onClick={() => onNavigate("chat")}
              className="flex items-center gap-2 px-4 py-2 bg-[#008C77] text-white rounded-lg font-medium hover:bg-[#007A68] transition-colors"
            >
              <SofyaIcon />
              Ask Sofya
            </button>
          </div>
        </div>
      </div>

      {/* Patient Hero Card */}
      <div className="px-8 py-6">
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#008C77] to-[#214B63] px-8 py-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#008C77] font-bold text-3xl">MS</span>
              </div>
              <div className="flex-1 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">Maria Silva</h2>
                  <Badge className="bg-[#E74C3C] text-white border-0">Crítico</Badge>
                </div>
                <div className="grid grid-cols-4 gap-6 text-sm">
                  <div>
                    <p className="text-white/70 mb-1">Idade/Sexo</p>
                    <p className="font-medium">45 anos • Feminino</p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Prontuário</p>
                    <p className="font-medium">#982764</p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Localização</p>
                    <p className="font-medium">Leito 204 - UTI</p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Diagnóstico</p>
                    <p className="font-medium">Síndrome Coronariana Aguda</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Phone className="w-6 h-6 text-white" />
                </button>
                <button className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail className="w-6 h-6 text-white" />
                </button>
                <button className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Calendar className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="px-8 py-6 bg-white border-t border-gray-100">
            <h3 className="text-sm font-bold text-[#706F6F] uppercase tracking-wide mb-4">Sinais Vitais Recentes</h3>
            <div className="grid grid-cols-4 gap-4">
              {vitalSigns.map((vital, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    vital.status === "warning" ? "bg-[#F5A623]/10" : "bg-[#F5F7FA]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <vital.icon className={`w-5 h-5 ${
                      vital.status === "warning" ? "text-[#F5A623]" : "text-[#008C77]"
                    }`} />
                    <p className="text-xs text-[#706F6F] font-medium">{vital.label}</p>
                  </div>
                  <p className="text-2xl font-bold text-[#1A1D21]">
                    {vital.value}
                    <span className="text-sm font-normal text-[#706F6F] ml-1">{vital.unit}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Content Tabs */}
      <div className="px-8 pb-8">
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="w-full bg-white border border-gray-200 p-1 grid grid-cols-4">
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="exams">Exames</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescrições</TabsTrigger>
            <TabsTrigger value="clinical-data">Dados Clínicos</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#1A1D21] mb-6">Histórico de Consultas</h3>
              <div className="space-y-4">
                {consultations.map((consultation, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-[#F5F7FA] rounded-lg hover:bg-[#E8ECEF] transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-[#008C77] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-[#1A1D21]">{consultation.type}</h4>
                        <Badge variant="outline" className="bg-white text-[#706F6F]">
                          {consultation.date}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#706F6F] mb-1">{consultation.summary}</p>
                      <p className="text-xs text-[#706F6F]">Atendido por: {consultation.doctor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="exams" className="mt-6">
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#1A1D21] mb-6">Resultados de Exames</h3>
              <div className="space-y-4">
                {exams.map((exam, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg hover:bg-[#E8ECEF] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        exam.status === "Crítico" ? "bg-[#E74C3C]/10" :
                        exam.status === "Atenção" ? "bg-[#F5A623]/10" :
                        "bg-[#008C77]/10"
                      }`}>
                        <Droplet className={`w-5 h-5 ${
                          exam.status === "Crítico" ? "text-[#E74C3C]" :
                          exam.status === "Atenção" ? "text-[#F5A623]" :
                          "text-[#008C77]"
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1A1D21]">{exam.name}</h4>
                        <p className="text-sm text-[#706F6F]">{exam.value}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={
                        exam.status === "Crítico" ? "bg-[#E74C3C] text-white border-0" :
                        exam.status === "Atenção" ? "bg-[#F5A623] text-white border-0" :
                        "bg-[#008C77] text-white border-0"
                      }>
                        {exam.status}
                      </Badge>
                      <span className="text-sm text-[#706F6F]">{exam.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="mt-6">
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#1A1D21] mb-6">Prescrição Atual</h3>
              <div className="space-y-4">
                {medications.map((med, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-[#F5F7FA] rounded-lg"
                  >
                    <div className="w-10 h-10 bg-[#008C77] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1A1D21] mb-2">{med.name}</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-[#706F6F] mb-1">Dosagem</p>
                          <p className="text-[#1A1D21] font-medium">{med.dose}</p>
                        </div>
                        <div>
                          <p className="text-[#706F6F] mb-1">Frequência</p>
                          <p className="text-[#1A1D21] font-medium">{med.frequency}</p>
                        </div>
                        <div>
                          <p className="text-[#706F6F] mb-1">Via</p>
                          <p className="text-[#1A1D21] font-medium">{med.route}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="clinical-data" className="mt-6">
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#1A1D21] mb-6">Dados Clínicos</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-[#706F6F] uppercase tracking-wide mb-3">Alergias</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20">Penicilina</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#706F6F] uppercase tracking-wide mb-3">Condições Prévias</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-[#214B63]/10 text-[#214B63] border-[#214B63]/20">Hipertensão Arterial</Badge>
                    <Badge className="bg-[#214B63]/10 text-[#214B63] border-[#214B63]/20">Dislipidemia</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#706F6F] uppercase tracking-wide mb-3">Observações</h4>
                  <p className="text-sm text-[#1A1D21] bg-[#F5F7FA] p-4 rounded-lg">
                    Paciente com histórico familiar de doença cardiovascular. Mãe falecida por IAM aos 60 anos. 
                    Tabagista há 20 anos (1 maço/dia). Sedentária. IMC: 28.5 kg/m².
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
