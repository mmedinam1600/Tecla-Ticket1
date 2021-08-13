
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

const newBudget = async (project, version) => {
  return budget.createBudget(project, version);
}

const newBudgetUsers = async (user_id, budget_id) => {
  return budgetUsers.createBudgetUsers(user_id, budget_id);
}

const newAdministrativeCosts = async (administrative_costs) => {
  return administrativeCosts.createAdministrativeCosts(administrative_costs);
}

const newRevenues = async (revenues_list) => {
  return revenues.createRevenues(revenues_list);
}

const newResources = async (resources_list) => {
  return resources.createResources(resources_list);
}

const newDirectCosts = async (directCosts_list) => {
  return directCosts.createDirectCosts(directCosts_list);
}

const newCashFlow = async (cashFlow_list) => {
  return cashFlow.createCashFlow(cashFlow_list);
}

const getBudgetByID = async (id) => {
  return budget.getBudgetByID(id);
}

const getAllDataByID = async (id) => {
  return budget.getAllDataOfBudgetByID(id);
}

module.exports = {
  newBudget,
  newBudgetUsers,
  newAdministrativeCosts,
  newRevenues,
  newResources,
  newDirectCosts,
  newCashFlow,
  getBudgetByID,
  getAllDataByID
}