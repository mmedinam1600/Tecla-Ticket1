const express = require('../app');
const router = express.Router();

const UserMiddlewares = require('../middlewares/user.middleware');
const { Account } = require('../controllers/accounts.controllers');

const account = new Account();
const userMiddlewares = new UserMiddlewares();

router.post('/login',
    userMiddlewares.validateDataLoginUser, //Verifica que los campos enviados en el body sean válidos
    account.loginUser //Autentifica y genera el JWT de usuario
);

router.get('/checkSession',
    userMiddlewares.validateSessionUser, //Verifica que los campos enviados en el body sean válidos
    account.checkSessionUser //Revisa el estado de autentificación de un usuario por su JWT
);

module.exports = router;