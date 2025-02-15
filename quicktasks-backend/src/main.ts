import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Autorise toutes les origines (en dev)
  app.enableCors({
    origin: 'http://localhost:5173', // Autorise uniquement le frontend SvelteKit
    methods: 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
