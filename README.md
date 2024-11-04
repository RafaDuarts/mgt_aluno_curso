
# Sistema de Gerenciamento de Alunos e Cursos

Este é um sistema de gerenciamento de alunos e cursos desenvolvido com Node.js e Express para o back-end e React para o front-end. A aplicação permite o cadastro, atualização, exclusão e listagem de alunos e cursos, bem como a vinculação entre alunos e cursos.

## Funcionalidades

- **API RESTful**: CRUD de alunos e cursos
- **Vinculação**: Alunos podem ser associados a um ou mais cursos
- **Validações**: Dados validados para garantir integridade
- **Front-end**: Interface para cadastro e gestão dos dados

## Tecnologias Utilizadas

- **Back-end**: Node.js, Express, Sequelize ORM
- **Banco de Dados**: PostgreSQL
- **Front-end**: React, Axios para chamadas de API

---

## Configuração do Projeto

### Pré-requisitos

- Node.js
- PostgreSQL
- Yarn ou npm

### Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL.
2. No diretório `backend`, renomeie `.env.example` para `.env` e configure as variáveis:
   ```plaintext
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=nome_do_banco
   DB_USER=usuario
   DB_PASS=senha
   ```

### Inicialização do Back-end

1. Navegue até o diretório `backend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute as migrações do banco de dados:
   ```bash
   npx sequelize db:migrate
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor estará rodando em `http://localhost:3000`.

---

## Inicialização do Front-end

1. No diretório raiz do projeto, navegue até o diretório `frontend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento do React:
   ```bash
   npm start
   ```
   O front-end estará rodando em `http://localhost:3001`.

---

## Endpoints da API

### Alunos

- `POST /alunos`: Cria um novo aluno.
- `GET /alunos`: Lista todos os alunos.
- `GET /alunos/:id`: Exibe detalhes de um aluno específico.
- `PUT /alunos/:id`: Atualiza os dados de um aluno.
- `DELETE /alunos/:id`: Remove um aluno.

### Cursos

- `POST /cursos`: Cria um novo curso.
- `GET /cursos`: Lista todos os cursos.
- `GET /cursos/:id`: Exibe detalhes de um curso específico.
- `PUT /cursos/:id`: Atualiza os dados de um curso.
- `DELETE /cursos/:id`: Remove um curso.

### Vinculação de Alunos a Cursos

- `POST /alunos/:id/cursos`: Vincula um aluno a um ou mais cursos.
- `DELETE /alunos/:id/cursos/:cursoId`: Remove a vinculação de um aluno a um curso específico.

---

## Front-end

### Funcionalidades

- Formulário para cadastro e edição de alunos e cursos.
- Listagem de alunos e cursos em tabela.
- Ações para deletar e editar.
- Filtro de pesquisa de aluno.

### Dependências Utilizadas

- **React Router**: Para navegação entre as páginas.
- **Axios**: Para requisições HTTP.
- **React Hooks**: Para manipulação de estado e efeitos colaterais.

---

## Testes

Para testar a API, recomenda-se o uso do [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/). Configure as requisições para `http://localhost:3000` e os endpoints conforme detalhado acima.

---
