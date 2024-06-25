import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [  
    ConfigModule.forRoot({
      
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    PrismaModule,
    
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService ],
})
export class AppModule {}