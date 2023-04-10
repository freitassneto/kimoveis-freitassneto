import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";

const listRealEstatesByCategoryService = async (categoryId: number) => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const category: Category | null = await categoryRepository.findOne({
    relations: {
      realEstate: true,
    },
    where: {
      id: categoryId,
    },
    withDeleted: true
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

export default listRealEstatesByCategoryService;
