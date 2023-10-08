import { IsEnum, IsOptional } from "class-validator";
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
  @IsOptional()
  nome?: string;
  @IsOptional()
  bairro?: string;
  @IsOptional()
  idade?: number;
}

export class ChangeRoleColaboradorDTO {
  @IsEnum(EChangeRole, { message: "Tipo inválido!" })
  tipo: EChangeRole;
}
