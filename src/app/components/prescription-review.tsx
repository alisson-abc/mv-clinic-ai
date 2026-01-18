import { useState } from "react";
import { ArrowLeft, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Slider } from "@/app/components/ui/slider";
import { Badge } from "@/app/components/ui/badge";

interface PrescriptionReviewProps {
  onNavigate: (screen: string) => void;
}

interface Medication {
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  warning?: {
    type: "warning" | "danger";
    message: string;
  };
}

export function PrescriptionReview({ onNavigate }: PrescriptionReviewProps) {
  const [medications] = useState<Medication[]>([
    {
      name: "Ácido Acetilsalicílico (AAS)",
      dosage: "200mg",
      route: "Oral (VO)",
      frequency: "Dose única agora",
    },
    {
      name: "Atorvastatina",
      dosage: "80mg",
      route: "Oral (VO)",
      frequency: "1x ao dia (à noite)",
    },
    {
      name: "Clopidogrel",
      dosage: "300mg",
      route: "Oral (VO)",
      frequency: "Dose de ataque, seguir com 75mg/dia",
      warning: {
        type: "warning",
        message:
          "Interação medicamentosa: Clopidogrel + AAS aumenta risco de sangramento. Monitorar paciente.",
      },
    },
    {
      name: "Enoxaparina",
      dosage: "60mg (1mg/kg)",
      route: "Subcutânea (SC)",
      frequency: "12/12 horas",
    },
    {
      name: "Metoprolol",
      dosage: "50mg",
      route: "Oral (VO)",
      frequency: "12/12 horas",
    },
  ]);

  const [sliderValue, setSliderValue] = useState([0]);
  const isReadyToSign = sliderValue[0] === 100;

  return (
    <div className="min-h-screen bg-[#F4F6F8] pb-32">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("dashboard")}
            className="w-10 h-10 bg-[#F4F6F8] rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-[#1A1A1A]">
              Revisão de Prescrição
            </h1>
            <p className="text-sm text-[#5E6C84] mt-1">
              Paciente: João Oliveira
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-[#5E6C84] uppercase tracking-wide">
            Medicamentos
          </h2>
          <Badge variant="outline" className="bg-[#0056D2]/5 text-[#0056D2] border-[#0056D2]/20">
            {medications.length} itens
          </Badge>
        </div>

        {medications.map((medication, index) => (
          <Card
            key={index}
            className={`p-4 bg-white border-0 shadow-sm ${
              medication.warning
                ? medication.warning.type === "danger"
                  ? "border-l-4 border-l-[#DC3545]"
                  : "border-l-4 border-l-[#FFA726]"
                : ""
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-[#1A1A1A]">
                {medication.name}
              </h3>
              {!medication.warning && (
                <CheckCircle2 className="w-5 h-5 text-[#00C853] flex-shrink-0" />
              )}
              {medication.warning && (
                <AlertTriangle
                  className={`w-5 h-5 flex-shrink-0 ${
                    medication.warning.type === "danger"
                      ? "text-[#DC3545]"
                      : "text-[#FFA726]"
                  }`}
                />
              )}
            </div>

            <div className="space-y-1 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5E6C84]">Dosagem:</span>
                <span className="text-sm text-[#1A1A1A]">
                  {medication.dosage}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5E6C84]">Via:</span>
                <span className="text-sm text-[#1A1A1A]">
                  {medication.route}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5E6C84]">Frequência:</span>
                <span className="text-sm text-[#1A1A1A]">
                  {medication.frequency}
                </span>
              </div>
            </div>

            {medication.warning && (
              <div
                className={`mt-3 pt-3 border-t ${
                  medication.warning.type === "danger"
                    ? "border-[#DC3545]/20 bg-[#DC3545]/5"
                    : "border-[#FFA726]/20 bg-[#FFA726]/5"
                } -mx-4 -mb-4 px-4 py-3 rounded-b-lg`}
              >
                <p
                  className={`text-xs ${
                    medication.warning.type === "danger"
                      ? "text-[#DC3545]"
                      : "text-[#C87000]"
                  }`}
                >
                  ⚠️ {medication.warning.message}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Fixed Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-[#1A1A1A]">
              Deslize para assinar
            </p>
            <span className="text-xs text-[#5E6C84]">{sliderValue[0]}%</span>
          </div>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <button
          disabled={!isReadyToSign}
          className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
            isReadyToSign
              ? "bg-[#00C853] text-white hover:bg-[#00B347]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isReadyToSign ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Assinar e Enviar ao PEP
            </>
          ) : (
            <>
              Deslize para confirmar
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
