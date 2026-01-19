# 🎤 Guia de Teste - Chat de Voz (Orb de Voz)

## ✅ Status do Servidor

**URL:** http://localhost:5173  
**Status:** Verificar se está rodando

---

## 🚀 Como Testar

### 1. Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:5173
```

### 2. Navegar para o Modo de Voz

**Opção A - Via Dashboard:**
1. Na tela inicial (Landing), clique em "Entrar" ou "Começar"
2. No Dashboard, clique no botão grande azul com ícone de microfone
3. Texto: "Ditado Imediato"

**Opção B - Via Código (para teste rápido):**
- Abra o console do navegador (F12)
- Execute: `window.location.hash = '#listening'` (se usar hash routing)
- Ou altere o estado inicial em `App.tsx` para `"listening"`

### 3. Verificar Interface

Você deve ver:
- ✅ Tela azul (#0056D2) com animação de waveform
- ✅ Indicador de status (Conectando/Gravando/Pausado)
- ✅ Área de transcrição (branca com blur)
- ✅ Botões de controle (Pausar, Finalizar, Fechar)

### 4. Fluxo de Teste

#### Teste 1: Conexão WebSocket
1. Ao abrir a tela, deve conectar automaticamente
2. Verifique no console (F12) se há mensagem: "Voice Chat WebSocket connected"
3. Indicador deve mudar de "Conectando..." para "Gravando..."

#### Teste 2: Permissão de Microfone
1. O navegador deve solicitar permissão de microfone
2. Clique em "Permitir"
3. Se negar, verá erro: "Erro ao acessar microfone. Verifique as permissões."

#### Teste 3: Captura de Áudio
1. Após permitir microfone, o modo de voz inicia automaticamente
2. Fale algo (ex: "Olá, como você está?")
3. A animação de waveform deve reagir ao som
4. Verifique no console se há logs de chunks sendo enviados

#### Teste 4: Recebimento de Resposta
1. Após falar, aguarde alguns segundos
2. O servidor deve processar e retornar áudio
3. Você deve ouvir a resposta do assistente
4. A transcrição deve aparecer na tela

#### Teste 5: Barge-in (Interrupção)
1. Enquanto o assistente está falando, comece a falar
2. O áudio do assistente deve parar imediatamente
3. Sua fala deve ser capturada

#### Teste 6: Controles
1. **Botão Pausar:** Clique para pausar/retomar gravação
2. **Botão Finalizar:** Finaliza e estrutura em SOAP (requer transcrição)
3. **Botão Fechar:** Volta para o dashboard

---

## 🔍 Verificação de Erros

### Console do Navegador (F12)

Abra o console e verifique:

**✅ Sem Erros:**
- Nenhuma mensagem em vermelho
- Logs informativos sobre conexão e chunks

**❌ Possíveis Erros:**

1. **CORS Error:**
   ```
   Access to fetch at 'wss://...' has been blocked by CORS policy
   ```
   **Solução:** O WebSocket pode precisar de configuração CORS no backend

2. **WebSocket Connection Failed:**
   ```
   WebSocket connection to 'wss://...' failed
   ```
   **Solução:** Verifique se a URL do WebSocket está correta em `src/services/config.ts`

3. **Microphone Permission Denied:**
   ```
   Error accessing microphone
   ```
   **Solução:** Permita acesso ao microfone nas configurações do navegador

4. **ScriptProcessorNode Deprecated:**
   ```
   ScriptProcessorNode is deprecated
   ```
   **Nota:** É apenas um aviso, não um erro. Funciona normalmente.

### Network Tab (F12 > Network)

1. Abra a aba "Network" no DevTools
2. Filtre por "WS" (WebSocket)
3. Procure pela conexão para `chat-marketplace-back-335214030459.us-central1.run.app`
4. Verifique:
   - **Status:** Deve ser "101 Switching Protocols"
   - **Messages:** Deve mostrar mensagens sendo enviadas/recebidas

---

## 📊 Estrutura Esperada das Mensagens

### Envio (WebSocket)

**Chunk de Áudio:**
```json
{
  "type": "audio_chunk",
  "data": "base64_encoded_pcm_data...",
  "sessionId": "optional"
}
```

**Fim de Fala:**
```json
{
  "type": "end_of_speech",
  "sessionId": "optional"
}
```

### Recebimento (WebSocket)

**Áudio:**
- ArrayBuffer ou Blob (binário)
- Ou JSON: `{type: "audio_chunk", data: "base64..."}`

**Texto:**
```json
{
  "type": "text",
  "message": "Texto transcrito..."
}
```

---

## 🎯 Checklist de Teste

- [ ] Servidor rodando em http://localhost:5173
- [ ] Interface do modo de voz carrega corretamente
- [ ] WebSocket conecta automaticamente
- [ ] Permissão de microfone solicitada e concedida
- [ ] Modo de voz inicia automaticamente após conexão
- [ ] Animação de waveform reage ao som
- [ ] Chunks de áudio são enviados (verificar console)
- [ ] Resposta de áudio é recebida e reproduzida
- [ ] Transcrição aparece na tela
- [ ] Barge-in funciona (interrompe reprodução)
- [ ] Botão pausar funciona
- [ ] Sem erros no console
- [ ] Conexão WebSocket aparece no Network tab

---

## 🐛 Troubleshooting

### Problema: WebSocket não conecta

**Verificar:**
1. URL do WebSocket em `src/services/config.ts`
2. Se o backend está acessível
3. Console para erros de conexão

**Solução:**
- Verifique se `VITE_VOICE_CHAT_WS_URL` está configurado no `.env`
- Teste a URL do WebSocket diretamente

### Problema: Microfone não funciona

**Verificar:**
1. Permissões do navegador
2. Se outro aplicativo está usando o microfone
3. Console para erros de acesso

**Solução:**
- Vá em Configurações do Navegador > Privacidade > Microfone
- Permita acesso para localhost:5173

### Problema: Áudio não é reproduzido

**Verificar:**
1. Console para erros de decodificação
2. Se o áudio está sendo recebido (Network tab)
3. Volume do sistema

**Solução:**
- Verifique se o formato do áudio está correto
- Teste com diferentes formatos (PCM, WebM, MP3)

### Problema: Transcrição não aparece

**Verificar:**
1. Se mensagens de texto estão sendo recebidas
2. Console para logs de mensagens
3. Estado `transcription` no hook

**Solução:**
- Verifique se o servidor está retornando mensagens de texto
- Verifique o formato das mensagens no console

---

## 📝 Notas Técnicas

- **Sample Rate:** 24kHz
- **Formato:** PCM Int16
- **VAD Threshold:** 0.02 (configurável)
- **Volume Threshold:** 0.01 (filtra chunks silenciosos)
- **Silence Duration:** 1000ms (1 segundo para fim de fala)

---

## 🔧 Configurações Avançadas

### Ajustar Sensibilidade do VAD

No console do navegador:
```javascript
// Mais sensível (captura mais ruído)
vadService.setVadThreshold(0.01);

// Menos sensível (só voz clara)
vadService.setVadThreshold(0.05);
```

### Ajustar Threshold de Volume

```javascript
// Envia mais áudio
audioCapture.setVolumeThreshold(0.005);

// Só envia áudio com volume alto
audioCapture.setVolumeThreshold(0.02);
```

---

**Boa sorte com os testes! 🚀**

Se encontrar algum problema, verifique o console e me avise!
