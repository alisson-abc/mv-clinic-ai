import { useState } from "react";
import { MVDashboard } from "@/app/components/mv-dashboard";
import { MVPatients } from "@/app/components/mv-patients";
import { MVChatSofya } from "@/app/components/mv-chat-sofya";
import { MVPatientProfile } from "@/app/components/mv-patient-profile";
import { MVLanding } from "@/app/components/mv-landing";
import { MVAgenda } from "@/app/components/mv-agenda";
import { MVNotificacoes } from "@/app/components/mv-notificacoes";
import { MVConfiguracoes } from "@/app/components/mv-configuracoes";
import { ListeningMode } from "@/app/components/listening-mode";

type Screen = "landing" | "dashboard" | "patients" | "chat" | "patient-profile" | "agenda" | "notificacoes" | "configuracoes" | "listening";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  return (
    <div>
      {currentScreen === "landing" && <MVLanding onNavigate={setCurrentScreen} />}
      {currentScreen === "dashboard" && <MVDashboard onNavigate={setCurrentScreen} />}
      {currentScreen === "patients" && <MVPatients onNavigate={setCurrentScreen} />}
      {currentScreen === "chat" && <MVChatSofya onNavigate={setCurrentScreen} />}
      {currentScreen === "patient-profile" && <MVPatientProfile onNavigate={setCurrentScreen} />}
      {currentScreen === "agenda" && <MVAgenda onNavigate={setCurrentScreen} />}
      {currentScreen === "notificacoes" && <MVNotificacoes onNavigate={setCurrentScreen} />}
      {currentScreen === "configuracoes" && <MVConfiguracoes onNavigate={setCurrentScreen} />}
      {currentScreen === "listening" && <ListeningMode onNavigate={setCurrentScreen} />}
    </div>
  );
}