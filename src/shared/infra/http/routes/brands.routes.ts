import multer from "multer";
import uploadConfig from "@config/upload";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
import { CreateBrandController } from "@modules/cars/useCases/createBrand/CreateBrandController";

const upload = multer(uploadConfig.upload("./tmp/cars"));

const createBrandController = new CreateBrandController();


const brandsRoutes = Router();

brandsRoutes.post("/", ensureAuthenticated, ensureAdmin, createBrandController.handle);



export { brandsRoutes };