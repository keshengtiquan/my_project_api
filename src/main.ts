import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionsFilter } from './filters/base.exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import {join} from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters( new HttpExceptionFilter());
  app.useStaticAssets(join(__dirname, '..', 'uploads'))
  await app.listen(3000);
}
bootstrap().then((r) => r);
