import { Module } from "@nestjs/common";
import { HistoricoController } from "src/controllers/historico.controller";
import { HistoricoRepository } from "src/repositories/historico/historico.repository";
import { HistoricoService } from "src/services/historico.service";
import { PacienteModule } from "./paciente.module";
import { FeridaModule } from "./ferida.module";
import { EnfermeiroModule } from "./enfermeiro.module";

@Module({
  providers: [
    HistoricoService,
    {
      provide: "IHistoricoRepository",
      useClass: HistoricoRepository,
    },
  ],
  controllers: [HistoricoController],
  exports: [HistoricoService],
  imports: [PacienteModule, FeridaModule, EnfermeiroModule],
})
export class HistoricoModule {}
