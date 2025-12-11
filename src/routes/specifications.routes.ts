import { response, Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";



const specificationsRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createSpecificationService = new CreateSpecificationService(specificationRepository);

    createSpecificationService.execute({ name, description });
    return response.status(201).json(specificationRepository.findByName(name));
})

specificationsRoutes.get("/", (request, response) => {
    const specifications = specificationRepository.list();

    return response.status(200).json(specifications);
})


export { specificationsRoutes };