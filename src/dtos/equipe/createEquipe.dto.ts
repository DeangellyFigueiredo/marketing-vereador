import { Transform } from "class-transformer";
import {
  IsString,
  IsDefined,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from "class-validator";

export class CreateEquipeDTO {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  nome: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  bairroId: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  liderId: string;
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  membrosIds: string[];
}
