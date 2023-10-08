import { Module } from "@nestjs/common";
import { BairroController } from "src/controllers/bairro.controller";
import { BairroRepository } from "src/repositories/bairro/bairro.repository";
import { BairroService } from "src/services/bairro.service";

@Module({
  controllers: [BairroController],
  providers: [
    BairroService,
    {
      provide: "IBairroRepository",
      useClass: BairroRepository,
    },
  ],
  exports: [BairroService],
})
export class BairroModule {}
