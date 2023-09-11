import { Adm } from "./adm.entity";
import { v4 as uuid } from "uuid";

export class Lider {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  profissao: string;
  escolaridade: string;
  redesSociais: string;
  localVotacao: string;
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
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(
    props: Omit<
      Lider,
      "id" | "createdAt" | "updatedAt" | "deletedAt" | "admId" | "adm"
    >,
    id?: string
  ) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
