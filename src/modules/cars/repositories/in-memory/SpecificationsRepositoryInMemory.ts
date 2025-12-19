import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async findByName(name: string): Promise<Specification | undefined> {
        return this.specifications.find(specification => specification.name === name);
    }

    async list(): Promise<Specification[]> {
        return this.specifications;
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });
        this.specifications.push(specification);
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter(specification => ids.includes(specification.id));
    }

}

export { SpecificationsRepositoryInMemory };