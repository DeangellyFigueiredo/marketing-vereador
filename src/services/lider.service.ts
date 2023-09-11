import { Injectable, Inject, HttpException } from "@nestjs/common";
import { CreateLiderDTO } from "src/dtos/lider/createLider.dto";
import { UpdateLiderDTO } from "src/dtos/lider/updateLider.dto";
import { Lider } from "src/entities/lider.entity";

@Injectable()
export class LiderService {
  constructor(
    @Inject("ILiderRepository")
    private readonly LiderRepository: LiderRepository
  ) {}

  async create(payload: CreateLiderDTO) {
    try {
      await this.LiderRepository.create(new Lider({ ...payload }));
    } catch (error) {
      if (error.code === "P2002") {
        throw new HttpException(
          "E-mail, RG ou CPF já cadastrados para outro Lider! ",
          400
        );
      }
    }
    return {
      message: "Lider criado com sucesso!",
    };
  }

  async findAll() {
    return await this.LiderRepository.findAll();
  }

  async delete(id: string) {
    const Lider = await this.LiderRepository.findOneId(id);
    if (!Lider) {
      throw new HttpException("Lider não encontrado!", 404);
    }
    await this.LiderRepository.delete(id);
    return {
      message: "Lider deletado com sucesso!",
    };
  }

  async findOneId(id: string) {
    return await this.LiderRepository.findOneId(id);
  }

  async update(data: UpdateLiderDTO, id: string) {
    const Lider = await this.LiderRepository.findOneId(id);
    if (!Lider) {
      throw new HttpException("Lider não encontrado!", 404);
    }
    return await this.LiderRepository.update(data, id);
  }

  async findAllByLiderId(liderId: string) {
    return await this.LiderRepository.findAllByLiderId(liderId);
  }
}
