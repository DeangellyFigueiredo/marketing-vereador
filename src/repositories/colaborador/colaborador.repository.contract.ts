import { FilterColaboradorDTO } from "src/dtos/colaborador/filterColaborador.dto";
import { UpdateColaboradorDTO } from "src/dtos/colaborador/updateColaborador.dto";
import { Colaborador } from "src/entities/colaborador.entity";

export default interface IColaboradorRepository {
  create(
    payload: Colaborador,
    admId?: string,
    liderId?: string,
    recrutadorId?: string
  ): Promise<Colaborador>;
  findAll(filter: FilterColaboradorDTO): Promise<Partial<Colaborador>[]>;
  delete(id: string): Promise<Colaborador>;
  findOneId(id: string): Promise<Colaborador>;
  findByIdToLogin(id: string): Promise<Colaborador>;
  update(data: UpdateColaboradorDTO, id: string): Promise<Colaborador>;
  findAllRecrutados(
    id: string,
    filter: FilterColaboradorDTO
  ): Promise<Partial<Colaborador>[]>;
}
