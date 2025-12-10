import { json, Router } from 'express';

import { v4 as uuidv4 } from 'uuid';
import { Category } from '../model/Category';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

const categories: Category[] = [];

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(categoriesRepository);

    createCategoryService.execute({name, description});

    return response.status(201).json({
        message: "Category created sucessfully!"
    });
})

categoriesRoutes.get("/", (request, response) => {
    const categories = categoriesRepository.list();
    return response.status(200).json(categories);
})

export { categoriesRoutes };