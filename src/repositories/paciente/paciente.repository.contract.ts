import { Paciente } from "src/entities/paciente.entity";

export default interface IPacienteRepository {
  create(data: Paciente): Promise<Paciente>;
  findAll(): Promise<Paciente[]>;
  delete(id: string): Promise<Paciente>;
  findOne(id: string): Promise<Paciente>;
  update(data: Paciente): Promise<Paciente>;
}
