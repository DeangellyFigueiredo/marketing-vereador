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

  const port =
    process.env.NODE_ENV === "production"
      ? process.env.PORT_DOCKER
      : process.env.PORT_BACKEND;
  await app.listen(port, () => {
    console.log(`🤖 server running on port ${port}...`);
    console.log(
      `🚀 swagger running on port http://${process.env.IP_BACKEND}:${port}/swagger`
    );
  });
}

bootstrap();
