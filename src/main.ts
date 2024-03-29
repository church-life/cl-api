import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { TypedConfigService } from '@/env';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './errors/all-exceptions';
import { HttpExceptionsFilter } from './errors/http-exceptions';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { cors: true },
  );
  const configService = app.get(TypedConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new HttpExceptionsFilter(httpAdapterHost),
    new AllExceptionsFilter(httpAdapterHost),
  );

  const config = new DocumentBuilder()
    .setTitle('Church Life API')
    .setDescription('The Church Life API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT', { infer: true });

  await app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}

void bootstrap();
