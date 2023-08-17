import { faker } from "@faker-js/faker";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateEnfermeiroDTO } from "src/dtos/enfermeiro/createEnfermeiro.dto";

import { v4 as uuid } from "uuid";
import * as bcrypt from "bcrypt";
import { ERoles } from "src/utils/ETypes";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    //create 10 patients
    const paciente = await this.paciente.count();
    if (process.env.MOCK_SERVER === "true") {
      const hasAdmin = await this.enfermeiro.findFirst({
        where: {
          cargo: ERoles.ROLE_Administrativo,
        },
      });
      if (!hasAdmin)
        await this.enfermeiro.create({
          data: {
            id: uuid(),
            nome: "Administrador",
            cargo: ERoles.ROLE_Administrativo,
            coren: "000000",
            password: await bcrypt.hash("123456", 10),
          },
        });
    }
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
