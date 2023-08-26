import { HttpException, Inject, Injectable } from "@nestjs/common";
import { HttpStatusCode } from "axios";
import * as bcrypt from "bcrypt";
import { CreateAdmDTO } from "src/dtos/adm/createAdm.dto";
import { UpdateAdmDTO } from "src/dtos/adm/updateAdm.dto";
import { Adm } from "src/entities/adm.entity";
import { AdmRepository } from "src/repositories/adm/adm.repository";

@Injectable()
export class AdmService {
  constructor(
    @Inject("IAdmRepository")
    private readonly admRepository: AdmRepository
  ) {}

  async create(data: CreateAdmDTO): Promise<any> {
    const adm = await this.findOne(data.email);
    if (adm)
      throw new HttpException(
        "Email já cadastrado para outro usuário",
        HttpStatusCode.BadRequest
      );

    const pass = bcrypt.hashSync(data.password, 10);
    const newAdm = await this.admRepository.create(
      new Adm({ ...data, password: pass })
    );

    return {
      msg: "Administrador criado com sucesso",
    };
  }
  async findAll() {
    return await this.admRepository.findAll();
  }

  async delete(id: string) {
    const adm = await this.findOneId(id);

    return await this.admRepository.delete(id);
  }

  async findOne(email: string) {
    const adm = await this.admRepository.findOne(email);
    return adm;
  }

  async findOneId(id: string) {
    const adm = await this.admRepository.findOneId(id);
    return adm;
  }
  async update(payload: UpdateAdmDTO, id: string) {
    return await this.admRepository.update(payload, id);
  }
}
