import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
    category_id?: string;
    name?: string;
    brand_id?: string;
}
@injectable()
class ListAvailableCarsUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ brand_id, category_id, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(brand_id, category_id, name);
        return cars;

    }
}

export { ListAvailableCarsUseCase };