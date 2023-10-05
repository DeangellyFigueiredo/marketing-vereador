import { IsOptional, IsString } from "class-validator";

export class FilterBairroDTO {
  @IsOptional()
  @IsString()
  nome?: string;
  @IsOptional()
  @IsString()
  zona?: string;
}
