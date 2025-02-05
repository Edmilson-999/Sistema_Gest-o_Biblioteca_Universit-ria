const { gql } = require('apollo-server');

const typeDefs = gql`
  # Tipos personalizados para datas
  scalar Date
  scalar DateTime

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    loans: [Loan!]
    reservations: [Reservation!]
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    role: String!
  }

  # Tipo para autenticação de usuários
  type AuthPayload {
    token: String!
    user: User!
  }

  # Tipos de Livro
  type Book {
    id: ID!
    title: String!
    author: String!
    edition: String
    isbn: String!
    copies: Int!
    publishedDate: Date
    keywords: [String!]
    category: String!
    reservations: [Reservation!]
    loans: [Loan!]
  }

  # Entrada para criar ou atualizar um livro
  input BookInput {
    title: String!
    author: String!
    edition: String
    isbn: String!
    copies: Int!
    publishedDate: Date
    keywords: [String!]
    category: String!
  }

  # Tipos de Empréstimo
  type Loan {
    id: ID!
    user: User!
    book: Book!
    loanDate: DateTime!
    returnDate: DateTime
    status: String!
  }

  # Entrada para criar um empréstimo
  input LoanInput {
    userId: ID!
    bookId: ID!
    loanDate: DateTime!
    returnDate: DateTime
  }

  # Tipos de Reserva
  type Reservation {
    id: ID!
    user: User!
    book: Book!
    status: String!
  }

  # Entrada para criar uma reserva
  input ReservationInput {
    userId: ID!
    bookId: ID!
  }

  # Queries disponíveis
  type Query {
    # Usuários
    users: [User!]!
    user(id: ID!): User

    # Livros
    books: [Book!]!
    book(id: ID!): Book

    # Empréstimos
    loans: [Loan!]!

    # Reservas
    reservations: [Reservation!]!
  }

  # Mutations disponíveis
  type Mutation {
    # Autenticação
    createUser(input: CreateUserInput!): User!
    login(email: String!, password: String!): AuthPayload!

    # Livros
    createBook(input: BookInput!): Book!
    updateBook(id: ID!, input: BookInput!): Book!
    deleteBook(id: ID!): Boolean!

    # Empréstimos
    createLoan(input: LoanInput!): Loan!
    finalizeLoan(id: ID!): Loan!

    # Reservas
    createReservation(input: ReservationInput!): Reservation!
  }
`;

module.exports = typeDefs;