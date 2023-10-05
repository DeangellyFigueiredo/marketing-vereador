import { FilterBairroDTO } from "src/dtos/bairro/filterBairro.dto";
import { Bairro } from "src/entities/bairro.entity";

export default interface IBairroRepository {
  create(payload: Bairro): Promise<Bairro>;
  findAll(query: FilterBairroDTO): Promise<Partial<Bairro>[]>;
  delete(id: string): Promise<Bairro>;
  findById(id: string): Promise<Bairro>;
}
