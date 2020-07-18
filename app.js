// app config file
const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

const app = express();


// load routes files
const project_routes = require('./routes');

// middlewares
app.use(bodyParser.urlencoded({extended:false})); // necessary config for body-parser
app.use(bodyParser.json());

// Headers configuration and CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'append,delete,entries,foreach,get,has,keys,set,values,Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// this tells the app to use jwt to access endpoints unless they are those included in array 
app.use(expressJwt({secret: process.env.JWT_SECRET, algorithms: ['RS256'] }).unless({
    path: [
        {url: '/api/send'},
        {url: '/api/auth'},
    ],
    method: 'GET'
}));


// routes
app.use('/api', project_routes);


// Export this module
module.exports = app;