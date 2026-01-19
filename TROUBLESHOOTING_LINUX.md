# 🔧 Troubleshooting Deploy no Linux

## Problemas Comuns no Linux vs Windows

### 1. Permissões do Script

**Problema**: Script não executa
```bash
# Solução: Dar permissão de execução
chmod +x deploy.sh
chmod +x deploy-simple.sh
```

### 2. Diferenças de Shell

**Problema**: Script pode falhar dependendo do shell
```bash
# Verificar qual shell está sendo usado
echo $SHELL

# Forçar bash
bash deploy.sh
# ou
/bin/bash deploy.sh
```

### 3. Docker sem sudo

**Problema**: Precisa de sudo para docker
```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
# Fazer logout e login novamente
```

### 4. gcloud não encontrado no PATH

**Problema**: Comando gcloud não encontrado
```bash
# Verificar instalação
which gcloud

# Se não encontrar, adicionar ao PATH
export PATH=$PATH:/usr/lib/google-cloud-sdk/bin

# Ou reinstalar
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### 5. Problemas de Encoding/Line Endings

**Problema**: Script criado no Windows pode ter CRLF
```bash
# Converter line endings
dos2unix deploy.sh
# ou
sed -i 's/\r$//' deploy.sh
```

### 6. Variáveis de Ambiente

**Problema**: Variáveis não carregadas
```bash
# Carregar explicitamente
source ~/.bashrc
# ou
source ~/.profile
```

## Script de Diagnóstico

Execute este script para verificar tudo:

```bash
#!/bin/bash
echo "=== Diagnóstico de Deploy ==="
echo ""
echo "1. Shell: $SHELL"
echo "2. Usuário: $(whoami)"
echo "3. Diretório: $(pwd)"
echo ""
echo "4. gcloud:"
which gcloud && gcloud --version | head -1 || echo "   ❌ Não encontrado"
echo ""
echo "5. docker:"
which docker && docker --version || echo "   ❌ Não encontrado"
echo ""
echo "6. Projeto gcloud:"
gcloud config get-value project 2>/dev/null || echo "   ❌ Não configurado"
echo ""
echo "7. Autenticação:"
gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>/dev/null | head -1 || echo "   ❌ Não autenticado"
echo ""
echo "8. Permissões do script:"
ls -l deploy.sh | awk '{print $1, $9}'
echo ""
echo "9. Dockerfile existe:"
[ -f Dockerfile ] && echo "   ✅ Sim" || echo "   ❌ Não"
echo ""
```

## Solução Rápida - Deploy Manual

Se o script não funcionar, execute manualmente:

```bash
# 1. Verificar e configurar
gcloud config set project mv-inovacao-ia
gcloud auth configure-docker

# 2. Build
docker build -t gcr.io/mv-inovacao-ia/mv-clinic-ai:latest .

# 3. Push
docker push gcr.io/mv-inovacao-ia/mv-clinic-ai:latest

# 4. Deploy
gcloud run deploy mv-clinic-ai \
  --image gcr.io/mv-inovacao-ia/mv-clinic-ai:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 300
```

## Diferenças Windows vs Linux

| Aspecto | Windows | Linux |
|---------|---------|-------|
| Shell | PowerShell/CMD | Bash |
| Permissões | Menos restritivas | Mais restritivas |
| Docker | Docker Desktop | Docker Engine |
| PATH | Configurado automaticamente | Pode precisar configuração |
| Line endings | CRLF | LF |

## Logs Detalhados

Para ver o que está acontecendo:

```bash
# Executar com debug
bash -x deploy.sh

# Ou salvar logs
bash deploy.sh 2>&1 | tee deploy.log
```

## Contato

Se ainda não funcionar, compartilhe:
1. Saída de `bash -x deploy.sh`
2. Versão do gcloud: `gcloud --version`
3. Versão do docker: `docker --version`
4. Sistema operacional: `uname -a`
