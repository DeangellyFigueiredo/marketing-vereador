import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreatePreCadastroDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "O nome é obrigatório" })
  @IsDefined()
  @Transform(({ value }) => value.trim())
  nome: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "O número é obrigatório" })
  @IsDefined()
  @Transform(({ value }) => value.trim())
  numero: string;
}
