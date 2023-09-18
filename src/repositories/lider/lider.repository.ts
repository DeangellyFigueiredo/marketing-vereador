import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import { UpdateLiderDTO } from "src/dtos/lider/updateLider.dto";
import { getDateInLocaleTime } from "src/utils/date.service";
import ILiderRepository from "./lider.repository.contract";
import { Lider } from "src/entities/lider.entity";

@Injectable()
export class LiderRepository
  extends Pageable<Lider>
  implements ILiderRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  async findOneId(id: string): Promise<Lider> {
    return await this.repository.lider.findUnique({
      where: {
        id: id,
      },
    });
  }
  async update(data: UpdateLiderDTO, id: string): Promise<Lider> {
    return await this.repository.lider.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }
  async create(payload: Lider): Promise<Lider> {
    console.log(payload);
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

    console.log(data);
    return await this.repository.lider.create({
      data: { ...data },
    });
  }
  async findAll(): Promise<Partial<Lider>[]> {
    return await this.repository.lider.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.lider.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: getDateInLocaleTime(new Date()),
      },
    });
  }

  async reactivate(id: string): Promise<any> {
    return await this.repository.lider.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: null,
      },
    });
  }
}
