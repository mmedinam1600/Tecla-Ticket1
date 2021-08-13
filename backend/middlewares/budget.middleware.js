
const Joi = require('joi');
const { BudgetDTO } = require("../dto/budget.dto");

const budgetDto = new BudgetDTO();

class BudgetMiddleware {
  async validateBudgetData(req, res, next) {
    try {
      console.log(req.body);
      await Joi.attempt(req.body, budgetDto.post);
      return next(); //Si no hay error en la validación continuamos.
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async validateBudgetId(req, res, next) {
    try {
      await Joi.attempt(req.params, budgetDto.get);
      return next();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

}


module.exports = BudgetMiddleware;