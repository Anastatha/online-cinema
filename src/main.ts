import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  const PORT = process.env.PORT || 5000
  app.useGlobalPipes(new ValidationPipe());

  let cors = require('cors')
  app.use(cors({
    credentials: true,
    origin: '*'
  }))

  const config = new DocumentBuilder()
    .setTitle('Cinema')
    .setVersion('1.0')
    .addTag('cinema')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, ()=>console.log(`Server started on port = ${PORT}`));
}
start();
