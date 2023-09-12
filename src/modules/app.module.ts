import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AdmModule } from "./adm.module";
import { RepositoryModule } from "./repository.module";
import { ColaboradorModule } from "./colaborador.module";
import { LiderModule } from "./lider.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "../tmp/uploads"),
    }),
    AuthModule,
    AdmModule,
    RepositoryModule,
    ColaboradorModule,
    LiderModule,
  ],
})
export class AppModule {}
