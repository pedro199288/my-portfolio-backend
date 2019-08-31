// app config file
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// load routes files


// middlewares
app.use(bodyParser.urlencoded({extended:false})); // necessary config for body-parser
app.use(bodyParser.json());


// CORS


// routes
app.get('/', (req, res) => {
    res.status(200).send("<h1>Home Page</h1>");
});

app.post('/test/:id', (req, res) => {
    console.log(req.body.name); // para recibir el body del POST
    console.log(req.query.web); // para recibir parametros pasados por la url con ?
    console.log(req.params.id); // para recibir parametros en la url, pero cuando son indicados en la ruta con ':id' por ejemplo
    res.status(200).send({
        message: "Hello from NodeJS API"
    });
});


// Export this module
module.exports = app;