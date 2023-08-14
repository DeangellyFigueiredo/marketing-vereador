import { v4 as uuid } from "uuid";
import { Ferida } from "./ferida.entity";
import { Paciente } from "./paciente.entity";
import { Enfermeiro } from "./enfermeiro.entity";

export class Historico {
  id: string;
  procedimentoRealizado: string;
  observacoes: string;
  localizacaoFerida: string;
  feridaId: string;
  ferida: Ferida;
  pacienteId: string;
  paciente: Paciente;
  enfermeiroId: string;
  enfermeiro: Enfermeiro;
  imagem: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    props: Omit<Historico, "id" | "createdAt" | "updatedAt">,
    id?: string
  ) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
