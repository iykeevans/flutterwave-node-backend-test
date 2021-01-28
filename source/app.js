const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");

const routes = require("./routes");

// invoke express
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());

// secure with helmet middleware
app.use(helmet());

// Set up CORS
app.use(cors());

// log requests to console
app.use(logger("dev"));

app.use(routes);

module.exports = app;
