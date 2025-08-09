import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    },
  });

  const configService = app.get(ConfigService);

  // Security middleware
  app.use(helmet());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  const port = configService.get('PORT') || 5000;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();
