import { Role } from "@prisma/client";
import { v4 as uuid } from "uuid";

export class Adm {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  firstLogin?: boolean;
  createdAt: Date;
  updatedAt?: Date;

  constructor(props: Omit<Adm, "id" | "createdAt" | "fistLogin">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
