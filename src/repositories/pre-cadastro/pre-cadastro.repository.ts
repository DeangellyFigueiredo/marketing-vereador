import { Injectable } from "@nestjs/common";
import { PreCadastro } from "@prisma/client";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import IPreCadastroRepository from "./pre-cadastro.repository.contract";

@Injectable()
export class PreCadastroRepository
  extends Pageable<PreCadastro>
  implements IPreCadastroRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  async findById(id: string): Promise<PreCadastro> {
    return await this.repository.preCadastro.findUnique({
      where: {
        id,
      },
    });
  }

  async create(payload: PreCadastro): Promise<PreCadastro> {
    return await this.repository.preCadastro.create({
      data: { ...payload },
    });
  }

  async findAll(): Promise<Partial<PreCadastro>[]> {
    return await this.repository.preCadastro.findMany();
  }

  async delete(id: string): Promise<any> {
    return await this.repository.preCadastro.delete({
      where: {
        id: id,
      },
    });
  }
}
