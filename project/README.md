# Whale MF2 - Investidor App 🐋

Aplicação React para cadastro de investidores, desenvolvida como Micro Frontend (MFE) para deploy no Azure Static Web Apps.

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** como build tool e dev server
- **Tailwind CSS** para estilização
- **Axios** para requisições HTTP
- **Lucide React** para ícones
- **Azure Static Web Apps** para deploy
- **GitHub Actions** para CI/CD

## 📋 Funcionalidades

- ✅ Formulário de cadastro de investidores
- ✅ Validação de campos em tempo real
- ✅ Formatação automática de telefone
- ✅ Feedback visual de sucesso/erro
- ✅ Interface responsiva e acessível
- ✅ Integração com API externa
- ✅ Suporte a variáveis de ambiente
- ✅ Deploy automatizado no Azure SWA

## 🏗️ Estrutura do Projeto

```
whale-mf2-investidor/
├── .github/workflows/              # Workflows do GitHub Actions
│   └── azure-static-web-apps-*.yml
├── src/
│   ├── components/                 # Componentes React
│   │   └── CadastroInvestidor.tsx
│   ├── services/                   # Serviços e APIs
│   │   └── api.ts
│   ├── types/                      # Definições TypeScript
│   │   └── investidor.ts
│   ├── utils/                      # Utilitários
│   │   └── validation.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── staticwebapp.config.json        # Configuração Azure SWA
├── tailwind.config.js              # Configuração Tailwind
├── vite.config.ts                  # Configuração Vite
└── README.md
```

## 🛠️ Desenvolvimento Local

### Pré-requisitos

- Node.js 18+ 
- npm 9+
- Git

### Configuração

1. **Clone o repositório**
   ```bash
   git clone https://github.com/{{ORG}}/{{REPO_NAME}}.git
   cd {{REPO_NAME}}
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Execute em modo desenvolvimento**
   ```bash
   npm run dev
   ```
   
   Acesse: http://localhost:5174

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build de produção

# Qualidade de Código
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas automaticamente
npm run typecheck    # Verificação de tipos TypeScript
npm run format       # Formata código com Prettier

# Utilitários
npm run clean        # Limpa cache e dist
```

## 🌐 Deploy no Azure Static Web Apps

### 1. Criar o Recurso SWA

1. Acesse o [Portal Azure](https://portal.azure.com)
2. Crie um novo recurso "Static Web App"
3. Configure:
   - **Name**: `{{SWA_NAME}}`
   - **Region**: Escolha a região mais próxima
   - **Source**: GitHub
   - **Repository**: `{{ORG}}/{{REPO_NAME}}`
   - **Branch**: `main`
   - **Build Presets**: React
   - **App location**: `/`
   - **Output location**: `dist`

### 2. Configurar Secrets no GitHub

No repositório GitHub, vá em **Settings > Secrets and variables > Actions** e adicione:

- `AZURE_STATIC_WEB_APPS_API_TOKEN_INVESTIDOR_APP`: Token gerado pelo Azure SWA
- `VITE_API_URL`: URL da API de cadastro (ex: `https://api.exemplo.com`)

### 3. Deploy Automático

O deploy é acionado automaticamente quando:
- Há push na branch `main` ou `develop`
- É aberto/atualizado um Pull Request para `main`

### 4. Configurações Avançadas

**Rotas personalizadas** (`staticwebapp.config.json`):
```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  },
  "mimeTypes": {
    ".js": "text/javascript"
  }
}
```

## 🔧 Configuração da API

### Variáveis de Ambiente

A aplicação utiliza a variável `VITE_API_URL` para definir o endpoint da API:

```bash
# .env
VITE_API_URL=https://api.exemplo.com
```

### Formato Esperado da API

**POST `/investidores`**

Request:
```json
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "contato": "(11) 99999-9999"
}
```

Response (Sucesso):
```json
{
  "success": true,
  "message": "Investidor cadastrado com sucesso!",
  "data": {
    "id": 123,
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "contato": "(11) 99999-9999"
  }
}
```

Response (Erro):
```json
{
  "success": false,
  "message": "E-mail já cadastrado"
}
```

## 🎨 Customização

### Tema e Cores

O projeto usa Tailwind CSS com gradientes personalizados:
- **Primary**: Azul (`blue-500` to `purple-600`)
- **Success**: Verde (`green-50`, `green-500`)
- **Error**: Vermelho (`red-50`, `red-500`)

### Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: `sm:` (640px+), `md:` (768px+), `lg:` (1024px+)

## 🔒 Segurança

- ✅ Validação no frontend e backend
- ✅ Sanitização de inputs
- ✅ Headers de segurança no SWA
- ✅ HTTPS obrigatório
- ✅ Variáveis sensíveis em secrets

## 📱 Progressive Web App (Futuro)

Preparado para extensão PWA:
- Service Workers
- Manifest
- Instalação offline
- Notificações push

## 🚀 Roadmap MFE

- [ ] Module Federation setup
- [ ] Shared dependencies
- [ ] Container application
- [ ] Micro frontend orchestration

## 🐛 Troubleshooting

### Build Falha

```bash
# Limpe o cache e reinstale
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deploy SWA Falha

1. Verifique os secrets no GitHub
2. Confirme o token do Azure SWA
3. Valide a configuração `staticwebapp.config.json`

### API Connection Issues

1. Verifique a variável `VITE_API_URL`
2. Teste o endpoint manualmente
3. Confirme CORS no backend
4. Verifique logs no browser DevTools

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/{{ORG}}/{{REPO_NAME}}/issues)
- **Documentação**: [Azure SWA Docs](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- **Vite**: [Vite Guide](https://vitejs.dev/guide/)

---

**Whale Investimentos** - Plataforma MFE v1.0 🐋