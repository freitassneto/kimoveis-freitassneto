import { Request, Response } from "express";
import createScheduleService from "../services/schedules/createSchedule.service";
import listSchedulesService from "../services/schedules/listSchedule.service";
import { iRequestSchedule } from "../interfaces/schedule.interfaces"
import { RealEstate } from "../entities";

const createScheduleController = async (req: Request, res: Response): Promise<Response> => {
  const scheduleData: iRequestSchedule = req.body;
  const userId: number = Number(req.user.id);

  const newSchedule: { message: string } = await createScheduleService(scheduleData, userId);

  return res.status(201).json(newSchedule);
};

const listSchedulesController = async (req: Request, res: Response): Promise<Response> => {
  const realEstateId: number = Number(req.params.id);

  const schedulesList: RealEstate | null = await listSchedulesService(realEstateId);

  return res.status(200).json(schedulesList)
}

export { createScheduleController, listSchedulesController };