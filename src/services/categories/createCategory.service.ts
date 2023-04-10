import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { iCategoryCreate } from "../../interfaces/categories.interfaces";

const createCategoriesService = async (categoryData: iCategoryCreate): Promise<Category> => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
  const categoryExists: Category | null = await categoryRepository.findOneBy({ name: categoryData.name });

  if(categoryExists) throw new AppError("Category already exists", 409);

  const category: Category = categoryRepository.create(categoryData);
  await categoryRepository.save(category);

  return category;
};

export default createCategoriesService;
