
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailgunConfig } from 'src/config/mailgun.config';


@Module({
  providers: [MailService, MailgunConfig],
  exports: [MailService],
})
export class MailModule {}