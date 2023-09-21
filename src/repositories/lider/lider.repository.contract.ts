import { UpdateLiderDTO } from "src/dtos/lider/updateLider.dto";
import { Lider } from "src/entities/lider.entity";

export default interface ILiderRepository {
  create(payload: Lider, admId: string): Promise<Lider>;
  findAll(): Promise<Partial<Lider>[]>;
  delete(id: string): Promise<Lider>;
  findOneId(id: string): Promise<Lider>;
  update(data: UpdateLiderDTO, id: string): Promise<Lider>;
}
