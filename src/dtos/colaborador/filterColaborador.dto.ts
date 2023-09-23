import { IsEnum } from "class-validator";

enum Role {
  Administrativo = "Administrativo",
  Lider = "Lider",
  ColaboradorCadastro = "Colaborador-Cadastro",
  ColaboradorComum = "Colaborador-Comum",
}
export class FilterColaboradorDTO {
  @IsEnum(Role, { message: "Tipo inválido!" })
  tipo: Role;
}
