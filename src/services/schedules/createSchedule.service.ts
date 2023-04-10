import { Repository, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { iRequestSchedule } from "../../interfaces/schedule.interfaces";
import "dotenv/config";
import { AppError } from "../../errors";
import { requestScheduleSchema } from "../../schemas/schedule.schema";

const createScheduleService = async (scheduleData: iRequestSchedule, userId: number) => {
  scheduleData = {...scheduleData, user: Number(userId)}
  scheduleData = requestScheduleSchema.parse(scheduleData);
  
  const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const buildSchedule: SelectQueryBuilder<Schedule> = scheduleRepository.createQueryBuilder("schedules");

  const user: User | null = await userRepository.findOneBy({ id: userId });
  if (!user) throw new AppError("User not found", 404);

  const realEstate: RealEstate | null = await realEstateRepository.findOneBy({
    id: scheduleData.realEstateId,
  });
  if (!realEstate) throw new AppError("RealEstate not found", 404);

  const scheduleDate: string = scheduleData.date.toString();
  const scheduleHour: string = scheduleData.hour.toString();
  const date: Date = new Date(scheduleDate + ", " + scheduleHour);
  const day: number = date.getDay();
  const hour: number = date.getHours();

  if (day === 0 || day === 6)
    throw new AppError("Invalid date, work days are monday to friday", 400);
  if (hour < 8 || hour > 18)
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  const userSchedules: Schedule[] = await buildSchedule
    .leftJoinAndSelect("schedules.user", "user")
    .where("user.id = :id", { id: userId })
    .andWhere("date = :date", { date: scheduleDate })
    .andWhere("hour = :hour", { hour: scheduleHour })
    .getMany();

  if (userSchedules.length > 0) throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
      );
  
  const realEstateSchedules: Schedule[] = await buildSchedule
    .leftJoinAndSelect("schedules.realEstate", "realEstates")
    .where("realEstates.id = :id", { id: scheduleData.realEstateId })
    .andWhere("hour = :hour", { hour: scheduleHour })
    .andWhere("date = :date", { date: scheduleDate })
    .getMany();

  if (realEstateSchedules.length > 0) throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );

  const newSchedule: Schedule = scheduleRepository.create({
    ...scheduleData,
    user: user,
    realEstate: realEstate,
  });

  await scheduleRepository.save(newSchedule);

  return { message: "Schedule created" };
};

export default createScheduleService;
