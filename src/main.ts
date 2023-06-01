import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000
  app.useGlobalPipes(new ValidationPipe());

  let cors = require('cors')
  app.use(cors({
    credentials: true,
    origin: '*'
  }))

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
