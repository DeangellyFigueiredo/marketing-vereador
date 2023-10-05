import { Bairro } from "./bairro.entity";
import { Colaborador } from "./colaborador.entity";
import { v4 as uuid } from "uuid";

export class Equipe {
  id: string;
  nome: string;
  bairroId: string;
  bairro: Bairro;
  createdAt: Date;
  lider: Colaborador;
  membros: Colaborador[];

  constructor(props: Omit<Equipe, "id">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
