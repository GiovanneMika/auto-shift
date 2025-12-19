import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";


const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

const carsRoutes = Router();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };