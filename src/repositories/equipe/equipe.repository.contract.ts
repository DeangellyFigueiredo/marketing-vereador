import { FilterEquipeDTO } from "src/dtos/equipe/filterEquipe.dto";
import { Equipe } from "src/entities/equipe.entity";

export default interface IEquipeRepository {
  create(payload: Equipe): Promise<Equipe>;
  findAll(query: FilterEquipeDTO): Promise<Partial<Equipe>[]>;
  delete(id: string): Promise<Equipe>;
  findById(id: string): Promise<Equipe>;
}
