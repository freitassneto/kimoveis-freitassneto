import { z } from "zod";

const requestScheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
  user: z.number()
});

const responseScheduleSchema = requestScheduleSchema.extend({ id: z.number() });

const returnMultipleSchedulesSchema = z.array(responseScheduleSchema);

export {
    requestScheduleSchema,
    responseScheduleSchema,
    returnMultipleSchedulesSchema
}