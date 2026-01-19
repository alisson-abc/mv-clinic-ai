# 🚀 Guia de Teste Local - MV Clinic AI

## ✅ Servidor Iniciado com Sucesso!

O servidor de desenvolvimento está rodando localmente.

---

## 🌐 Acessar a Aplicação

**URL Local:** http://localhost:5173

Abra seu navegador e acesse a URL acima para ver a aplicação.

---

## 📋 Funcionalidades para Testar

### 1. **Ditado por Voz (Orb de Voz)**
- Acesse o Dashboard
- Clique em "Ditado Imediato"
- Permita acesso ao microfone quando solicitado
- Fale durante a consulta
- Veja a transcrição aparecer em tempo real
- Clique em "Finalizar" para estruturar em SOAP

**⚠️ Nota:** Para funcionar completamente, você precisa:
- Configurar `VITE_MARKETPLACE_API_KEY` no arquivo `.env`
- Configurar `VITE_WORKSPACE_UUID` no arquivo `.env`

### 2. **Ask Sofya - Chat Clínico**
- Acesse "Ask Sofya" no menu lateral
- Faça uma pergunta clínica (ex: "Qual o protocolo para sepse?")
- Veja a resposta com referências científicas

**⚠️ Nota:** Requer API Key configurada.

### 3. **Scanner de Documentos (OCR)**
- Acesse "Ler Exame/Foto" no dashboard
- Escolha o tipo de documento (Carteirinha ou Pedido Médico)
- Faça upload de um arquivo de imagem ou PDF
- Veja os dados extraídos automaticamente

**⚠️ Nota:** Requer API Key configurada.

---

## ⚙️ Configuração de Variáveis de Ambiente

### Criar arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com:

```env
# API Keys (OBTER NO MARKETPLACE MV)
VITE_MARKETPLACE_API_KEY=sua_api_key_aqui
VITE_WORKSPACE_UUID=seu_workspace_uuid_aqui
```

As URLs das APIs já estão configuradas com valores padrão, mas podem ser sobrescritas se necessário.

### URLs Padrão (já configuradas)

- **Voice Chat:** `wss://chat-marketplace-back-335214030459.us-central1.run.app/ws/voice-chat`
- **Ask Sofya:** `https://api.marketplace.mv.com.br/ask-sofya`
- **SOAP:** `https://api.marketplace.mv.com.br/soap`
- **Prescrição:** `https://api.marketplace.mv.com.br/prescriptions`
- **Kadok OCR:** `https://api.marketplace.mv.com.br/kadok`

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch" ou "Network Error"
- Verifique se as URLs das APIs estão corretas
- Verifique se sua API Key está configurada
- Verifique se há firewall bloqueando as requisições

### Erro: "WebSocket connection failed"
- Verifique se a URL do WebSocket está correta
- Verifique se há proxy/firewall bloqueando WebSocket
- Tente em outro navegador

### Erro: "Microphone permission denied"
- Permita acesso ao microfone no navegador
- Verifique as configurações de privacidade do navegador
- Tente em modo HTTPS (alguns navegadores exigem HTTPS para microfone)

### Erro: "Module not found" ou erros de importação
- Execute `npm install` novamente
- Limpe o cache: `rm -rf node_modules .vite` e `npm install`
- Reinicie o servidor: `npm run dev`

---

## 📊 Status do Servidor

- ✅ **Servidor:** Rodando em http://localhost:5173
- ✅ **Dependências:** Instaladas
- ⚠️ **API Keys:** Precisam ser configuradas no `.env`

---

## 🔄 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Parar o servidor
# Pressione Ctrl+C no terminal onde o servidor está rodando
```

---

## 📝 Próximos Passos

1. **Configurar API Keys:**
   - Obter API Key no Marketplace MV
   - Obter Workspace UUID
   - Adicionar no arquivo `.env`

2. **Testar Funcionalidades:**
   - Testar cada funcionalidade individualmente
   - Verificar logs no console do navegador (F12)
   - Verificar erros no terminal do servidor

3. **Reportar Problemas:**
   - Verificar logs de erro
   - Verificar configuração de variáveis de ambiente
   - Consultar documentação do Marketplace MV

---

## 🎯 Teste Rápido (Sem API Keys)

Mesmo sem API Keys configuradas, você pode:
- ✅ Navegar pela interface
- ✅ Ver todos os componentes
- ✅ Testar a UI/UX
- ⚠️ As chamadas de API falharão, mas a interface funcionará

---

**Status:** ✅ Servidor rodando em http://localhost:5173
