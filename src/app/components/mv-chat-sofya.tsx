import { Home, Users, MessageSquare, Settings, Menu, X, Calendar, Bell, Send, Paperclip, Mic, CheckCircle2, BookOpen, FileText, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import svgPaths from "@/imports/svg-quqbpcgsif";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import imgMVLogo from "figma:asset/f07ce0ef45a6df48f6c586d9ef7ccd7274d5089a.png";
import { SofyaFloating } from "@/app/components/sofya-floating";
import { useAskSofya } from "@/hooks/useAskSofya";
import { useSofyaTranscriber } from "@/hooks/useSofyaTranscriber";

interface MVChatSofyaProps {
  onNavigate: (screen: string) => void;
}

// Sofya Logo Component
function SofyaIcon({ className = "w-8 h-8" }: { className?: string }) {
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

interface Message {
  type: "user" | "assistant";
  text: string;
  references?: Array<{ title: string; page: number; category: string }>;
  timestamp: string;
}

export function MVChatSofya({ onNavigate }: MVChatSofyaProps) {
  const {
    messages: apiMessages,
    isLoading,
    error,
    sendMessage,
    initializeConversation,
  } = useAskSofya();

  // Hook de transcrição STT
  const {
    isRecording,
    transcription,
    isProcessing,
    error: transcriptionError,
    startTranscription,
    stopTranscription,
    clearTranscription,
  } = useSofyaTranscriber();

  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Converter mensagens da API para o formato do componente
  const messages: Message[] = apiMessages.map((msg) => ({
    type: msg.type,
    text: msg.text,
    references: msg.references,
    timestamp: msg.timestamp 
      ? new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      : new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  }));

  // Inicializar conversa ao montar
  useEffect(() => {
    initializeConversation();
  }, [initializeConversation]);

  // Atualizar input com transcrição
  useEffect(() => {
    if (transcription) {
      setInputValue(transcription);
    }
  }, [transcription]);

  // Handler para botão de microfone
  const handleMicClick = async () => {
    if (isRecording) {
      // Parar gravação
      await stopTranscription();
    } else {
      // Iniciar gravação
      clearTranscription();
      setInputValue(''); // Limpar input antes de começar
      try {
        await startTranscription();
      } catch (error) {
        console.error('Erro ao iniciar transcrição:', error);
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        alert(`Erro ao iniciar transcrição: ${errorMessage}`);
      }
    }
  };

  const quickPrompts = [
    "Protocolo de dor torácica",
    "Interações medicamentosas",
    "Diretrizes de hipertensão",
    "Manejo de diabetes tipo 2",
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
          <button className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white bg-[#008C77] rounded-lg transition-colors`}>
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
          <button 
            onClick={() => onNavigate("configuracoes")}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors`}
          >
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
        <div className="bg-gradient-to-r from-[#008C77] to-[#214B63] shadow-lg">
          <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex-1 flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                  <SofyaIcon className="w-full h-auto" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-bold text-white truncate">Ask Sofya</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-[#35D3C7] rounded-full animate-pulse flex-shrink-0"></div>
                    <span className="text-white/80 text-xs md:text-sm truncate">Baseado em Evidências Científicas</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">Verificado</span>
                  <span className="md:hidden">✓</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 md:gap-4 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "assistant" && (
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-[#008C77] to-[#214B63] rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                    <SofyaIcon className="w-full h-auto" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] md:max-w-3xl ${
                    message.type === "user"
                      ? "bg-[#008C77] text-white"
                      : "bg-white border border-gray-100"
                  } rounded-2xl p-4 md:p-5 shadow-sm`}
                >
                  {message.type === "assistant" ? (
                    <div className={`text-sm md:text-base leading-relaxed prose prose-sm md:prose-base max-w-none ${
                      message.type === "user" ? "prose-invert" : ""
                    }`}>
                      {(() => {
                        // Log do texto que será renderizado
                        console.log('🎨 Renderizando mensagem do assistente:');
                        console.log('📏 Tamanho:', message.text.length, 'caracteres');
                        console.log('📄 Primeiros 200 caracteres:', message.text.substring(0, 200));
                        console.log('📄 Últimos 200 caracteres:', message.text.substring(Math.max(0, message.text.length - 200)));
                        
                        try {
                          return (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                          // Estilizar parágrafos
                          p: ({ children }) => (
                            <p className="mb-3 last:mb-0 text-[#1A1D21]">{children}</p>
                          ),
                          // Estilizar negrito
                          strong: ({ children }) => (
                            <strong className="font-bold text-[#008C77]">{children}</strong>
                          ),
                          // Estilizar itálico
                          em: ({ children }) => (
                            <em className="italic text-[#214B63]">{children}</em>
                          ),
                          // Estilizar listas
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-3 space-y-1 text-[#1A1D21] ml-4">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-3 space-y-1 text-[#1A1D21] ml-4">{children}</ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-[#1A1D21]">{children}</li>
                          ),
                          // Estilizar cabeçalhos
                          h1: ({ children }) => (
                            <h1 className="text-xl font-bold mb-2 text-[#008C77]">{children}</h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-lg font-bold mb-2 text-[#008C77]">{children}</h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-base font-bold mb-2 text-[#214B63]">{children}</h3>
                          ),
                          // Estilizar código inline
                          code: ({ children, className }) => {
                            const isInline = !className;
                            return isInline ? (
                              <code className="bg-[#F5F7FA] text-[#E74C3C] px-1.5 py-0.5 rounded text-sm font-mono">
                                {children}
                              </code>
                            ) : (
                              <code className={className}>{children}</code>
                            );
                          },
                          // Estilizar blocos de código
                          pre: ({ children }) => (
                            <pre className="bg-[#F5F7FA] p-3 rounded-lg overflow-x-auto mb-3 text-sm">
                              {children}
                            </pre>
                          ),
                          // Estilizar links
                          a: ({ href, children }) => (
                            <a 
                              href={href} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#008C77] hover:text-[#007A68] underline"
                            >
                              {children}
                            </a>
                          ),
                          // Estilizar blockquotes
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-[#008C77] pl-4 italic my-3 text-[#706F6F]">
                              {children}
                            </blockquote>
                          ),
                          // Estilizar tabelas
                          table: ({ children }) => (
                            <div className="overflow-x-auto my-3">
                              <table className="min-w-full border-collapse border border-gray-200">
                                {children}
                              </table>
                            </div>
                          ),
                          th: ({ children }) => (
                            <th className="border border-gray-200 bg-[#F5F7FA] px-3 py-2 text-left font-bold text-[#1A1D21]">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="border border-gray-200 px-3 py-2 text-[#1A1D21]">
                              {children}
                            </td>
                          ),
                          // Estilizar linha horizontal
                          hr: () => (
                            <hr className="my-4 border-t border-gray-200" />
                          ),
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                          );
                        } catch (error) {
                          console.error('❌ Erro ao renderizar markdown:', error);
                          console.error('📄 Texto que causou erro:', message.text);
                          // Fallback: exibir texto simples em caso de erro
                          return (
                            <div className="text-[#1A1D21] whitespace-pre-wrap">
                              {message.text}
                            </div>
                          );
                        }
                      })()}
                    </div>
                  ) : (
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-line text-white">
                      {message.text}
                    </p>
                  )}

                  {message.references && message.references.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#008C77] uppercase tracking-wide">
                        <BookOpen className="w-4 h-4" />
                        Referências Científicas
                      </div>
                      <div className="space-y-2">
                        {message.references.map((ref, refIndex) => (
                          <div
                            key={refIndex}
                            className="bg-[#F5F7FA] rounded-lg p-3 hover:bg-[#E8ECEF] active:bg-[#E0E4E8] transition-colors cursor-pointer"
                          >
                            <div className="flex items-start gap-2 md:gap-3">
                              <FileText className="w-4 h-4 text-[#008C77] flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm font-bold text-[#1A1D21] mb-1 line-clamp-2">
                                  {ref.title}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-[#706F6F] flex-wrap">
                                  <span>Página {ref.page}</span>
                                  <span className="hidden md:inline">•</span>
                                  <Badge
                                    variant="outline"
                                    className="bg-[#008C77]/5 text-[#008C77] border-[#008C77]/20 text-xs"
                                  >
                                    {ref.category}
                                  </Badge>
                                </div>
                              </div>
                              <CheckCircle2 className="w-4 h-4 text-[#008C77] flex-shrink-0" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-[#706F6F] mt-3">
                    {message.timestamp}
                  </p>
                </div>

                {message.type === "user" && (
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-[#214B63] to-[#008C77] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">DS</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="px-4 md:px-6 lg:px-8 pb-3 md:pb-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-[#706F6F] uppercase tracking-wide mb-2 md:mb-3">
              Sugestões Rápidas
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:pb-0">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(prompt);
                    sendMessage(prompt);
                  }}
                  disabled={isLoading}
                  className="px-3 md:px-4 py-2 bg-white border border-gray-200 text-[#1A1D21] rounded-lg text-xs md:text-sm font-medium hover:border-[#008C77] hover:text-[#008C77] active:bg-[#F5F7FA] transition-colors whitespace-nowrap flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end gap-3">
              <button className="w-10 h-10 bg-[#F5F7FA] rounded-lg flex items-center justify-center hover:bg-[#E8ECEF] transition-colors">
                <Paperclip className="w-5 h-5 text-[#706F6F]" />
              </button>
              <div className="flex-1 bg-[#F5F7FA] rounded-xl p-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && inputValue.trim() && !isLoading) {
                      e.preventDefault();
                      sendMessage(inputValue);
                      setInputValue("");
                    }
                  }}
                  placeholder="Digite sua dúvida clínica baseada em evidências..."
                  className="bg-transparent border-0 focus-visible:ring-0 px-0"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleMicClick}
                disabled={isProcessing || isLoading}
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center transition-all
                  ${isRecording 
                    ? 'bg-[#E74C3C] hover:bg-[#C0392B] animate-pulse shadow-lg shadow-[#E74C3C]/50' 
                    : 'bg-[#F5F7FA] hover:bg-[#E8ECEF]'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                title={isRecording ? 'Parar gravação' : 'Iniciar gravação'}
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 text-[#706F6F] animate-spin" />
                ) : (
                  <Mic className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-[#706F6F]'}`} />
                )}
              </button>
              <button
                onClick={() => {
                  if (inputValue.trim() && !isLoading) {
                    sendMessage(inputValue);
                    setInputValue("");
                  }
                }}
                disabled={!inputValue.trim() || isLoading}
                className="w-12 h-12 bg-[#008C77] rounded-lg flex items-center justify-center hover:bg-[#007A68] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            <div className="mt-3">
              {isRecording && (
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#E74C3C] rounded-full animate-pulse"></div>
                  <p className="text-xs text-[#E74C3C] font-medium">Gravando... Fale agora</p>
                </div>
              )}
              {isProcessing && !isRecording && (
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Loader2 className="w-3 h-3 text-[#008C77] animate-spin" />
                  <p className="text-xs text-[#008C77] font-medium">Processando transcrição...</p>
                </div>
              )}
              <p className="text-xs text-[#706F6F] text-center">
                Todas as respostas são baseadas em literatura médica comprovada e protocolos atualizados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sofya Floating Assistant */}
      <SofyaFloating />
    </div>
  );
}