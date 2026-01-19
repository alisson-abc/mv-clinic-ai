# 🚀 Deploy Imediato - Passo a Passo

Execute os seguintes comandos no terminal:

## 1. Verificar Pré-requisitos

```bash
# Verificar se gcloud está instalado
gcloud --version

# Verificar se docker está instalado
docker --version

# Se não estiverem instalados, instale:
# gcloud: https://cloud.google.com/sdk/docs/install
# docker: https://docs.docker.com/get-docker/
```

## 2. Autenticar no Google Cloud

```bash
# Fazer login
gcloud auth login

# Configurar projeto
gcloud config set project mv-inovacao-ia

# Verificar autenticação
gcloud auth list
```

## 3. Habilitar APIs Necessárias

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## 4. Configurar Docker para Container Registry

```bash
gcloud auth configure-docker
```

## 5. Build da Imagem Docker

```bash
cd /home/alisson/Applications/mv-clinic-ai

# Build da imagem
docker build -t gcr.io/mv-inovacao-ia/mv-clinic-ai:latest .
```

## 6. Push da Imagem para Container Registry

```bash
docker push gcr.io/mv-inovacao-ia/mv-clinic-ai:latest
```

## 7. Deploy no Cloud Run

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
  --timeout 300 \
  --project mv-inovacao-ia
```

## 8. Obter URL do Serviço

```bash
gcloud run services describe mv-clinic-ai \
  --region us-central1 \
  --format 'value(status.url)'
```

## ⚡ Script Rápido (Tudo de uma vez)

Se preferir, execute tudo de uma vez:

```bash
cd /home/alisson/Applications/mv-clinic-ai

# Autenticar e configurar
gcloud auth login
gcloud config set project mv-inovacao-ia
gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com
gcloud auth configure-docker

# Build e deploy
docker build -t gcr.io/mv-inovacao-ia/mv-clinic-ai:latest .
docker push gcr.io/mv-inovacao-ia/mv-clinic-ai:latest

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

# Obter URL
echo "🌐 URL do serviço:"
gcloud run services describe mv-clinic-ai \
  --region us-central1 \
  --format 'value(status.url)'
```

## 🔧 Troubleshooting

### Erro: "Permission denied"
```bash
gcloud auth login
gcloud auth application-default login
```

### Erro: "Billing not enabled"
Ative o billing no projeto: https://console.cloud.google.com/billing

### Erro: "API not enabled"
```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com
```

### Ver logs do deploy
```bash
gcloud builds list --limit=5
gcloud builds log [BUILD_ID]
```

### Ver logs do serviço
```bash
gcloud run services logs read mv-clinic-ai --region us-central1 --limit 50
```
