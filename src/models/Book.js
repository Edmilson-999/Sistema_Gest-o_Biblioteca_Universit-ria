const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edicao: {
    type: DataTypes.STRING,
  },
  ISBN: {
    type: DataTypes.STRING,
    unique: true,
  },
  num_exemplares: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0, 
    },
  },
  palavras_chave: {
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue('palavras_chave');
      return rawValue ? rawValue.split(', ') : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('palavras_chave', value.join(', '));
      } else {
        this.setDataValue('palavras_chave', value);
      }
    },
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'books', 
  timestamps: true, 
});

module.exports = Book;