import { IsOptional, IsString } from "class-validator";

export class FilterEquipeDTO {
  @IsOptional()
  @IsString()
  nome?: string;
  @IsOptional()
  @IsString()
  zona?: string;
}
