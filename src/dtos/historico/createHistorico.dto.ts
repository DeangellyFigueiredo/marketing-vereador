import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateHistoricoDTO {
  @ApiProperty()
  @IsString()
  procedimentoRealizado: string;
  @ApiProperty()
  @IsString()
  observacoes: string;
  @ApiProperty()
  @IsString()
  localizacaoFerida: string;
  @ApiProperty()
  @IsString()
  feridaId: string;
  @ApiProperty()
  @IsString()
  pacienteId: string;
  @ApiProperty()
  @IsString()
  enfermeiroId: string;
}
