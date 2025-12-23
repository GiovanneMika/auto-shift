import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro de teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand1",
            category_id: "category1"
        });

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro de teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand1",
            category_id: "category1"
        });

        const car2 = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Carro de teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand1",
            category_id: "category1"
        });

        const cars = await listAvailableCarsUseCase.execute({ name: "Car2" });
        expect(cars).toEqual([car2]);

    })

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro de teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand1",
            category_id: "category1"
        });

        const car2 = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Carro de teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand1",
            category_id: "category1"
        });

        const cars = await listAvailableCarsUseCase.execute({ brand: "Brand1" });
        expect(cars).toEqual([car, car2]);

    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro de teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand1",
            category_id: "category1"
        });

        const car2 = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Carro de teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand1",
            category_id: "category1"
        });

        const car3 = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Carro de teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand1",
            category_id: "category1"
        });

        const cars = await listAvailableCarsUseCase.execute({ category_id: "category1" });
        expect(cars).toEqual([car, car2, car3]);

    });
});