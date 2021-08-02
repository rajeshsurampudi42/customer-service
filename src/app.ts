import express, { Response as ExResponse, Request as ExRequest } from "express";
import { RegisterRoutes } from "./generated/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../swagger.json"
export const app = express();
// const swaggerDoc = require('../swagger.json');
// Use body parser to read sent json payloads
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});
RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
