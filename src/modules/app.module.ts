import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PacienteModule } from "./paciente.module";
import { RepositoryModule } from "./repository.module";
import { EnfermeiroModule } from "./enfermeiro.module";
import { AuthModule } from "./auth.module";
import { FeridaModule } from "./ferida.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { HistoricoModule } from "./historico.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "../tmp/uploads"),
    }),
    RepositoryModule,
    PacienteModule,
    EnfermeiroModule,
    AuthModule,
    FeridaModule,
    HistoricoModule,
  ],
})
export class AppModule {}
