import { Ferida } from "src/entities/ferida.entity";

export default interface IFeridaRepository {
  create(payload: Ferida): Promise<Ferida>;
  findAll(): Promise<Ferida[]>;
}
