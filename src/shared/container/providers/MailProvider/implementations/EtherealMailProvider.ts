import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";


@injectable()
class EtherealMailProvider implements IMailProvider {
    constructor() {
        nodemailer.createTestAccount().then(account => {

        })

    }
    sendMail(to: string, subject: string, body: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}


export { EtherealMailProvider }