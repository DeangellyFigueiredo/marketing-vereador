import { IsEnum } from "class-validator";

enum Role {
  Administrativo = "Administrativo",
  Lider = "Lider",
  ColaboradorCadastro = "Colaborador-Cadastro",
}
export class FilterColaboradorDTO {
  @IsEnum(Role, { message: "Tipo inválido!" })
  tipo: Role;
}
