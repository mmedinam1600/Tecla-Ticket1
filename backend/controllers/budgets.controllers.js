const { getUserByEmail } = require("../services/user.service");
const { newBudget, newBudgetUsers, newAdministrativeCosts, newRevenues, newResources, newDirectCosts, newCashFlow, getBudgetByID,
  getAllDataByID
} = require('../services/budget.service');


const createBudget = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const user = await getUserByEmail(data.user_email); //Obtenemos los datos del usuario que va a crear el presupuesto
    const budget = await newBudget(data.project, data.version); //Agregamos un registro al modelo budget
    const budgetId = budget.budget_id;
    const budgetUsers = await newBudgetUsers(user.id, budgetId); //Agregamos un registro al modelo budgetUsers
    const administrative_costs = [];
    data.concept_AC.forEach( (concept, index) => {
      administrative_costs.push({
        concept: concept,
        concept_administrative_cost: data.concept_administrative_cost[index],
        budget_id: budgetId,
      });
    });
    const administrativeCosts = await newAdministrativeCosts(administrative_costs);
    const revenues = [];
    data.concept_R.forEach((concept, index) => {
      revenues.push({
        concept,
        concept_revenue: data.concept_revenue[index],
        budget_id: budgetId,
      });
    });
    const revenuesDB = await newRevenues(revenues);
    const resources  = [];
    data.resources.forEach((resource, index) => {
      resources.push({
        resource,
        monthly_cost: data.monthly_cost[index],
        monthly_resource: data.monthly_resource[index],
        budget_id: budgetId,
      });
    });
    const resourcesDB = await newResources(resources);
    const direct_costs = [];
    data.concept_DC.forEach( (concept, index) => {
      direct_costs.push({
        concept,
        concept_direct_cost: data.concept_direct_costs[index],
        budget_id: budgetId,
      })
    });
    const directCosts = await newDirectCosts(direct_costs);
    const cash_flow = [];
    data.title.forEach( (title, index) => {
      cash_flow.push({
        title,
        revenue: data.revenue[index],
        budget_id: budgetId
      });
    });
    const cashFlow = await newCashFlow(cash_flow);


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
    console.log(e.message);
    res.status(400).send(e.message);
  }
}

const getBudget = async (req, res) => {
  try {
    const id = req.params.id;
    const budget = await getBudgetByID(id);
    res.status(200).send(budget);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

const getAllDataBudget = async (req, res) => {
  try {
    const id = req.params.id;
    const budget = await getAllDataByID(id);
    res.status(200).send(budget);
  } catch (e) {
    res.status(400).send(e.message);
  }
}


module.exports = {
  createBudget,
  getBudget,
  getAllDataBudget
}