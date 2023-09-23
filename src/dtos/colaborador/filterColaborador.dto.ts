import { IsEnum } from "class-validator";
import { EChangeRole } from "src/utils/ETypes";

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

export class ChangeRoleColaboradorDTO {
  @IsEnum(EChangeRole, { message: "Tipo inválido!" })
  tipo: EChangeRole;
}
