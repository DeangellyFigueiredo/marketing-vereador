import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import { UpdateLiderDTO } from "src/dtos/lider/updateLider.dto";
import { getDateInLocaleTime } from "src/utils/date.service";
import ILiderRepository from "./lider.repository.contract";
import { Lider } from "src/entities/lider.entity";
import { v4 as uuid } from "uuid";
@Injectable()
export class LiderRepository
  extends Pageable<Lider>
  implements ILiderRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  async findOneId(id: string): Promise<Lider> {
    return await this.repository.colaborador.findFirst({
      where: {
        id: id,
        deletedAt: null,
        role: {
          name: "Lider",
        },
      },
    });
  }

  async findOneToReactive(id: string): Promise<Lider> {
    return await this.repository.colaborador.findFirst({
      where: {
        id: id,
        deletedAt: {
          not: null,
        },
        role: {
          name: "Lider",
        },
      },
    });
  }
  async update(data: UpdateLiderDTO, id: string): Promise<Lider> {
    return await this.repository.colaborador.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }
  async create(payload: Lider, admId: string): Promise<any> {
    const data = {
      id: payload.id,
      nome: payload.nome,
      telefone: payload.telefone,
      idade: payload.idade,
      rua: payload.rua,
      bairro: payload.bairro,
      cep: payload.cep,
      numeroCasa: payload.numeroCasa,
      latitude: payload.latitude ?? "",
      longitude: payload.longitude ?? "",
      email: payload.email,
      profissao: payload.profissao,
      escolaridade: payload.escolaridade,
      redesSociais: payload.redesSociais,
      dataNascimento: payload.dataNascimento,
      rg: payload.rg,
      orgaoExpedidor: payload.orgaoExpedidor,
      cpf: payload.cpf,
      tituloEleitor: payload.tituloEleitor,
      zona: payload.zona,
      secao: payload.secao,
      recebeBeneficio: payload.recebeBeneficio,
      faixaSalarial: payload.faixaSalarial,
    };

    const register = await this.repository.recrutador.create({
      data: {
        id: uuid(),
        colaborador: {
          create: {
            ...data,
            role: {
              connect: {
                name: "Lider",
              },
            },
          },
        },
        admId: admId,
      },
      include: {
        colaborador: true,
      },
    });
    return register.colaborador;
  }
  async findAll(): Promise<Partial<Lider>[]> {
    return await this.repository.colaborador.findMany({
      where: {
        role: {
          name: "Lider",
        },
        deletedAt: null,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
      orderBy: {
        nome: "desc",
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

  async reactivate(id: string): Promise<any> {
    return await this.repository.colaborador.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: null,
      },
    });
  }
}
