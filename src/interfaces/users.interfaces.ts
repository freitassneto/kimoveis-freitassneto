import {
  userSchema,
  returnUserSchema,
  returnMultipleUserSchema
} from "../schemas/users.schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

type iUser = z.infer<typeof userSchema>;
type iUserReturn = z.infer<typeof returnUserSchema>;
type iUsersReturn = z.infer<typeof returnMultipleUserSchema>;
type iUserUpdate = DeepPartial<iUser>;

export { iUser, iUserReturn, iUsersReturn, iUserUpdate };
