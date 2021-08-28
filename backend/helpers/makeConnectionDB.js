const { DB } = require("../db/connection");

const makeConnection = async () => {
    try {
        await DB.sequelize.authenticate();
        DB.loadModels();
        await DB.createModels();
    } catch (e) {
        throw new Error(`Error al conectarse a la Base de datos: \n ${e.message}`);
    }
}

module.exports = makeConnection;