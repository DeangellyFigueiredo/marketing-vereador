import { v4 as uuid } from "uuid";

export class Enfermeiro {
  id: string;
  nome: string;
  coren: string;
  cargo: string;
  password: string;
  createdAt: Date;

  constructor(props: Omit<Enfermeiro, "id" | "createdAt">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
