import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateColaboradorDTO {
  @ApiProperty()
  @IsOptional()
  rua?: string;
  @ApiProperty()
  @IsOptional()
  bairro?: string;
  @ApiProperty()
  @IsOptional()
  idade?: number;
  @ApiProperty()
  @IsOptional()
  telefone?: string;
  @ApiProperty()
  @IsOptional()
  profissao?: string;
  @ApiProperty()
  @IsOptional()
  escolaridade?: string;
  @ApiProperty()
  @IsOptional()
  redesSociais?: string;
  @ApiProperty()
  @IsOptional()
  cep?: string;
  @ApiProperty()
  @IsOptional()
  dataNascimento?: Date;
  @ApiProperty()
  @IsOptional()
  orgaoExpedidor?: string;
  @ApiProperty()
  @IsOptional()
  tituloEleitor?: string;
  @ApiProperty()
  @IsOptional()
  zona?: string;
  @ApiProperty()
  @IsOptional()
  secao?: string;
  @ApiProperty()
  @IsOptional()
  recebeBeneficio?: boolean;
  @ApiProperty()
  @IsOptional()
  faixaSalarial?: number;
  @IsOptional()
  password?: string;
  @IsOptional()
  firstLogin?: boolean;
}
