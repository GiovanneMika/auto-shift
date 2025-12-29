import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory
describe("Send Forgot Mail", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );

    });


    it("should be able to send a forgot password email to the user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email: "user@example.com",
            name: "User Test",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("user@example.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exist", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("notuser@example.com")
        ).rejects.toEqual(new AppError("User does not exists!"));

    });

    it("should be able to create a new user token", async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email: "user2@example.com",
            name: "User2 Test",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("user2@example.com");
        expect(generateTokenMail).toHaveBeenCalled();

    });


});