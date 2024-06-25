// src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { MailgunConfig } from 'src/config/mailgun.config';




@Injectable()
export class MailService {
  private mailgunClient: mailgun.Mailgun;

  constructor(private readonly mailgunConfig: MailgunConfig) {
    this.mailgunClient = mailgun({
      apiKey: this.mailgunConfig.apiKey,
      domain: this.mailgunConfig.domain,
    });
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    const data = {
      from: 'your-email@your-domain.com', // Replace with your email address
      to: email,
      subject: 'Your OTP for verification',
      text: `Your OTP is: ${otp}`,
    };

    try {
      await this.mailgunClient.messages().send(data);
      console.log('OTP email sent successfully');
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw error;
    }
  }
}
