import multer from "multer";
import uploadConfig from "@config/upload";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
import { CreateBrandController } from "@modules/cars/useCases/createBrand/CreateBrandController";
import { UploadBrandLogoController } from "@modules/cars/useCases/uploadBrandLogo/UploadBrandLogoController";
import { ListBrandsController } from "@modules/cars/useCases/listBrands/ListBrandsController";

const uploadLogo = multer(uploadConfig.upload("./tmp/logos"));

const createBrandController = new CreateBrandController();
const uploadBrandLogoController = new UploadBrandLogoController();
const listBrandsController = new ListBrandsController();


const brandsRoutes = Router();

brandsRoutes.post("/", ensureAuthenticated, ensureAdmin, createBrandController.handle);

brandsRoutes.patch("/logo/:id", ensureAuthenticated, ensureAdmin, uploadLogo.single("logo"), uploadBrandLogoController.handle);

brandsRoutes.get("/", ensureAuthenticated, ensureAdmin, listBrandsController.handle);



export { brandsRoutes };