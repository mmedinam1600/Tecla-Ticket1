const express = require('../app.js');
const router = express.Router();

const budgetsController = require('../controllers/budgets.controllers');

router.get('/', budgetsController.getBudgets);



module.exports = router;