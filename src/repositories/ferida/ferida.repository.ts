import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import { Ferida } from "src/entities/ferida.entity";
import IFeridaRepository from "./ferida.repository.contract";

@Injectable()
export class FeridaRepository
  extends Pageable<Ferida>
  implements IFeridaRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }
  async create(payload: Ferida): Promise<Ferida> {
    return await this.repository.ferida.create({ data: payload });
  }
  async findAll(): Promise<Ferida[]> {
    return await this.repository.ferida.findMany();
  }
}
