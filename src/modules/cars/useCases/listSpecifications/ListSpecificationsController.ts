import { container } from "tsyringe";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { Request, Response } from "express";

class ListSpecificationsController {

    async handle(request: Request, response: Response) {
        const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);
        const specifications = await listSpecificationsUseCase.execute();
        return response.status(200).json(specifications);
    }

}

export { ListSpecificationsController };