# Backend — Dev Móvel

API REST para gerenciamento de usuários, desenvolvida com **Node.js**, **Express** e **PostgreSQL**. Serve como backend do aplicativo Flutter da matéria de Desenvolvimento Móvel.

---

## Tecnologias utilizadas

- **Node.js** — ambiente de execução JavaScript
- **Express 5** — framework web para criação das rotas
- **PostgreSQL 15** — banco de dados relacional
- **pg** — driver Node.js para conexão com o PostgreSQL
- **swagger-ui-express** + **swagger-jsdoc** — documentação interativa da API
- **nodemon** — reinicialização automática do servidor em desenvolvimento
- **Docker / Docker Compose** — para subir o banco de dados em container

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [Docker](https://www.docker.com/) e Docker Compose

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/MagalhaesExe/back-dev-movel.git
cd back-dev-movel
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Suba o banco de dados com Docker

```bash
docker-compose up -d
```

Isso cria um container PostgreSQL com as seguintes configurações:

| Parâmetro | Valor        |
|-----------|--------------|
| Host      | `localhost`  |
| Porta     | `5433`       |
| Usuário   | `user`       |
| Senha     | `password`   |
| Banco     | `teste`      |

> A tabela `usuarios` é criada automaticamente na primeira execução da aplicação.

### 4. Inicie o servidor

Em modo de desenvolvimento (com hot reload):
```bash
npm run dev
```

Em modo de produção:
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

---

## Documentação da API (Swagger)

Com o servidor rodando, acesse:

```
http://localhost:3000/api-docs
```

---

## Endpoints

### `GET /usuarios`
Retorna a lista de todos os usuários cadastrados, ordenados por ID.

**Exemplo de resposta de sucesso (200):**
```json
[
  { "id": 1, "nome": "Alex Magalhães", "email": "alex@gmail.com" },
  { "id": 2, "nome": "John Doe", "email": "john@gmail.com" }
]
```

---

### `POST /usuarios`
Cria um novo usuário. O campo `email` deve ser único.

**Body (JSON):**
```json
{
  "nome": "Alex Jr",
  "email": "alex@devmovel.com"
}
```

**Resposta de sucesso (201):**
```json
{
  "id": 3,
  "nome": "Alex Jr",
  "email": "alex@devmovel.com"
}
```

---

### `PUT /usuarios/:id`
Atualiza o nome e o e-mail de um usuário existente.

**Parâmetro de rota:** `id` — ID do usuário

**Body (JSON):**
```json
{
  "nome": "Alex Atualizado",
  "email": "novo@email.com"
}
```

**Resposta de sucesso (200):**
```json
{
  "id": 1,
  "nome": "Alex Atualizado",
  "email": "novo@email.com"
}
```

**Resposta quando não encontrado (404):**
```json
{ "erro": "Usuário não encontrado." }
```

---

### `DELETE /usuarios/:id`
Remove um usuário pelo ID.

**Parâmetro de rota:** `id` — ID do usuário

**Resposta de sucesso (200):**
```json
{ "mensagem": "Usuário excluído com sucesso." }
```

**Resposta quando não encontrado (404):**
```json
{ "erro": "Usuário não encontrado." }
```

---

## Estrutura do projeto

```
back-dev-movel/
├── src/
│   ├── app.js              # Configura Express e inicia o servidor
│   ├── config/
│   │   └── database.js     # Conexão com o PostgreSQL e criação da tabela
│   ├── routes/
│   │   └── routes.js       # CRUD de usuários
│   └── docs/
│       └── swagger.js      # Configuração da documentação OpenAPI/Swagger
├── docker-compose.yml      # Container do banco de dados PostgreSQL
└── package.json
```

---

## Banco de dados

A tabela `usuarios` é criada automaticamente ao iniciar a aplicação:

```sql
CREATE TABLE IF NOT EXISTS usuarios (
  id    SERIAL PRIMARY KEY,
  nome  VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);
```

---

## Conexão com o frontend Flutter

O app Flutter se comunica com esta API via HTTP. Certifique-se de que o servidor está rodando antes de usar o aplicativo. Ao rodar o Flutter na web, a URL base usada é:

```
http://localhost:3000
```