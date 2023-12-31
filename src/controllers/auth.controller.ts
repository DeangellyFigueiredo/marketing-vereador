import { Body, Controller, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/decorators/public.decorator";
import { AdmDTO } from "src/dtos/adm/authAdm.dto";
import { TokenDTO } from "src/dtos/auth/token.dto";
import { ColaboradorDTO } from "src/dtos/colaborador/colaborador.dto";
import { AuthService } from "src/services/auth.service";

@Controller("/api/auths")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("/login")
  async login(@Body() req: AdmDTO) {
    return this.authService.admLogin(req);
  }

  @Public()
  @Post("/login/colaborador")
  async loginColaborador(@Body() req: ColaboradorDTO) {
    return this.authService.colaboradorLogin(req);
  }

  @Public()
  @Post("/verify/token")
  async verify(@Body() payload: TokenDTO) {
    return this.authService.decodeJWT(payload.token);
  }
}
