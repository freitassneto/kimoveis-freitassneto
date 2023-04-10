import { z } from "zod";

const addressRequestSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().optional().default("0"),
  city: z.string().max(20),
  state: z.string().max(2),
});

const createResponseAddressSchema = addressRequestSchema.extend({
  id: z.number(),
});

const requestEstateSchema = z.object({
  value: z.number().min(0).or(z.string()),
  size: z.number().positive(),
  address: addressRequestSchema,
  categoryId: z.number(),
});

const responseRealEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  value: z.number().min(0).or(z.string()),
  size: z.number().positive(),
  address: createResponseAddressSchema,
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

const responseRealEstateWithoutCategorySchema = responseRealEstateSchema.omit({
  category: true}).array();

const returnMultipeRealEstatesSchema = z.array(responseRealEstateSchema);
const returnMultipeRealEstatesWithoutCategorySchema = z.array(responseRealEstateWithoutCategorySchema);

export {
  addressRequestSchema,
  createResponseAddressSchema,
  requestEstateSchema,
  responseRealEstateSchema,
  returnMultipeRealEstatesSchema,
  returnMultipeRealEstatesWithoutCategorySchema,
  responseRealEstateWithoutCategorySchema
};
