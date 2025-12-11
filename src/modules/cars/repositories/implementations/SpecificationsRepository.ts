import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
    private specifications: Specification[] = [];

    constructor() {
        this.specifications = [];
    }

    findByName(name: string): Specification | undefined {
        const specification = this.specifications.find(specification => name === specification.name);
        if (specification) {
            return specification;
        }
    }

    list(): Specification[] {
        return this.specifications;
        
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();
        specification.created_at
        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }


}

export { SpecificationRepository };