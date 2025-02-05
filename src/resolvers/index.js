const { GraphQLDate, GraphQLDateTime } = require('graphql-iso-date');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Book, Loan, Reservation } = require('../models');

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error('Chave secreta (JWT_SECRET) não definida. Verifique seu arquivo .env');
}

const resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,

  Query: {
    users: async () => await User.findAll(),
    user: async (_, { id }) => {
      const user = await User.findByPk(id);
      if (!user) throw new Error('Usuário não encontrado.');
      return user;
    },

    books: async () => await Book.findAll(),
    book: async (_, { id }) => {
      const book = await Book.findByPk(id);
      if (!book) throw new Error('Livro não encontrado.');
      return book;
    },

    loans: async () => await Loan.findAll(),

    reservations: async () => await Reservation.findAll({
      include: [
        { model: User, as: 'user' }, 
        { model: Book, as: 'book' }, 
      ],
    }),
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const { name, email, password, role } = input;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) throw new Error('Email já cadastrado.');

      const hashedPassword = await bcrypt.hash(password, 10);

      return await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('Usuário não encontrado.');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error('Senha incorreta.');

      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '2d' });

      //console.log('Token gerado no login:', token); 

      return { token, user };
    },

    createBook: async (_, { input }) => {
      if (input.keywords && Array.isArray(input.keywords)) {
        input.keywords = input.keywords.join(', ');
      }

      return await Book.create(input);
    },

    updateBook: async (_, { id, input }) => {
      const book = await Book.findByPk(id);
      if (!book) throw new Error('Livro não encontrado.');

      if (input.keywords && Array.isArray(input.keywords)) {
        input.keywords = input.keywords.join(', ');
      }

      await book.update(input);
      return book;
    },

    deleteBook: async (_, { id }) => {
      const book = await Book.findByPk(id);
      if (!book) throw new Error('Livro não encontrado.');

      await book.destroy();
      return true;
    },

    createLoan: async (_, { input }) => {
      const { userId, bookId, loanDate, returnDate } = input;

      const book = await Book.findByPk(bookId);
      if (!book || book.copies <= 0) throw new Error('Livro não disponível para empréstimo.');

      await book.update({ copies: book.copies - 1 });

      return await Loan.create({
        userId,
        bookId,
        loanDate,
        returnDate,
        status: 'EM_ANDAMENTO',
      });
    },

    finalizeLoan: async (_, { id }) => {
      const loan = await Loan.findByPk(id);
      if (!loan) throw new Error('Empréstimo não encontrado.');

      const book = await Book.findByPk(loan.bookId);
      if (!book) throw new Error('Livro associado ao empréstimo não encontrado.');

      await book.update({ copies: book.copies + 1 });
      await loan.update({ status: 'FINALIZADO' });

      return loan;
    },

    createReservation: async (_, { input }) => {
      const { userId, bookId } = input;

      const book = await Book.findByPk(bookId);
      if (!book) throw new Error('Livro não encontrado.');

      const user = await User.findByPk(userId);
      if (!user) throw new Error('Usuário não encontrado.');

      return await Reservation.create({
        userId,
        bookId,
        status: 'PENDENTE',
      });
    },
  },

  User: {
    loans: async (user) => await Loan.findAll({ where: { userId: user.id } }),
    reservations: async (user) => await Reservation.findAll({ where: { userId: user.id } }),
  },

  Book: {
    reservations: async (book) => await Reservation.findAll({
      where: { bookId: book.id },
      include: [{ model: User, as: 'user' }], 
    }),
    loans: async (book) => await Loan.findAll({
      where: { bookId: book.id },
      include: [{ model: User, as: 'user' }],
    }),
  },

  Reservation: {
    user: async (reservation) => await User.findByPk(reservation.userId),
    book: async (reservation) => await Book.findByPk(reservation.bookId),
  },
};

module.exports = resolvers;