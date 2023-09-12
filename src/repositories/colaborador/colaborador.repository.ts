import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import { UpdateColaboradorDTO } from "src/dtos/colaborador/updateColaborador.dto";
import { Colaborador } from "src/entities/colaborador.entity";
import { getDateInLocaleTime } from "src/utils/date.service";
import IColaboradorRepository from "./colaborador.repository.contract";

@Injectable()
export class ColaboradorRepository
  extends Pageable<Colaborador>
  implements IColaboradorRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  async findOneId(id: string): Promise<Colaborador> {
    return await this.repository.colaborador.findUnique({
      where: {
        id,
      },
    });
  }
  async update(data: UpdateColaboradorDTO, id: string): Promise<Colaborador> {
    return await this.repository.colaborador.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }
  async create(payload: Colaborador): Promise<Colaborador> {
    const data = {
      id: payload.id,
      nome: payload.nome,
      rua: payload.rua,
      numeroCasa: payload.numeroCasa,
      bairro: payload.bairro,
      idade: payload.idade,
      telefone: payload.telefone,
      email: payload.email,
      profissao: payload.profissao,
      escolaridade: payload.escolaridade,
      redesSociais: payload.redesSociais,
      cep: payload.cep,
      latitude: payload.latitude,
      longitude: payload.longitude,
      dataNascimento: payload.dataNascimento,
      rg: payload.rg,
      orgaoExpedidor: payload.orgaoExpedidor,
      cpf: payload.cpf,
      tituloEleitor: payload.tituloEleitor,
      zona: payload.zona,
      secao: payload.secao,
      recebeBeneficio: payload.recebeBeneficio,
      faixaSalarial: payload.faixaSalarial,
      liderId: payload.liderId,
      ...(payload.admId !== null &&
        payload.admId !== undefined && {
          Adm: {
            connect: {
              id: payload.admId,
            },
          },
        }),
    };
    return await this.repository.colaborador.create({
      data: { ...data },
    });
  }
  async findAll(): Promise<Partial<Colaborador>[]> {
    return await this.repository.colaborador.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.colaborador.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: getDateInLocaleTime(new Date()),
      },
    });
  }

  async findAllByLiderId(liderId: string): Promise<Partial<Colaborador>[]> {
    return await this.repository.colaborador.findMany({
      where: {
        liderId: liderId,
      },
    });
  }
}
