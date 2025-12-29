import { IBrandsRepository } from "@modules/cars/repositories/IBrandsRepository";
import { Brand } from "../entities/Brand";
import { getRepository, Repository } from "typeorm";


class BrandsRepository implements IBrandsRepository {
    private repository = new Repository<Brand>;

    constructor() {
        this.repository = getRepository(Brand);
    }

    async findByName(name: string): Promise<Brand> {
        const brand = await this.repository.findOne({ name });
        return brand;
    }

    async create(name: string): Promise<Brand> {
        const brand = await this.repository.create({ name });
        await this.repository.save(brand);
        return brand;
    }

}

export { BrandsRepository }