
const { Budget } = require("../models/budgets.model");
const { BudgetUsers } = require("../models/budgetsUsers.model");
const { AdministrativeCosts } = require("../models/AdministrativeCosts.model");
const { Revenues } = require('../models/Revenues.model');
const { Resources } = require("../models/Resources.model");
const { DirectCosts } = require('../models/DirectCosts.model');
const { CashFlow } = require('../models/cashFlows.model');

const budget = new Budget();
const budgetUsers = new BudgetUsers();
const administrativeCosts = new AdministrativeCosts();
const revenues = new Revenues();
const resources = new Resources();
const directCosts = new DirectCosts();
const cashFlow = new CashFlow();

class BudgetService {
  newBudget = async (project, version) => {
    return budget.createBudget(project, version);
  }

  editBudget = async (project, version, id) => {
    return budget.editBudget(project, version, id);
  }

  newBudgetUsers = async (user_id, budget_id) => {
    return budgetUsers.createBudgetUsers(user_id, budget_id);
  }

  editBudgetUsers = async (user_id, budget_id) => {
    await budgetUsers.editBudgetUsers(user_id, budget_id);
    return {}
  }

  newAdministrativeCosts = async (administrative_costs) => {
    return administrativeCosts.createAdministrativeCosts(administrative_costs);
  }

  editAdministrativeCosts = async (administrative_costs) => {
    await administrativeCosts.editAdministrativeCosts(administrative_costs);
    return {}
  }

  editRevenues = async (administrative_costs) => {
    return {}
  }

  newRevenues = async (revenues_list) => {
    return revenues.createRevenues(revenues_list);
  }

  editResources = async (revenues_list) => {
    return {}
  }

  newResources = async (resources_list) => {
    return resources.createResources(resources_list);
  }

  newDirectCosts = async (directCosts_list) => {
    return directCosts.createDirectCosts(directCosts_list);
  }

  editDirectCosts = async (directCosts) => {
    return {}
  }

  newCashFlow = async (cashFlow_list) => {
    return cashFlow.createCashFlow(cashFlow_list);
  }

  editCashFlow = async (cashFlow_list) => {
    return {}
  }

  getBudgetByID = async (id) => {
    const presupuesto = await budget.getBudgetByID(id);
    return presupuesto ? presupuesto : { error: 'No existe el presupuesto con el id: ' + id};
  }

  getAllBudgets = async () => {
    return await budget.getAllBudgets();
  }

  deleteBudgetById = async (id) => {
    await budget.deleteBudgetById(id);
  }

  getAllDataByID = async (id) => {
    return budget.getAllDataOfBudgetByID(id);
  }
}


module.exports = BudgetService;