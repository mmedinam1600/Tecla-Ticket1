
const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const config = require("../config.js");
const fs = require('fs');
const path = require('path');

const { v5: uuidv5 } = require('uuid');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(config.database.database, null, null, {
  dialect: 'mssql',
  host: config.database.host,
  port: config.database.port,
  dialectOptions: {
    authentication: {
      type: 'default',
      options: {
        encrypt: true,
        userName: config.database.username,
        password: config.database.password
      }
    }
  }
});

class DataBase {

  constructor() {
    this.sequelize = sequelize
  }

  loadModels () {
    console.log('**************************************************');
    console.log('CARGANDO MODELOS');
    console.log('**************************************************');
    const routeOfModels = path.resolve() + '\\models'; // C:\Users\UserName\WebstormProjects\Ticket1\backend
    const modelFiles = fs.readdirSync(routeOfModels).filter((file) => file.endsWith('.model.js'));
    for (const file of modelFiles) {
      try {
        const model = require(`../models/${file}`);
        model.defineModel();
        console.log(`Modelo ${file} cargado correctamente`);
      } catch (e) {
        throw new Error(`Error al cargar el modelo ${file}\nERROR: ${e.message}`);
      }
    }
    console.log("--------------------------------------------------");
  }

  async createModels() {
    try {
      await this.sequelize.models.Users.sync();
      await this.sequelize.models.Budgets.sync();
      await this.sequelize.models.BudgetsUsers.sync();
      await this.sequelize.models.CashFlows.sync();
      await this.sequelize.models.Revenues.sync();
      await this.sequelize.models.DirectCosts.sync();
      await this.sequelize.models.AdministrativeCosts.sync();
      await this.sequelize.models.Resources.sync();
      await this.sequelize.models.Sessions.sync();

      const id = uuidv5('admin@system.com', config.uuidv5.namespace);
      const passwordHash = bcrypt.hashSync(config.bcrypt.secretSalt + '123456', config.bcrypt.saltRounds);
      //const validate = bcrypt.compareSync(config.bcrypt.secretSalt + '123456', passwordHash);

      //Si no esta el usuario por default se registra en la base de datos
      const prueba = await this.sequelize.models.Users.findOrCreate({
        where: { user_id: id },
        defaults: {
          user_id: id,
          nickname: 'admin',
          email: 'admin@system.com',
          password: passwordHash,
        }
      });
      console.log(prueba[1]); //Esto me va a servir para despues validad si un usuario ya existe

    } catch (e) {
      throw new Error(`ERROR: ${e.message}`);
    }
  }
}

const DB = new DataBase();

module.exports = {
  DataTypes,
  Model,
  Op,
  DB
}