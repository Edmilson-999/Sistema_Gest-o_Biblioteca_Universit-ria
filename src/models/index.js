const Sequelize = require('sequelize');
const sequelize = require('../database/Database');

// Modelo User
const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.STRING, allowNull: false },
}, {
  tableName: 'users', 
  timestamps: true, 
});

// Modelo Book
const Book = sequelize.define('Book', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: { type: Sequelize.STRING, allowNull: false },
  author: { type: Sequelize.STRING, allowNull: false },
  edition: { type: Sequelize.STRING },
  isbn: { type: Sequelize.STRING, unique: true },
  copies: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  keywords: {
    type: Sequelize.TEXT,
    get() {
      const rawValue = this.getDataValue('keywords');
      return rawValue ? rawValue.split(', ') : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('keywords', value.join(', '));
      } else {
        this.setDataValue('keywords', value);
      }
    },
  },
  category: { type: Sequelize.STRING, allowNull: false },
}, {
  tableName: 'books', 
  timestamps: true, 
});

// Modelo Loan
const Loan = sequelize.define('Loan', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  loanDate: { type: Sequelize.DATE, allowNull: false },
  returnDate: { type: Sequelize.DATE },
  status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'EM_ANDAMENTO' },
}, {
  tableName: 'loans', 
  timestamps: true, 
});

// Modelo Reservation
const Reservation = sequelize.define('Reservation', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'PENDENTE' },
}, {
  tableName: 'reservations', 
  timestamps: true, 
});

// Relacionamentos
User.hasMany(Loan, { foreignKey: 'userId', as: 'loans' });
Loan.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });
Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Book.hasMany(Loan, { foreignKey: 'bookId', as: 'loans' });
Loan.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

Book.hasMany(Reservation, { foreignKey: 'bookId', as: 'reservations' });
Reservation.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

module.exports = { User, Book, Loan, Reservation, sequelize };