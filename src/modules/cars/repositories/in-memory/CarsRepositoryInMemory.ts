import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { AppError } from "@shared/errors/AppError";
import { v4 as uuidv4 } from "uuid";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({ name, description, daily_rate, license_plate, fine_amount, brand_id, category_id, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand_id,
            category_id,
            id
        });
        if (!car.id) {
            car.id = uuidv4();
        }

        this.cars.push(car);
        return car;

    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.cars.find(car => car.license_plate === license_plate);
    }

    async findAvailable(brand_id?: string, category_id?: string, name?: string): Promise<Car[]> {
        let availableCars = this.cars.filter(car => car.available === true);

        if (brand_id) {
            availableCars = availableCars.filter(car => car.brand_id === brand_id);
        }

        if (name) {
            availableCars = availableCars.filter(car => car.name === name);
        }

        if (category_id) {
            availableCars = availableCars.filter(car => car.category_id === category_id);
        }

        return availableCars;
    }

    async findById(id: string): Promise<Car | undefined> {
        return this.cars.find(car => car.id === id);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const index = this.cars.findIndex(car => car.id === id);
        if (index === -1) {
            throw new AppError("Car not found");
        }
        this.cars[index].available = available;
    }
}

export { CarsRepositoryInMemory };