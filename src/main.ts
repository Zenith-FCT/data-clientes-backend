import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseFormatInterceptor } from './common/interceptors/response-format.interceptor';

async function bootstrap() {
  // Enable more verbose logging to help troubleshoot the API integration
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });  // Enable CORS with specific configuration
  app.enableCors({
    origin: true, // Permite cualquier origen (en producción, especificar dominio)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    exposedHeaders: 'Authorization',
  });
  
  // Apply global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  // Apply the global interceptor to format all responses
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Croxdata API')
    .setDescription('API para el dashboard de Croxdata')
    .setVersion('1.0')
    .addTag('clients')
    .addTag('orders')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Define puerto
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation available at: http://localhost:${port}/api`);
}
bootstrap().catch(err => console.error('Failed to start application:', err));
