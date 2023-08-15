import { v4 as uuid } from "uuid";
import { Historico } from "./historico.entity";
import { Intervencao } from "./intervencao.entity";

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
  Intervencao: Intervencao[] | null;
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    props: Omit<Paciente, "id" | "createdAt" | "Historico" | "Intervencao">,
    id?: string
  ) {
    Object.assign(this, props);
    this.Historico = this.Historico ?? [];
    this.Intervencao = this.Intervencao ?? [];
    this.id = id ?? uuid();
  }
}
