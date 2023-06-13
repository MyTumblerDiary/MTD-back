import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT');

  // Enable cors for all routes
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.get(GraphQLSchemaHost);

  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
