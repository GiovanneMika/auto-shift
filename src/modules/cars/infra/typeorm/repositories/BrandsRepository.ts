import { IBrandsRepository, ICreateBrandDTO } from "@modules/cars/repositories/IBrandsRepository";
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

    async findById(id: string): Promise<Brand> {
        const brand = await this.repository.findOne(id);
        return brand;
    }

    async create({ id, name, logo }: ICreateBrandDTO): Promise<Brand> {
        const brand = this.repository.create({ id, name, logo });
        await this.repository.save(brand);
        return brand;
    }

}

export { BrandsRepository }