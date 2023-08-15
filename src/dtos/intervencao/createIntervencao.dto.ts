import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateIntervencaoDTO {
  @ApiProperty()
  @IsString({ message: "O campo diagnóstico deve ser do tipo alfanúmerico" })
  diagnostico: string;
  @ApiProperty()
  @IsString({ message: "O campo tratamento deve ser do tipo alfanúmerico" })
  tratamento: string;
  @ApiProperty()
  @IsString({
    message: "O campo resultados obtidos deve ser do tipo alfanúmerico",
  })
  @IsOptional()
  resultadosObtidos?: string;
  @ApiProperty()
  @IsString({
    message: "O campo resultados esperados deve ser do tipo alfanúmerico",
  })
  resultadosEsperados: string;
  @ApiProperty()
  @IsString({
    message: "O campo identificador do paciente deve ser do tipo alfanúmerico",
  })
  pacienteId: string;
}
