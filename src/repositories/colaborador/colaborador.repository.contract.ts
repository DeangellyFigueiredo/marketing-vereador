import { UpdateColaboradorDTO } from "src/dtos/colaborador/updateColaborador.dto";
import { Colaborador } from "src/entities/colaborador.entity";

export default interface IColaboradorRepository {
  create(payload: Colaborador): Promise<Colaborador>;
  findAll(): Promise<Partial<Colaborador>[]>;
  delete(id: string): Promise<Colaborador>;
  findOneId(id: string): Promise<Colaborador>;
  update(data: UpdateColaboradorDTO, id: string): Promise<Colaborador>;
  findAllByLiderId(liderId: string): Promise<Partial<Colaborador>[]>;
}
