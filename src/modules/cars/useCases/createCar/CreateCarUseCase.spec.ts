import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create a car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Strada",
            description: "Camionete",
            daily_rate: 200,
            license_plate: "123H2-43A1122",
            fine_amount: 1500,
            brand: "Fiat",
            category_id: "1",
        });
        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a new car with same license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Gol",
                description: "Hatchback",
                daily_rate: 200,
                license_plate: "123H2-43A12",
                fine_amount: 1500,
                brand: "Volkswagen",
                category_id: "1",
            });
            await createCarUseCase.execute({
                name: "Toro",
                description: "Camionete",
                daily_rate: 200,
                license_plate: "123H2-43A12",
                fine_amount: 1500,
                brand: "Fiat",
                category_id: "1",
            });
        }).rejects.toBeInstanceOf(AppError);

    });

    it("car should be registered as available by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car available",
            description: "Camionete",
            daily_rate: 200,
            license_plate: "123H2-43A1122",
            fine_amount: 1500,
            brand: "Fiat",
            category_id: "1",
        });
        console.log(car);
        expect(car.available).toBe(true);
    });
});