import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { iRealEstatesWithoutCategoryReturn } from "../../interfaces/realEstate.interfaces";

const listRealEstatesService = async (): Promise<iRealEstatesWithoutCategoryReturn> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  
  const findRealEstates: Array<RealEstate> = await realEstateRepository.find({
    relations: {
      address: true
    },
  });

  return findRealEstates;
};

export default listRealEstatesService;
