import { v4 as uuid } from "uuid";
import { Equipe } from "./equipe.entity";
export class Bairro {
  id: string;
  nome: string;
  zona: string;
  createdAt: Date;
  Equipes?: Equipe[];

  constructor(props: Omit<Bairro, "id">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
