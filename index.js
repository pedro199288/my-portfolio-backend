"use strict";
// APPLICATION MODE ('dev' o 'prod')
const DEPLOYMENT_MODE = "dev";

const mongoose = require("mongoose"); // imports mongoose from node_modules
const app = require("./app");
const port = 3700; // 3700
const fs = require("fs");
const http = require("http");
const https = require("https");
if (DEPLOYMENT_MODE == "prod") {
  // consts for production with SSL
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/monjidev.com/privkey.pem"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/monjidev.com/cert.pem"
  );
  const credentials = { key: privateKey, cert: certificate };
}

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/my_portfolio", { useNewUrlParser: true })
  .then(() => {
    console.log("Node connected to the DB !!");

    if (DEPLOYMENT_MODE == "prod") {
      const httpsServer = https.createServer(credentials, app);
      httpsServer.listen(port, () => {
        console.log("Server running with SSL on: 3700 !!");
      });
    } else if (DEPLOYMENT_MODE == "dev") {
      const httpServer = http.createServer(app);
      httpServer.listen(port);
    }
  })
  .catch(err => console.log(err));
