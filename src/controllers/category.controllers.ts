import { Request, Response } from "express";
import { Category } from "../entities";
import { iCategoriesReturn, iCategoryCreate } from "../interfaces/categories.interfaces";
import createCategoriesService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listRealEstatesByCategoryService from "../services/categories/listRealEstatesByCategory.service";

const createCategoriesControllers = async ( req: Request, res: Response): Promise<Response> => {
  const categoryData: iCategoryCreate = req.body;
  const category: Category = await createCategoriesService(categoryData);

  return res.status(201).json(category);
};

const listCategoriesController = async (req: Request, res: Response): Promise<Response> => {
  const categories: iCategoriesReturn = await listCategoriesService();

  return res.json(categories);
};

const listRealEstatesByCategoriesController = async (req: Request, res: Response): Promise<Response> => {
  const categoryId: number = Number(req.params.id);

  const categories: Category = await listRealEstatesByCategoryService(categoryId);

  return res.status(200).json(categories);
};

export { createCategoriesControllers, listCategoriesController, listRealEstatesByCategoriesController };
