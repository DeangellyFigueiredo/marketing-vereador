import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateColaboradorDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  nome: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  rua: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  bairro: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  numeroCasa: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  complemento: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  nomePai: string;
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  idade: number;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  telefone: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  profissao: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  escolaridade: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  redesSociais: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  cep: string;
  @ApiProperty()
  @IsDefined()
  dataNascimento: Date;
  @ApiProperty()
  @IsString()
  @IsDefined()
  rg: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  nomeMae: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  orgaoExpedidor: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  cpf: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  tituloEleitor: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  zona: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  secao: string;
  @ApiProperty()
  @IsBoolean()
  @IsDefined()
  recebeBeneficio: boolean;
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  faixaSalarial: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  admId?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  liderId?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  recrutadorId?: string;
}
