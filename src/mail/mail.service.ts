import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MessageDto } from './dtos/message.dto';

@Injectable()
export class MailService {
    constructor(private readonly mailer: MailerService){}
    async sendEmail(message: MessageDto) {
        await this.mailer.sendMail({
            to: {
                name: message.to_name,
                address: message.to_address
            },
            from: {
                name: message.from_name,
                address: message.from_address
            },
            subject: message.subject,
            html: message.html
        })
    }
}
