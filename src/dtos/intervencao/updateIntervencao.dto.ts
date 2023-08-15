import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateIntervencaoDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  diagnostico?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  tratamento?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  resultadosObtidos?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  resultadosEsperados?: string;
}
