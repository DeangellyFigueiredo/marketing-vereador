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
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  rua: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  bairro: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
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
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  profissao: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
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
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  cep: string;
  @ApiProperty()
  @IsDefined()
  dataNascimento: Date;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
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
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
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
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  tituloEleitor: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  zona: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
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
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  admId?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  liderId?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  recrutadorId?: string;
}
