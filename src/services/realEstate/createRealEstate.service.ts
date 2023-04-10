import {
  iAddress,
  iRequestRealEstate,
  iResponseRealEstate,
} from "../../interfaces/realEstate.interfaces";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { responseRealEstateSchema } from "../../schemas/realEstates.schemas";
import { AppError } from "../../errors";

const createRealEstateService = async (realEstateData: iRequestRealEstate, realEstateAddress: iAddress): Promise<iResponseRealEstate> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const addressExists: Address[] = await addressRepository.find();
  if (addressExists.find((elem) =>
        elem.street === realEstateData.address.street &&
        elem.zipCode === realEstateData.address.zipCode
    )) throw new AppError("Address already exists", 409);

  if (realEstateAddress.zipCode.length > 8) throw new AppError("Invalid Zip Code");

  const state: string[] = realEstateAddress.state.split("");
  if (state.length > 2) throw new AppError("State length must be least than 2");

  const newAddress: Address = addressRepository.create(realEstateAddress);
  await addressRepository.save(newAddress);

  const category: Category | null = await categoryRepository.findOne({
    where: {
      id: realEstateData.categoryId,
    },
  });

  if (!category) {
    throw new AppError("Category not found!", 400);
  }

  const newRealEstate: RealEstate = realEstateRepository.create({
    ...realEstateData,
    address: newAddress,
    category: category,
  });
  await realEstateRepository.save(newRealEstate);

  const returnRealEstate: iResponseRealEstate = responseRealEstateSchema.parse(newRealEstate);

  return returnRealEstate;
};

export default createRealEstateService;
