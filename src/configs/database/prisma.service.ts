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

    const roles = await this.role.findMany();
    if (roles.length === 0) {
      await this.role.create({
        data: {
          name: "Lider",
        },
      });

      await this.role.create({
        data: {
          name: "PrimeiroLogin",
        },
      });
      await this.role.create({
        data: {
          name: "Administrativo",
        },
      });
      await this.role.create({
        data: {
          name: "Colaborador-Comum",
        },
      });
      await this.role.create({
        data: {
          name: "Colaborador-Cadastro",
        },
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

    const bairros = await this.bairro.count();
    if (bairros === 0) {
      const southZone = [
        "Betânia",
        "Cachoeirinha",
        "Centro",
        "Colônia Oliveira Machado",
        "Crespo",
        "Distrito Industrial I",
        "Educandos",
        "Japiim",
        "Morro da Liberdade",
        "Nossa Senhora Aparecida",
        "Petrópolis",
        "Praça 14 de Janeiro",
        "Presidente Vargas",
        "Raiz",
        "Santa Luzia",
        "São Francisco",
        "São Lázaro",
        "Vila Buriti",
      ];

      const westZone = [
        "Compensa",
        "Glória",
        "Lírio do Vale",
        "Nova Esperança",
        "Ponta Negra",
        "Santo Agostinho",
        "Santo Antônio",
        "São Jorge",
        "São Raimundo",
        "Tarumã",
        "Tarumã-Açu",
        "Vila da Prata",
      ];

      const northZone = [
        "Cidade de Deus",
        "Cidade Nova",
        "Colônia Santo Antônio",
        "Colônia Terra Nova",
        "Lago Azul",
        "Monte das Oliveiras",
        "Nova Cidade",
        "Novo Aleixo",
        "Novo Israel",
        "Santa Etelvina",
      ];

      const eastZone = [
        "Armando Mendes",
        "Colônia Antônio Aleixo",
        "Col Antonio Aleixo",
        "Coroado",
        "Distrito Industrial II",
        "Gilberto Mestrinho",
        "Jorge Teixeira",
        "Mauazinho",
        "Puraquequara",
        "São José Operário",
        "Tancredo Neves",
        "Zumbi dos Palmares",
      ];

      const southCenterZone = [
        "Adrianópolis",
        "Aleixo",
        "Chapada",
        "Flores",
        "Nossa Senhora das Graças",
        "Nossa Sra. das Gracas",
        "Parque 10 de Novembro",
        "São Geraldo",
      ];

      const midwestZone = [
        "Alvorada",
        "Da Paz",
        "Dom Pedro",
        "Planalto",
        "Redenção",
      ];

      await this.bairro.createMany({
        data: southZone.map((bairro) => ({
          nome: bairro,
          zona: "Sul",
        })),
      });
    }
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
