import { HttpException, Inject, Injectable } from "@nestjs/common";
import { HttpStatusCode } from "axios";
import { CreateEnfermeiroDTO } from "src/dtos/enfermeiro/createEnfermeiro.dto";
import { UpdateEnfermeiroDTO } from "src/dtos/enfermeiro/updateEnfermeiro.dto";
import { Enfermeiro } from "src/entities/enfermeiro.entity";
import * as bcrypt from "bcrypt";
import IEnfermeiroRepository from "src/repositories/enfermeiro/enfermeiro.repository.contract";

@Injectable()
export class EnfermeiroService {
  constructor(
    @Inject("IEnfermeiroRepository")
    private readonly enfermeiroRepository: IEnfermeiroRepository
  ) {}

  async create(data: CreateEnfermeiroDTO): Promise<any> {
    const enfermeiro = await this.findOne(data.coren);
    if (enfermeiro)
      throw new HttpException(
        "Login já cadastrado para outro usuário",
        HttpStatusCode.BadRequest
      );

    const pass = bcrypt.hashSync(
      (data.nome.substring(0, 3) + data.coren.substring(0, 3)).trim(),
      10
    );

    const newGateKeeper = await this.enfermeiroRepository.create(
      new Enfermeiro({ ...data, password: pass })
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newGateKeeper;

    return result;
  }
  async findAll() {
    return await this.enfermeiroRepository.findAll();
  }

  async delete(id: string) {
    const enfermeiro = await this.findOneId(id);
    console.log(enfermeiro);
    if (enfermeiro.cargo === "Administrador Chefe")
      throw new HttpException(
        "Não é possível deletar o Administrador Chefe",
        400
      );
    return await this.enfermeiroRepository.delete(id);
  }

  async findOne(coren: string) {
    const enf = await this.enfermeiroRepository.findOne(coren);
    return enf;
  }

  async findOneId(id: string) {
    const enf = await this.enfermeiroRepository.findOneId(id);
    return enf;
  }
  async update(payload: UpdateEnfermeiroDTO, id: string) {
    return await this.enfermeiroRepository.update(payload, id);
  }
}
