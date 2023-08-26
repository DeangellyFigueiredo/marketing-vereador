import { UpdateAdmDTO } from "src/dtos/adm/updateAdm.dto";
import { Adm } from "src/entities/adm.entity";

export default interface IAdmRepository {
  create(payload: Adm): Promise<Adm>;
  findAll(): Promise<Partial<Adm>[]>;
  delete(id: string): Promise<Adm>;
  findOne(email: string): Promise<Adm>;
  findOneId(id: string): Promise<Adm>;
  update(data: UpdateAdmDTO, id: string): Promise<Adm>;
}
