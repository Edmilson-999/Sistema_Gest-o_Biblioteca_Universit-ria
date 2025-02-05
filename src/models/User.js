const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true, 
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('bibliotecario', 'aluno', 'professor'),
    allowNull: false,
  },
}, {
  tableName: 'users', 
  timestamps: true, 
});

module.exports = User;