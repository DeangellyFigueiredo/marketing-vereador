import { HttpException, Inject, Injectable } from "@nestjs/common";
import { CreateBairroDTO } from "src/dtos/bairro/createBairro.dto";
import { FilterBairroDTO } from "src/dtos/bairro/filterBairro.dto";
import { Bairro } from "src/entities/bairro.entity";
import { BairroRepository } from "src/repositories/bairro/bairro.repository";
import { AuthService } from "./auth.service";
import { AdmService } from "./adm.service";
import * as bcrypt from "bcrypt";
@Injectable()
export class BairroService {
  constructor(
    @Inject("IBairroRepository")
    private readonly bairroRepository: BairroRepository,
    private readonly authService: AuthService,
    private readonly admService: AdmService
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

  async delete(id: string, password: string, token: string) {
    if (password === "" || password === undefined || password === null)
      throw new HttpException("Senha inválida!", 400);

    if (token === "" || token === undefined || token === null)
      throw new HttpException("Token inválido!", 400);

    const tokenExtracted = await this.authService.decodeJWT(token);
    const adm = await this.admService.findOneId(tokenExtracted.sub.id);
    if (!adm) {
      throw new HttpException("Administrador não encontrado!", 404);
    }

    const isValidPassword = bcrypt.compareSync(password, adm.password);

    if (!isValidPassword) throw new HttpException("Senha inválida!", 400);

    return await this.bairroRepository.delete(id);
  }
}
