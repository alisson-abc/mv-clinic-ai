#!/bin/bash
# Script simplificado de deploy - versão direta sem muitas verificações

set -e  # Parar em caso de erro

PROJECT_ID="mv-inovacao-ia"
SERVICE_NAME="mv-clinic-ai"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🚀 Deploy MV Clinic AI"
echo "===================="
echo ""

# Configurar projeto
echo "📋 Configurando projeto..."
gcloud config set project ${PROJECT_ID} 2>&1

# Autenticar Docker
echo "🐳 Configurando Docker..."
gcloud auth configure-docker --quiet 2>&1

# Build
echo "🔨 Building..."
docker build -t ${IMAGE_NAME}:latest . 2>&1

# Push
echo "📤 Pushing..."
docker push ${IMAGE_NAME}:latest 2>&1

# Deploy
echo "🚀 Deploying..."
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
  --project ${PROJECT_ID} 2>&1

# URL
echo ""
echo "✅ Deploy concluído!"
echo "🌐 URL:"
gcloud run services describe ${SERVICE_NAME} \
  --region ${REGION} \
  --format 'value(status.url)' \
  --project ${PROJECT_ID} 2>&1
