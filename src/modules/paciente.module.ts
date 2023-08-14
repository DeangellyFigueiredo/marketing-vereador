import { forwardRef, Module } from "@nestjs/common";
import { PacienteRepository } from "src/repositories/paciente/paciente.repository";
import { PacienteService } from "src/services/paciente.service";
import { PacienteController } from "src/controllers/paciente.controller";

@Module({
  providers: [
    PacienteService,
    {
      provide: "IPacienteRepository",
      useClass: PacienteRepository,
    },
  ],
  controllers: [PacienteController],
  exports: [PacienteService],
})
export class PacienteModule {}
