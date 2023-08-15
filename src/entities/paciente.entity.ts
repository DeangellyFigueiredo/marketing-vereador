import { v4 as uuid } from "uuid";
import { Historico } from "./historico.entity";

export class Paciente {
  id: string;
  nome: string;
  idade: string;
  sexo: string;
  alergias?: string;
  condicoesPreexistentes?: string;
  medicamentosEmUso?: string;
  nomeResponsavel?: string;
  telefoneResponsavel?: string;
  Historico: Historico[] | null;
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    props: Omit<Paciente, "id" | "createdAt" | "Historico">,
    id?: string
  ) {
    Object.assign(this, props);
    this.Historico = this.Historico ?? [];
    this.id = id ?? uuid();
  }
}
