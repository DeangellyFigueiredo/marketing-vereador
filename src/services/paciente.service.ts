import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreatePacienteDTO } from "src/dtos/paciente/createPaciente.dto";
import { CreateTodoPaciente } from "src/dtos/paciente/createTodoPaciente.dto";
import { MappedPaciente } from "src/dtos/paciente/mappedPaciente.dto";
import { Paciente } from "src/entities/paciente.entity";
import IPacienteRepository from "src/repositories/paciente/paciente.repository.contract";

@Injectable()
export class PacienteService {
  constructor(
    @Inject("IPacienteRepository")
    private readonly pacienteRepository: IPacienteRepository
  ) {}
  async create(payload: CreatePacienteDTO) {
    const paciente = await this.pacienteRepository.create(
      new Paciente({ ...payload })
    );
    return { ...paciente };
  }
  async findAll() {
    const pacientes = await this.pacienteRepository.findAll();
    return pacientes.map((paciente) => {
      return {
        id: paciente.id,
        nome: paciente.nome,
        idade: paciente.idade,
      };
    });
  }

  async delete(id: string) {
    return await this.pacienteRepository.delete(id);
  }

  async findOne(id: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne(id);
    console.log(paciente);
    if (!paciente)
      throw new HttpException("Paciente não encontrado", HttpStatus.NOT_FOUND);
    return paciente;
  }

  async update(id: string, payload: CreateTodoPaciente) {
    const paciente = await this.pacienteRepository.findOne(id);

    if (!paciente)
      throw new HttpException(
        "Paciente não encontrado",
        HttpStatus.UNAUTHORIZED
      );

    //TODO
  }

  async findById(id: string): Promise<MappedPaciente> {
    const paciente = await this.pacienteRepository.findOne(id);
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
      intervencao: paciente.Intervencao
        ? paciente.Intervencao.map((intervencao) => {
            return {
              id: intervencao.id,
              data: intervencao.createdAt,
              diagnostico: intervencao.diagnostico,
              tratamento: intervencao.tratamento,
              resultadosEsperados: intervencao.resultadosEsperados,
              resultadosObtidos: intervencao.resultadosObtidos,
              enfermeiro: intervencao.enfermeiro.nome,
            };
          })
        : [],
    };
  }
}
