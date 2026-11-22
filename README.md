# 🧪 Apothecary - Monorepo (Frontend + Backend)

Este repositório contém a solução completa para o sistema **Apothecary**, dividido em duas aplicações principais:

- **Backend (`/backend`)**: API RESTful em Node.js, Express e TypeScript com PostgreSQL.
- **Frontend (`/frontend`)**: Single Page Application (SPA) em React, TypeScript e shadcn/ui.

Projeto desenvolvido para as disciplinas **Laboratório de Desenvolvimento Web (LDW)** e **Integração e Entrega Contínua (IEC)**.

---

## 🏗️ Arquitetura do Projeto

O projeto utiliza a estrutura de **Monorepo** gerenciada pelo **pnpm Workspaces**. Isso permite compartilhar dependências e rodar ambos os projetos com um único comando.

```text
Apothecary/
├── .github/            # Workflows de CI/CD (GitHub Actions)
├── backend/            # API RESTful (Node.js, Express, TypeScript)
├── frontend/           # Interface SPA (React, Vite, shadcn/ui)
├── package.json        # Scripts globais do monorepo
└── pnpm-workspace.yaml # Configuração do workspace do pnpm
```

---

## 🚀 Como executar o projeto completo

### Pré-requisitos

- Node.js 20+
- pnpm (`npm install -g pnpm`)

### Passo 1: Instalar dependências

Na raiz do projeto, instale as dependências de ambos os projetos:

```bash
pnpm install
```

### Passo 2: Configurar variáveis de ambiente

Você precisará de dois arquivos `.env`, um para cada projeto.

- **Backend:** copie `backend/.env.example` para `backend/.env` e preencha as credenciais do banco de dados (PostgreSQL/Supabase).
- **Frontend:** crie um `frontend/.env` contendo a URL da API:

  ```env
  VITE_API_URL=http://localhost:3000
  ```

### Passo 3: Rodar a aplicação

Na raiz do projeto, execute:

```bash
pnpm dev
```

Isso iniciará simultaneamente:

- O **Backend** na porta `3000` (com hot-reload).
- O **Frontend** na porta `5173` (acesse no navegador).

> Para rodar apenas um dos projetos, use `pnpm dev:backend` ou `pnpm dev:frontend`.

---

## ⚙️ Scripts do Monorepo

| Comando              | Descrição                                                      |
| -------------------- | -------------------------------------------------------------- |
| `pnpm dev`           | Roda o Frontend e o Backend simultaneamente.                   |
| `pnpm dev:backend`   | Roda apenas a API.                                             |
| `pnpm dev:frontend`  | Roda apenas a interface SPA.                                   |
| `pnpm build`         | Compila o TypeScript do Backend e gera o build do Frontend.    |
| `pnpm lint`          | Executa o ESLint em ambos os projetos.                         |
| `pnpm typecheck`     | Valida a tipagem estática do TypeScript em ambos.              |

---

## 🔄 CI/CD (Integração e Entrega Contínua)

O repositório possui uma esteira automatizada configurada no GitHub Actions (`.github/workflows/ci.yml`).

**Integração Contínua (CI):**

- **Frontend:** roda lint e valida o build da aplicação React.
- **Backend:** roda lint, valida a tipagem estrita e compila o código.

**Entrega Contínua (CD):**

- **Docker Build:** garante que a imagem Docker do backend constrói com sucesso.
- **Deploy no Render:** dispara um Webhook para atualizar a API em produção no Render.com (apenas na branch `main`).

---

## 📚 Documentação Específica

Para detalhes aprofundados sobre cada parte do sistema, consulte as documentações individuais:

- [Documentação do Backend (API)](./backend/README.md)
- [Documentação do Frontend (SPA)](./frontend/README.md)