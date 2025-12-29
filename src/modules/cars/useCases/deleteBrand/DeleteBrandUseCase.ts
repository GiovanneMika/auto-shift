import { IBrandsRepository } from "@modules/cars/repositories/IBrandsRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteBrandUseCase {

    constructor(
        @inject("BrandsRepository")
        private brandsRepository: IBrandsRepository
    ) { }

    async execute(id: string): Promise<void> {
        const brand = await this.brandsRepository.findById(id);
        if(!brand){
            throw new AppError("Brand not found");
        }
        if (brand.logo) {
            await deleteFile(`./tmp/logos/${brand.logo}`);
        }
        await this.brandsRepository.delete(id);
    }

}

export { DeleteBrandUseCase };