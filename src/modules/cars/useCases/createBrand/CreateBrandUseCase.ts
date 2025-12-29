import { Brand } from "@modules/cars/infra/typeorm/entities/Brand";
import { IBrandsRepository } from "@modules/cars/repositories/IBrandsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
    name: string;
}

@injectable()
class CreateBrandUseCase {

    constructor(
        @inject("BrandsRepository")
        private brandsRepository: IBrandsRepository
    ) { }


    async execute({ name }: IRequest): Promise<Brand> {
        const brandAlreadyExists = await this.brandsRepository.findByName(name);
        if (brandAlreadyExists) {
            throw new AppError("This brand already exists!");
        }
        const brand = await this.brandsRepository.create(name);
        return brand;
    }

}

export { CreateBrandUseCase }