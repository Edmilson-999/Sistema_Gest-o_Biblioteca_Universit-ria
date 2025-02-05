const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './biblioteca.sql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

// Sincroniza o banco de dados
sequelize.sync({ force: process.env.NODE_ENV === 'development' })
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

module.exports = sequelize;