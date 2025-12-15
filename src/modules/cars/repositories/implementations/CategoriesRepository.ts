import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

import { getRepository, Repository } from "typeorm";



class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>;

    // private static INSTANCE: CategoriesRepository;

    constructor() {
        this.repository = getRepository(Category);
    }

    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }
    //     return CategoriesRepository.INSTANCE;
    // }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        // const category = new Category();
        // Object.assign(category, {
        //     name,
        //     description,
        //     created_at: new Date()
        // });

        const category = this.repository.create({
            description,
            name,
        })

        await this.repository.save(category);

    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category | undefined> {
        // const category = this.categories.find(category => category.name === name);
        const category = this.repository.findOne({ name });
        return category;
    }

}

export { CategoriesRepository }
