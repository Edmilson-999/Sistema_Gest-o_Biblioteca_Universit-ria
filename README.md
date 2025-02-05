# Sistema de Gestão de Biblioteca Universitária

Este é um sistema de gestão para bibliotecas universitárias, desenvolvido com **GraphQL, Node.js e Sequelize** para gerenciamento de acervo, usuários, empréstimos e reservas de livros.

## Funcionalidades
- Autenticação de usuários (JWT)
- Cadastro e gerenciamento de livros
- Gerenciamento de empréstimos
- Gerenciamento de reservas
- Controle de usuários e seus perfis (bibliotecário e usuário comum)
- Relatórios sobre empréstimos e reservas

## Tecnologias Utilizadas
- **Node.js**
- **GraphQL com Apollo Server**
- **Sequelize (ORM para bancos relacionais)**
- **PostgreSQL / MySQL / SQLite** (configurável)
- **Bcrypt** (para hash de senhas)
- **JSON Web Token (JWT)** (para autenticação)

## Estrutura do Projeto

```
/
├── config/            # Configuração do banco de dados e ambiente
├── database/          # Inicialização do banco de dados
├── graphql/           # Configuração do GraphQL (typedefs e resolvers)
│   ├── resolvers/     # Implementação das queries e mutations
│   ├── typedefs/      # Definição dos schemas do GraphQL
├── middlewares/       # Middleware de autenticação e validação
├── models/            # Modelos do banco de dados (Sequelize)
├── .env               # Configurações do ambiente (exemplo: JWT_SECRET)
├── index.js           # Arquivo principal do servidor
├── package.json       # Dependências do projeto
└── README.md          # Documentação do projeto
```

## Requisitos
- Node.js (v16+ recomendado)
- PostgreSQL ou MySQL instalado

## Como Rodar o Projeto

### 1. Clonar o repositório
```sh
git clone https://github.com/seu-usuario/sistem.git
cd sistema-biblioteca
```

### 2. Instalar dependências
```sh
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo **.env** na raiz do projeto e configure as variáveis:
```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
```

### 4. Executar as migrações do banco de dados
```sh
npm run migrate
```

### 5. Iniciar o servidor
```sh
npm start
```
O servidor estará rodando em: **http://localhost:4000/graphql**

## Endpoints GraphQL

### Autenticação
```graphql
mutation {
  login(email: "usuario@email.com", password: "123456") {
    token
    user {
      id
      name
    }
  }
}
```

### Criar um livro
```graphql
mutation {
  createBook(input: { title: "Livro Exemplo", author: "Autor", isbn: "123456", copies: 5, category: "Tecnologia" }) {
    id
    title
  }
}
```


