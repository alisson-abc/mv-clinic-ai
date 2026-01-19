# Guia de Deploy no Google Cloud Run

Este guia explica como fazer o deploy da aplicação MV Clinic AI no Google Cloud Run.

## Pré-requisitos

1. **Google Cloud SDK (gcloud)** instalado
2. **Docker** instalado
3. **Conta Google Cloud** com projeto ativo
4. **Billing** habilitado no projeto

## Configuração Inicial

### 1. Instalar Google Cloud SDK

```bash
# Ubuntu/Debian
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Ou via apt
sudo apt-get update && sudo apt-get install google-cloud-sdk
```

### 2. Autenticar no Google Cloud

```bash
gcloud auth login
gcloud config set project mv-inovacao-ia
```

### 3. Habilitar APIs necessárias

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## Método 1: Deploy via Cloud Build (Recomendado)

### Passo 1: Criar trigger no Cloud Build

```bash
gcloud builds triggers create github \
  --repo-name=mv-clinic-ai \
  --repo-owner=SEU_USUARIO_GITHUB \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

### Passo 2: Deploy manual via Cloud Build

```bash
gcloud builds submit --config cloudbuild.yaml
```

## Método 2: Deploy Manual via gcloud

### Passo 1: Build e push da imagem

```bash
# Build da imagem
docker build -t gcr.io/mv-inovacao-ia/mv-clinic-ai:latest .

# Autenticar no Container Registry
gcloud auth configure-docker

# Push da imagem
docker push gcr.io/mv-inovacao-ia/mv-clinic-ai:latest
```

### Passo 2: Deploy no Cloud Run

```bash
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

## Método 3: Deploy via Script Automatizado

Crie um script `deploy.sh`:

```bash
#!/bin/bash

PROJECT_ID="mv-inovacao-ia"
SERVICE_NAME="mv-clinic-ai"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🔨 Building Docker image..."
docker build -t ${IMAGE_NAME}:latest .

echo "📤 Pushing image to Container Registry..."
docker push ${IMAGE_NAME}:latest

echo "🚀 Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME}:latest \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 300 \
  --project ${PROJECT_ID}

echo "✅ Deploy completed!"
echo "🌐 Service URL: $(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)')"
```

Torne o script executável e execute:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Variáveis de Ambiente

**IMPORTANTE**: As variáveis `VITE_*` são injetadas no **build time**, não no runtime. Elas precisam estar disponíveis durante o build do Docker.

### Opção 1: Usar arquivo .env (Recomendado)

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com suas variáveis:
```bash
nano .env
```

3. O script `deploy.sh` carregará automaticamente as variáveis do `.env`

### Opção 2: Passar variáveis durante o build

```bash
docker build \
  --build-arg VITE_ASK_SOFYA_API_URL=https://clinical-llm.aiaas.mv.com.br/v1/responses \
  --build-arg VITE_VOICE_CHAT_WS_URL=wss://chat-marketplace-back-335214030459.us-central1.run.app/ws/voice-chat \
  -t gcr.io/mv-inovacao-ia/mv-clinic-ai:latest .

docker push gcr.io/mv-inovacao-ia/mv-clinic-ai:latest
```

### Opção 3: Usar Cloud Build com substituições

Edite o `cloudbuild.yaml` e adicione `substitutions`:

```yaml
substitutions:
  _ASK_SOFYA_API_URL: 'https://clinical-llm.aiaas.mv.com.br/v1/responses'
  _VOICE_CHAT_WS_URL: 'wss://chat-marketplace-back-335214030459.us-central1.run.app/ws/voice-chat'
```

E no Dockerfile, use:
```dockerfile
ARG VITE_ASK_SOFYA_API_URL=${_ASK_SOFYA_API_URL}
```

## Verificação

Após o deploy, verifique:

```bash
# Obter URL do serviço
gcloud run services describe mv-clinic-ai \
  --region us-central1 \
  --format 'value(status.url)'

# Ver logs
gcloud run services logs read mv-clinic-ai \
  --region us-central1 \
  --limit 50
```

## Troubleshooting

### Erro: "Permission denied"
```bash
gcloud auth login
gcloud auth application-default login
```

### Erro: "Billing not enabled"
Ative o billing no projeto via [Console](https://console.cloud.google.com/billing)

### Erro: "API not enabled"
```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

### Ver logs detalhados
```bash
gcloud run services logs read mv-clinic-ai --region us-central1 --limit 100
```

## Custos

Cloud Run cobra apenas pelo uso:
- **CPU**: $0.00002400 por vCPU-segundo
- **Memória**: $0.00000250 por GiB-segundo
- **Requisições**: $0.40 por milhão

Com as configurações acima (512Mi, 1 CPU), o custo estimado é muito baixo para tráfego moderado.

## Próximos Passos

1. Configurar domínio customizado (opcional)
2. Configurar CDN (opcional)
3. Configurar monitoramento e alertas
4. Configurar CI/CD automático
