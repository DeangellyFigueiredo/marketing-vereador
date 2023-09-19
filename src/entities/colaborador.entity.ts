import { Adm } from "./adm.entity";
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
  latitude: string;
  longitude: string;
  dataNascimento: Date;
  rg: string;
  orgaoExpedidor: string;
  cpf: string;
  tituloEleitor: string;
  zona: string;
  secao: string;
  recebeBeneficio: boolean;
  faixaSalarial: string;
  adm?: Adm;
  admId?: string | null;
  liderId?: string | null;
  usuarioDeCadastro: boolean;
  password: string;
  firstLogin: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(
    props: Omit<
      Colaborador,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "deletedAt"
      | "liderId"
      | "admId"
      | "adm"
      | "firstLogin"
      | "usuarioDeCadastro"
      | "password"
    >,
    id?: string
  ) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
