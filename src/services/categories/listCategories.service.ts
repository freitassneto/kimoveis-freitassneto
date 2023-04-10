import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iCategoriesReturn } from "../../interfaces/categories.interfaces";
import { returnMultipleCategoriesSchema } from "../../schemas/categories.schema";

const listCategoriesService = async (): Promise<iCategoriesReturn> => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const findCategory: Category[] = await categoryRepository.find();

  const categories: iCategoriesReturn = returnMultipleCategoriesSchema.parse(findCategory);

  return categories;
};

export default listCategoriesService;
