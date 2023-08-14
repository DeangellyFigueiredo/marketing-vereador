import { Module } from "@nestjs/common";
import { EnfermeiroController } from "src/controllers/enfermeiro.controller";
import { EnfermeiroRepository } from "src/repositories/enfermeiro/enfermeiro.repository";
import { EnfermeiroService } from "src/services/enfermeiro.service";

@Module({
  providers: [
    EnfermeiroService,
    {
      provide: "IEnfermeiroRepository",
      useClass: EnfermeiroRepository,
    },
  ],
  controllers: [EnfermeiroController],
  exports: [EnfermeiroService],
})
export class EnfermeiroModule {}
