import { z } from "zod";

const categrorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const categroryRequestSchema = categrorySchema.omit({ id: true });
const categrorySchemaWithoutName = categrorySchema.pick({ id: true });

const returnMultipleCategoriesSchema = categrorySchema.array();

export {
  categroryRequestSchema,
  categrorySchema,
  returnMultipleCategoriesSchema,
  categrorySchemaWithoutName
};
