import { Injectable, Inject, HttpException, forwardRef } from "@nestjs/common";
import { CreateLiderDTO } from "src/dtos/lider/createLider.dto";
import { UpdateLiderDTO } from "src/dtos/lider/updateLider.dto";
import { Lider } from "src/entities/lider.entity";
import { LiderRepository } from "src/repositories/lider/lider.repository";
import { ColaboradorService } from "./colaborador.service";
import { AdmService } from "./adm.service";
import { CreateColaboradorDTO } from "src/dtos/colaborador/createColaborador.dto";
import { Roles } from "src/decorators/roles.decorator";
import * as bcrypt from "bcrypt";
import { AuthService } from "./auth.service";

@Injectable()
export class LiderService {
  constructor(
    @Inject("ILiderRepository")
    private readonly liderRepository: LiderRepository,
    @Inject(forwardRef(() => ColaboradorService))
    private readonly colaboradorService: ColaboradorService,
    @Inject(forwardRef(() => AdmService))
    private readonly admService: AdmService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async create(payload: CreateLiderDTO) {
    const adm = await this.admService.findOneId(payload.admId);
    if (!adm) {
      throw new HttpException("Administrador não encontrado!", 404);
    }

    try {
      await this.liderRepository.create(
        new Lider({ ...payload }, adm.id),
        adm.id
      );
    } catch (error) {
      if (error.code === "P2002") {
        throw new HttpException(
          "E-mail, RG ou CPF já cadastrados para outro Líder! ",
          400
        );
      }
      throw new HttpException("Erro ao criar Líder!", 400);
    }
    return {
      message: "Líder criado com sucesso!",
    };
  }

  async createByLider(payload: CreateColaboradorDTO, id: string) {
    const lider = await this.liderRepository.findOneId(id);
    if (!lider) {
      throw new HttpException("Líder não encontrado!", 404);
    }

    await this.colaboradorService.create({ ...payload, liderId: lider.id });

    return {
      message: "Colaborador criado com sucesso!",
    };
  }

  async findAll() {
    return await this.liderRepository.findAll();
  }

  async delete(id: string, token: string, password: string) {
    const tokenExtracted = await this.authService.decodeJWT(token);
    const adm = await this.admService.findOneId(tokenExtracted.sub.id);
    if (!adm) {
      throw new HttpException("Administrador não encontrado!", 404);
    }

    const isValidPassword = bcrypt.compareSync(password, adm.password);

    if (!isValidPassword) throw new HttpException("Senha inválida!", 400);

    const Lider = await this.liderRepository.findOneId(id);
    if (!Lider) {
      throw new HttpException("Líder não encontrado!", 404);
    }
    await this.liderRepository.delete(id);
    return {
      message: "Líder deletado com sucesso!",
    };
  }

  async findOneId(id: string) {
    return await this.liderRepository.findOneId(id);
  }

  async update(data: UpdateLiderDTO, id: string) {
    const Lider = await this.liderRepository.findOneId(id);
    if (!Lider) {
      throw new HttpException("Líder não encontrado!", 404);
    }
    return await this.liderRepository.update(data, id);
  }

  async reactivate(id: string) {
    const Lider = await this.liderRepository.findOneToReactive(id);
    if (!Lider) {
      throw new HttpException("Líder não encontrado!", 404);
    }
    await this.liderRepository.reactivate(id);
    return {
      message: "Líder reativado com sucesso!",
    };
  }
}
