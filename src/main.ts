import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03.00';
  const config = new DocumentBuilder()
  .setTitle('GoGoTogether')
  .setDescription('Projeto GoGoTogether')
  .setContact("Grupo 05 ","https://github.com/projeto-integrador-g5-generation/GoGoTogether/tree/main","")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
