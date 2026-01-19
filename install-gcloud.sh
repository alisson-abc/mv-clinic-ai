#!/bin/bash
# Script para instalar Google Cloud SDK

echo "📥 Instalando Google Cloud SDK..."
echo ""

# Verificar se já está instalado
if command -v gcloud &> /dev/null; then
    echo "✅ gcloud já está instalado!"
    gcloud --version
    exit 0
fi

# Verificar se snap está disponível
if command -v snap &> /dev/null; then
    echo "📦 Instalando via snap (método mais fácil)..."
    sudo snap install google-cloud-cli --classic
    if [ $? -eq 0 ]; then
        echo "✅ Instalação concluída via snap!"
        echo "🔄 Reinicie o terminal ou execute: source ~/.bashrc"
        exit 0
    fi
fi

# Método alternativo: script oficial
echo "📥 Baixando script de instalação oficial..."
curl https://sdk.cloud.google.com | bash

if [ $? -eq 0 ]; then
    echo "✅ Instalação concluída!"
    echo "🔄 Execute: exec -l \$SHELL"
    echo "🔐 Depois: gcloud init"
else
    echo "❌ Erro na instalação. Tente manualmente:"
    echo "   curl https://sdk.cloud.google.com | bash"
fi
