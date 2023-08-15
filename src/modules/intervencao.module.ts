import { Module } from "@nestjs/common";
import { IntervencaoController } from "src/controllers/intervencao.controller";
import { IntervencaoRepository } from "src/repositories/intervencao/intervencao.repository";
import { IntervencaoService } from "src/services/intervencao.service";
import { AuthModule } from "./auth.module";
import { PacienteModule } from "./paciente.module";
import { EnfermeiroModule } from "./enfermeiro.module";

@Module({
  providers: [
    IntervencaoService,
    {
      provide: "IIntervencaoRepository",
      useClass: IntervencaoRepository,
    },
  ],
  controllers: [IntervencaoController],
  exports: [IntervencaoService],
  imports: [AuthModule, PacienteModule, EnfermeiroModule],
})
export class IntervencaoModule {}
