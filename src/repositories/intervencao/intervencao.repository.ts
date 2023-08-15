import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import { Intervencao } from "src/entities/intervencao.entity";
import IIntervencaoRepository from "./intervencao.repository.contract";
import { UpdateIntervencaoDTO } from "src/dtos/intervencao/updateIntervencao.dto";

@Injectable()
export class IntervencaoRepository
  extends Pageable<Intervencao>
  implements IIntervencaoRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }
  async create(payload: Intervencao): Promise<any> {
    return await this.repository.intervencao.create({
      data: {
        id: payload.id,
        diagnostico: payload.diagnostico,
        resultadosEsperados: payload.resultadosEsperados,
        resultadosObtidos: payload.resultadosObtidos ?? "",
        tratamento: payload.tratamento,
        enfermeiro: {
          connect: {
            id: payload.enfermeiro.id,
          },
        },
        paciente: {
          connect: {
            id: payload.paciente.id,
          },
        },
        createdAt: new Date(),
      },
    });
  }

  async update(data: UpdateIntervencaoDTO, id: string): Promise<any> {
    return await this.repository.intervencao.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async findById(id: string): Promise<any> {
    return await this.repository.intervencao.findUnique({
      where: {
        id: id,
      },
    });
  }
}
