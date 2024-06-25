import { MailgunConfig } from 'src/config/mailgun.config';
export declare class MailService {
    private readonly mailgunConfig;
    private mailgunClient;
    constructor(mailgunConfig: MailgunConfig);
    sendOTP(email: string, otp: string): Promise<void>;
}
