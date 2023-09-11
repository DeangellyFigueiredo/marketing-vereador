import { HttpCode, HttpException, Inject, Injectable } from "@nestjs/common";
import { CreateColaboradorDTO } from "src/dtos/colaborador/createColaborador.dto";
import { UpdateColaboradorDTO } from "src/dtos/colaborador/updateColaborador.dto";
import { Colaborador } from "src/entities/colaborador.entity";
import { ColaboradorRepository } from "src/repositories/colaborador/colaborador.repository";

@Injectable()
export class ColaboradorService {
  constructor(
    @Inject("IColaboradorRepository")
    private readonly colaboradorRepository: ColaboradorRepository
  ) {}

  async create(payload: CreateColaboradorDTO) {
    try {
      await this.colaboradorRepository.create(new Colaborador({ ...payload }));
    } catch (error) {
      if (error.code === "P2002") {
        throw new HttpException(
          "E-mail, RG ou CPF já cadastrados para outro colaborador! ",
          400
        );
      }
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
}