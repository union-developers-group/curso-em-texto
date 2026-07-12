# Curso em Texto

O **Curso em Texto** é uma plataforma de cursos livres em formato textual, que incentiva a leitura e o aprendizado profundo.

A proposta é resgatar a essência do aprendizado escrito — direto, acessível e fácil de manter — sem depender de vídeos longos, edição complexa ou custos altos de produção.

Acreditamos que toda pessoa tem algo de valioso para **ensinar** e algo novo para **aprender**.

---

**Conteúdo**

- [Stack](#stack)
- [Começando](#começando)
- [Configurando upstream](#configurando-upstream)
- [Configuração do projeto](#configuração-do-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Baixar e configurar Docker](#baixar-e-configurar-docker)
  - [Configurar variáveis de ambiente](#configurar-variáveis-de-ambiente)
  - [Instalar dependências](#instalar-dependências)
  - [Subir Docker](#subir-docker)
  - [Executar migrations](#executar-migrations)
  - [Iniciando o servidor de desenvolvimento](#iniciando-o-servidor-de-desenvolvimento)
  - [Testando rota de exemplo](#testando-rota-de-exemplo)
- [Trabalhando com workspaces](#trabalhando-com-workspaces)
  - [Executar comandos apenas em um workspace](#executar-comandos-apenas-em-um-workspace)
  - [Instalando dependências](#instalando-dependências)
  - [Rodando o Storybook](#rodando-o-storybook)
  - [Comandos úteis por workspace](#comandos-úteis-por-workspace)
- [Design](#design)
  - [Layout](#layout)
  - [UX](#ux)
- [Roadmap](#roadmap)
- [Comunidade](#comunidade)
- [Contribuindo](#contribuindo)

## Stack

- [Next.js](https://nextjs.org)
- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Fastify](https://fastify.dev)
- [Drizzle ORM](https://orm.drizzle.team)
- [PostgreSQL](https://www.postgresql.org)
- [Docker](https://www.docker.com)
- [Turborepo](https://turborepo.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Storybook](https://storybook.js.org)
- [Vitest](https://vitest.dev)
- [Zod](https://zod.dev)
- [Swagger](https://swagger.io)
- [Scalar](https://scalar.com)

## Começando

1. **Faça o fork no GitHub:**
   - Clique no botão "Fork" no canto superior direito
   - Selecione sua conta para criar o fork

2. **Clone seu fork localmente:**
   ```bash
   git clone https://github.com/SEU_USUARIO/curso-em-texto.git
   cd curso-em-texto
   ```

## Configurando upstream

1. **Adicione o repositório original como upstream:**

   ```bash
   git remote add upstream https://github.com/union-developers-group/curso-em-texto.git
   ```

2. **Verifique os remotes configurados:**

   ```bash
   git remote -v
   ```

## Configuração do projeto

### Pré-requisitos

- Node.js >= 22
- Docker

### Baixar e configurar Docker

Baixe e configure o [Docker](https://www.docker.com) conforme seu sistema operacional.

### Configurar variáveis de ambiente

Copie o arquivo `.env.example` e renomeie para `.env` no diretório `apps/backend/` e adicione o seguinte valores nas variáveis:

```bash
# apps/backend/.env
POSTGRES_USER="admin"
POSTGRES_PASSWORD="admin"
POSTGRES_DB="curso-em-texto"
DATABASE_URL="postgresql://admin:admin@localhost:5432/curso-em-texto?schema=public"
```

### Instalar dependências

```bash
# Instalar todas as dependências do monorepo
npm install
```

### Subir Docker

```bash
npm run docker
```

### Executar migrations

```bash
npm run --workspace=backend db:migrate
```

### Iniciando o servidor de desenvolvimento

```bash
npm run dev
```

Esse comando vai iniciar tanto o frontend como o backend do projeto utilizndo o [Turborepo](https://turborepo.com).

- O backend estará rodando em [http://localhost:8000/docs](http://localhost:8000/docs)
- O frontend estará rodando em [http://localhost:3000](http://localhost:3000)

### Testando rota de exemplo

1. Faça download do [Insomnia](https://insomnia.rest/download)
2. Faça uma requisição `Post` no Insomnia para a URL `http://localhost:8000/api/example/create`, conforme a imagem abaixo

<img width="1292" height="1040" alt="image" src="https://github.com/user-attachments/assets/bb2ee9ce-31d5-4d79-98d5-be3594fd66f9" />

> [!TIP]
> Se tudo estiver certo, você deve receber status 201.

## Trabalhando com workspaces

Este projeto usa [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) para gerenciar o monorepo.

### Executar comandos apenas em um workspace

```bash
# Iniciar apenas o backend
npm run dev --workspace=backend

# Iniciar apenas o frontend
npm run dev --workspace=frontend
```

### Instalando dependências

```bash
# Instala o axios apenas no backend
npm i axios --workspace=backend

# Instala o axios apenas no frontend
npm i axios --workspace=frontend

```

### Rodando o Storybook

> [!CAUTION]
> Os componentes devem ser desenvolvidos utilizando o ambiente do Storybook.

1. Rode o comando `npm run storybook --workspace=frontend`
2. Acesse [http://localhost:6006](http://localhost:6006)

### Comandos úteis por workspace

**Backend:**

```bash
# Desenvolvimento
npm run dev --workspace=backend

# Banco de dados
npm run db:studio --workspace=backend  # Interface web do Drizzle
npm run db:generate --workspace=backend  # Gerar migrações
npm run db:migrate --workspace=backend   # Executar migrações

# Testes
npm run test --workspace=backend        # Roda todos os testes
npm run test:watch --workspace=backend   # Roda os testes em modo watch
```

**Frontend:**

```bash
# Desenvolvimento
npm run dev --workspace=frontend

# Inicia o ambiente de desenvolvimento do Storybook
npm run storybook --workspace=frontend

# Testes
npm run test --workspace=frontend       # Roda todos os testes unitários
npm run test:watch --workspace=frontend   # Roda os testes em modo watch
```

## Design

### Layout

Você pode visualizar o layout do projeto, [clicando aqui](https://www.figma.com/design/7bvEFe5ypInZvsdiOSczq3/Curso-em-Texto?node-id=2-11&p=f&t=pn4kGbEaY2j3roqB-0).

### UX

- [Briefing](https://goldenrod-pen-c7d.notion.site/Briefing-17b51b86f4bf80fba551fff3c176d6d7)
- [Desk Research](https://goldenrod-pen-c7d.notion.site/Desk-Research-24a51b86f4bf8096a7d3cea5b2e68040)
- [Matriz CSD](https://goldenrod-pen-c7d.notion.site/Matriz-CSD-24a51b86f4bf802881f2e4f08fc7a1d3)
- [Benchmarking](https://goldenrod-pen-c7d.notion.site/Benchmarking-24a51b86f4bf8015a9afc293340cc972)
- [Personas](https://goldenrod-pen-c7d.notion.site/Personas-24a51b86f4bf801a889ff115cec1ea0b)
- [Jornada do usuário](https://drive.google.com/drive/folders/1LFlmLHRH-NydIzghxb28Kvr0X1UE_xGK)
- [Pesquisa com possíveis usuários](https://goldenrod-pen-c7d.notion.site/Pesquisa-com-poss-veis-usu-rios-24b51b86f4bf80ab9fe7de34832c9a15)
- [Sitemap](https://goldenrod-pen-c7d.notion.site/Sitemap-24b51b86f4bf805fb194f94bf2c8c6a7)
- [User flow](https://goldenrod-pen-c7d.notion.site/User-flow-24b51b86f4bf80d49685dc828dae5d4c)
- [Mapa de funcionalidades](https://goldenrod-pen-c7d.notion.site/Funcionalidades-24b51b86f4bf80f7a314ea2d403e6d4f)

## Roadmap

### Em desenvolvimento

- [x] [Sistema de autenticação](https://github.com/d3vlopes/curso-em-texto/milestone/1)
  - Cadastro e login de usuários.
  - Integração com OAuth (Google e GitHub).
  - Rules.
- [ ] [Criação de cursos](https://github.com/d3vlopes/curso-em-texto/milestone/3)
  - CRUD de cursos (título, descrição, tags).
  - Editor de conteúdo em texto.
  - Organização em capítulos e lições.
     
  ### Planejado 
- [ ] **Perfil de usuário**
  - Informações básicas (nome, bio, redes sociais).
  - Avatar do usuário.
- [ ] **Sistema de curadoria de cursos**
  - Aprovação e bloqueio de cursos.
  - Destaque de cursos recomendados.
- [ ] **Sistema de denúncias**
  - Denúncia de conteúdo inadequado.
  - Revisão de denúncias pela equipe.
- [ ] **Sistema de anotações**
  - Usuário pode criar notas pessoais dentro das lições.
- [ ] **Sistema de favoritos**
  - Salvar cursos/lessons para ver depois.
- [ ] **Busca avançada**
  - Busca por cursos, lições e autores.
- [ ] **Gamificação**
  - Sistema de pontos/reputação para autores.
  - Badges para contribuidores ativos.
- [ ] **Sistema de recompensa para criadores de cursos**
  - Troca de pontos por recompensas.
- [ ] **Comentários e feedback**
  - Espaço de comentários em cursos e lições.
  - Votação em comentários (upvote/downvote).

## Comunidade

Faça parte da nossa comunidade no [Discord](https://discord.gg/55e3kf6DPv).

## Contribuindo

Quer nos ajudar? [Clique aqui](CONTRIBUTING.md) e saiba como começar.
