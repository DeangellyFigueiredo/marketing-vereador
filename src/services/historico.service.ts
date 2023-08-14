import { HttpException, Inject, Injectable } from "@nestjs/common";
import { CreateHistoricoDTO } from "src/dtos/historico/createHistorico.dto";
import IHistoricoRepository from "src/repositories/historico/historico.repository.contract";
import { PacienteService } from "./paciente.service";
import { FeridaService } from "./ferida.service";
import { EnfermeiroService } from "./enfermeiro.service";
import { Historico } from "src/entities/historico.entity";

@Injectable()
export class HistoricoService {
  constructor(
    @Inject("IHistoricoRepository")
    private readonly historicoRepository: IHistoricoRepository,
    private readonly pacienteService: PacienteService,
    private readonly feridaService: FeridaService,
    private readonly enfermeiroService: EnfermeiroService
  ) {}

  async createHistorico(
    historico: CreateHistoricoDTO,
    imagem: string,
    enfermeiroId: string
  ): Promise<any> {
    const paciente = await this.pacienteService.findOne(historico.pacienteId);
    if (!paciente) throw new HttpException("Paciente não encontrado", 404);

    const ferida = await this.feridaService.findById(historico.feridaId);
    if (!ferida) throw new HttpException("Ferida não encontrada", 404);

    const enfermeiro = await this.enfermeiroService.findOneId(enfermeiroId);
    if (!enfermeiro) throw new HttpException("Enfermeiro não encontrado", 404);

    return await this.historicoRepository.create(
      new Historico({
        ...historico,
        imagem,
        enfermeiro,
        ferida,
        paciente,
        enfermeiroId,
      })
    );
  }
}
