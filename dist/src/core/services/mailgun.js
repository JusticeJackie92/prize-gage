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
exports.MailgunService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const formData = require("form-data");
const mailgun_js_1 = require("mailgun.js");
const mustache = require("mustache");
let MailgunService = class MailgunService {
    constructor(configService) {
        this.configService = configService;
        this.domain = this.configService.get('MAILGUN_DOMAIN');
        this.mail = new (class {
            constructor(parent) {
                this.parent = parent;
            }
            send(from, to, subject, html, text) {
                this.parent.client.messages.create(this.parent.domain, {
                    from,
                    to,
                    subject,
                    html,
                    text,
                });
            }
            formatAndSend(from, to, subject, data, htmlTemplate, textTemplate) {
                this.parent.client.messages.create(this.parent.domain, {
                    from,
                    to,
                    subject,
                    html: mustache.render(htmlTemplate, data),
                    text: mustache.render(textTemplate, data),
                });
            }
        })(this);
        this.client = new mailgun_js_1.default(formData).client({
            username: this.configService.get('MAILGUN_USERNAME'),
            key: this.configService.get('MAILGUN_API_KEY'),
            url: this.configService.get('MAILGUN_URL'),
        });
    }
};
MailgunService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailgunService);
exports.MailgunService = MailgunService;
//# sourceMappingURL=mailgun.js.map