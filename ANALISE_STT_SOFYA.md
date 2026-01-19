# Análise do STT (Speech-to-Text) da Sofya

## 📋 Resumo Executivo

O STT da Sofya é implementado usando **Dialogflow CX Speech-to-Text** no backend (`chat-marketplace-back`). O processo funciona via WebSocket em tempo real, onde o áudio é enviado em chunks, processado pelo Dialogflow CX, e a transcrição é retornada ao cliente.

---

## 🏗️ Arquitetura do STT

### Fluxo de Dados

```
Cliente (Frontend)
    ↓
[Captura Áudio PCM] → [Envia chunks via WebSocket] → [Backend recebe]
    ↓
[Backend acumula no buffer] → [Usuário para de falar] → [Processa stream]
    ↓
[Dialogflow CX STT] → [Retorna transcrição] → [Envia via WebSocket]
    ↓
[Cliente recebe transcrição]
```

### Componentes Principais

1. **Frontend** (`chat-marketplace-front` ou `mv-clinic-ai`)
   - Captura áudio do microfone
   - Converte para PCM 16-bit
   - Envia chunks via WebSocket

2. **Backend** (`chat-marketplace-back`)
   - Recebe chunks de áudio
   - Acumula no buffer
   - Processa com Dialogflow CX quando usuário para de falar

3. **Dialogflow CX** (Google Cloud)
   - Faz STT (Speech-to-Text)
   - Retorna texto transcrito
   - Detecta intenções

---

## 📁 Arquivos Relevantes

### Backend (`chat-marketplace-back`)

#### 1. `websocket_handler.py`
**Responsabilidade:** Gerencia conexões WebSocket e processa áudio

**Fluxo STT:**
```python
# 1. Recebe chunks de áudio
async def handle_audio_chunk(self, audio_base64: str):
    audio_bytes = self.audio_processor.base64_to_bytes(audio_base64)
    self.audio_buffer.append(audio_bytes)  # Acumula no buffer

# 2. Quando usuário para de falar
async def handle_stop_speaking(self):
    if len(self.audio_buffer) > 0:
        await self.process_audio_stream()  # Processa buffer

# 3. Processa stream com Dialogflow
async def _process_dialogflow_stream(self, audio_chunks):
    async for response in self.dialogflow.streaming_detect_intent(...):
        # 4. Extrai transcrição da resposta
        if 'text' in response:
            transcription_msg = TranscriptionMessage(
                type=MessageType.TRANSCRIPTION,
                session_id=self.session_id,
                data={'text': response['text']}
            )
            await self.send_message(transcription_msg)  # Envia ao cliente
```

**Pontos Importantes:**
- Buffer de áudio: `deque(maxlen=100)` - armazena até 100 chunks
- VAD (Voice Activity Detection): Detecta quando usuário começa/para de falar
- Barge-in: Pode interromper processamento se usuário começar a falar novamente

#### 2. `dialogflow_service.py`
**Responsabilidade:** Integração com Dialogflow CX para STT

**Método Principal:**
```python
async def streaming_detect_intent(
    self,
    session_id: str,
    audio_chunks: AsyncIterator[bytes],
    sample_rate: int = 16000
) -> AsyncIterator[Dict[str, Any]]:
```

**Configuração de Áudio:**
```python
audio_config = InputAudioConfig(
    audio_encoding=AudioEncoding.AUDIO_ENCODING_LINEAR_16,  # PCM 16-bit
    sample_rate_hertz=sample_rate,  # 16000 ou 24000 Hz
    single_utterance=False,  # Permite múltiplas interações
)
```

**Processamento:**
1. Coleta todos os chunks do buffer
2. Cria stream de requisições para Dialogflow CX
3. Envia requisição inicial + chunks de áudio
4. Recebe respostas do Dialogflow
5. Extrai texto transcrito de `response.query_result.response_messages`

**Resposta do Dialogflow:**
```python
# Estrutura da resposta
{
    'text': 'Texto transcrito da fala do usuário',
    'intent': {
        'name': 'Nome da intenção',
        'confidence': 0.95
    },
    'parameters': {...},  # Parâmetros extraídos
    'payload': {...}  # Chamadas de ferramentas
}
```

#### 3. `audio_processor.py`
**Responsabilidade:** Conversão e processamento de áudio

**Funções Principais:**
- `base64_to_bytes()`: Converte Base64 → bytes
- `bytes_to_base64()`: Converte bytes → Base64
- `bytes_to_numpy()`: Converte bytes PCM → numpy array
- `resample_audio()`: Reamostra áudio para diferentes sample rates
- `normalize_audio()`: Normaliza áudio para evitar clipping

#### 4. `models/messages.py`
**Responsabilidade:** Define estrutura de mensagens WebSocket

**Mensagem de Transcrição:**
```python
class TranscriptionMessage(ServerMessage):
    type: Literal[MessageType.TRANSCRIPTION] = MessageType.TRANSCRIPTION
    data: Dict[str, str]  # {'text': 'Texto transcrito'}
```

**Formato JSON enviado:**
```json
{
  "type": "transcription",
  "session_id": "uuid-da-sessao",
  "data": {
    "text": "Texto transcrito da fala do usuário"
  },
  "timestamp": 1234567890.123
}
```

---

## 🔧 Configuração do STT

### Parâmetros Importantes

#### Sample Rate
- **Padrão:** 16000 Hz (Dialogflow CX)
- **Configurável:** Via `settings.sample_rate`
- **Suportado:** 16000, 24000 Hz

#### Formato de Áudio
- **Encoding:** LINEAR16 (PCM 16-bit)
- **Canais:** Mono (1 canal)
- **Formato de envio:** Base64

#### Buffer
- **Tamanho máximo:** 100 chunks
- **Tipo:** `deque` (FIFO - First In, First Out)
- **Limpeza:** Após processamento bem-sucedido

---

## 📡 Protocolo WebSocket

### Mensagens do Cliente → Servidor

#### 1. Chunk de Áudio
```json
{
  "type": "audio_chunk",
  "session_id": "uuid",
  "data": {
    "audio": "base64_encoded_audio_chunk"
  }
}
```

#### 2. Usuário Parou de Falar
```json
{
  "type": "stop_speaking",
  "session_id": "uuid"
}
```

ou

```json
{
  "type": "end_of_speech",
  "session_id": "uuid"
}
```

### Mensagens do Servidor → Cliente

#### 1. Transcrição
```json
{
  "type": "transcription",
  "session_id": "uuid",
  "data": {
    "text": "Texto transcrito"
  },
  "timestamp": 1234567890.123
}
```

#### 2. Intenção Detectada
```json
{
  "type": "intent",
  "session_id": "uuid",
  "data": {
    "intent": {
      "name": "Nome da intenção",
      "confidence": 0.95
    }
  }
}
```

---

## 🎯 Estratégias de IA Suportadas

O backend suporta múltiplas estratégias via parâmetro `strategy` na URL do WebSocket:

1. **`dialogflow`** - Dialogflow CX (padrão)
2. **`notebookmv`** - Notebook MV (RAG)
3. **`sofya`** - Sofya LLM

**Exemplo:**
```
wss://chat-marketplace-back-335214030459.us-central1.run.app/ws/voice-chat?strategy=sofya&language=pt-BR
```

---

## 🔍 Detalhes Técnicos

### Processamento de Stream

1. **Acumulação:**
   - Chunks são acumulados no buffer `audio_buffer`
   - Buffer é um `deque` com tamanho máximo de 100

2. **Trigger de Processamento:**
   - Quando usuário para de falar (`stop_speaking`)
   - Buffer é processado como stream completo

3. **Streaming para Dialogflow:**
   - Requisição inicial com configuração de áudio
   - Chunks subsequentes com dados de áudio
   - Cada chunk precisa incluir `language_code`

4. **Respostas:**
   - Dialogflow retorna respostas incrementais
   - Cada resposta pode conter:
     - Texto transcrito (`text`)
     - Intenção detectada (`intent`)
     - Parâmetros extraídos (`parameters`)
     - Chamadas de ferramentas (`payload`)

### VAD (Voice Activity Detection)

O backend também tem VAD próprio:
- **Arquivo:** `vad_service.py`
- **Uso:** Detecta se há fala no chunk de áudio
- **Função:** `is_speech(audio_bytes)` retorna `True/False`

**Nota:** O VAD do backend é usado para detectar início/fim de fala, mas o STT real é feito pelo Dialogflow CX.

---

## 🐛 Possíveis Problemas e Soluções

### 1. Transcrição não aparece
**Causa:** Buffer vazio ou Dialogflow não retornou texto
**Solução:** Verificar se chunks estão sendo enviados e se Dialogflow está configurado corretamente

### 2. Transcrição parcial
**Causa:** Stream foi interrompido (barge-in ou timeout)
**Solução:** Verificar logs do backend para ver se stream foi cancelado

### 3. Erro de encoding
**Causa:** Formato de áudio incorreto
**Solução:** Garantir que áudio está em PCM 16-bit, mono, 16kHz ou 24kHz

### 4. Latência alta
**Causa:** Muitos chunks no buffer ou rede lenta
**Solução:** Otimizar tamanho dos chunks ou reduzir frequência de envio

---

## 📊 Logs e Debug

### Backend Logs
```python
# Quando usuário começa a falar
logger.info(f"Sessão {session_id}: Usuário começou a falar")

# Quando processa stream
logger.debug("Iniciando streaming_detect_intent")
logger.debug(f"Enviando {len(audio_chunks_list)} chunks de áudio")

# Quando recebe transcrição
logger.debug(f"Resposta recebida: {type(response)}")
```

### Verificar no Frontend
```javascript
// Log quando recebe transcrição
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'transcription') {
    console.log('📝 Transcrição recebida:', data.data.text);
  }
};
```

---

## 🔄 Comparação: Frontend vs Backend

### Frontend (`mv-clinic-ai`)
- **VAD:** Detecta início/fim de fala (para UI)
- **STT:** Não faz STT diretamente, apenas envia áudio
- **Recebe:** Transcrição do backend via WebSocket

### Backend (`chat-marketplace-back`)
- **VAD:** Detecta fala nos chunks (para barge-in)
- **STT:** Faz STT usando Dialogflow CX
- **Envia:** Transcrição para o frontend via WebSocket

---

## 📝 Conclusão

O STT da Sofya funciona da seguinte forma:

1. **Frontend** captura áudio e envia chunks via WebSocket
2. **Backend** acumula chunks no buffer
3. Quando usuário para de falar, **backend** processa buffer
4. **Dialogflow CX** faz STT e retorna texto transcrito
5. **Backend** envia transcrição de volta via WebSocket
6. **Frontend** recebe e exibe transcrição

**Tecnologia:** Dialogflow CX Speech-to-Text (Google Cloud)
**Formato:** PCM 16-bit, Mono, 16kHz ou 24kHz
**Protocolo:** WebSocket (streaming em tempo real)
