# Guia de Implementação - MV Clinic AI

## 🚀 Primeira Versão - Protótipo Funcional

Esta é a primeira versão do sistema MV Clinic AI, implementada usando apenas os serviços de IA do Marketplace MV, sem integração com o PEP (que será feita na segunda fase).

---

## 📋 Funcionalidades Implementadas

### ✅ Funcionalidades Completas

1. **Orb de Voz / Ditado por Voz**
   - Chat por voz em tempo real via WebSocket
   - Transcrição em tempo real (STT)
   - Respostas em voz (TTS)
   - Integração com Sofya LLM

2. **Ask Sofya - Chat Assistente**
   - Chat clínico baseado em evidências
   - Respostas com referências científicas
   - Múltiplas estratégias de IA

3. **Estruturação SOAP**
   - Estruturação automática de transcrições
   - Formato SOAP completo
   - Integração com ditado por voz

4. **Prescrição Digital**
   - Extração de prescrições de transcrições
   - Alertas de interações medicamentosas
   - Validação de medicamentos

5. **Scanner de Documentos (OCR)**
   - Extração de dados de carteirinhas
   - Extração de pedidos médicos
   - Verificação de integridade

---

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Chat Marketplace Voice Chat (Orb de Voz)
VITE_VOICE_CHAT_WS_URL=wss://chat-marketplace-back-335214030459.us-central1.run.app/ws/voice-chat
VITE_VOICE_CHAT_API_URL=https://chat-marketplace-back-335214030459.us-central1.run.app

# Ask Sofya Chat SDK
VITE_ASK_SOFYA_API_URL=https://api.marketplace.mv.com.br/ask-sofya

# Estruturação SOAP
VITE_SOAP_API_URL=https://api.marketplace.mv.com.br/soap

# Sofya Prescriber API
VITE_PRESCRIBER_API_URL=https://api.marketplace.mv.com.br/prescriptions

# Kadok OCR
VITE_KADOK_API_URL=https://api.marketplace.mv.com.br/kadok

# Transcrição de áudio
VITE_TRANSCRIPTION_API_URL=https://api.marketplace.mv.com.br/transcription

# Notebook MV
VITE_NOTEBOOK_MV_API_URL=https://api.marketplace.mv.com.br/notebook

# API Keys (obter no Marketplace MV)
VITE_MARKETPLACE_API_KEY=your_api_key_here
VITE_WORKSPACE_UUID=your_workspace_uuid_here
```

### 2. Instalação

```bash
# Instalar dependências
npm install

# Ou com pnpm
pnpm install
```

### 3. Executar

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

---

## 📁 Estrutura de Arquivos

```
src/
├── services/           # Serviços de API
│   ├── config.ts       # Configuração de APIs
│   ├── voiceChat.ts    # Chat por voz (Orb de Voz)
│   ├── askSofya.ts     # Ask Sofya Chat SDK
│   ├── soap.ts         # Estruturação SOAP
│   ├── prescription.ts # Prescrição Digital
│   └── kadok.ts        # OCR de documentos
├── hooks/              # Hooks React
│   ├── useVoiceChat.ts # Hook para chat por voz
│   └── useAskSofya.ts  # Hook para Ask Sofya
└── app/
    └── components/     # Componentes React
        ├── listening-mode.tsx    # Ditado por voz
        ├── mv-chat-sofya.tsx     # Chat Ask Sofya
        ├── soap-view.tsx          # Visualização SOAP
        ├── prescription-review.tsx # Revisão de prescrição
        └── document-scanner.tsx    # Scanner OCR
```

---

## 🔌 Integrações Implementadas

### 1. Chat Marketplace Voice Chat (Orb de Voz)

**Arquivo:** `src/services/voiceChat.ts`  
**Hook:** `src/hooks/useVoiceChat.ts`  
**Componente:** `src/app/components/listening-mode.tsx`

**Uso:**
```typescript
import { useVoiceChat } from '@/hooks/useVoiceChat';

const {
  isConnected,
  isRecording,
  transcription,
  connect,
  startRecording,
  stopRecording,
} = useVoiceChat({
  strategy: 'sofya',
  language: 'pt-BR',
});
```

### 2. Ask Sofya Chat SDK

**Arquivo:** `src/services/askSofya.ts`  
**Hook:** `src/hooks/useAskSofya.ts`  
**Componente:** `src/app/components/mv-chat-sofya.tsx`

**Uso:**
```typescript
import { useAskSofya } from '@/hooks/useAskSofya';

const {
  messages,
  isLoading,
  sendMessage,
  initializeConversation,
} = useAskSofya();
```

### 3. Estruturação SOAP

**Arquivo:** `src/services/soap.ts`

**Uso:**
```typescript
import { structureSOAP } from '@/services/soap';

const result = await structureSOAP({
  transcription: 'Texto da transcrição...',
  format: 'SOAP',
  specialty: 'Cardiologia',
});
```

### 4. Prescrição Digital

**Arquivo:** `src/services/prescription.ts`

**Uso:**
```typescript
import { extractPrescription } from '@/services/prescription';

const result = await extractPrescription({
  transcription: 'Texto da prescrição...',
  patient_context: {
    age: 45,
    weight: 70,
    allergies: ['Penicilina'],
  },
});
```

### 5. Kadok OCR

**Arquivo:** `src/services/kadok.ts`

**Uso:**
```typescript
import { extractHealthInsuranceCard } from '@/services/kadok';

const result = await extractHealthInsuranceCard(file, 'Nome do Paciente');
```

---

## 🎯 Fluxo de Uso

### 1. Ditado por Voz → SOAP → Prescrição

1. Usuário acessa "Ditado Imediato"
2. Sistema conecta ao WebSocket de voz
3. Usuário fala durante a consulta
4. Transcrição aparece em tempo real
5. Ao finalizar, sistema estrutura em SOAP
6. Usuário revisa SOAP
7. Sistema gera prescrição a partir do plano
8. Usuário revisa e assina prescrição

### 2. Ask Sofya - Dúvidas Clínicas

1. Usuário acessa "Ask Sofya"
2. Sistema inicializa conversa
3. Usuário faz pergunta clínica
4. Sistema responde com evidências científicas
5. Referências são exibidas

### 3. Scanner de Documentos

1. Usuário acessa "Ler Exame/Foto"
2. Sistema abre câmera
3. Usuário captura documento
4. Sistema extrai dados via OCR
5. Usuário revisa e confirma dados

---

## ⚠️ Observações Importantes

### URLs das APIs

As URLs das APIs no arquivo de configuração são **exemplos**. Você precisa:

1. Obter as URLs reais no Marketplace MV
2. Obter sua API Key
3. Obter seu Workspace UUID
4. Configurar no arquivo `.env`

### Autenticação

Alguns serviços podem requerer autenticação adicional. Verifique a documentação de cada serviço no Marketplace MV.

### Tratamento de Erros

Todos os serviços incluem tratamento básico de erros. Em produção, você deve:

- Implementar retry automático
- Mostrar mensagens de erro amigáveis
- Logar erros para monitoramento
- Implementar fallbacks

---

## 🚧 Próximos Passos (Fase 2)

1. **Integração com PEP MV**
   - API de pacientes
   - API de prontuário eletrônico
   - API de agenda
   - Envio de prescrições

2. **Melhorias**
   - Sistema de autenticação
   - Assinatura digital certificada
   - Validação avançada de interações
   - Dashboard com dados reais

3. **Otimizações**
   - Cache de respostas
   - Offline support
   - Performance improvements

---

## 📞 Suporte

Para dúvidas sobre:
- **Serviços do Marketplace:** Consulte a documentação do Marketplace MV
- **Implementação:** Consulte os comentários no código
- **Bugs:** Abra uma issue no repositório

---

## 📝 Licença

Este projeto é propriedade da MV Tecnologia.
