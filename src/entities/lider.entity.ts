import { Adm } from "./adm.entity";
import { v4 as uuid } from "uuid";

export class Lider {
  id: string;
  nome: string;
  idade: number;
  rua: string;
  numeroCasa: string;
  bairro: string;
  complemento: string;
  nomePai: string;
  cep: string;
  latitude: string;
  longitude: string;
  telefone: string;
  email: string;
  profissao: string;
  escolaridade: string;
  redesSociais: string;
  dataNascimento: Date;
  rg: string;
  nomeMae: string;
  orgaoExpedidor: string;
  cpf: string;
  tituloEleitor: string;
  zona: string;
  secao: string;
  recebeBeneficio: boolean;
  faixaSalarial: number;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;

  constructor(
    props: Omit<Lider, "id" | "createdAt" | "updatedAt" | "deletedAt">,
    id?: string
  ) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
