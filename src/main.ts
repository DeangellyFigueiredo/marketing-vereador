import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    methods: "*",
    optionsSuccessStatus: 200,
    exposedHeaders: "*",
  });

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle("Marketing Vereador")
    .setDescription("The Marketing Vereador API description")
    .setVersion("1.0")
    .addTag("Marketing Vereador")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(process.env.PORT_BACKEND, () => {
    console.log(`🤖 server running on port ${process.env.PORT_BACKEND}...`);
    console.log(
      `🚀 swagger running on port http://localhost:${process.env.PORT_BACKEND}/swagger`
    );
  });
}

bootstrap();
