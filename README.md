<h1 align="center">
  Ignite - Trilha Node.js
  <br>
  Desafio 02 - Daily Diet API
</h1>

<br>

<p align="center">
  <img
    src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
    alt="Node.js"
  >
  <img
    src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
    alt="TypeScript"
  >
  <img
    src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white"
    alt="Fastify"
  >
  <img
    src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white"
    alt="SQLite"
  >
</p>

<br>

### :hammer_and_wrench: Tecnologias
- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Knex](https://knexjs.org/guide/)
- [SQLite](https://www.sqlite.org/index.html)

### :fire: Execução do projeto
  1. Instalação das dependências:
     ```
     npm i
     ```
  2. Build:
     ```
     npm run build
     ```
  3. Migrations:
     ```
     npm run knex -- migrate:latest
     ```
  4. Execução:
     ```
     npm run dev
     ```

### :link: Rotas
#### Usuários
  - `POST/users`: cria um novo usuário e adicona um cookie para "autenticação".
#### Refeições
  - `POST/meals`: cria uma nova refeição;
  - `GET/meals`: lista todas as refeições;
  - `GET/meals/{id}`: lista uma refeição de acordo com o ID;
  - `DELETE/meals/{id}`: remove uma refeição de acordo com o ID;
  - `PATCH/meals/{id}`: atualiza uma refeição de acordo com o ID;
  - `GET/meals/metrics`: lista as métricas do usuário (quantidade das refeições registradas, quantidade das refeições dentro/fora da dieta e a melhor sequência das refeições dentro da dieta).
