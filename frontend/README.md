# 💻 Apothecary Frontend (SPA)

Interface de usuário (Single Page Application) para o sistema Apothecary. Construída para consumir a API RESTful do projeto e fornecer uma experiência fluida e moderna para o gerenciamento de ingredientes.

## 🛠️ Tecnologias Utilizadas

- **React 18** + **Vite**
- **TypeScript** (tipagem estrita)
- **React Router DOM** (navegação SPA)
- **Tailwind CSS** (estilização utilitária)
- **shadcn/ui** (componentes acessíveis e customizáveis: Dialog, Table, Button, Toast, etc.)
- **Sonner** (notificações flutuantes)
- **Fetch API** (integração com o backend)

## 📦 Como executar isoladamente

Se você quiser rodar apenas o frontend, certifique-se de que o backend já esteja rodando na porta 3000.

1. Instale as dependências na raiz do monorepo (`Apothecary/`):

   ```bash
   pnpm install
   ```

2. Configure o arquivo `.env` dentro da pasta `frontend/`:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. Inicie o servidor Vite (na raiz do monorepo):

   ```bash
   pnpm dev:frontend
   ```

4. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## 🎨 Estrutura de Pastas

```text
frontend/
├── src/
│   ├── components/
│   │   ├── ui/               # Componentes do shadcn/ui (Button, Table, etc.)
│   │   └── AppLayout.tsx     # Layout base (Header, Outlet e Toaster)
│   ├── lib/
│   │   └── api.ts            # Serviço de integração com a API REST
│   ├── pages/
│   │   └── Dashboard.tsx     # Tela principal (listagem, criação, edição e exclusão)
│   ├── types/
│   │   └── ingredient.ts     # Interfaces TypeScript (modelo de dados)
│   ├── App.tsx               # Configuração de rotas (React Router)
│   ├── index.css             # Variáveis de tema do Tailwind e shadcn
│   └── main.tsx              # Ponto de entrada do React
├── .env.example
├── index.html
├── tailwind.config.js
└── vite.config.ts
```

## ✨ Funcionalidades (CRUD)

- **Listagem (GET):** exibe os ingredientes em uma tabela com contadores de métricas no topo.
- **Cadastro (POST):** formulário em modal (Dialog) com validação de campos e máscara de preço.
- **Edição (PUT):** reaproveitamento do modal de cadastro para atualizar dados existentes.
- **Exclusão (DELETE):** remoção com confirmação nativa.
- **Feedback visual:** notificações de sucesso/erro via Sonner (Toasts) e estados de carregamento/vazio (Loading / Empty State).
