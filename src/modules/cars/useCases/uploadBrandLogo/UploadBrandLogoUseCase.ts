import { BrandsRepository } from "@modules/cars/infra/typeorm/repositories/BrandsRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
    brandId: string;
    logoFile: string;
}

@injectable()
class UploadBrandLogoUseCase {
    constructor(
        @inject("BrandsRepository")
        private brandsRepository: BrandsRepository
    ) { }

    async execute({ brandId, logoFile }: IRequest): Promise<void> {
        const brand = await this.brandsRepository.findById(brandId);
        if (brand.logo) {
            await deleteFile(`./tmp/logos/${brand.logo}`);
        }
        brand.logo = logoFile;

        await this.brandsRepository.create(brand);

    }

}

export { UploadBrandLogoUseCase };