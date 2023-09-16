import { Module, forwardRef } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { RoleGuard } from "src/configs/authentication/auth.guard";
import { AuthService } from "src/services/auth.service";
import { AuthController } from "src/controllers/auth.controller";
import { AdmModule } from "./adm.module";

@Module({
  imports: [
    forwardRef(() => AdmModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
