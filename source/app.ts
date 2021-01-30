import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";
import "@babel/polyfill";

import routes from "./routes";
import handleErrors from "./middlewares/handleErrors";
import { formatError } from "./helpers/formatters";

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

app.all("*", (req: express.Request, res: express.Response) => {
  const { statusCode, ...rest } = formatError("current route does not exist.");

  res.status(statusCode).json(rest);
});

// to apply error middleware to server
app.use(handleErrors);

export default app;
