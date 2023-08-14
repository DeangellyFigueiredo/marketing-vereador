import { UpdateEnfermeiroDTO } from "src/dtos/enfermeiro/updateEnfermeiro.dto";
import { Enfermeiro } from "src/entities/enfermeiro.entity";

export default interface IEnfermeiroRepository {
  create(payload: Enfermeiro): Promise<Enfermeiro>;
  findAll(): Promise<Enfermeiro[]>;
  delete(id: string): Promise<Enfermeiro>;
  findOne(id: string): Promise<Enfermeiro>;
  findOneId(id: string): Promise<Enfermeiro>;
  update(data: UpdateEnfermeiroDTO, id: string): Promise<Enfermeiro>;
}
