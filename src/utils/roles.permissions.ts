import { HttpException, HttpStatus } from "@nestjs/common";
import { ERoles } from "./ETypes";

export const setPermissions = (roles: ERoles) => {
  if (!roles)
    throw new HttpException("Não autorizado", HttpStatus.UNAUTHORIZED);
  if (roles === ERoles.ROLE_Administrativo)
    return [
      "list-colaborador",
      "delete-colaborador",
      "update-colaborador",
      "update-to-lider",
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
      "update-to-colaborador-cadastro",
    ];

  if (roles === ERoles.ROLE_Lider)
    return [
      //TODO
    ];

  if (roles === ERoles.ROLE_ColaboradorCadastro) return ["create-colaborador"];
  if (roles === ERoles.ROLE_PrimeiroLogin) return ["first-login"];
};
