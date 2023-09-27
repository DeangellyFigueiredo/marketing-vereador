import { Recrutador, Role } from "@prisma/client";
import { v4 as uuid } from "uuid";

export class Colaborador {
  id: string;
  nome: string;
  rua: string;
  numeroCasa: string;
  bairro: string;
  idade: number;
  telefone: string;
  email: string;
  profissao: string;
  escolaridade: string;
  redesSociais: string;
  cep: string;
  latitude?: string;
  longitude?: string;
  dataNascimento: Date;
  rg: string;
  orgaoExpedidor: string;
  cpf: string;
  tituloEleitor: string;
  zona: string;
  secao: string;
  recebeBeneficio: boolean;
  faixaSalarial: number;
  password: string;
  firstLogin: boolean;
  role: Role;
  Recrutador: Recrutador;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(
    props: Omit<
      Colaborador,
      | "role"
      | "id"
      | "createdAt"
      | "updatedAt"
      | "deletedAt"
      | "firstLogin"
      | "password"
      | "Recrutador"
    >,
    role?: Role,
    id?: string
  ) {
    Object.assign(this, props);
    this.role = role;
    this.id = id ?? uuid();
  }
}
