import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreatePreCadastroDTO } from "src/dtos/pre-cadastro/createPreCadastro.dto";
import { PreCadastro } from "src/entities/pre-cadastro.entity";
import { PreCadastroRepository } from "src/repositories/pre-cadastro/pre-cadastro.repository";

@Injectable()
export class PreCadastroService {
  constructor(
    @Inject("IPreCadastroRepository")
    private readonly preCadastroRepository: PreCadastroRepository
  ) {}

  async create(payload: CreatePreCadastroDTO) {
    const regex = new RegExp(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/);
    if (!regex.test(payload.numero)) {
      throw new HttpException(
        "Número inválido, o número deve seguir o padrão (00) 00000-0000",
        HttpStatus.BAD_REQUEST
      );
    }

    await this.preCadastroRepository.create(new PreCadastro({ ...payload }));
    return {
      message: "Pré-cadastro criado com sucesso",
    };
  }

  async findAll() {
    return await this.preCadastroRepository.findAll();
  }

  async delete(id: string) {
    await this.preCadastroRepository.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: "Pré-cadastro deletado com sucesso",
    };
  }

  async findById(id: string) {
    return await this.preCadastroRepository.findById(id);
  }
}
