import { HttpException, HttpStatus } from "@nestjs/common";
import { ERoles } from "./ETypes";

export const setPermissions = (roles: ERoles) => {
  if (!roles)
    throw new HttpException("Não autorizado", HttpStatus.UNAUTHORIZED);
  if (roles === ERoles.ROLE_Administrativo)
    return [
      "create-enfermeiro",
      "create-paciente",
      "delete-paciente",
      "list-enfermeiro",
      "list-paciente",
      "delete-enfermeiro",
      "update-enfermeiro",
    ];

  if (roles === ERoles.ROLE_Enfermeiro)
    return [
      "atender-paciente",
      "list-paciente",
      "update-paciente",
      "delete-paciente",
    ];
};
