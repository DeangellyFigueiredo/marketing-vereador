import { Transform } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateBairroDTO {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  nome: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  zona: string;
}
