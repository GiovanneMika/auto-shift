import multer from "multer";
import uploadConfig from "@config/upload";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
import { CreateBrandController } from "@modules/cars/useCases/createBrand/CreateBrandController";
import { UploadBrandLogoController } from "@modules/cars/useCases/uploadBrandLogo/UploadBrandLogoController";

const uploadLogo = multer(uploadConfig.upload("./tmp/logos"));

const createBrandController = new CreateBrandController();
const uploadBrandLogoController = new UploadBrandLogoController();


const brandsRoutes = Router();

brandsRoutes.post("/", ensureAuthenticated, ensureAdmin, createBrandController.handle);

brandsRoutes.patch("/logo/:id", ensureAuthenticated, ensureAdmin, uploadLogo.single("logo"), uploadBrandLogoController.handle);



export { brandsRoutes };