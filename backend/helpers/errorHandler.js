
const errorHandler = function(req, res, next) {
    res.status(404);
    // Si la aplicación puede recibir un JSON, le respondemos con un mensaje de error.
    if (req.accepts('json')) {
        res.json({ error: 'El recurso que esta buscando no existe. Revisa que la ruta este bien escrita.' });
        return;
    }
    // En caso contrario enviamos un texto.
    res.type('txt').send('El recurso que esta buscando no existe. Revisa que este bien escrito.');
};

module.exports = errorHandler;