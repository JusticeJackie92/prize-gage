import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';


@Module({
  imports: [JwtModule, PassportModule, PrismaModule, MailModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
