import { Router } from "express";
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureEmailWontRepeatMiddleware from "../middlewares/ensureEmailWontRepeat.middleware";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import { userSchema, userUpdateSchema } from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post("", ensureDataIsValidMiddleware(userSchema), ensureEmailWontRepeatMiddleware, createUserController);
userRoutes.get("", ensureTokenIsValidMiddleware, ensureIsAdmin, listUsersController);
userRoutes.patch("/:id", ensureDataIsValidMiddleware(userUpdateSchema), ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, updateUserController);
userRoutes.delete("/:id", ensureUserExistsMiddleware, ensureTokenIsValidMiddleware, ensureIsAdmin, deleteUserController);

export default userRoutes;
