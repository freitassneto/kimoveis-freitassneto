import { z } from "zod";
import { categroryRequestSchema, categrorySchema, returnMultipleCategoriesSchema } from "../schemas/categories.schema";

type iCategory = z.infer<typeof categrorySchema>;
type iCategoryCreate = z.infer<typeof categroryRequestSchema>;
type iCategoriesReturn = z.infer<typeof returnMultipleCategoriesSchema>;

export { iCategory, iCategoryCreate, iCategoriesReturn };
