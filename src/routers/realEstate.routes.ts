import { Router } from "express";
import { createRealEstateController, listRealEstatesController } from "../controllers/realEstate.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { requestEstateSchema } from "../schemas/realEstates.schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post("", ensureDataIsValidMiddleware(requestEstateSchema), ensureTokenIsValidMiddleware, ensureIsAdmin, createRealEstateController);
realEstateRoutes.get("", listRealEstatesController);

export default realEstateRoutes;