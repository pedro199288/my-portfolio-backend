"use strict";
require('dotenv').config()

const mongoose = require("mongoose"); // imports mongoose from node_modules
const app = require("./app");
const port = 3700; // 3700
const fs = require("fs");
const http = require("http");
const https = require("https");

const credentials =
  process.env.NODE_ENV === "production"
    ? // consts for production with SSL
      {
        key: fs.readFileSync('./key.pem'),
        cert: fs.readFileSync('./cert.pem'),
        passphrase: process.env.CERT_PASSPHRASE,
      }
    : {};

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/my_portfolio", { useNewUrlParser: true, useUnifiedTopology: true  }) // change localhost to server IP if in develop mode
  .then(() => {
    console.log("Node connected to the DB !!");

    if (process.env.NODE_ENV === "production") {
      const httpsServer = https.createServer(credentials, app);
      httpsServer.listen(port, () => {
        console.log("Server running with SSL on: 3700 !!");
      });
    } else {
      const httpServer = http.createServer(app);
      httpServer.listen(8080, () => console.log("Server running on: 8080 !!"))
    }
  })
  .catch(err => console.log(err));
