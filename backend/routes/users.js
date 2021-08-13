const express = require('../app');
const router = express.Router();

const accountsController = require('../controllers/accounts.controllers');
const UserMiddlewares = require('../middlewares/user.middleware');

const userMiddlewares = new UserMiddlewares();

router.post('/login',
  userMiddlewares.validateDataLoginUser, //Verifica que los campos enviados en el body sean válidos
  accountsController.loginUser
);

router.get('/checkSession',
  userMiddlewares.validateSessionUser,
  accountsController.checkSessionUser
);


module.exports = router;