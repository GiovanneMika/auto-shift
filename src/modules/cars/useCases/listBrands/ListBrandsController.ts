import { Request, Response } from "express";
import { ListBrandsUseCase } from "./ListBrandsUseCase";
import { container } from "tsyringe";



class ListBrandsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listBrandsUseCase = container.resolve(ListBrandsUseCase);
        const brands = await listBrandsUseCase.execute();
        return response.json(brands);
    }

}

export { ListBrandsController };