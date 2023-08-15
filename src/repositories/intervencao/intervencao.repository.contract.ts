import { Intervencao } from "src/entities/intervencao.entity";

export default interface IIntervencaoRepository {
  create(intervencao: Intervencao): Promise<Intervencao>;
}
