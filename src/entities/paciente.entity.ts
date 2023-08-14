import { v4 as uuid } from "uuid";

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
  createdAt: Date;
  updatedAt?: Date;

  constructor(props: Omit<Paciente, "id" | "createdAt">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
