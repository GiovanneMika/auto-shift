import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";


const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);

export { rentalsRoutes };