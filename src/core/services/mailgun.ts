import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as formData from 'form-data';
import mailgun from 'mailgun.js';
import * as mustache from 'mustache';

@Injectable()
export class MailgunService {
  private client: any;
  private domain = this.configService.get('MAILGUN_DOMAIN');

  constructor(private readonly configService: ConfigService) {
    this.client = new mailgun(formData).client({
      username: this.configService.get('MAILGUN_USERNAME'),
      key: this.configService.get('MAILGUN_API_KEY'),
      url: this.configService.get('MAILGUN_URL'),
    });
  }

  mail = new (class {
    constructor(public parent: MailgunService) {}

    send(
      from: string,
      to: string[],
      subject: string,
      html: string,
      text?: string,
    ) {
      this.parent.client.messages.create(this.parent.domain, {
        from,
        to,
        subject,
        html,
        text,
      });
    }

    formatAndSend(
      from: string,
      to: string[],
      subject: string,
      data: any,
      htmlTemplate: string,
      textTemplate: string,
    ) {
      this.parent.client.messages.create(this.parent.domain, {
        from,
        to,
        subject,
        html: mustache.render(htmlTemplate, data),
        text: mustache.render(textTemplate, data),
      });
    }
  })(this);
}