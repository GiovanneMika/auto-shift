import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { ensureAdmin } from "../middlewares/EnsureAdmin";


const createCarController = new CreateCarController();

const carsRoutes = Router();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

export { carsRoutes };