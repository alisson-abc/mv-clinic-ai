import { Fingerprint, Mail, Lock, Eye } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import svgPaths from "@/imports/svg-quqbpcgsif";

interface MVMobileLoginProps {
  onNavigate: (screen: string) => void;
}

// Sofya Logo Component
function SofyaLogo({ className = "w-24 h-auto" }: { className?: string }) {
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

export function MVMobileLogin({ onNavigate }: MVMobileLoginProps) {
  return (
    <div className="relative w-[390px] h-[844px] bg-gradient-to-b from-[#008C77] to-[#214B63] flex flex-col">
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 p-4 shadow-xl">
          <SofyaLogo className="w-full h-auto" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 text-center">ClinicAI</h1>
        <p className="text-white/80 text-sm text-center mb-8">
          Assistente Clínico Baseado em Evidências
        </p>
        <div className="w-16 h-1 bg-white/30 rounded-full"></div>
      </div>

      {/* Login Section */}
      <div className="bg-white rounded-t-3xl px-8 pt-8 pb-12">
        {/* Biometric Login - Primary Option */}
        <div className="text-center mb-8">
          <p className="text-sm text-[#706F6F] mb-6">Entrar com biometria</p>
          <button
            onClick={() => onNavigate("mobile-home")}
            className="w-20 h-20 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-full mx-auto flex items-center justify-center shadow-2xl active:scale-95 transition-transform mb-4"
          >
            <Fingerprint className="w-10 h-10 text-white" />
          </button>
          <p className="text-xs text-[#008C77] font-medium">
            Toque para usar Face ID / Touch ID
          </p>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-sm text-[#706F6F]">ou entre com senha</span>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="text-sm font-medium text-[#1A1D21] mb-2 block">
            E-mail
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-[#706F6F] absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="email"
              placeholder="dr.silva@hospital.com"
              className="pl-10 h-12 bg-[#F5F7FA] border-transparent text-base"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="text-sm font-medium text-[#1A1D21] mb-2 block">
            Senha
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 text-[#706F6F] absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="password"
              placeholder="••••••••"
              className="pl-10 pr-10 h-12 bg-[#F5F7FA] border-transparent text-base"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Eye className="w-5 h-5 text-[#706F6F]" />
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <button className="text-sm text-[#008C77] font-medium">
            Esqueci minha senha
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={() => onNavigate("mobile-home")}
          className="w-full h-14 bg-[#008C77] text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-transform mb-4"
        >
          Entrar
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-[#706F6F]">
          Não tem uma conta?{" "}
          <button className="text-[#008C77] font-medium">
            Criar conta gratuita
          </button>
        </p>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-[#706F6F]">
            by <span className="font-bold text-[#214B63]">MV Tecnologia</span>
          </p>
        </div>
      </div>
    </div>
  );
}
