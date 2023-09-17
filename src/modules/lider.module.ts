import { Module, forwardRef } from "@nestjs/common";
import { ColaboradorModule } from "./colaborador.module";
import { LiderService } from "src/services/lider.service";
import { LiderRepository } from "src/repositories/lider/lider.repository";
import { LiderController } from "src/controllers/lider.controller";
import { AdmModule } from "./adm.module";

@Module({
  providers: [
    LiderService,
    {
      provide: "ILiderRepository",
      useClass: LiderRepository,
    },
  ],
  exports: [LiderService],
  controllers: [LiderController],
  imports: [forwardRef(() => ColaboradorModule), forwardRef(() => AdmModule)],
})
export class LiderModule {}
