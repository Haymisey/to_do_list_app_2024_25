import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // Allow only this frontend origin
    methods: 'GET,POST,PUT,DELETE', // Allow the necessary HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow Content-Type and Authorization headers
  });

  await app.listen(3001); // Make sure the backend runs on port 3001
}
bootstrap();
