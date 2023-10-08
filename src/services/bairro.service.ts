import { Inject, Injectable } from "@nestjs/common";
import { CreateBairroDTO } from "src/dtos/bairro/createBairro.dto";
import { FilterBairroDTO } from "src/dtos/bairro/filterBairro.dto";
import { Bairro } from "src/entities/bairro.entity";
import { BairroRepository } from "src/repositories/bairro/bairro.repository";

@Injectable()
export class BairroService {
  constructor(
    @Inject("IBairroRepository")
    private readonly bairroRepository: BairroRepository
  ) {}

  async create(payload: CreateBairroDTO) {
    await this.bairroRepository.create(new Bairro({ ...payload }));
    return { message: "Bairro criado com sucesso" };
  }

  async findAll(query: FilterBairroDTO) {
    return await this.bairroRepository.findAll(query);
  }

  async findById(id: string) {
    return await this.bairroRepository.findById(id);
  }

  async delete(id: string) {
    return await this.bairroRepository.delete(id);
  }
}
