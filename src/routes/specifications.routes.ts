import { response, Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
//import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";


const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

const specificationsRoutes = Router();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationsController.handle);


export { specificationsRoutes };