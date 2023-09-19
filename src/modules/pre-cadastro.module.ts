import { Module } from "@nestjs/common";
import { PreCadastroController } from "src/controllers/pre-cadastro.controller";
import { PreCadastroRepository } from "src/repositories/pre-cadastro/pre-cadastro.repository";
import { PreCadastroService } from "src/services/pre-cadastro.service";

@Module({
  controllers: [PreCadastroController],
  providers: [
    {
      provide: "IPreCadastroRepository",
      useClass: PreCadastroRepository,
    },
    PreCadastroService,
  ],
  exports: [PreCadastroService],
})
export class PreCadastroModule {}
