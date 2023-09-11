import { Lider } from "@prisma/client";
import { UpdateLiderDTO } from "src/dtos/lider/updateLider.dto";

export default interface ILiderRepository {
  create(payload: Lider): Promise<Lider>;
  findAll(): Promise<Partial<Lider>[]>;
  delete(id: string): Promise<Lider>;
  findOneId(id: string): Promise<Lider>;
  update(data: UpdateLiderDTO, id: string): Promise<Lider>;
}
