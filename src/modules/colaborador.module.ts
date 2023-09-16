import { Module, forwardRef } from "@nestjs/common";
import { ColaboradorController } from "src/controllers/colaborador.controller";
import { ColaboradorRepository } from "src/repositories/colaborador/colaborador.repository";
import { ColaboradorService } from "src/services/colaborador.service";
import { LiderModule } from "./lider.module";
import { AuthModule } from "./auth.module";
import { AdmModule } from "./adm.module";

@Module({
  providers: [
    ColaboradorService,
    {
      provide: "IColaboradorRepository",
      useClass: ColaboradorRepository,
    },
  ],
  controllers: [ColaboradorController],
  exports: [ColaboradorService],
  imports: [LiderModule, AuthModule, AdmModule],
})
export class ColaboradorModule {}
