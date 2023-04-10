import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().min(4).max(20)
});

const returnUserSchema = userSchema.extend({
  id: z.number(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  deletedAt: z.date().nullable().or(z.string()),
})
.omit({ password: true });

const returnMultipleUserSchema = returnUserSchema.array();

const userSchemaWithoutAdmin = userSchema.omit({ admin: true })
const userUpdateSchema = userSchemaWithoutAdmin.partial();

export {
  userSchema,
  returnUserSchema,
  returnMultipleUserSchema,
  userUpdateSchema,
};
