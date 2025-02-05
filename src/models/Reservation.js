const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Reservation = sequelize.define('Reservation', {
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
  status: {
    type: DataTypes.ENUM('na fila', 'em espera'),
    defaultValue: 'na fila',
  },
  ordem_fila: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Reservation;
