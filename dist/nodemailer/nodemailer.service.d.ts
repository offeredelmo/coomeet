import { MailerService } from '@nestjs-modules/mailer';
export declare class NodemailerService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendEmailByRecoverypassword(code: string, email: any): Promise<string>;
}
