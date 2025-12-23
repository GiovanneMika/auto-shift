import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
    user_id: string
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id)

        if (!rental) {
            throw new AppError("The rental doesn't exists!");
        }

        //verificar se o tempo de devolução for menos de 24 horas e cobrar a diária completa
        const dateNow = this.dateProvider.dateNow();
        let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);
        if (daily < 1) {
            daily = 1;
        }

        let total = 0;
        const delay = this.dateProvider.compareInDays(rental.expected_return_date, dateNow);
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total += calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;
        // rental.updated_at = this.dateProvider.dateNow();

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }

}

export { DevolutionRentalUseCase }