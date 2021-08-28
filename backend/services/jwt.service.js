const jwt = require('jsonwebtoken');
const config = require('../config');


class JwtService {
  generateJWT = async (payload) => {
    try {
      delete payload.password;
      return jwt.sign({ data: payload }, config.jwtSeed, { expiresIn: '30d' });
    } catch (e) {
      throw new Error('Error al generar Token: ' + e.message);
    }
  }

  validateToken = (token) => jwt.verify(token, config.jwtSeed);
}

module.exports = {
  JwtService
}