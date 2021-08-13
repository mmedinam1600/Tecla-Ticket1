const jwt = require('jsonwebtoken');
const config = require('../config');

const generateJWT = async (payload) => {
  try {
    delete payload.password;
    return jwt.sign({ data: payload }, config.jwtSeed, { expiresIn: '30d' });
  } catch (e) {
    throw new Error('Error al generar Token: ' + error);
  }
}

const validateToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSeed);
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  generateJWT,
  validateToken
}