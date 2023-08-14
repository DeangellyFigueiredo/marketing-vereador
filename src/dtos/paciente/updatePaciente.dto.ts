import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { EProcedenciaType } from "src/utils/ETypes";

export class UpdatePacienteDTO {
  @IsString({ message: "Nome deve ser uma string" })
  @IsOptional()
  nome?: string;
  @IsString({ message: "Idade deve ser uma string" })
  @IsOptional()
  idade?: string;
  @IsDateString()
  dataNascimento?: Date;
  @IsString({ message: "Cor deve ser uma string" })
  @IsOptional()
  cor?: string;
  @IsString({ message: "Raça deve ser uma string" })
  @IsOptional()
  raca?: string;
  @IsString({ message: "Profissão deve ser uma string" })
  @IsOptional()
  profissao?: string;
  @IsString({ message: "Escolaridade deve ser uma string" })
  @IsOptional()
  escolaridade?: string;
  @IsString({ message: "Nacionalidade deve ser uma string" })
  @IsOptional()
  nacionalidade?: string;
  @IsString({ message: "Estado civil deve ser uma string" })
  @IsOptional()
  estadoCivil?: string;
  @IsEnum(EProcedenciaType, {
    message: "Procedência deve ser do tipo TRANSFERIDA, SAMU ou OUTROS",
  })
  @IsOptional()
  procedencia?: EProcedenciaType;
  @IsString({ message: "Instituição deve ser uma string" })
  @IsOptional()
  instituicao?: string;
  @IsString({ message: "Observação Instituição deve ser uma string" })
  @IsOptional()
  instituicaoObservacao?: string;
  @IsString({ message: "Motivo internação deve ser uma string" })
  @IsOptional()
  motivoInternacao?: string;
  @IsString({ message: "Risco deve ser uma string" })
  @IsOptional()
  risco?: string;
  @IsString({ message: "Risco Observação deve ser uma string" })
  @IsOptional()
  riscoObservacao?: string;
  @IsString({ message: "Leito deve ser uma string" })
  @IsOptional()
  leito?: string;
  @IsDateString()
  @IsOptional()
  dataInternacao?: Date;
  @IsDateString()
  @IsOptional()
  horaInternacao?: Date;
}
