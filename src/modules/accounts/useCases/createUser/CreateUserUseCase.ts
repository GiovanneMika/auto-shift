import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../../cars/repositories/ICategoriesRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository) {

    }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.UsersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }

        const passwordHash = await hash(password, 8);

        await this.UsersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        })
    }

}

export { CreateUserUseCase }