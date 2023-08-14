import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreatePacienteDTO } from "src/dtos/paciente/createPaciente.dto";
import { CreateTodoPaciente } from "src/dtos/paciente/createTodoPaciente.dto";
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
    return await this.pacienteRepository.findOne(id);
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
}
