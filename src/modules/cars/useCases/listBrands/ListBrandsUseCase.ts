import { Brand } from "@modules/cars/infra/typeorm/entities/Brand";
import { IBrandsRepository } from "@modules/cars/repositories/IBrandsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ListBrandsUseCase {

    constructor(
        @inject("BrandsRepository")
        private brandsRepository: IBrandsRepository
    ) { }

    async execute(): Promise<Brand[]> {

        const brands = await this.brandsRepository.list();

        return brands;
    }

}

export { ListBrandsUseCase };