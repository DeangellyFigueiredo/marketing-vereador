import { PreCadastro } from "src/entities/pre-cadastro.entity";

export default interface IPreCadastroRepository {
  create(payload: PreCadastro): Promise<PreCadastro>;
  findAll(): Promise<Partial<PreCadastro>[]>;
  delete(id: string): Promise<PreCadastro>;
  findById(id: string): Promise<PreCadastro>;
}
