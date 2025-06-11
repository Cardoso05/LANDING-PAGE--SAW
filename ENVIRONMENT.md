# 🔐 Configuração de Variáveis de Ambiente

## 📋 Variáveis Necessárias

### Para Desenvolvimento Local
Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_GEMINI_API_KEY=sua_api_key_do_gemini
REACT_APP_WHATSAPP_NUMBER=5511999999999
REACT_APP_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

### Para Produção (GitHub Secrets)
Configure estes secrets no GitHub:

```
GEMINI_API_KEY = sua_api_key_do_gemini
WHATSAPP_NUMBER = 5511999999999
GEMINI_API_URL = https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
VPS_HOST = seu-ip-vps
VPS_USERNAME = root
VPS_PASSWORD = senha-ssh
```

## 🚀 Como Configurar

### 1. Desenvolvimento Local
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar com suas credenciais
nano .env
```

### 2. GitHub Actions (Produção)
1. Acesse: `Settings > Secrets and variables > Actions`
2. Adicione cada secret individualmente
3. Nome exato conforme listado acima

### 3. VPS (Se necessário)
```bash
# Se usar PM2 ou similar, configure:
export REACT_APP_GEMINI_API_KEY="sua_key"
export REACT_APP_WHATSAPP_NUMBER="seu_numero"
```

## 🔒 Segurança

### ✅ Protegido
- ✅ `.env` no `.gitignore`
- ✅ Secrets do GitHub criptografados
- ✅ Variáveis não expostas no build final
- ✅ Fallbacks para valores padrão

### ⚠️ Importante
- 🚫 **NUNCA** commite arquivos `.env`
- 🚫 **NUNCA** exponha API keys no código
- ✅ Use apenas `REACT_APP_` prefix
- ✅ Mantenha `.env.example` atualizado

## 🛠️ Comandos Úteis

```bash
# Verificar variáveis carregadas
echo $REACT_APP_GEMINI_API_KEY

# Testar build local
npm run build

# Verificar se .env está no gitignore
git status # .env não deve aparecer
```

## 🔄 Processo de Atualização

### Mudança de API Key:
1. **Local**: Atualizar `.env`
2. **GitHub**: Atualizar secret `GEMINI_API_KEY`
3. **VPS**: Variáveis são injetadas no build

### Novo Número WhatsApp:
1. **Local**: Atualizar `.env`
2. **GitHub**: Atualizar secret `WHATSAPP_NUMBER`
3. Deploy automático aplicará

## 📱 Teste Rápido

```javascript
// No console do navegador:
console.log(process.env.REACT_APP_GEMINI_API_KEY); // undefined (seguro!)

// No código React:
const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // funciona
```

## 🚨 Troubleshooting

### Erro: "API Key não encontrada"
- ✅ Verificar se variável tem prefixo `REACT_APP_`
- ✅ Reiniciar servidor de desenvolvimento
- ✅ Verificar se `.env` está na raiz do projeto

### Erro no Deploy
- ✅ Verificar se secrets estão configurados no GitHub
- ✅ Nomes exatos: `GEMINI_API_KEY`, `WHATSAPP_NUMBER`, etc.
- ✅ Verificar logs do GitHub Actions 