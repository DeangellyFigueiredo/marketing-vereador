import { Bairro } from "src/entities/bairro.entity";

export default interface IBairroRepository {
  create(payload: Bairro): Promise<Bairro>;
  findAll(): Promise<Partial<Bairro>[]>;
  delete(id: string): Promise<Bairro>;
  findById(id: string): Promise<Bairro>;
}
