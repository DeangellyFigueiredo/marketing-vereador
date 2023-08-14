import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import { Enfermeiro } from "src/entities/enfermeiro.entity";
import { getDateInLocaleTime } from "src/utils/date.service";
import IEnfermeiroRepository from "./enfermeiro.repository.contract";
import { ERoles } from "src/utils/ETypes";
import { UpdateEnfermeiroDTO } from "src/dtos/enfermeiro/updateEnfermeiro.dto";

@Injectable()
export class EnfermeiroRepository
  extends Pageable<Enfermeiro>
  implements IEnfermeiroRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }
  async findOne(coren: string): Promise<Enfermeiro> {
    return await this.repository.enfermeiro.findUnique({
      where: {
        coren: coren,
      },
    });
  }
  async findOneId(id: string): Promise<Enfermeiro> {
    return await this.repository.enfermeiro.findUnique({
      where: {
        id: id,
      },
    });
  }
  update(data: UpdateEnfermeiroDTO, id: string): Promise<Enfermeiro> {
    return this.repository.enfermeiro.update({
      where: {
        id: id,
      },
      data: {
        nome: data.nome,
        cargo: data.cargo,
        coren: data.coren,
      },
    });
  }
  create(payload: Enfermeiro): Promise<Enfermeiro> {
    return this.repository.enfermeiro.create({
      data: {
        id: payload.id,
        nome: payload.nome,
        coren: payload.coren,
        cargo: payload.cargo,
        password: payload.password,
        createdAt: getDateInLocaleTime(new Date()),
      },
    });
  }
  findAll(): Promise<Enfermeiro[]> {
    return this.repository.enfermeiro.findMany({});
  }

  delete(id: string): Promise<Enfermeiro> {
    return this.repository.enfermeiro.delete({
      where: {
        id: id as string,
      },
    });
  }
}
