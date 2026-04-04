# 🚀 Portfólio Web

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

Este é um site de portfólio moderno e responsivo desenvolvido com React e Vite. Ele inclui uma vitrine pública para os projetos da empresa e um **painel administrativo completo (CRUD)** para gestão do conteúdo.

Este projeto foi desenvolvido como requisito para a disciplina de **Projeto Integrador III-B** do curso de Análise e Desenvolvimento de Sistemas da **PUC Goiás**.

---

## 🔗 Links do Projeto

- **Site ao Vivo (Produção):** [https://projeto-integrador-3-b.vercel.app/](https://projeto-integrador-3-b.vercel.app/)
- **Protótipo Interativo (Framer):** [https://stellar-places-117121.framer.app/](https://stellar-places-117121.framer.app/)
- **Quadro Ágil (Trello):** [https://trello.com/b/sz9EidRh/projeto-integrador-iii-b](https://trello.com/b/sz9EidRh/projeto-integrador-iii-b)
- **Repositório (GitHub):** [https://github.com/manigoldTLC/projeto-integrador-3-b](https://github.com/manigoldTLC/projeto-integrador-3-b)

---

## 🔒 Acesso Administrativo

Para fins de demonstração técnica e avaliação acadêmica, o sistema utiliza **dados mockados** gerenciados pelo estado local do React. A persistência dos dados e da sessão é feita utilizando o `localStorage` e o `sessionStorage` do navegador, eliminando a necessidade de um backend ativo nesta etapa.

Para testar as funcionalidades de gerenciamento (adicionar, editar e excluir projetos), acesse a rota `/admin/login` e utilize as credenciais abaixo:

- **Usuário:** `admin`
- **Senha:** `admin123`

---

## ✨ Funcionalidades

### 🌐 Área Pública
- **Home:** Hero section com animações fluidas (Scroll Reveal), estatísticas e projetos em destaque.
- **Portfólio:** Listagem dinâmica de projetos com filtros simultâneos por categoria e status, além de campo de busca integrado.
- **Sobre:** Apresentação da empresa, timeline de experiência e stack tecnológica categorizada.
- **FAQ:** Perguntas frequentes estruturadas em um acordeão interativo animado.
- **Contato:** Formulário com validação *client-side*, sugestões de assunto (chips) e feedback de sucesso.

### 🛡️ Área Administrativa
- **Autenticação Segura:** Proteção de rotas administrativas via `sessionStorage` com componente `ProtectedRoute`.
- **CRUD Completo de Projetos:**
  - Criação de novos projetos com formulário detalhado, dividido em 3 etapas e pré-visualização de imagens em tempo real.
  - Edição rápida de projetos existentes.
  - Exclusão com modal de confirmação para segurança (evita perdas acidentais).
  - Opção de marcar projetos como "Destaque".

---

## 🛠️ Tecnologias Utilizadas

- **[React.js](https://reactjs.org/)** & **[Vite](https://vitejs.dev/)** - Desenvolvimento moderno e performático.
- **[React Router DOM](https://reactrouter.com/)** - Gerenciamento de rotas e navegação.
- **Context API** - Gerenciamento de estado global (Projetos e Autenticação).
- **CSS3 com Variáveis** - Estilização desenvolvida do zero (Dark Theme), responsividade mobile e animações, sem frameworks externos de CSS.
- **Framer** - Utilizado na fase inicial de prototipação para validação de UI/UX.
- **Vercel** - Deploy e publicação do ambiente de produção.

---

## ⚙️ Como executar o projeto localmente

Siga os passos abaixo para rodar a aplicação em seu ambiente de desenvolvimento:

### 1. Pré-requisitos
Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Git](https://git-scm.com/)

### 2. Passo a passo

Clone o repositório na sua máquina

Acesse a pasta do diretório recém-clonado:

```bash
cd projeto-integrador-3-b
```

Instale as dependências essenciais do projeto:

```bash
npm install
```

Inicie o servidor local de desenvolvimento:

```bash
npm run dev
```