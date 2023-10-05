import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateEquipeDTO } from "src/dtos/equipe/createEquipe.dto";
import { EquipeRepository } from "src/repositories/equipe/equipe.repository";
import { ColaboradorService } from "./colaborador.service";
import { Equipe } from "src/entities/equipe.entity";
import { BairroService } from "./bairro.service";

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

  async findAll() {
    return await this.equipeRepository.findAll();
  }

  async findById(id: string) {
    return await this.equipeRepository.findById(id);
  }

  async delete(id: string) {
    return await this.equipeRepository.delete(id);
  }
}
