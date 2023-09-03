import { Module } from "@nestjs/common";
import { ColaboradorController } from "src/controllers/colaborador.controller";
import { ColaboradorRepository } from "src/repositories/colaborador/colaborador.repository";
import { ColaboradorService } from "src/services/colaborador.service";

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
})
export class ColaboradorModule {}
