import { v4 as uuid } from "uuid";
import { Paciente } from "./paciente.entity";
import { Enfermeiro } from "./enfermeiro.entity";

export class Intervencao {
  id: string;
  diagnostico: string;
  tratamento: string;
  resultadosObtidos?: string;
  resultadosEsperados: string;
  pacienteId: string;
  paciente: Paciente;
  enfermeiroId: string;
  enfermeiro: Enfermeiro;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    props: Omit<Intervencao, "id" | "createdAt" | "updatedAt">,
    id?: string
  ) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
