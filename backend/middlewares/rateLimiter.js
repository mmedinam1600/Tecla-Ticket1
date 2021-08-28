
const config = require("../config.js");

rateLimitOptions = {
    windowMs: config.ratelimit.maxTime * 10 * 1000, //20 minutos permitidos
    max: config.ratelimit.maxRequest //Peticiones al servidor dentro de la ventana del tiempo anterior
}

module.exports = rateLimitOptions;