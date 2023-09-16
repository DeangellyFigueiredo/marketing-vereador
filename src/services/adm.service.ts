import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { HttpStatusCode } from "axios";
import * as bcrypt from "bcrypt";
import { Roles } from "src/decorators/roles.decorator";
import { CreateAdmDTO } from "src/dtos/adm/createAdm.dto";
import { FirstLoginDTO } from "src/dtos/adm/firstLogin.dto";
import { UpdateAdmDTO } from "src/dtos/adm/updateAdm.dto";
import { Adm } from "src/entities/adm.entity";
import { AdmRepository } from "src/repositories/adm/adm.repository";
import { AuthService } from "./auth.service";

@Injectable()
export class AdmService {
  constructor(
    @Inject("IAdmRepository")
    private readonly admRepository: AdmRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async create(data: CreateAdmDTO): Promise<any> {
    const adm = await this.findOne(data.email);
    if (adm)
      throw new HttpException(
        "Email já cadastrado para outro usuário",
        HttpStatus.BAD_REQUEST
      );

    const pass = bcrypt.hashSync(
      data.name.substring(0, 3) + data.cpf.substring(0, 3),
      10
    );

    await this.admRepository.create(new Adm({ ...data, password: pass }));

    return {
      msg: "Administrador criado com sucesso",
    };
  }
  async findAll() {
    return await this.admRepository.findAll();
  }

  async delete(id: string) {
    const adm = await this.findOneId(id);

    return await this.admRepository.delete(id);
  }

  async findOne(email: string) {
    const adm = await this.admRepository.findOne(email);
    return adm;
  }

  async findOneId(id: string) {
    const adm = await this.admRepository.findOneId(id);
    return adm;
  }
  async update(payload: UpdateAdmDTO, id: string) {
    return await this.admRepository.update(payload, id);
  }

  async firstLogin(payload: FirstLoginDTO, token: string) {
    const tokenDecoded = await this.authService.decodeJWT(token);
    const adm = await this.admRepository.findOneId(tokenDecoded.sub.id);
    if (!adm)
      throw new HttpException(
        "Administrador não encontrado",
        HttpStatus.NOT_FOUND
      );
    const password = bcrypt.hashSync(payload.password, 10);
    await this.admRepository.updateFirstLogin(tokenDecoded.sub.id, password);
    return await this.authService.admLogin({
      email: adm.email,
      password: payload.password,
    });
  }
}
