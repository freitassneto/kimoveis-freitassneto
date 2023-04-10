import { z } from "zod";
import { requestScheduleSchema, responseScheduleSchema } from "../schemas/schedule.schema";

type iRequestSchedule = z.infer<typeof requestScheduleSchema>;
type iResponseSchedule = z.infer<typeof responseScheduleSchema>;

export {
    iRequestSchedule,
    iResponseSchedule
}