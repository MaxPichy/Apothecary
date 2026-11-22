# 💻 Apothecary Frontend (SPA)

Interface de usuário (Single Page Application) para o sistema Apothecary. Construída para consumir a API RESTful do projeto e fornecer uma experiência fluida e moderna para o gerenciamento de ingredientes.

## 🛠️ Tecnologias Utilizadas

- **React 18** + **Vite**
- **TypeScript** (Tipagem estrita)
- **React Router DOM** (Navegação SPA)
- **Tailwind CSS** (Estilização utilitária)
- **shadcn/ui** (Componentes acessíveis e customizáveis: Dialog, Table, Button, Toast, etc.)
- **Sonner** (Notificações flutuantes)
- **Fetch API** (Integração com o backend)

## 📦 Como executar isoladamente

Se você quiser rodar apenas o frontend (certifique-se de que o backend já esteja rodando na porta 3000):

1. Instale as dependências na raiz do monorepo (`Apothecary/`):
   ```bash
   pnpm install
   ```

Configure o arquivo .env dentro da pasta frontend/:

env
VITE_API_URL=http://localhost:3000
Inicie o servidor Vite (na raiz do monorepo):

bash
pnpm dev:frontend
Acesse http://localhost:5173 no navegador.

🎨 Estrutura de Pastas
text
frontend/
├── src/
│ ├── components/
│ │ ├── ui/ # Componentes do shadcn/ui (Button, Table, etc.)
│ │ └── AppLayout.tsx # Layout base (Header, Outlet e Toaster)
│ ├── lib/
│ │ └── api.ts # Serviço de integração com a API REST
│ ├── pages/
│ │ └── Dashboard.tsx # Tela principal (Listagem, Criação, Edição e Exclusão)
│ ├── types/
│ │ └── ingredient.ts # Interfaces TypeScript (Modelo de Dados)
│ ├── App.tsx # Configuração de Rotas (React Router)
│ ├── index.css # Variáveis de tema do Tailwind e shadcn
│ └── main.tsx # Ponto de entrada do React
├── .env.example
├── index.html
├── tailwind.config.js
└── vite.config.ts
✨ Funcionalidades (CRUD)
Listagem (GET): Exibe os ingredientes em uma tabela com contadores de métricas no topo.

Cadastro (POST): Formulário em modal (Dialog) com validação de campos e máscara de preço.

Edição (PUT): Reaproveitamento do modal de cadastro para atualizar dados existentes.

Exclusão (DELETE): Remoção com confirmação nativa.

Feedback Visual: Notificações de sucesso/erro via Sonner (Toasts) e estados de carregamento/vazio (Loading / Empty State).
