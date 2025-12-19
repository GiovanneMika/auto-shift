import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface IRequest {
    // definir os parâmetros necessários para criar um aluguel
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}


class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) { }
    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<void> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("The car is unavailable!")
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
        if (rentalOpenToUser) {
            throw new AppError("The user already have a rental open!")
        }
    }
}

export { CreateRentalUseCase };