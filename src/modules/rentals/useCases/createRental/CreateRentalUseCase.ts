import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { In } from "typeorm";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    // definir os parâmetros necessários para criar um aluguel
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }
    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        //Não deve ser possivel alugar um carro já alugado
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if (carUnavailable) {
            throw new AppError("The car is unavailable!");
        }

        //Não deve ser possível um usuário que já tem um aluguel aberto alugar outro carro
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
        if (rentalOpenToUser) {
            throw new AppError("The user already have a rental open!");
        }

        //Não deve ser possível alugar um carro por menos de 24 horas
        const minimumRentalTime = 24;
        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);
        console.log("Compare date:" + compare);

        if (compare < minimumRentalTime) {
            throw new AppError("Rental time must be at least 24 hours!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);
        
        return rental;
    }
}

export { CreateRentalUseCase };