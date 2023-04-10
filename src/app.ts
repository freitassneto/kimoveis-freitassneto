import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import userRoutes from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import realEstateRoutes from "./routers/realEstate.routes";
import categoryRoutes from "./routers/category.routes";
import { schedulesRouter } from "./routers/schedule.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/categories", categoryRoutes);
app.use("/schedules", schedulesRouter);

app.use(handleErrors);

export default app;
