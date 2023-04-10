import { Router } from "express";
import { createCategoriesControllers, listCategoriesController, listRealEstatesByCategoriesController } from "../controllers/category.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { categroryRequestSchema } from "../schemas/categories.schema";

const categoryRoutes: Router = Router();

categoryRoutes.post("", ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(categroryRequestSchema), ensureIsAdmin, createCategoriesControllers);
categoryRoutes.get("", listCategoriesController);
categoryRoutes.get("/:id/realEstate", listRealEstatesByCategoriesController);

export default categoryRoutes;