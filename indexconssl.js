'use strict'

const mongoose = require('mongoose'); // imports mongoose from node_modules
const app = require('./app');
const port = 3700; // 3700
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/monjidev.com/privkey.pem');
const certificate = fs.readFileSync('/etc/letsencrypt/live/monjidev.com/cert.pem');

const credentials = {key: privateKey, cert: certificate};


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/my_portfolio', {useNewUrlParser : true})
        .then(() => {
            console.log("Node connected to the DB !!");


	    const httpServer = http.createServer(app);
	    const httpsServer = https.createServer(credentials, app);

	    httpServer.listen(8080);
            httpsServer.listen(port, () =>{
	    	console.log("Server running with SSL on: 3700 !!");
	    });
            // Server creation
            // app.listen(port, () => {
            //     console.log("Server running on localhost:3700 !!");
            // });

        })
        .catch(err => console.log(err));

