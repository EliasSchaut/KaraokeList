import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { INestApplication } from '@nestjs/common';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          imgSrc: ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
          styleSrc: [`'self'`, `'unsafe-inline'`, 'https://cdn.jsdelivr.net'],
          scriptSrc: ["'self'", "https: 'unsafe-inline'", "'unsafe-eval'"],
          objectSrc: ["'self'"],
          defaultSrc: [`'self'`],
        },
      },
      crossOriginEmbedderPolicy: true,
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  return app;
}

export default async function get_http_adapter_instance() {
  const app = await createApp();
  await app.init();
  return app.getHttpAdapter().getInstance();
}
