import { Bairro } from "./bairro.entity";
import { Colaborador } from "./colaborador.entity";
import { v4 as uuid } from "uuid";

export class Equipe {
  id: string;
  nome: string;
  bairroId: string;
  bairro?: Partial<Bairro>;
  createdAt: Date;
  lider: Partial<Colaborador>;
  membros: Partial<Colaborador>[];

  constructor(
    props: Omit<Equipe, "id" | "createdAt" | "bairroId">,
    id?: string
  ) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
