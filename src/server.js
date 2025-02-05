require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./database/Database');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { verifyToken } = require('./config/auth');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers['authorization'] || '';
      console.log('Token recebido:', token);

      if (!token || !token.startsWith('Bearer ')) {
       // console.warn('Token ausente ou malformado.');
        return { user: null };
      }

      const tokenValue = token.split(' ')[1];
      if (!tokenValue) {
        console.warn('Token ausente após o Bearer.');
        return { user: null };
      }

      try {
        const decoded = verifyToken(tokenValue);
        console.log('Token válido. Usuário:', decoded);
        return { user: decoded };
      } catch (err) {
        console.warn('Erro ao validar token:', err.message);
        return { user: null };
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  sequelize.sync()
    .then(() => console.log('Banco de dados conectado e sincronizado com sucesso.'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

  app.listen(4000, () => console.log('Servidor rodando em http://localhost:4000/graphql'));
};

startServer().catch((err) => {
  console.error('Erro ao iniciar o servidor:', err);
});