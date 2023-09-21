import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

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
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
