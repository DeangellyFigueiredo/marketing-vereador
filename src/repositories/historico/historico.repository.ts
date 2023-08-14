import { Injectable } from "@nestjs/common";
import IHistoricoRepository from "./historico.repository.contract";
import { Pageable } from "src/configs/database/pageable.service";
import { Historico } from "src/entities/historico.entity";
import { PrismaService } from "src/configs/database/prisma.service";

@Injectable()
export class HistoricoRepository
  extends Pageable<Historico>
  implements IHistoricoRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }
  async create(payload: Historico): Promise<any> {
    return await this.repository.historico.create({
      data: {
        id: payload.id,
        procedimentoRealizado: payload.procedimentoRealizado,
        observacoes: payload.observacoes,
        imagem: payload.imagem,
        localizacaoFerida: payload.localizacaoFerida,
        enfermeiro: {
          connect: {
            id: payload.enfermeiroId,
          },
        },
        paciente: {
          connect: {
            id: payload.pacienteId,
          },
        },
        ferida: {
          connect: {
            id: payload.feridaId,
          },
        },
        createdAt: new Date(),
      },
    });
  }
}
