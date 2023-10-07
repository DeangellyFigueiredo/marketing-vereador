import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateEquipeDTO } from "src/dtos/equipe/createEquipe.dto";
import { EquipeRepository } from "src/repositories/equipe/equipe.repository";
import { ColaboradorService } from "./colaborador.service";
import { Equipe } from "src/entities/equipe.entity";
import { BairroService } from "./bairro.service";
import { FilterEquipeDTO } from "src/dtos/equipe/filterEquipe.dto";
import { UpdateEquipeDTO } from "src/dtos/equipe/updateEquipe.dto";

@Injectable()
export class EquipeService {
  constructor(
    @Inject("IEquipeRepository")
    private readonly equipeRepository: EquipeRepository,
    private readonly colaboradorService: ColaboradorService,
    private readonly bairroService: BairroService
  ) {}

  async create(payload: CreateEquipeDTO) {
    const lider = await this.colaboradorService.findOneId(payload.liderId);
    if (!lider)
      throw new HttpException("Líder não encontrado", HttpStatus.NOT_FOUND);
    if (lider.role.name !== "Lider")
      throw new HttpException(
        "Colaborador não é líder",
        HttpStatus.BAD_REQUEST
      );

    if (lider.liderEquipe)
      throw new HttpException(
        `Colaborador ${lider.nome} já é líder de outra equipe`,
        HttpStatus.BAD_REQUEST
      );

    const equipe = await this.equipeRepository.findByNome(payload.nome);
    if (equipe)
      throw new HttpException(
        `Já existe uma equipe com o nome ${payload.nome}`,
        HttpStatus.BAD_REQUEST
      );

    const bairro = await this.bairroService.findById(payload.bairroId);
    if (!bairro)
      throw new HttpException("Bairro não encontrado", HttpStatus.NOT_FOUND);

    const membrosEmOutraEquipe = [];
    const membros = await Promise.all(
      payload.membrosIds.map(async (id) => {
        const membro = await this.colaboradorService.findOneId(id);
        if (!membro)
          throw new HttpException(
            "Alguns membros não foram encontrados",
            HttpStatus.NOT_FOUND
          );
        if (membro.role.name !== "Colaborador-Comum")
          throw new HttpException(
            "Colaborador não é Colaborador Comum",
            HttpStatus.BAD_REQUEST
          );
        if (membro.membroEquipe) membrosEmOutraEquipe.push(membro.nome);
        return membro;
      })
    );

    if (membrosEmOutraEquipe.length > 0)
      throw new HttpException(
        `Os colaboradores ${membrosEmOutraEquipe.join(
          ", "
        )} já estão em outra equipe`,
        HttpStatus.BAD_REQUEST
      );
    await this.equipeRepository.create(
      new Equipe({ nome: payload.nome, lider, membros, bairro })
    );
    return {
      message: "Equipe criada com sucesso",
    };
  }

  async findAll(query: FilterEquipeDTO) {
    return await this.equipeRepository.findAll(query);
  }

  async findById(id: string) {
    return await this.equipeRepository.findById(id);
  }

  async delete(id: string) {
    return await this.equipeRepository.delete(id);
  }

  async update(id: string, payload: UpdateEquipeDTO) {
    const equipe = await this.equipeRepository.findById(id);
    if (!equipe)
      throw new HttpException("Equipe não encontrada", HttpStatus.NOT_FOUND);

    if (payload.nome) {
      const equipe = await this.equipeRepository.findByNome(payload.nome);
      if (equipe)
        throw new HttpException(
          `Já existe uma equipe com o nome ${payload.nome}`,
          HttpStatus.BAD_REQUEST
        );
    }

    if (payload.liderId) {
      const lider = await this.colaboradorService.findOneId(payload.liderId);
      if (!lider)
        throw new HttpException("Líder não encontrado", HttpStatus.NOT_FOUND);
      if (lider.role.name !== "Lider")
        throw new HttpException(
          "Colaborador não é líder",
          HttpStatus.BAD_REQUEST
        );

      if (lider.liderEquipe)
        throw new HttpException(
          `Colaborador ${lider.nome} já é líder de outra equipe`,
          HttpStatus.BAD_REQUEST
        );
    }

    if (payload.bairroId) {
      const bairro = await this.bairroService.findById(payload.bairroId);
      if (!bairro)
        throw new HttpException("Bairro não encontrado", HttpStatus.NOT_FOUND);
    }

    const membrosEmOutraEquipe = [];
    await Promise.all(
      payload.novosMembros.map(async (id) => {
        const membro = await this.colaboradorService.findOneId(id);
        if (!membro)
          throw new HttpException(
            "Alguns membros não foram encontrados",
            HttpStatus.NOT_FOUND
          );
        if (membro.role.name !== "Colaborador-Comum")
          throw new HttpException(
            "Colaborador não é Colaborador Comum",
            HttpStatus.BAD_REQUEST
          );
        if (membro.membroEquipe) membrosEmOutraEquipe.push(membro.nome);
      })
    );

    if (membrosEmOutraEquipe.length > 0)
      throw new HttpException(
        `Os colaboradores ${membrosEmOutraEquipe.join(
          ", "
        )} já estão em outra equipe`,
        HttpStatus.BAD_REQUEST
      );

    const membrosToRemove = await Promise.all(
      payload.removerMembros.map(async (id) => {
        const membro = await this.colaboradorService.findOneId(id);
        if (!membro)
          throw new HttpException(
            "Alguns membros não foram encontrados",
            HttpStatus.NOT_FOUND
          );
        if (membro.role.name !== "Colaborador-Comum")
          throw new HttpException(
            "Colaborador não é Colaborador Comum",
            HttpStatus.BAD_REQUEST
          );
        if (!membro.membroEquipe)
          throw new HttpException(
            `O colaborador ${membro.nome} não está em uma equipe`,
            HttpStatus.BAD_REQUEST
          );
        if (membro.membroEquipe.id !== equipe.id)
          throw new HttpException(
            `O colaborador ${membro.nome} não está na equipe ${equipe.nome}`,
            HttpStatus.BAD_REQUEST
          );

        return membro;
      })
    );

    await Promise.all(
      membrosToRemove.map(async (membro) => {
        await this.equipeRepository.removeMembro(id, membro.id);
      })
    );

    await this.equipeRepository.update(id, {
      bairroId: payload.bairroId,
      liderId: payload.liderId,
      nome: payload.nome,
      novosMembros: payload.novosMembros,
    });
  }
}
