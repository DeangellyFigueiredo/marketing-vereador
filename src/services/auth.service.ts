import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { fromUnixTime, isAfter } from "date-fns";
import { setPermissions } from "src/utils/roles.permissions";
import * as bcrypt from "bcrypt";
import { ERoles } from "src/utils/ETypes";
import { TokenDTO } from "src/dtos/auth/token.dto";
import { AdmService } from "./adm.service";
import { AdmDTO } from "src/dtos/adm/authAdm.dto";
import { ColaboradorDTO } from "src/dtos/colaborador/colaborador.dto";
import { ColaboradorService } from "./colaborador.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => AdmService))
    private admService: AdmService,
    @Inject(forwardRef(() => ColaboradorService))
    private colaboradorService: ColaboradorService
  ) {}
  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.admService.findOne(login);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private verifyToken(token: string): any {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      });

      return decodedToken;
    } catch (e) {
      throw new HttpException("Token inválido!", HttpStatus.UNAUTHORIZED);
    }
  }

  private extractToken(tokenToExtract: string): string {
    const [, token] = tokenToExtract.split("Bearer ");
    return token;
  }

  async login(user: string) {
    const payload = { login: user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async decodeJWT(token: string): Promise<any> {
    if (!token)
      throw new HttpException("Token não provido", HttpStatus.UNAUTHORIZED);

    const tokenExtracted = token.includes("Bearer")
      ? this.extractToken(token)
      : token;
    if (!tokenExtracted)
      throw new HttpException("Token não provido", HttpStatus.UNAUTHORIZED);

    const decodedToken = await this.jwtService.decode(tokenExtracted);
    return decodedToken;
  }

  async authenticate(token: string): Promise<boolean> {
    if (!token)
      throw new HttpException("Token não provido!", HttpStatus.UNAUTHORIZED);

    const tokenExtracted = this.extractToken(token);

    const decodedToken = this.verifyToken(tokenExtracted);

    const tokenExpirationIsAfterNow = isAfter(
      fromUnixTime(decodedToken.exp),
      new Date()
    );

    if (!tokenExpirationIsAfterNow)
      throw new HttpException("Token está expirado", HttpStatus.UNAUTHORIZED);

    return true;
  }

  private generateToken(_expireToken: number, employee: any) {
    const token = this.jwtService.sign(
      { sub: employee, permissions: setPermissions(employee.role) },
      {
        expiresIn: process.env.JWT_EXPIRES ?? "1d",
        secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      }
    );

    return token;
  }

  async admLogin(data: AdmDTO): Promise<any> {
    const user = await this.admService.findOne(data.email);
    let userColab;
    if (!user)
      userColab = await this.colaboradorService.findByEmail(data.email);
    if (!user && !userColab)
      throw new HttpException(
        "E-mail ou senha inválido",
        HttpStatus.UNAUTHORIZED
      );

    if (userColab) return await this.colaboradorLogin(data);

    const isValidPassword = bcrypt.compareSync(data.password, user.password);

    if (!isValidPassword)
      throw new HttpException(
        "E-mail ou senha inválido",
        HttpStatus.UNAUTHORIZED
      );

    const token = this.generateToken(
      1 * 1000 * 60 * 60,
      user.firstLogin
        ? { id: user.id, role: ERoles.ROLE_PrimeiroLogin }
        : {
            id: user.id,
            role: ERoles.ROLE_Administrativo,
          }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      createdAt,
      password,
      firstLogin,
      email,
      cpf,
      updatedAt,
      name,
      ...result
    } = user;

    return { ...result, token };
  }

  async colaboradorLogin(data: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.colaboradorService.findByEmail(data.email);
    if (!user)
      throw new HttpException(
        "E-mail ou senha inválido",
        HttpStatus.UNAUTHORIZED
      );

    const isValidPassword = bcrypt.compareSync(data.password, user.password);

    if (!isValidPassword)
      throw new HttpException(
        "E-mail ou senha inválido",
        HttpStatus.UNAUTHORIZED
      );

    const token = this.generateToken(
      1 * 1000 * 60 * 60,
      user.firstLogin
        ? { id: user.id, role: ERoles.ROLE_PrimeiroLogin }
        : {
            id: user.id,
            role: user.role.name,
          }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    return { token };
  }
}
