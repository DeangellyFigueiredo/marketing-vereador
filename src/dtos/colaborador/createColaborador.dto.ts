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
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  nome: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  rua: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  bairro: string;
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  idade: number;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  telefone: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  profissao: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  escolaridade: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  redesSociais: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  cep: string;
  @IsDefined()
  dataNascimento: Date;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  rg: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  orgaoExpedidor: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  cpf: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  tituloEleitor: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  zona: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  secao: string;
  @IsBoolean()
  @IsDefined()
  recebeBeneficio: boolean;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  faixaSalarial: string;
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  admId?: string;
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  liderId?: string;
}
