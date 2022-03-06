import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import routes from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import swaggerUi from "swagger-ui-express";

import "../../container";
import swaggerDocs from "../../../swagger.json";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/v1", routes);
app.use(globalErrorHandler);

export default app;
