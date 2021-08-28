const jwt = require('jsonwebtoken');

const { JwtService } = require('../services/jwt.service');
const { UserService } = require('../services/user.service');

const jwtService = new JwtService();
const userService = new UserService();

class AuthMiddleware {
  validateUserToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
      const result = jwtService.validateToken(token);
      return next();
    } catch (e) {
      res.status(403).json({
        status: false,
        msg: 'El JWT no es válido o expiro, redirigir a Login: ' + e.message
      });
    }
  }
}

module.exports = AuthMiddleware;
