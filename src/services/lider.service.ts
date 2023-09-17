import { Injectable, Inject, HttpException, forwardRef } from "@nestjs/common";
import { CreateLiderDTO } from "src/dtos/lider/createLider.dto";
import { UpdateLiderDTO } from "src/dtos/lider/updateLider.dto";
import { Lider } from "src/entities/lider.entity";
import { LiderRepository } from "src/repositories/lider/lider.repository";
import { ColaboradorService } from "./colaborador.service";
import { AdmService } from "./adm.service";

@Injectable()
export class LiderService {
  constructor(
    @Inject("ILiderRepository")
    private readonly liderRepository: LiderRepository,
    @Inject(forwardRef(() => ColaboradorService))
    private readonly colaboradorService: ColaboradorService,
    @Inject(forwardRef(() => AdmService))
    private readonly admService: AdmService
  ) {}

  async create(payload: CreateLiderDTO) {
    const adm = await this.admService.findOneId(payload.admId);
    if (!adm) {
      throw new HttpException("Administrador não encontrado!", 404);
    }

    try {
      await this.liderRepository.create(new Lider({ ...payload }, adm.id));
    } catch (error) {
      if (error.code === "P2002") {
        throw new HttpException(
          "E-mail, RG ou CPF já cadastrados para outro Líder! ",
          400
        );
      }
    }
    return {
      message: "Líder criado com sucesso!",
    };
  }

  async findAll() {
    return await this.liderRepository.findAll();
  }

  async delete(id: string) {
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

  async findAllByLiderId(liderId: string) {
    return await this.colaboradorService.findAllByLiderId(liderId);
  }

  async reactivate(id: string) {
    const Lider = await this.liderRepository.findOneId(id);
    if (!Lider) {
      throw new HttpException("Líder não encontrado!", 404);
    }
    await this.liderRepository.reactivate(id);
    return {
      message: "Líder reativado com sucesso!",
    };
  }
}
