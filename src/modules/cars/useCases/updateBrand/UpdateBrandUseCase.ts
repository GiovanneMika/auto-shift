import { Brand } from "@modules/cars/infra/typeorm/entities/Brand";
import { BrandsRepository } from "@modules/cars/infra/typeorm/repositories/BrandsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
    name: string;
}

@injectable()
class UpdateBrandUseCase {

    constructor(
        @inject("BrandsRepository")
        private brandsRepository: BrandsRepository
    ) { }

    async execute({ id, name }: IRequest): Promise<Brand> {
        const brand = await this.brandsRepository.create({ id, name });
        return brand;

    }

}


export { UpdateBrandUseCase };