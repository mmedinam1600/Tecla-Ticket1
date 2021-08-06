const express = require('../app');
const router = express.Router();

const accountsController = require('../controllers/accounts.controllers');

router.get('/login', accountsController.login);

router.get('/register', accountsController.register);


module.exports = router;