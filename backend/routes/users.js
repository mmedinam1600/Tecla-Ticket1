const express = require('../app');
const router = express.Router();

const AuthMiddleware = require('../middlewares/auth.middleware');

const { Account } = require('../controllers/accounts.controllers');
const UserMiddlewares = require('../middlewares/user.middleware');
const corsOptions = require('../middlewares/cors.middleware');
const cors = require('cors');

const authMiddleware = new AuthMiddleware();
const userMiddlewares = new UserMiddlewares();
const account = new Account();

//Obtener todos los usuarios
router.get('/',
    cors(corsOptions), //Verificación de la lista blanca
    userMiddlewares.validateSessionUser, //Verificamos que nos envíen el JWT
    authMiddleware.validateUserToken, //Verificamos que el usuario este autentificado con el JWT
    account.getAllUsers
);

//Obtener un usuario por su id
router.get('/:id',
    cors(corsOptions), //Verificación de la lista blanca
    userMiddlewares.validateSessionUser, //Verificamos que nos envíen el JWT
    authMiddleware.validateUserToken, //Verificamos que el usuario este autentificado con el JWT
    userMiddlewares.validateIdParameter, //Verificamos que la id venga en los parametros
    account.getUserById
);


module.exports = router;