import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dayjsDateProvider);
    })

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 40,
            brand: "Brand",
            category_id: "category123",
        });
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: new Date(Date.now() + 24 * 61 * 60 * 1000),
        });

        console.log("Aluguel:", rental);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental for a user that has a rental open", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 40,
            brand: "Brand",
            category_id: "category123",
        });

        const car2 = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "DEF-5678",
            fine_amount: 40,
            brand: "Brand",
            category_id: "category123",
        });

        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: car2.id,
                expected_return_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            })
        ).rejects.toEqual(new AppError("The user already have a rental open!"));
        console.log(car, car2);

    });

    it("should not be able to create a new rental for a car already rented", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 40,
            brand: "Brand",
            category_id: "category123",
        });

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123456",
                car_id: car.id,
                expected_return_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
            const rental = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: car.id,
                expected_return_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });

            console.log(rental);

        }).rejects.toMatchObject({
            message: "The car is unavailable!"
        });
    });

    it("should not be able to create a new rental for less than 24 hours", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 40,
            brand: "Brand",
            category_id: "category123",
        });
        expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: car.id,
                expected_return_date: new Date(Date.now() + 21 * 60 * 60 * 1000),
            })
        ).rejects.toEqual(new AppError("Rental time must be at least 24 hours!"));

    })
});