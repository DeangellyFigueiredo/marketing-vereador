import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ERoles } from "src/utils/ETypes";

export class CreateEnfermeiroDTO {
  @ApiProperty()
  @IsString({ message: "Nome deve ser uma string" })
  @IsNotEmpty({ message: "Nome não pode ser vazio" })
  @IsDefined({ message: "Nome não pode ser indefinido" })
  nome: string;
  @ApiProperty()
  @IsString({ message: "Coren deve ser uma string" })
  @IsNotEmpty({ message: "Coren não pode ser vazio" })
  @IsDefined({ message: "Coren não pode ser indefinido" })
  coren: string;
  @ApiProperty()
  @IsEnum(ERoles, { message: "Cargo deve ser um cargo válido" })
  @IsNotEmpty({ message: "Cargo não pode ser vazio" })
  @IsDefined({ message: "Cargo não pode ser indefinido" })
  cargo: ERoles;
}
