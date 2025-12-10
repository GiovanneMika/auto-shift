import { json, Router } from 'express';

import { v4 as uuidv4 } from 'uuid';
import { Category } from '../model/Category';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

const categories: Category[] = [];

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
        return response.status(400).json({
            message: "Name already exists!"
        });

    }

    categoriesRepository.create({ name, description });
    return response.status(201).json({
        message: "Category created sucessfully!"
    });
})

categoriesRoutes.get("/", (request, response) => {
    const categories = categoriesRepository.list();
    return response.status(200).json(categories);
})

export { categoriesRoutes };