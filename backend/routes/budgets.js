const express = require('../app.js');
const router = express.Router();

const budgetsController = require('../controllers/budgets.controllers');
const BudgetMiddleware = require("../middlewares/budget.middleware");

const budgetMiddleware = new BudgetMiddleware();

router.post('/',
  budgetMiddleware.validateBudgetData,
  budgetsController.createBudget
);

router.get('/:id',
  budgetMiddleware.validateBudgetId,
  budgetsController.getBudget
);

router.get('/all/:id',
  budgetMiddleware.validateBudgetId,
  budgetsController.getAllDataBudget
);



module.exports = router;