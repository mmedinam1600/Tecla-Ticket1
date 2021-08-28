const express = require('../app.js');
const router = express.Router();

const corsOptions = require('../middlewares/cors.middleware');
const cors = require('cors');

const BudgetsController = require('../controllers/budgets.controllers');
const BudgetMiddleware = require("../middlewares/budget.middleware");
const UserMiddlewares = require('../middlewares/user.middleware');
const AuthMiddleware = require("../middlewares/auth.middleware");

const userMiddlewares = new UserMiddlewares();
const authMiddleware = new AuthMiddleware();
const budgetMiddleware = new BudgetMiddleware();
const budgetsController = new BudgetsController();

router.post('/',
    cors(corsOptions), //Verificación de la lista blanca
    userMiddlewares.validateSessionUser, //Verificamos que nos envíen el JWT
    budgetMiddleware.validateBudgetData, //Verificamos que la información este correcta para crear el presupuesto
    authMiddleware.validateUserToken, //Verificamos que el usuario este autentificado con el JWT
    budgetsController.createBudget //Creamos el presupuesto
);

router.get('/',
    cors(corsOptions), //Verificación de la lista blanca
    userMiddlewares.validateSessionUser, //Verificamos que nos envíen el JWT
    authMiddleware.validateUserToken, //Verificamos que el usuario este autentificado con el JWT
    budgetsController.getAllBudgets
);


router.get('/:id',
    cors(corsOptions), //Verificación de la lista blanca
    budgetMiddleware.validateBudgetId,
    userMiddlewares.validateSessionUser, //Verificamos que nos envíen el JWT
    authMiddleware.validateUserToken, //Verificamos que el usuario este autentificado con el JWT
    budgetsController.getBudget
);

router.get('/all/:id',
    cors(corsOptions), //Verificación de la lista blanca
    budgetMiddleware.validateBudgetId,
    userMiddlewares.validateSessionUser, //Verificamos que nos envíen el JWT
    authMiddleware.validateUserToken, //Verificamos que el usuario este autentificado con el JWT
    budgetsController.getAllDataBudget
);

router.delete('/:id',
    cors(corsOptions), //Verificación de la lista blanca
    budgetMiddleware.validateBudgetId,
    userMiddlewares.validateSessionUser, //Verificamos que nos envíen el JWT
    authMiddleware.validateUserToken, //Verificamos que el usuario este autentificado con el JWT
    budgetsController.deleteBudgetById
);

router.put('/:id',
    cors(corsOptions), //Verificación de la lista blanca
    budgetMiddleware.validateBudgetId,
    userMiddlewares.validateSessionUser, //Verificamos que nos envíen el JWT
    authMiddleware.validateUserToken, //Verificamos que el usuario este autentificado con el JWT
    budgetMiddleware.validateBudgetData, //Verificamos que la información este correcta para editar el presupuesto
    budgetsController.editBudgetById
);


module.exports = router;