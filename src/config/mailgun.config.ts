import { Injectable } from '@nestjs/common';

@Injectable()
export class MailgunConfig {
  apiKey: string = 'your-mailgun-api-key'; // Replace with your Mailgun API key
  domain: string = 'your-mailgun-domain'; // Replace with your Mailgun domain
}