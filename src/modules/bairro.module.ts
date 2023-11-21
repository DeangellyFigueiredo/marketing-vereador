import { Module } from "@nestjs/common";
import { BairroController } from "src/controllers/bairro.controller";
import { BairroRepository } from "src/repositories/bairro/bairro.repository";
import { BairroService } from "src/services/bairro.service";
import { AuthModule } from "./auth.module";
import { AdmModule } from "./adm.module";

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
  imports: [AuthModule, AdmModule],
})
export class BairroModule {}
