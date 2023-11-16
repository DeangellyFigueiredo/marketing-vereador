import { Module } from "@nestjs/common";
import { EquipeController } from "src/controllers/equipe.controller";
import { EquipeService } from "src/services/equipe.service";
import { BairroModule } from "./bairro.module";
import { ColaboradorModule } from "./colaborador.module";
import { EquipeRepository } from "src/repositories/equipe/equipe.repository";
import { AuthModule } from "./auth.module";
import { AdmModule } from "./adm.module";

@Module({
  providers: [
    EquipeService,
    {
      provide: "IEquipeRepository",
      useClass: EquipeRepository,
    },
  ],
  controllers: [EquipeController],
  exports: [EquipeService],
  imports: [ColaboradorModule, BairroModule, AuthModule, AdmModule],
})
export class EquipeModule {}
