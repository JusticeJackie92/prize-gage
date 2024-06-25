import { ConfigService } from '@nestjs/config';
export declare class MailgunService {
    private readonly configService;
    private client;
    private domain;
    constructor(configService: ConfigService);
    mail: {
        parent: MailgunService;
        send(from: string, to: string[], subject: string, html: string, text?: string): void;
        formatAndSend(from: string, to: string[], subject: string, data: any, htmlTemplate: string, textTemplate: string): void;
    };
}
