import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AdmModule } from "./adm.module";
import { RepositoryModule } from "./repository.module";
import { ColaboradorModule } from "./colaborador.module";
import { LiderModule } from "./lider.module";
import { PreCadastroModule } from "./pre-cadastro.module";
import { BairroModule } from "./bairro.module";
import { EquipeModule } from "./equipe.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),

    AuthModule,
    AdmModule,
    RepositoryModule,
    ColaboradorModule,
    LiderModule,
    PreCadastroModule,
    BairroModule,
    EquipeModule,
  ],
})
export class AppModule {}
