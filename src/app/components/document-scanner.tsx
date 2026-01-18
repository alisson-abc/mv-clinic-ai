import { useState } from "react";
import { ArrowLeft, Camera, Check, X } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

interface DocumentScannerProps {
  onNavigate: (screen: string) => void;
}

export function DocumentScanner({ onNavigate }: DocumentScannerProps) {
  const [scanned, setScanned] = useState(false);
  const [extractedData, setExtractedData] = useState({
    name: "JOÃO SILVA OLIVEIRA",
    cpf: "123.456.789-00",
    insurance: "Unimed Premium",
    cardNumber: "4567 8901 2345 6789",
    validity: "12/2026",
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
              Scanner de Documentos
            </h1>
            <p className="text-sm text-[#5E6C84] mt-1">
              Integração Kadok OCR
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      {!scanned ? (
        <div className="px-6 py-6">
          {/* Camera Viewfinder */}
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden mb-6 aspect-[3/4]">
            {/* Simulated Camera View */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>

            {/* Detection Overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full max-w-md max-h-[500px]">
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#00C853] rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#00C853] rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#00C853] rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#00C853] rounded-br-lg"></div>

                {/* Center Guide */}
                <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-white/50 mx-auto mb-3" />
                    <p className="text-white/80 text-sm font-medium">
                      Posicione o exame ou carteirinha
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      Alinhe dentro da área marcada
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scanning Animation */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00C853] to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Instruction */}
          <div className="bg-white rounded-xl p-4 mb-6">
            <p className="text-sm text-[#1A1A1A] mb-2 font-medium">
              Instruções:
            </p>
            <ul className="text-xs text-[#5E6C84] space-y-1">
              <li>• Posicione o documento dentro da área marcada</li>
              <li>• Certifique-se de que está bem iluminado</li>
              <li>• Evite sombras e reflexos</li>
              <li>• Mantenha o dispositivo estável</li>
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setScanned(true)}
            className="w-full bg-[#0056D2] text-white py-4 rounded-xl font-medium hover:bg-[#0047B3] transition-colors flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Capturar Documento
          </button>
        </div>
      ) : (
        <div className="px-6 py-6">
          {/* Success Message */}
          <div className="bg-[#00C853]/10 border border-[#00C853]/20 rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00C853] rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#00C853]">
                Documento capturado com sucesso!
              </p>
              <p className="text-xs text-[#5E6C84] mt-1">
                Dados extraídos automaticamente
              </p>
            </div>
          </div>

          {/* Extracted Data Form */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h3 className="text-sm font-semibold text-[#0056D2] mb-4 uppercase tracking-wide">
              Dados Extraídos (OCR)
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-xs text-[#5E6C84] mb-1">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  value={extractedData.name}
                  onChange={(e) =>
                    setExtractedData({ ...extractedData, name: e.target.value })
                  }
                  className="border-gray-200"
                />
              </div>

              <div>
                <Label htmlFor="cpf" className="text-xs text-[#5E6C84] mb-1">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  value={extractedData.cpf}
                  onChange={(e) =>
                    setExtractedData({ ...extractedData, cpf: e.target.value })
                  }
                  className="border-gray-200"
                />
              </div>

              <div>
                <Label
                  htmlFor="insurance"
                  className="text-xs text-[#5E6C84] mb-1"
                >
                  Convênio
                </Label>
                <Input
                  id="insurance"
                  value={extractedData.insurance}
                  onChange={(e) =>
                    setExtractedData({
                      ...extractedData,
                      insurance: e.target.value,
                    })
                  }
                  className="border-gray-200"
                />
              </div>

              <div>
                <Label
                  htmlFor="cardNumber"
                  className="text-xs text-[#5E6C84] mb-1"
                >
                  Número da Carteirinha
                </Label>
                <Input
                  id="cardNumber"
                  value={extractedData.cardNumber}
                  onChange={(e) =>
                    setExtractedData({
                      ...extractedData,
                      cardNumber: e.target.value,
                    })
                  }
                  className="border-gray-200"
                />
              </div>

              <div>
                <Label
                  htmlFor="validity"
                  className="text-xs text-[#5E6C84] mb-1"
                >
                  Validade
                </Label>
                <Input
                  id="validity"
                  value={extractedData.validity}
                  onChange={(e) =>
                    setExtractedData({
                      ...extractedData,
                      validity: e.target.value,
                    })
                  }
                  className="border-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setScanned(false)}
              className="flex-1 bg-white border border-gray-200 text-[#1A1A1A] py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancelar
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="flex-1 bg-[#00C853] text-white py-4 rounded-xl font-medium hover:bg-[#00B347] transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
