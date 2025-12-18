import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";




export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user;

    const usersRepository = new UsersRepository();

    const { isAdmin } = await usersRepository.findById(id);

    if (!isAdmin) {
        throw new AppError("User is not admin!", 401);
    }

    return next();
}  