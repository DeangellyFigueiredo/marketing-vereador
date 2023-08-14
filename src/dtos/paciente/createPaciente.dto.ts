import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EProcedenciaType, ESexo } from "src/utils/ETypes";

export class CreatePacienteDTO {
  @ApiProperty()
  @IsString({ message: "O nome deve ser do tipo alfanumérico" })
  nome: string;
  @ApiProperty()
  @IsString({ message: "A idade deve ser do tipo alfanumérico" })
  idade: string;
  @ApiProperty()
  @IsEnum(ESexo, {
    message: `O sexo deve ser do tipo ${Object.keys(ESexo).join(", ")}`,
  })
  sexo: ESexo;
  @IsOptional()
  @ApiProperty()
  @IsString({ message: "As alergias deve ser do tipo alfanumérico" })
  alergias?: string;
  @IsOptional()
  @ApiProperty()
  @IsString({
    message: "As condicoes preexistentes deve ser do tipo alfanumérico",
  })
  condicoesPreexistentes?: string;
  @IsOptional()
  @ApiProperty()
  @IsString({ message: "Os Medicamentos em uso deve ser do tipo alfanumérico" })
  medicamentosEmUso?: string;
  @IsOptional()
  @ApiProperty()
  @IsString({ message: "Nome Responsável deve ser do tipo alfanumérico" })
  nomeResponsavel?: string;
  @IsOptional()
  @ApiProperty()
  @IsString({ message: "Telefone Responsável deve ser do tipo alfanumérico" })
  telefoneResponsavel?: string;
}
