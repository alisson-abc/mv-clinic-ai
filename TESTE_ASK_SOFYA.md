# 🧪 Guia de Teste - Ask Sofya Chat

## ✅ Integração Implementada

O Ask Sofya Chat foi integrado com o endpoint real da API Gateway.

---

## 🔌 Endpoint Utilizado

**POC - Endereço Direto:** `https://clinical-llm.aiaas.mv.com.br/v1/responses`

**Método:** `POST`

**Headers:**
- `x-model`: `medium-reasoning` | `small-reasoning` | `large-reasoning` (obrigatório)
- `Content-Type`: `application/json`
- `x-api-key`: (opcional, se necessário para autenticação)

**Body:**
```json
{
  "input": [
    {
      "role": "user",
      "content": "Sua pergunta aqui"
    }
  ],
  "temperature": 0.1,
  "max_output_tokens": 500
}
```

---

## ⚙️ Configuração Necessária

### 1. Criar arquivo `.env` (Opcional para POC)

Na raiz do projeto, crie um arquivo `.env` se quiser customizar:

```env
# Endpoint direto da Sofya (POC)
VITE_ASK_SOFYA_API_URL=https://clinical-llm.aiaas.mv.com.br/v1/responses

# API Key (opcional, pode não ser necessária no endpoint direto)
VITE_MARKETPLACE_API_KEY=sua_api_key_aqui
```

**Nota:** Para POC, o endpoint direto pode funcionar sem API Key. Se houver erro de autenticação, adicione a API Key no `.env`.

---

## 🧪 Como Testar

### 1. Iniciar o Servidor

```bash
npm run dev
```

### 2. Acessar a Aplicação

Abra: http://localhost:5173

### 3. Navegar para Ask Sofya

- Clique em "Ask Sofya" no menu lateral
- Ou acesse diretamente a rota de chat

### 4. Fazer uma Pergunta

Exemplos de perguntas para testar:
- "Qual é o protocolo atual para tratamento de sepse?"
- "Qual antibiótico é mais seguro em paciente com clearance de creatinina de 35 ml/min?"
- "Protocolo de dor torácica"
- "Interações medicamentosas"

### 5. Verificar Resposta

A resposta deve:
- Aparecer na interface de chat
- Ser formatada corretamente
- Mostrar referências (se disponíveis)

---

## 🔍 Verificação de Erros

### Console do Navegador (F12)

Verifique o console para:
- Erros de CORS
- Erros de autenticação (403)
- Erros de formato de requisição (400, 422)
- Erros de rede

### Erros Comuns

#### 403 - Forbidden
**Causa:** API Key inválida ou ausente (pode não ser necessária no endpoint direto)
**Solução:** Tente adicionar `VITE_MARKETPLACE_API_KEY` no `.env` ou verifique se o endpoint requer autenticação

#### 400 - Bad Request
**Causa:** Formato da requisição inválido
**Solução:** Verifique os logs no console para ver o erro específico

#### CORS Error
**Causa:** Problema de CORS entre frontend e API
**Solução:** A API Gateway deve estar configurada para aceitar requisições do seu domínio

---

## 📊 Estrutura da Resposta

A API retorna:

```json
{
  "id": "string",
  "model": "medium-reasoning",
  "status": "completed",
  "output": [
    {
      "id": "string",
      "type": "reasoning",
      "content": [{"text": "..."}]
    },
    {
      "id": "string",
      "type": "message",
      "content": [{"text": "Resposta final..."}]
    }
  ],
  "usage": {
    "input_tokens": 100,
    "output_tokens": 200,
    "total_tokens": 300
  }
}
```

O serviço extrai automaticamente o texto do output tipo "message".

---

## 🎯 Próximos Passos

1. ✅ **Testar com API Key real**
2. ✅ **Verificar respostas**
3. ✅ **Testar diferentes modelos** (small, medium, large)
4. ✅ **Testar histórico de conversa**
5. ⏭️ **Implementar outras funcionalidades** (SOAP, Prescrição, etc.)

---

## 📝 Notas Técnicas

- O histórico de conversa é mantido localmente no componente
- Cada mensagem é enviada com o histórico das últimas 10 mensagens para contexto
- O modelo padrão é `medium-reasoning`
- A temperatura padrão é `0.1` (respostas mais determinísticas)
- O máximo de tokens de saída padrão é `500`

---

**Status:** ✅ Pronto para teste (POC com endpoint direto - API Key pode não ser necessária)
