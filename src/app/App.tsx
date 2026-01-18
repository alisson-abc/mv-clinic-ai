import { useState } from "react";
import { Dashboard } from "@/app/components/dashboard";
import { ListeningMode } from "@/app/components/listening-mode";
import { SoapView } from "@/app/components/soap-view";
import { ChatAssistant } from "@/app/components/chat-assistant";
import { PrescriptionReview } from "@/app/components/prescription-review";
import { DocumentScanner } from "@/app/components/document-scanner";

type Screen = "dashboard" | "listening" | "soap" | "chat" | "prescription" | "scanner";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "dashboard" && <Dashboard onNavigate={handleNavigate} />}
      {currentScreen === "listening" && <ListeningMode onNavigate={handleNavigate} />}
      {currentScreen === "soap" && <SoapView onNavigate={handleNavigate} />}
      {currentScreen === "chat" && <ChatAssistant onNavigate={handleNavigate} />}
      {currentScreen === "prescription" && <PrescriptionReview onNavigate={handleNavigate} />}
      {currentScreen === "scanner" && <DocumentScanner onNavigate={handleNavigate} />}
    </div>
  );
}
