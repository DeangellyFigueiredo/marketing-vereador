import { Ferida, Paciente, Enfermeiro } from "@prisma/client";
import { v4 as uuid } from "uuid";

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
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Omit<Historico, "id" | "createdAt">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
