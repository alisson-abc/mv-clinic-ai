# 🧪 Guia de Teste - Ask Sofya no Localhost

## ✅ Status do Servidor

**URL:** http://localhost:5173  
**Status:** ✅ Servidor rodando

---

## 🚀 Como Testar

### 1. Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:5173
```

### 2. Navegar para Ask Sofya

**Opção A - Via Menu Lateral:**
- Clique no botão "Ask Sofya" no menu lateral (ícone de mensagem)
- O botão deve estar destacado em verde (#008C77)

**Opção B - Via Código (para teste rápido):**
- Abra o console do navegador (F12)
- Execute: `window.location.hash = '#chat'` (se usar hash routing)
- Ou altere o estado inicial em `App.tsx` para `"chat"`

### 3. Verificar Interface

Você deve ver:
- ✅ Header com logo da Sofya e texto "Ask Sofya"
- ✅ Badge "Verificado" no canto superior direito
- ✅ Mensagem de boas-vindas da Sofya
- ✅ Campo de input na parte inferior
- ✅ Botões de sugestões rápidas acima do input

### 4. Fazer uma Pergunta

**Teste 1 - Pergunta Simples:**
```
Olá, como você está?
```

**Teste 2 - Pergunta Clínica:**
```
Qual é o protocolo para tratamento de sepse?
```

**Teste 3 - Usar Sugestão Rápida:**
- Clique em um dos botões de sugestão rápida:
  - "Protocolo de dor torácica"
  - "Interações medicamentosas"
  - "Diretrizes de hipertensão"
  - "Manejo de diabetes tipo 2"

### 5. Verificar Resposta

**O que deve acontecer:**
1. ✅ Sua mensagem aparece imediatamente no chat (lado direito, fundo verde)
2. ✅ Botão de envio mostra spinner (loading)
3. ✅ Após alguns segundos, resposta da Sofya aparece (lado esquerdo, fundo branco)
4. ✅ Spinner desaparece
5. ✅ Resposta contém texto relevante sobre a pergunta

---

## 🔍 Verificação de Erros

### Console do Navegador (F12)

Abra o console e verifique:

**✅ Sem Erros:**
- Nenhuma mensagem em vermelho
- Apenas logs informativos (se houver)

**❌ Possíveis Erros:**

1. **CORS Error:**
   ```
   Access to fetch at 'https://clinical-llm.aiaas.mv.com.br/v1/responses' 
   from origin 'http://localhost:5173' has been blocked by CORS policy
   ```
   **Solução:** O endpoint pode precisar de configuração CORS no backend

2. **Network Error:**
   ```
   Failed to fetch
   ```
   **Solução:** Verifique sua conexão com a internet

3. **400/422 Bad Request:**
   ```
   Ask Sofya API error: 400
   ```
   **Solução:** Verifique o formato da requisição no console

4. **403 Forbidden:**
   ```
   Ask Sofya API error: 403
   ```
   **Solução:** Pode precisar de API Key (mas para POC não deveria ser necessário)

### Network Tab (F12 > Network)

1. Abra a aba "Network" no DevTools
2. Filtre por "Fetch/XHR"
3. Faça uma pergunta
4. Procure pela requisição para `clinical-llm.aiaas.mv.com.br`
5. Verifique:
   - **Status:** Deve ser `200 OK`
   - **Request Headers:** Deve ter `x-model: medium-reasoning`
   - **Request Payload:** Deve ter `input` com array de mensagens
   - **Response:** Deve ter `output` com `reasoning` e `message`

---

## 📊 Estrutura Esperada da Requisição

**URL:** `POST https://clinical-llm.aiaas.mv.com.br/v1/responses`

**Headers:**
```json
{
  "Content-Type": "application/json",
  "x-model": "medium-reasoning"
}
```

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
  "max_output_tokens": 1000
}
```

---

## 🎯 Checklist de Teste

- [ ] Servidor rodando em http://localhost:5173
- [ ] Interface do Ask Sofya carrega corretamente
- [ ] Mensagem de boas-vindas aparece
- [ ] Campo de input está funcional
- [ ] Botão de envio funciona
- [ ] Pergunta simples retorna resposta
- [ ] Pergunta clínica retorna resposta relevante
- [ ] Sugestões rápidas funcionam
- [ ] Loading spinner aparece durante processamento
- [ ] Sem erros no console
- [ ] Requisição aparece no Network tab com status 200

---

## 🐛 Troubleshooting

### Problema: Mensagem não envia

**Verificar:**
1. Console do navegador para erros
2. Network tab para ver se a requisição foi feita
3. Se o botão está desabilitado (deve estar habilitado quando há texto)

### Problema: Resposta não aparece

**Verificar:**
1. Console para erros de parsing
2. Network tab para ver a resposta da API
3. Se `extractResponseText` está funcionando corretamente

### Problema: Erro CORS

**Solução Temporária (apenas para desenvolvimento):**
- Use uma extensão de navegador para desabilitar CORS
- Ou configure um proxy no Vite

**Solução Permanente:**
- Configure CORS no backend da Sofya para aceitar `localhost:5173`

---

## 📝 Notas

- O endpoint direto funciona sem API Key para POC
- O histórico de conversa é mantido localmente (últimas 10 mensagens)
- Cada mensagem é enviada com o histórico para contexto
- O modelo padrão é `medium-reasoning`
- A temperatura padrão é `0.1` (respostas mais determinísticas)
- O máximo de tokens de saída padrão é `1000`

---

**Boa sorte com os testes! 🚀**
