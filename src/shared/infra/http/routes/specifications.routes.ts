import { response, Router } from "express";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/EnsureAuthenticated";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
//import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";


const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

const specificationsRoutes = Router();

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationsController.handle);


export { specificationsRoutes };