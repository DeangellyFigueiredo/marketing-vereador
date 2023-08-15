import { HttpException, Inject, Injectable } from "@nestjs/common";
import { CreateIntervencaoDTO } from "src/dtos/intervencao/createIntervencao.dto";
import IIntervencaoRepository from "src/repositories/intervencao/intervencao.repository.contract";
import { PacienteService } from "./paciente.service";
import { Intervencao } from "src/entities/intervencao.entity";
import { AuthService } from "./auth.service";
import { EnfermeiroService } from "./enfermeiro.service";
import { UpdateIntervencaoDTO } from "src/dtos/intervencao/updateIntervencao.dto";

@Injectable()
export class IntervencaoService {
  constructor(
    @Inject("IIntervencaoRepository")
    private readonly intervencaoRepository: IIntervencaoRepository,
    private readonly enfermeiroService: EnfermeiroService,
    private readonly pacienteService: PacienteService,
    private readonly authService: AuthService
  ) {}

  async create(intervencao: CreateIntervencaoDTO, token: string) {
    const paciente = await this.pacienteService.findOne(intervencao.pacienteId);

    const tokenDecod = await this.authService.decodeJWT(token);
    const enfermeiro = await this.enfermeiroService.findOneId(
      tokenDecod.sub.id
    );
    if (!enfermeiro) throw new HttpException("Enfermeiro não encontrado", 404);

    return await this.intervencaoRepository.create(
      new Intervencao({
        ...intervencao,
        paciente,
        enfermeiro,
        enfermeiroId: tokenDecod.sub.id,
      })
    );
  }

  async update(payload: UpdateIntervencaoDTO, id: string) {
    const intervencao = await this.intervencaoRepository.findById(id);
    if (!intervencao)
      throw new HttpException("Intervenção não encontrada", 404);
    return await this.intervencaoRepository.update(payload, id);
  }
}
