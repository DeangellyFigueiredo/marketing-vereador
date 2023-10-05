import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import { Bairro } from "src/entities/bairro.entity";
import IBairroRepository from "./bairro.repository.contract";

@Injectable()
export class BairroRepository
  extends Pageable<Bairro>
  implements IBairroRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  async findById(id: string): Promise<Bairro> {
    return await this.repository.bairro.findUnique({
      where: {
        id,
      },
    });
  }

  async create(payload: Bairro): Promise<Bairro> {
    return await this.repository.bairro.create({
      data: { ...payload, Equipes: null },
    });
  }

  async findAll(): Promise<Partial<Bairro>[]> {
    return await this.repository.bairro.findMany({
      select: {
        id: true,
        nome: true,
        zona: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.bairro.delete({
      where: {
        id: id,
      },
    });
  }
}
