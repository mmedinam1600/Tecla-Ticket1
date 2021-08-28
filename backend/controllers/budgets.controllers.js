
const { UserService } = require("../services/user.service");
const BudgetService = require('../services/budget.service');

const budgetService = new BudgetService();
const userService = new UserService();

class BudgetsController {


  createBudget = async (req, res) => {
    try {
      const data = req.body;
      const user = await userService.getUserByEmail(data.user_email); //Obtenemos los datos del usuario que va a crear el presupuesto
      const budget = await budgetService.newBudget(data.project, data.version); //Agregamos un registro al modelo budget
      const budgetId = budget.budget_id;
      const budgetUsers = await budgetService.newBudgetUsers(user.id, budgetId); //Agregamos un registro al modelo budgetUsers
      const administrative_costs = [];
      data.concept_AC.forEach( (concept, index) => {
        administrative_costs.push({
          concept: concept,
          concept_administrative_cost: data.concept_administrative_cost[index],
          budget_id: budgetId,
        });
      });
      const administrativeCosts = await budgetService.newAdministrativeCosts(administrative_costs);
      const revenues = [];
      data.concept_R.forEach((concept, index) => {
        revenues.push({
          concept,
          concept_revenue: data.concept_revenue[index],
          budget_id: budgetId,
        });
      });
      const revenuesDB = await budgetService.newRevenues(revenues);
      const resources  = [];
      data.resources.forEach((resource, index) => {
        resources.push({
          resource,
          monthly_cost: data.monthly_cost[index],
          monthly_resource: data.monthly_resource[index],
          budget_id: budgetId,
        });
      });
      const resourcesDB = await budgetService.newResources(resources);
      const direct_costs = [];
      data.concept_DC.forEach( (concept, index) => {
        direct_costs.push({
          concept,
          concept_direct_cost: data.concept_direct_costs[index],
          budget_id: budgetId,
        })
      });
      const directCosts = await budgetService.newDirectCosts(direct_costs);
      const cash_flow = [];
      data.title.forEach( (title, index) => {
        cash_flow.push({
          title,
          revenue: data.revenue[index],
          budget_id: budgetId
        });
      });
      const cashFlow = await budgetService.newCashFlow(cash_flow);


      res.status(200).send({
        msg: 'Se agrego exitosamente el presupuesto a la base de datos',
        user,
        budget,
        budgetUsers,
        administrativeCosts,
        revenuesDB,
        resourcesDB,
        directCosts,
        cashFlow
      });
    } catch (e) {
      res.status(400).json({
        error: e.message
      });
    }
  }

  deleteBudgetById = async (req, res) => {
    try {
      const id = req.params.id;
      await budgetService.deleteBudgetById(id);
      res.status(200).json({
        msg: 'Se elimino correctamente el presupuesto con el id: ' + id
      })
    } catch (e) {
      res.status(400).json({
        error: e.message
      });
    }
  }

  editBudgetById = async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      console.log(data);

      const user = await userService.getUserByEmail(data.user_email); //Obtenemos los datos del usuario que va a crear el presupuesto
      const budget = await budgetService.editBudget(data.project, data.version, id); //Agregamos un registro al modelo budget
      const budgetId = budget[0];
      const budgetUsers = await budgetService.editBudgetUsers(user.id, budgetId); //Agregamos un registro al modelo budgetUsers
      const administrative_costs = [];
      data.concept_AC.forEach( (concept, index) => {
        administrative_costs.push({
          concept: concept,
          concept_administrative_cost: data.concept_administrative_cost[index],
          budget_id: budgetId,
        });
      });
      const administrativeCosts = await budgetService.editAdministrativeCosts(administrative_costs);
      const revenues = [];
      data.concept_R.forEach((concept, index) => {
        revenues.push({
          concept,
          concept_revenue: data.concept_revenue[index],
          budget_id: budgetId,
        });
      });
      const revenuesDB = await budgetService.editRevenues(revenues);
      const resources  = [];
      data.resources.forEach((resource, index) => {
        resources.push({
          resource,
          monthly_cost: data.monthly_cost[index],
          monthly_resource: data.monthly_resource[index],
          budget_id: budgetId,
        });
      });
      const resourcesDB = await budgetService.editResources(resources);
      const direct_costs = [];
      data.concept_DC.forEach( (concept, index) => {
        direct_costs.push({
          concept,
          concept_direct_cost: data.concept_direct_costs[index],
          budget_id: budgetId,
        })
      });
      const directCosts = await budgetService.editDirectCosts(direct_costs);
      const cash_flow = [];
      data.title.forEach( (title, index) => {
        cash_flow.push({
          title,
          revenue: data.revenue[index],
          budget_id: budgetId
        });
      });
      const cashFlow = await budgetService.editCashFlow(cash_flow);

      res.status(200).json({ msg: 'Se edito el presupuesto con el id: '+ id});
    } catch (e) {
      console.log(e);
      res.status(400).json({
        error: e.message
      });
    }
  }


  getBudget = async (req, res) => {
    try {
      const id = req.params.id;
      const budget = await budgetService.getBudgetByID(id);
      res.status(200).json(budget);
    } catch (e) {
      res.status(400).json({
        error: e.message
      });
    }
  }

  getAllBudgets = async (req, res) => {
    try {
      const budgets = await budgetService.getAllBudgets();
      res.status(200).json(budgets);
    } catch (e) {
      res.status(400).json({
        error: e.message
      });
    }
  }

  getAllDataBudget = async (req, res) => {
    try {
      const id = req.params.id;
      const budget = await budgetService.getAllDataByID(id);
      res.status(200).send(budget);
    } catch (e) {
      res.status(400).json({
        error: e.message
      });
    }
  }
}



module.exports = BudgetsController;