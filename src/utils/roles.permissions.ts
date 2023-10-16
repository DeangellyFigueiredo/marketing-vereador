import { HttpException, HttpStatus } from "@nestjs/common";
import { ERoles } from "./ETypes";

export const setPermissions = (roles: ERoles) => {
  if (!roles)
    throw new HttpException("Não autorizado", HttpStatus.UNAUTHORIZED);
  if (roles === ERoles.ROLE_Administrativo)
    return [
      "update-colaborador-role",
      "list-colaborador",
      "delete-colaborador",
      "update-colaborador",
      "export-colaborador",
      "create-adm",
      "list-adm",
      "delete-adm",
      "update-adm",
      "create-lider",
      "list-lider",
      "delete-lider",
      "activate-lider",
      "list-lider",
      "update-lider",
      "list-pre-cadastro",
      "delete-pre-cadastro",
      "create-bairro",
      "list-bairro",
      "delete-bairro",
      "create-equipe",
      "list-equipe",
      "delete-equipe",
      "update-equipe",
    ];

  if (roles === ERoles.ROLE_Lider)
    return [
      //TODO
    ];

  if (roles === ERoles.ROLE_ColaboradorCadastro)
    return ["create-colaborador", "list-lider"];
  if (roles === ERoles.ROLE_PrimeiroLogin) return ["first-login"];
};
