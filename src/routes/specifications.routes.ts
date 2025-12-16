import { response, Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
//import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";


const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationsController.handle);


export { specificationsRoutes };