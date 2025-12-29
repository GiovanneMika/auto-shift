import { Brand } from "../infra/typeorm/entities/Brand";



interface IBrandsRepository {

    create(name: string, logo?: string): Promise<Brand>;
    findByName(name: string): Promise<Brand>;

}

export { IBrandsRepository };