import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";
import { getRepository, Repository } from "typeorm";

class UsersTokensRepository implements IUsersTokensRepository {

    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens)
    }
    create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        return;
    }

}

export { UsersTokensRepository }