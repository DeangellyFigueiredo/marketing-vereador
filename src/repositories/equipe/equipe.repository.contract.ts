import { Equipe } from "src/entities/equipe.entity";

export default interface IEquipeRepository {
  create(payload: Equipe): Promise<Equipe>;
  findAll(): Promise<Partial<Equipe>[]>;
  delete(id: string): Promise<Equipe>;
  findById(id: string): Promise<Equipe>;
}
