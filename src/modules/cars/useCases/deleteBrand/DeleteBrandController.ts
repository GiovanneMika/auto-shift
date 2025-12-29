import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteBrandUseCase } from "./DeleteBrandUseCase";



class DeleteBrandController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteBrandUseCase = container.resolve(DeleteBrandUseCase);
        await deleteBrandUseCase.execute(id);
        return response.status(200).json({
            message: "Brand deleted successfully!"
        });
    }
}
export { DeleteBrandController };