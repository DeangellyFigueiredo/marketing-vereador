import { Historico } from "src/entities/historico.entity";

export default interface IHistoricoRepository {
  create(payload: Historico): Promise<Historico>;
}
