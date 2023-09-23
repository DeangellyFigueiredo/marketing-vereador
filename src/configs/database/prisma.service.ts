import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();

    const roles = await this.role.count();
    if (roles === 0) {
      await this.role.createMany({
        data: [
          {
            name: "Lider",
          },
          {
            name: "PrimeiroLogin",
          },
          {
            name: "Administrativo",
          },
          {
            name: "Colaborador-Comum",
          },
          {
            name: "Colaborador-Cadastro",
          },
        ],
      });
    }

    const adms = await this.adm.count();
    if (adms === 0) {
      await this.adm.create({
        data: {
          id: uuid(),
          name: "Administrador",
          email: "adm@gmail.com",
          cpf: "000.000.000-00",
          password: bcrypt.hashSync("123456", 10),
          firstLogin: false,
          createdAt: new Date(),
        },
      });
    }
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
