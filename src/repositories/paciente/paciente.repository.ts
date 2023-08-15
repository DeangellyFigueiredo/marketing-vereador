import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import { Paciente } from "src/entities/paciente.entity";
import IPacienteRepository from "./paciente.repository.contract";

@Injectable()
export class PacienteRepository
  extends Pageable<Paciente>
  implements IPacienteRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  create(data: Paciente): Promise<any> {
    return this.repository.paciente.create({
      data: {
        ...data,
      },
    });
  }

  findAll(): Promise<any[]> {
    return this.repository.paciente.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  delete(id: string): Promise<any> {
    return this.repository.paciente.delete({
      where: {
        id: id as string,
      },
    });
  }

  findOne(id: string): Promise<any> {
    return this.repository.paciente.findUnique({
      where: {
        id: id,
      },
      include: {
        Historico: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            ferida: true,
            enfermeiro: true,
          },
        },
      },
    });
  }

  update(data: Paciente): Promise<Paciente> {
    throw new Error("Method not implemented.");
  }
}
