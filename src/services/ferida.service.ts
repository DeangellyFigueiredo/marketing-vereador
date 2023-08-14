import { Inject, Injectable } from "@nestjs/common";
import { CreateFeridaDTO } from "src/dtos/ferida/createFerida.dto";
import { Ferida } from "src/entities/ferida.entity";
import IFeridaRepository from "src/repositories/ferida/ferida.repository.contract";

@Injectable()
export class FeridaService {
  constructor(
    @Inject("IFeridaRepository")
    private readonly feridaRepository: IFeridaRepository
  ) {}

  async create(ferida: CreateFeridaDTO, imagem: string) {
    return await this.feridaRepository.create(
      new Ferida({ ...ferida, imagem })
    );
  }

  async findAll() {
    const feridas = await this.feridaRepository.findAll();
    return feridas.map(
      (ferida) =>
        new Ferida({
          ...ferida,
          imagem: `http://${process.env.IP_BACKEND}:${process.env.PORT_BACKEND}/${ferida.imagem}`,
        })
    );
  }

  async findById(id: string) {
    return await this.feridaRepository.findById(id);
  }
}
