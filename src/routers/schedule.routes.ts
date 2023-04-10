import { Router } from "express";
import { createScheduleController, listSchedulesController } from "../controllers/schedule.controllers";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

const schedulesRouter = Router();

schedulesRouter.post("", ensureTokenIsValidMiddleware, createScheduleController);
schedulesRouter.get("/realEstate/:id", ensureTokenIsValidMiddleware, ensureIsAdmin, listSchedulesController);

export { schedulesRouter };
