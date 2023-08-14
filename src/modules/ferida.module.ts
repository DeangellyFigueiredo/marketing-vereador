import { Module } from "@nestjs/common";
import { FeridaController } from "src/controllers/ferida.controller";
import { FeridaRepository } from "src/repositories/ferida/ferida.repository";
import { FeridaService } from "src/services/ferida.service";

@Module({
  providers: [
    FeridaService,
    {
      provide: "IFeridaRepository",
      useClass: FeridaRepository,
    },
  ],
  controllers: [FeridaController],
  exports: [FeridaService],
})
export class FeridaModule {}
