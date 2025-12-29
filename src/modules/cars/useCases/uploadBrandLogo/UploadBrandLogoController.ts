import { Request, Response } from "express";
import { UploadBrandLogoUseCase } from "./UploadBrandLogoUseCase";
import { container } from "tsyringe";



class UploadBrandLogoController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id: brandId } = request.params;
        const logoFile = request.file.filename;

        const updateBrandLogoUseCase = container.resolve(UploadBrandLogoUseCase);

        await updateBrandLogoUseCase.execute({ brandId, logoFile });
        return response.status(204).send();
    }

}

export { UploadBrandLogoController };