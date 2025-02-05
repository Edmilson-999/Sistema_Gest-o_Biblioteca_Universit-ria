const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  throw new Error('Chave secreta (JWT_SECRET) não definida. Verifique seu arquivo .env');
}

const generateToken = (payload) => {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload inválido. O payload deve ser um objeto.');
  }

  console.log('Gerando token para o payload:', payload);
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2d' });
  console.log('Token gerado:', token);
  return token;
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token ausente.');
  }

  try {
    console.log('Validando token:', token);
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Token válido. Payload:', decoded);
    return decoded;
  } catch (error) {
    console.error('Erro ao validar token:', error.message);
    throw new Error('Token inválido ou expirado');
  }
};

module.exports = { generateToken, verifyToken, SECRET_KEY };