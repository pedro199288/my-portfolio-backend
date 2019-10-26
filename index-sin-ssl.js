'use strict'

const mongoose = require('mongoose'); // imports mongoose from node_modules
const app = require('./app');
const port = 3700; // 3700

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/my_portfolio', {useNewUrlParser : true})
        .then(() => {
            console.log("Node connected to the DB !!");

            // Server creation
            app.listen(port, () => {
                console.log("Server running on localhost:3700 !!");
            });

        })
        .catch(err => console.log(err));