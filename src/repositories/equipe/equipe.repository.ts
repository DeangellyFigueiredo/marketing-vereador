import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import IEquipeRepository from "./equipe.repository.contract";
import { Equipe } from "src/entities/equipe.entity";

@Injectable()
export class EquipeRepository
  extends Pageable<Equipe>
  implements IEquipeRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  async findById(id: string): Promise<Equipe> {
    return await this.repository.equipe.findUnique({
      where: {
        id,
      },
      include: {
        bairro: true,
        lider: {
          include: {
            role: true,
            Recrutador: true,
          },
        },
        membros: {
          include: {
            role: true,
            Recrutador: true,
          },
        },
      },
    });
  }

  async create(payload: Equipe): Promise<Equipe> {
    return await this.repository.equipe.create({
      data: {
        id: payload.id,
        nome: payload.nome,
        bairro: {
          connect: {
            id: payload.bairro.id,
          },
        },
        lider: {
          connect: {
            id: payload.lider.id,
          },
        },
        membros: {
          connect: payload.membros.map((membro) => {
            return {
              id: membro.id,
            };
          }),
        },
      },
      include: {
        lider: {
          include: {
            role: true,
            Recrutador: true,
          },
        },
        membros: {
          include: {
            role: true,
            Recrutador: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Partial<Equipe>[]> {
    return await this.repository.equipe.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        lider: {
          select: {
            id: true,
            nome: true,
            bairro: true,
            telefone: true,
          },
        },
        membros: {
          select: {
            id: true,
            nome: true,
            bairro: true,
            telefone: true,
          },
        },
        bairro: {
          select: {
            id: true,
            nome: true,
            zona: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.equipe.delete({
      where: {
        id: id,
      },
    });
  }
}
