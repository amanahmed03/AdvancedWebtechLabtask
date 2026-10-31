import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global validation so every DTO gets checked automatically
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips fields that aren't in the DTO
      forbidNonWhitelisted: true, // and throws an error if someone sends them anyway
      transform: true, // "3" -> 3 etc.
    }),
  );

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
