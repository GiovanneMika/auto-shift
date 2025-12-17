import { container, inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { sign } from "jsonwebtoken"

import { compare } from "bcrypt";
import { AppError } from "@errors/AppError";

interface IRequest {
    email: string;
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    };
    token: string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) {
    }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        //verifica se o usuário existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!")
        }

        //verifica se a senha está correta

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!")
        }

        //gera o jwt

        const token = sign({}, "2c757e59aa7bf8f57406e98d20be9e9f", {
            subject: user.id,
            expiresIn: "1d"
        });

        const returnToken: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return returnToken;
    }


}

export { AuthenticateUserUseCase };