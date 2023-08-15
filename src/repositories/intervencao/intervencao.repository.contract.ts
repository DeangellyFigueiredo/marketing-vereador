import { UpdateIntervencaoDTO } from "src/dtos/intervencao/updateIntervencao.dto";
import { Intervencao } from "src/entities/intervencao.entity";

export default interface IIntervencaoRepository {
  create(intervencao: Intervencao): Promise<Intervencao>;
  update(data: UpdateIntervencaoDTO, id: string): Promise<Intervencao>;
  findById(id: string): Promise<Intervencao>;
}
