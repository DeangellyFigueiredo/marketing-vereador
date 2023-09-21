import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import { UpdateColaboradorDTO } from "src/dtos/colaborador/updateColaborador.dto";
import { Colaborador } from "src/entities/colaborador.entity";
import { getDateInLocaleTime } from "src/utils/date.service";
import IColaboradorRepository from "./colaborador.repository.contract";
import { v4 as uuid } from "uuid";
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
      include: {
        role: true,
      },
    });
  }
  async update(
    payload: UpdateColaboradorDTO,
    id: string,
    role?: string
  ): Promise<Colaborador> {
    const data = {
      ...payload,
      ...(role && {
        role: {
          connect: {
            name: role,
          },
        },
      }),
    };
    return await this.repository.colaborador.update({
      where: {
        id,
      },
      data: { ...data },
      include: {
        role: true,
      },
    });
  }
  async create(
    payload: Colaborador,
    admId?: string,
    liderId?: string,
    recrutadorId?: string
  ): Promise<any> {
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
      latitude: payload.latitude ?? "",
      longitude: payload.longitude ?? "",
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
    const relation = {
      ...(admId && {
        admId: admId,
      }),
      ...(liderId && {
        liderId: liderId,
      }),
      ...(recrutadorId && {
        recrutadorId: recrutadorId,
      }),
    };
    const register = await this.repository.recrutador.create({
      data: {
        id: uuid(),
        colaborador: {
          create: {
            ...data,
            role: {
              connect: {
                name: "Colaborador-Comum",
              },
            },
          },
        },
        ...relation,
      },
      include: {
        colaborador: true,
      },
    });
    return register.colaborador;
  }
  async findAll(): Promise<Partial<Colaborador>[]> {
    return await this.repository.colaborador.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.colaborador.delete({
      where: {
        id: id,
      },
    });
  }

  async findAllByLiderId(liderId: string): Promise<Partial<Colaborador>[]> {
    return; /* await this.repository.colaborador.findMany({
      where: {
        liderId: liderId,
      },
      select: {
        nome: true,
        cpf: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    }); */
  }

  async findByEmail(email: string): Promise<Colaborador> {
    return await this.repository.colaborador.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });
  }
}
