import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository) {

    }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.UsersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists!", 401);
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