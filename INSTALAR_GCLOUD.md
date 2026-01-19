# 📥 Instalar Google Cloud SDK (gcloud) no Linux

## Método 1: Instalação via Snap (Mais Fácil)

```bash
sudo snap install google-cloud-cli --classic
```

Após instalar, reinicie o terminal ou execute:
```bash
source ~/.bashrc
```

## Método 2: Instalação via Script Oficial (Recomendado)

```bash
# Baixar e executar script de instalação
curl https://sdk.cloud.google.com | bash

# Reiniciar shell
exec -l $SHELL

# Inicializar gcloud
gcloud init
```

## Método 3: Instalação via apt (Ubuntu/Debian)

```bash
# Adicionar repositório
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Importar chave
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

# Atualizar e instalar
sudo apt-get update && sudo apt-get install google-cloud-cli
```

## Verificar Instalação

```bash
gcloud --version
```

## Configurar Após Instalação

```bash
# Fazer login
gcloud auth login

# Configurar projeto
gcloud config set project mv-inovacao-ia

# Verificar configuração
gcloud config list
```

## Se gcloud já estiver instalado mas não no PATH

Se o gcloud já estiver instalado mas não estiver no PATH, adicione ao seu `~/.bashrc`:

```bash
# Adicionar ao PATH
export PATH=$PATH:/usr/lib/google-cloud-sdk/bin
# ou
export PATH=$PATH:$HOME/google-cloud-sdk/bin

# Recarregar
source ~/.bashrc
```

## Verificar Localização do gcloud

```bash
# Procurar no sistema
find /usr -name gcloud 2>/dev/null
find ~ -name gcloud 2>/dev/null

# Se encontrar, adicionar ao PATH
export PATH=$PATH:/caminho/encontrado
```
