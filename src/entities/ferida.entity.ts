import { v4 as uuid } from "uuid";

export class Ferida {
  id: string;
  tipoFerida: string;
  grauDaFerida: string;
  presencaInfeccao: string;
  tratamentoRecomendado: string;
  imagem: string;
  createdAt: Date;

  constructor(props: Omit<Ferida, "id" | "createdAt">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
