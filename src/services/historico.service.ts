import { HttpException, Inject, Injectable } from "@nestjs/common";
import { CreateHistoricoDTO } from "src/dtos/historico/createHistorico.dto";
import IHistoricoRepository from "src/repositories/historico/historico.repository.contract";
import { PacienteService } from "./paciente.service";
import { FeridaService } from "./ferida.service";
import { EnfermeiroService } from "./enfermeiro.service";
import { Historico } from "src/entities/historico.entity";
import { AuthService } from "./auth.service";
import { TokenDTO } from "src/dtos/auth/token.dto";
import { MappedPaciente } from "src/dtos/paciente/mappedPaciente.dto";
import { Paciente } from "src/entities/paciente.entity";

@Injectable()
export class HistoricoService {
  constructor(
    @Inject("IHistoricoRepository")
    private readonly historicoRepository: IHistoricoRepository,
    private readonly pacienteService: PacienteService,
    private readonly feridaService: FeridaService,
    private readonly enfermeiroService: EnfermeiroService,
    private readonly authService: AuthService
  ) {}

  async create(
    historico: CreateHistoricoDTO,
    imagem: string,
    token: string
  ): Promise<any> {
    const paciente = await this.pacienteService.findOne(historico.pacienteId);
    if (!paciente) throw new HttpException("Paciente não encontrado", 404);

    const ferida = await this.feridaService.findById(historico.feridaId);
    if (!ferida) throw new HttpException("Ferida não encontrada", 404);

    const tokenDecod = await this.authService.decodeJWT(token);
    const enfermeiro = await this.enfermeiroService.findOneId(
      tokenDecod.sub.id
    );
    if (!enfermeiro) throw new HttpException("Enfermeiro não encontrado", 404);

    return await this.historicoRepository.create(
      new Historico({
        ...historico,
        imagem,
        enfermeiro,
        ferida,
        paciente,
        enfermeiroId: tokenDecod.sub.id,
      })
    );
  }

  async findById(id: string): Promise<MappedPaciente> {
    const paciente = await this.pacienteService.findOne(id);
    return this.mappePaciente(paciente);
  }

  private mappePaciente(paciente: Paciente): MappedPaciente {
    return {
      id: paciente.id,
      nome: paciente.nome,
      idade: paciente.idade,
      sexo: paciente.sexo,
      historico: paciente.Historico
        ? paciente.Historico.map((historico) => {
            return {
              id: historico.id,
              data: historico.createdAt,
              procedimentoRealizado: historico.procedimentoRealizado,
              observacoes: historico.observacoes,
              tipoDeFerida: historico.ferida.tipoFerida,
              presencaInfeccao: historico.ferida.presencaInfeccao,
              tratamentoRecomendado: historico.ferida.tratamentoRecomendado,
              enfermeiro: historico.enfermeiro.nome,
              imagem: `http://${process.env.IP_BACKEND}:${process.env.PORT_BACKEND}/${historico.imagem}`,
            };
          })
        : [],
    };
  }
}
