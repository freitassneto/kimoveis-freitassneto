import { Repository, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

const listSchedulesService = async (realEstateId: number) => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const realEstateQueryBuilder: SelectQueryBuilder<RealEstate> = realEstateRepository.createQueryBuilder("realEstates");

  const findRealEstate: RealEstate | null = await realEstateRepository.findOneBy({
    id: realEstateId,
  });
  if (!findRealEstate) throw new AppError("RealEstate not found", 404);

  const realEstateSchedules: RealEstate | null = await realEstateQueryBuilder
    .innerJoinAndSelect("realEstates.schedules", "schedules")
    .innerJoinAndSelect("realEstates.address", "addresses")
    .innerJoinAndSelect("realEstates.category", "categories")
    .innerJoinAndSelect("schedules.user", "users")
    .where("realEstates.id = :id", { id: realEstateId })
    .getOne();

    return realEstateSchedules;
};

export default listSchedulesService;