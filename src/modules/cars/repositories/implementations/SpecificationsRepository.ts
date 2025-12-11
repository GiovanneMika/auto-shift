import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[] = [];

    private static INSTANCE: SpecificationsRepository;

    private constructor() {
        this.specifications = [];
    }

    public static getInstance():SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE) {
            return SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }
        return SpecificationsRepository.INSTANCE;
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

export { SpecificationsRepository };