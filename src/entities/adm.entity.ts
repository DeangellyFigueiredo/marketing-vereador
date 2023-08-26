import { v4 as uuid } from "uuid";

export class Adm {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(props: Omit<Adm, "id" | "createdAt">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
