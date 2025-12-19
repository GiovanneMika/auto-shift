import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            id
        });

        this.cars.push(car);
        return car;

    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.cars.find(car => car.license_plate === license_plate);
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        let availableCars = this.cars.filter(car => car.available === true);

        if (brand) {
            availableCars = availableCars.filter(car => car.brand === brand);
        }

        if (name) {
            availableCars = availableCars.filter(car => car.name === name);
        }

        if (category_id) {
            availableCars = availableCars.filter(car => car.category_id === category_id);
        }
        console.log(availableCars);

        return availableCars;
    }

    async findById(id: string): Promise<Car | undefined> {
        return this.cars.find(car => car.id === id);
    }
}

export { CarsRepositoryInMemory };