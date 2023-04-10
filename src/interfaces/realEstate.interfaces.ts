import {
  addressRequestSchema,
  createResponseAddressSchema,
  requestEstateSchema,
  responseRealEstateSchema,
  responseRealEstateWithoutCategorySchema,
  returnMultipeRealEstatesSchema,
} from "../schemas/realEstates.schemas";
import { z } from "zod";

type iRequestRealEstate = z.infer<typeof requestEstateSchema>;
type iResponseRealEstate = z.infer<typeof responseRealEstateSchema>;
type iRealEstatesReturn = z.infer<typeof returnMultipeRealEstatesSchema>;
type iRealEstatesWithoutCategoryReturn = z.infer<typeof responseRealEstateWithoutCategorySchema>;

type iAddress = z.infer<typeof addressRequestSchema>
type iAddressReturn = z.infer<typeof createResponseAddressSchema>

export { iRequestRealEstate, iResponseRealEstate, iRealEstatesReturn, iAddress, iAddressReturn, iRealEstatesWithoutCategoryReturn };