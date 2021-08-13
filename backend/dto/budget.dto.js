
const Joi = require('joi');

class BudgetDTO {
  post = Joi.object().keys({
    project: Joi.string().max(255).required(),
    version: Joi.string().max(255).required(),
    concept_AC: Joi.array().items(Joi.string()).required(),
    concept_administrative_cost: Joi.array().items(Joi.number()).required(),
    concept_R: Joi.array().items(Joi.string()).required(),
    concept_revenue: Joi.array().items(Joi.number()).required(),
    concept_DC: Joi.array().items(Joi.string()).required(),
    concept_direct_costs: Joi.array().items(Joi.number()).required(),
    title: Joi.array().items(Joi.string()).required(),
    revenue: Joi.array().items(Joi.number()).required(),
    resources: Joi.array().items(Joi.string()).required(),
    monthly_cost: Joi.array().items(Joi.number()).required(),
    monthly_resource: Joi.array().items(Joi.number()).required(),
    user_email: Joi.string().max(255).required(),
  });

  get = Joi.object().keys({
    id: Joi.number().required(),
  });


}

module.exports = {
  BudgetDTO
}