import { response, Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
//import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";


const createSpecificationController = new CreateSpecificationController();

const specificationsRoutes = Router();

specificationsRoutes.post("/", createSpecificationController.handle);

// specificationsRoutes.get("/", (request, response) => {
//     return listSpecificationsController.handle(request, response);
// })


export { specificationsRoutes };