import { ArrowLeft, Mic, Plus, AlertTriangle, CheckCircle2, Save } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";

interface MVMobilePrescriptionProps {
  onNavigate: (screen: string) => void;
}

export function MVMobilePrescription({ onNavigate }: MVMobilePrescriptionProps) {
  const medications = [
    {
      name: "AAS (Ácido Acetilsalicílico)",
      dose: "200mg",
      frequency: "1x ao dia",
      route: "VO",
      duration: "Contínuo",
      interaction: null,
    },
    {
      name: "Atorvastatina",
      dose: "80mg",
      frequency: "1x ao dia (noite)",
      route: "VO",
      duration: "Contínuo",
      interaction: null,
    },
    {
      name: "Clopidogrel",
      dose: "75mg",
      frequency: "1x ao dia",
      route: "VO",
      duration: "12 meses",
      interaction: {
        level: "moderate",
        message: "Possível aumento de risco de sangramento com AAS",
      },
    },
  ];

  return (
    <div className="relative w-[390px] h-[844px] bg-[#1A1D21] flex flex-col">
      {/* Patient Header - Dark Mode */}
      <div className="bg-[#214B63] px-4 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate("mobile-home")}
            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">Prescrição Digital</h1>
            <p className="text-white/60 text-xs">Maria Silva • 45 anos</p>
          </div>
          <Badge className="bg-[#E74C3C] text-white border-0 text-xs">
            Crítico
          </Badge>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Add Medication Card */}
        <Card className="bg-[#2A3F4D] border-white/10 p-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Mic className="w-6 h-6 text-[#008C77]" />
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm">Ditar medicamento</h3>
              <p className="text-white/60 text-xs">Fale naturalmente</p>
            </div>
            <button className="w-10 h-10 bg-[#008C77] rounded-lg flex items-center justify-center active:scale-95 transition-transform">
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="relative">
            <Input
              placeholder="ou digite o nome do medicamento..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12"
            />
          </div>
        </Card>

        {/* Medications List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white/60 uppercase tracking-wide">
            Medicamentos Prescritos ({medications.length})
          </h3>
          {medications.map((med, index) => (
            <Card
              key={index}
              className={`bg-[#2A3F4D] border-white/10 p-4 ${
                med.interaction ? "border-[#F5A623]" : ""
              }`}
            >
              {/* Medication Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-bold text-sm mb-1">{med.name}</h4>
                  {med.interaction && (
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-[#F5A623]" />
                      <Badge className="bg-[#F5A623]/20 text-[#F5A623] border-[#F5A623]/30 text-xs">
                        Interação Moderada
                      </Badge>
                    </div>
                  )}
                </div>
                <button className="text-white/60 hover:text-white">
                  <Plus className="w-5 h-5 rotate-45" />
                </button>
              </div>

              {/* Medication Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-white/60 mb-1">Dosagem</p>
                  <p className="text-white font-medium">{med.dose}</p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Frequência</p>
                  <p className="text-white font-medium">{med.frequency}</p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Via</p>
                  <p className="text-white font-medium">{med.route}</p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Duração</p>
                  <p className="text-white font-medium">{med.duration}</p>
                </div>
              </div>

              {/* Interaction Warning */}
              {med.interaction && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs text-[#F5A623] leading-relaxed">
                    ⚠️ {med.interaction.message}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Add More Button */}
        <button className="w-full mt-4 py-3 border-2 border-dashed border-white/20 rounded-lg text-white/60 font-medium text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <Plus className="w-5 h-5" />
          Adicionar medicamento
        </button>
      </div>

      {/* Bottom Actions */}
      <div className="bg-[#214B63] px-4 py-4 border-t border-white/10">
        {/* Alert Summary */}
        <div className="bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[#F5A623] font-bold text-xs mb-1">
                1 Interação Medicamentosa Detectada
              </p>
              <p className="text-[#F5A623]/80 text-xs">
                Revisar antes de assinar
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="h-12 bg-white/10 text-white font-medium rounded-lg active:scale-95 transition-transform">
            Salvar Rascunho
          </button>
          <button className="h-12 bg-[#008C77] text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
            Assinar Prescrição
          </button>
        </div>

        <p className="text-xs text-center text-white/40 mt-3">
          Assinatura digital via certificado ICP-Brasil
        </p>
      </div>
    </div>
  );
}
