import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
    })

    it("should be able to create a new rental", async () => {

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: new Date(Date.now() + 24 * 61 * 60 * 1000),
        });

        console.log(rental);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental for a user that has a rental open", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
            const rental = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1212121",
                expected_return_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });

            console.log(rental);

        }).rejects.toBeInstanceOf(AppError);

    });

    it("should not be able to create a new rental for a car already rented", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "121212",
                expected_return_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
            const rental = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });

            console.log(rental);

        }).rejects.toMatchObject({
            message: "The car is unavailable!"
        });
    });

    it("should not be able to create a new rental for less than 24 hours", async () => {
        expect(async () => {
            const rental = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: new Date(Date.now() + 21 * 60 * 60 * 1000),
            });

            console.log(rental);
        }).rejects.toBeInstanceOf(AppError);

    })
});