import { Transform } from "class-transformer";
import { IsString, IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateEquipeDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  nome?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  bairroId?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  liderId?: string;
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  novosMembros?: string[];
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  removerMembros?: string[];
}
