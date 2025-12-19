import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}
@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {

    }

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);
        const specificationsExists = await this.specificationsRepository.findByIds(specifications_id);
        if (!carExists) {
            throw new AppError("Car does not exists!")
        }
        if(specificationsExists.length === 0){
            throw new AppError("Specifications does not exists!")
        }

        carExists.specifications = specificationsExists;
        await this.carsRepository.create(carExists);

        return carExists;
    }
}

export { CreateCarSpecificationUseCase }