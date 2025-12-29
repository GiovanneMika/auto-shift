import { container } from "tsyringe"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"
import { Request, Response } from "express";

class ListAvailableCarsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, brand_id, category_id } = request.query;
        const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);
        const availableCars = await listAvailableCarsUseCase.execute({
            name: name as string,
            brand_id: brand_id as string,
            category_id: category_id as string
        });

        return response.json(availableCars);


    }

}


export { ListAvailableCarsController }