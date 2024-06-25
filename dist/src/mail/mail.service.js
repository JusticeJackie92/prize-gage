"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailgun = require("mailgun-js");
const mailgun_config_1 = require("../config/mailgun.config");
let MailService = class MailService {
    constructor(mailgunConfig) {
        this.mailgunConfig = mailgunConfig;
        this.mailgunClient = mailgun({
            apiKey: this.mailgunConfig.apiKey,
            domain: this.mailgunConfig.domain,
        });
    }
    async sendOTP(email, otp) {
        const data = {
            from: 'your-email@your-domain.com',
            to: email,
            subject: 'Your OTP for verification',
            text: `Your OTP is: ${otp}`,
        };
        try {
            await this.mailgunClient.messages().send(data);
            console.log('OTP email sent successfully');
        }
        catch (error) {
            console.error('Error sending OTP email:', error);
            throw error;
        }
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailgun_config_1.MailgunConfig])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map