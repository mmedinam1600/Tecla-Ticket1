const jwt = require('jsonwebtoken');

const { validateToken } = require('../services/jwt.service');
const { getUserByEmail } = require('../services/user.service');

const validateUserToken = async (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if(!token){
    return res.status(401).json({
      msg: 'No existe el token en las cabezeras'
    });
  }
  try{
    const { data } = validateToken(token);
    const user = await getUserByEmail(data.email);
    delete user.dataValues.password;
    if(JSON.stringify(data) === JSON.stringify(user.dataValues)) {
      return next();
    }
    return res.status(403).json({
      msg: 'No tienes permisos para hacer esto'
    });
  } catch (e) {
    return res.status(500).json({
      msg: 'Error en la autentificación'
    })
  }
}
