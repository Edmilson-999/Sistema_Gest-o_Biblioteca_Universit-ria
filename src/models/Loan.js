const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Loan = sequelize.define('Loan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  livro_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_retirada: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  data_devolucao: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM('em andamento', 'devolvido', 'atrasado'),
    defaultValue: 'em andamento',
  },
});

module.exports = Loan;
