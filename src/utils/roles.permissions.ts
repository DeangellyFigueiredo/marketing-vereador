import { HttpException, HttpStatus } from "@nestjs/common";
import { ERoles } from "./ETypes";

export const setPermissions = (roles: ERoles) => {
  if (!roles)
    throw new HttpException("Não autorizado", HttpStatus.UNAUTHORIZED);
  if (roles === ERoles.ROLE_Administrativo)
    return [
      //toDO
    ];

  if (roles === ERoles.ROLE_Lider)
    return [
      //TODO
    ];
};
