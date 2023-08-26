import { Injectable } from "@nestjs/common";
import { Pageable } from "src/configs/database/pageable.service";
import { PrismaService } from "src/configs/database/prisma.service";
import { getDateInLocaleTime } from "src/utils/date.service";
import IAdmRepository from "./adm.repository.contract";
import { Adm } from "src/entities/adm.entity";
import { UpdateAdmDTO } from "src/dtos/adm/updateAdm.dto";

@Injectable()
export class AdmRepository extends Pageable<Adm> implements IAdmRepository {
  constructor(private readonly repository: PrismaService) {
    super();
  }
  async findOne(email: string): Promise<Adm> {
    return await this.repository.adm.findUnique({
      where: {
        email,
      },
    });
  }
  async findOneId(id: string): Promise<Adm> {
    return await this.repository.adm.findUnique({
      where: {
        id: id,
      },
    });
  }
  update(data: UpdateAdmDTO, id: string): Promise<Adm> {
    return this.repository.adm.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        updatedAt: new Date(),
      },
    });
  }
  create(payload: Adm): Promise<Adm> {
    return this.repository.adm.create({
      data: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        password: payload.password,
        createdAt: getDateInLocaleTime(new Date()),
      },
    });
  }
  findAll(): Promise<Partial<Adm>[]> {
    return this.repository.adm.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  delete(id: string): Promise<Adm> {
    return this.repository.adm.delete({
      where: {
        id: id as string,
      },
    });
  }
}
