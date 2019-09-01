// app config file
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// load routes files
const project_routes = require('./routes/PersonalData');

// middlewares
app.use(bodyParser.urlencoded({extended:false})); // necessary config for body-parser
app.use(bodyParser.json());


// Headers configuration and CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// routes
app.use('/api', project_routes);


// Export this module
module.exports = app;