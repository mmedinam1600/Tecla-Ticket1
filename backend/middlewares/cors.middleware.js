
const config = require('../config');

const corsOption = {
    origin: function(origin, callback) {
        console.log("IP: " + origin);
        if (config.cors.whiteList.indexOf(origin) !== -1) {
            //devuelve menos uno si el dato no esta dentro del array
            callback(null, true);
        } else {
            callback('No autorizado por CORS a la IP: ' + origin + '\nSi la IP es undefined, debes agregar en la cabecera el parametro Origin con el valor de http://localhost:3000');
        }
    }
}

module.exports = corsOption