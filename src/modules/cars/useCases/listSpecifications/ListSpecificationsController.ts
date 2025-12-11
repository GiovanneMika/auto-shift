import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { Request, Response } from "express";

class ListSpecificationsController {

    constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {
    }

    handle(request: Request, response: Response) {
        const specifications = this.listSpecificationsUseCase.execute();
        return response.status(200).json(specifications);
    }

}

export { ListSpecificationsController };