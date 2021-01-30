import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";
import "@babel/polyfill";

import routes from "./routes";
import handleErrors from "./middlewares/handleErrors";

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

app.use(handleErrors);

module.exports = app;
