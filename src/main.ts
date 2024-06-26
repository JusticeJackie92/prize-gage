import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Nest Auth with Email Verification')
        .setDescription('API description')
        .setVersion('1.0')
        .addCookieAuth('token', {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        })
        .addTag('api')
        .build();
  
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
        app.enableCors({
          origin: '*',
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
          preflightContinue: false,
          optionsSuccessStatus: 204,
        });
    app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();