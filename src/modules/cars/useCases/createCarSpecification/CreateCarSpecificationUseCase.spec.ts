import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { AppError } from "@shared/errors/AppError";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });
    it("should not be able to add a new specification to a nonexistent car", async () => {
        expect(async () => {
            const car_id = "12345";
            const specifications_id = ["54321"];
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to a car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Strada",
            description: "Camionete",
            daily_rate: 200,
            license_plate: "123H2-43A1122",
            fine_amount: 1500,
            brand: "Fiat",
            category_id: "1",
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: "test",
            description: "test description"
        });
        const car_id = car.id;
        const specifications_id = [specification.id];
        const carUpdated = await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        console.log(carUpdated);
        expect(carUpdated.specifications).toBeDefined();
        expect(carUpdated.specifications.length).toBe(1);
    });

})