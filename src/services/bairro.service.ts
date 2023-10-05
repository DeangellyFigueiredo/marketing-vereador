import { Inject, Injectable } from "@nestjs/common";
import { BairroRepository } from "src/repositories/bairro/bairro.repository";

@Injectable()
export class BairroService {
  constructor(
    @Inject("IBairroRepository")
    private readonly bairroRepository: BairroRepository
  ) {}

  async create(payload: any) {
    return await this.bairroRepository.create(payload);
  }

  async findAll() {
    return await this.bairroRepository.findAll();
  }

  async findById(id: string) {
    return await this.bairroRepository.findById(id);
  }

  async delete(id: string) {
    return await this.bairroRepository.delete(id);
  }
}
