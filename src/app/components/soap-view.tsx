import { useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";

interface SoapViewProps {
  onNavigate: (screen: string) => void;
}

export function SoapView({ onNavigate }: SoapViewProps) {
  const [soapData] = useState({
    subjetivo:
      "Paciente João Oliveira, 45 anos, refere dor torácica de início súbito há 2 horas, com irradiação para membro superior esquerdo. Relata náuseas e sudorese associadas. Nega dispneia intensa.",
    objetivo:
      "PA: 150/95 mmHg, FC: 92 bpm, Tax: 36.8°C, SpO2: 97% em ar ambiente. Paciente consciente, orientado, em regular estado geral. Ausculta cardíaca: ritmo regular, sem sopros. Ausculta pulmonar: murmúrio vesicular presente bilateralmente.",
    avaliacao:
      "Hipótese diagnóstica: Síndrome coronariana aguda a esclarecer. Diagnósticos diferenciais: angina instável, infarto agudo do miocárdio, pericardite. Paciente com fatores de risco cardiovascular (hipertensão arterial).",
    plano:
      "1. ECG 12 derivações imediato\n2. Solicitar troponina, CK-MB, hemograma, eletrólitos\n3. Iniciar protocolo de dor torácica\n4. AAS 200mg VO agora\n5. Manter monitorização cardíaca contínua\n6. Avaliar necessidade de anticoagulação após resultado de troponina",
  });

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
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
              Resultado Estruturado
            </h1>
            <p className="text-sm text-[#5E6C84] mt-1">
              Método SOAP - João Oliveira
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <Tabs defaultValue="subjetivo" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="subjetivo">S</TabsTrigger>
            <TabsTrigger value="objetivo">O</TabsTrigger>
            <TabsTrigger value="avaliacao">A</TabsTrigger>
            <TabsTrigger value="plano">P</TabsTrigger>
          </TabsList>

          <TabsContent value="subjetivo">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-[#0056D2] mb-2 uppercase tracking-wide">
                Subjetivo
              </h3>
              <p className="text-xs text-[#5E6C84] mb-4">
                Queixa do paciente e história
              </p>
              <Textarea
                value={soapData.subjetivo}
                className="min-h-[200px] text-[#1A1A1A] border-gray-200"
                readOnly
              />
            </div>
          </TabsContent>

          <TabsContent value="objetivo">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-[#0056D2] mb-2 uppercase tracking-wide">
                Objetivo
              </h3>
              <p className="text-xs text-[#5E6C84] mb-4">
                Sinais vitais e exame físico
              </p>
              <Textarea
                value={soapData.objetivo}
                className="min-h-[200px] text-[#1A1A1A] border-gray-200"
                readOnly
              />
            </div>
          </TabsContent>

          <TabsContent value="avaliacao">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-[#0056D2] mb-2 uppercase tracking-wide">
                Avaliação
              </h3>
              <p className="text-xs text-[#5E6C84] mb-4">
                Hipóteses diagnósticas
              </p>
              <Textarea
                value={soapData.avaliacao}
                className="min-h-[200px] text-[#1A1A1A] border-gray-200"
                readOnly
              />
            </div>
          </TabsContent>

          <TabsContent value="plano">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-[#0056D2] mb-2 uppercase tracking-wide">
                Plano
              </h3>
              <p className="text-xs text-[#5E6C84] mb-4">
                Conduta e próximos passos
              </p>
              <Textarea
                value={soapData.plano}
                className="min-h-[200px] text-[#1A1A1A] border-gray-200 mb-6"
                readOnly
              />

              <button
                onClick={() => onNavigate("prescription")}
                className="w-full bg-[#00C853] text-white py-4 rounded-xl font-medium hover:bg-[#00B347] transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Gerar Prescrição
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
