import { Brand } from "../infra/typeorm/entities/Brand";

interface ICreateBrandDTO {
    id?: string;
    name: string;
    logo?: string;
}


interface IBrandsRepository {

    create({ name, logo }: ICreateBrandDTO): Promise<Brand>;
    findByName(name: string): Promise<Brand>;
    findById(id: string): Promise<Brand>;
    list(): Promise<Brand[]>;
    delete(id: string): Promise<void>;

}

export { IBrandsRepository, ICreateBrandDTO };