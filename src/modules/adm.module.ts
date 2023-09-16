import { Module, forwardRef } from "@nestjs/common";
import { AdmController } from "src/controllers/adm.controller";
import { AdmRepository } from "src/repositories/adm/adm.repository";
import { AdmService } from "src/services/adm.service";
import { AuthModule } from "./auth.module";

@Module({
  providers: [
    AdmService,
    {
      provide: "IAdmRepository",
      useClass: AdmRepository,
    },
  ],
  controllers: [AdmController],
  exports: [AdmService],
  imports: [forwardRef(() => AuthModule)],
})
export class AdmModule {}
