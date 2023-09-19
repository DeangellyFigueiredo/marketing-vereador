import { v4 as uuid } from "uuid";

export class PreCadastro {
  id: string;
  nome: string;
  numero: string;
  createdAt: Date;

  constructor(props: Omit<PreCadastro, "id" | "createdAt">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
    this.createdAt = new Date();
  }
}
