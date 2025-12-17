import { NextFunction, Request, Response } from "express";

import { verify } from "jsonwebtoken"
import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "2c757e59aa7bf8f57406e98d20be9e9f") as IPayload;
        console.log(user_id);
        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User does not exists!", 401);
        }

        request.user = {
            id: user_id
        };
        next();
    } catch (error) {
        throw new AppError("Invalid token!", 401);

    }
}