import { HttpException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { CreateColaboradorDTO } from "src/dtos/colaborador/createColaborador.dto";
import { UpdateColaboradorDTO } from "src/dtos/colaborador/updateColaborador.dto";
import { Colaborador } from "src/entities/colaborador.entity";
import { ColaboradorRepository } from "src/repositories/colaborador/colaborador.repository";
import { LiderService } from "./lider.service";
import { Lider } from "src/entities/lider.entity";
import { AuthService } from "./auth.service";
import { AdmService } from "./adm.service";
import * as bcrypt from "bcrypt";
import { FirstLoginDTO } from "src/dtos/adm/firstLogin.dto";
@Injectable()
export class ColaboradorService {
  constructor(
    @Inject("IColaboradorRepository")
    private readonly colaboradorRepository: ColaboradorRepository,
    @Inject(forwardRef(() => LiderService))
    private readonly liderService: LiderService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => AdmService))
    private readonly admService: AdmService
  ) {}

  async create(payload: CreateColaboradorDTO) {
    try {
      await this.colaboradorRepository.create(
        new Colaborador({ ...payload }),
        payload.admId,
        payload.liderId,
        payload.recrutadorId
      );
    } catch (error) {
      if (error.code === "P2002") {
        throw new HttpException(
          "E-mail, RG ou CPF já cadastrados para outro colaborador! ",
          400
        );
      }
      throw new HttpException("Erro ao criar colaborador!", 400);
    }
    return {
      message: "Colaborador criado com sucesso!",
    };
  }

  async findAll() {
    return await this.colaboradorRepository.findAll();
  }

  async delete(id: string) {
    const colaborador = await this.colaboradorRepository.findOneId(id);
    if (!colaborador) {
      throw new HttpException("Colaborador não encontrado!", 404);
    }
    await this.colaboradorRepository.delete(id);
    return {
      message: "Colaborador deletado com sucesso!",
    };
  }

  async findOneId(id: string) {
    return await this.colaboradorRepository.findOneId(id);
  }

  async update(data: UpdateColaboradorDTO, id: string) {
    const colaborador = await this.colaboradorRepository.findOneId(id);
    if (!colaborador) {
      throw new HttpException("Colaborador não encontrado!", 404);
    }
    return await this.colaboradorRepository.update(data, id);
  }

  async findAllByLiderId(liderId: string) {
    return await this.colaboradorRepository.findAllByLiderId(liderId);
  }

  async findByEmail(email: string) {
    return await this.colaboradorRepository.findByEmail(email);
  }

  async updateToLider(id: string, token: string) {
    let adm;
    if (process.env.NODE_ENV === "production") {
      const tokenExtracted = await this.authService.decodeJWT(token);
      adm = await this.admService.findOneId(tokenExtracted.sub.id);
      if (!adm) {
        throw new HttpException("Administrador não encontrado!", 404);
      }
    }
    const colaborador = await this.colaboradorRepository.findOneId(id);
    if (!colaborador) {
      throw new HttpException("Colaborador não encontrado!", 404);
    }

    const lider: Lider = new Lider(
      {
        ...colaborador,
      },
      ...(adm ? [adm.id] : [])
    );
    await this.liderService.create(lider);
    await this.colaboradorRepository.delete(id);
    return {
      message: "Colaborador atualizado para Líder com sucesso!",
    };
  }

  async updateToColaboradorCadastro(id: string, token: string) {
    let adm;
    if (process.env.NODE_ENV === "production") {
      const tokenExtracted = await this.authService.decodeJWT(token);
      adm = await this.admService.findOneId(tokenExtracted.sub.id);
      if (!adm) {
        throw new HttpException("Administrador não encontrado!", 404);
      }
    }
    const colaborador = await this.colaboradorRepository.findOneId(id);
    const password = bcrypt.hashSync(
      colaborador.nome.substring(0, 3) + colaborador.cpf.substring(0, 3),
      10
    );
    await this.colaboradorRepository.update(
      {
        usuarioDeCadastro: true,
        password,
      },
      id
    );
    return {
      message:
        "Colaborador atualizado para Colaborador de Cadastro com sucesso!",
    };
  }

  async firstLogin(payload: FirstLoginDTO, token: string) {
    const tokenExtracted = await this.authService.decodeJWT(token);
    const colaborador = await this.colaboradorRepository.findOneId(
      tokenExtracted.sub.id
    );
    if (!colaborador)
      throw new HttpException("Colaborador não encontrado!", 404);

    if (!colaborador.firstLogin)
      throw new HttpException("Colaborador já realizou o primeiro login!", 400);

    const password = bcrypt.hashSync(payload.password, 10);
    await this.colaboradorRepository.update(
      {
        password,
        firstLogin: false,
      },
      colaborador.id
    );
    return this.authService.colaboradorLogin({
      email: colaborador.email,
      password: payload.password,
    });
  }
}
