#!/bin/bash
set -e  # Parar em caso de erro
set -x  # Mostrar comandos executados

# Configurações
PROJECT_ID="mv-inovacao-ia"
SERVICE_NAME="mv-clinic-ai"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando deploy do MV Clinic AI no Cloud Run${NC}\n"
echo "📁 Diretório atual: $(pwd)"
echo "👤 Usuário: $(whoami)"
echo ""

# Verificar se gcloud está instalado
echo -e "${BLUE}🔍 Verificando gcloud...${NC}"
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI não encontrado. Instale o Google Cloud SDK.${NC}"
    echo "   Instale em: https://cloud.google.com/sdk/docs/install"
    exit 1
fi
echo "✅ gcloud encontrado: $(gcloud --version | head -1)"

# Verificar se docker está instalado
echo -e "${BLUE}🔍 Verificando docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker não encontrado. Instale o Docker.${NC}"
    echo "   Instale em: https://docs.docker.com/get-docker/"
    exit 1
fi
echo "✅ docker encontrado: $(docker --version)"
echo ""

# Configurar projeto
echo -e "${BLUE}📋 Configurando projeto: ${PROJECT_ID}${NC}"
gcloud config set project ${PROJECT_ID}

# Verificar autenticação
echo -e "${BLUE}🔐 Verificando autenticação...${NC}"
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${YELLOW}⚠️  Não autenticado. Fazendo login...${NC}"
    gcloud auth login
fi

# Configurar Docker para Container Registry
echo -e "${BLUE}🐳 Configurando Docker para Container Registry...${NC}"
gcloud auth configure-docker --quiet

# Build da imagem
echo -e "${BLUE}🔨 Building Docker image...${NC}"
echo "   Comando: docker build -t ${IMAGE_NAME}:latest ."
if ! docker build -t ${IMAGE_NAME}:latest .; then
    echo -e "${RED}❌ Erro ao fazer build da imagem Docker${NC}"
    echo "   Verifique os logs acima para mais detalhes"
    exit 1
fi
echo -e "${GREEN}✅ Build concluído com sucesso${NC}\n"

# Push da imagem
echo -e "${BLUE}📤 Pushing image to Container Registry...${NC}"
echo "   Comando: docker push ${IMAGE_NAME}:latest"
if ! docker push ${IMAGE_NAME}:latest; then
    echo -e "${RED}❌ Erro ao fazer push da imagem${NC}"
    echo "   Verifique se você está autenticado: gcloud auth configure-docker"
    exit 1
fi
echo -e "${GREEN}✅ Push concluído com sucesso${NC}\n"

# Deploy no Cloud Run
echo -e "${BLUE}🚀 Deploying to Cloud Run...${NC}"

# Verificar se existe arquivo .env para variáveis de ambiente
BUILD_ARGS=""
if [ -f .env ]; then
    echo -e "${BLUE}📝 Carregando variáveis de ambiente do arquivo .env...${NC}"
    # Carregar variáveis do .env e passar como build args
    export $(grep -v '^#' .env | xargs)
    BUILD_ARGS="--build-arg VITE_ASK_SOFYA_API_URL=${VITE_ASK_SOFYA_API_URL:-https://clinical-llm.aiaas.mv.com.br/v1/responses} --build-arg VITE_VOICE_CHAT_WS_URL=${VITE_VOICE_CHAT_WS_URL:-wss://chat-marketplace-back-335214030459.us-central1.run.app/ws/voice-chat}"
fi

# Rebuild com variáveis de ambiente se necessário
if [ ! -z "$BUILD_ARGS" ]; then
    echo -e "${BLUE}🔨 Rebuilding com variáveis de ambiente...${NC}"
    docker build $BUILD_ARGS -t ${IMAGE_NAME}:latest .
    docker push ${IMAGE_NAME}:latest
fi

echo -e "${BLUE}🚀 Deploying to Cloud Run...${NC}"
echo "   Serviço: ${SERVICE_NAME}"
echo "   Região: ${REGION}"
echo "   Projeto: ${PROJECT_ID}"
echo ""

if ! gcloud run deploy ${SERVICE_NAME} \
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
  --project ${PROJECT_ID}; then
    echo -e "${RED}❌ Erro ao fazer deploy${NC}"
    echo "   Verifique os logs acima para mais detalhes"
    exit 1
fi
echo -e "${GREEN}✅ Deploy concluído com sucesso${NC}\n"

# Obter URL do serviço
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} \
  --region ${REGION} \
  --format 'value(status.url)' \
  --project ${PROJECT_ID})

echo -e "\n${GREEN}✅ Deploy completed successfully!${NC}\n"
echo -e "${GREEN}🌐 Service URL: ${SERVICE_URL}${NC}\n"
