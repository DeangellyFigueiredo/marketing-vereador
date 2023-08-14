import { Transform, TransformFnParams } from "class-transformer";
import { IsString, IsNotEmpty, IsDefined } from "class-validator";

export class EnfermeiroDTO {
  @IsString({ message: "[Coren] Coren deve ser uma string" })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({ message: "[Coren] Coren não pode ser vazio" })
  @IsDefined({ message: "[Coren] Coren precisa ser definido" })
  coren: string;

  @IsString({ message: "[password] Password deve ser uma string" })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({ message: "[password] Password não pode ser vazio" })
  @IsDefined({ message: "[password] Password precisa ser definido" })
  password: string;
}
