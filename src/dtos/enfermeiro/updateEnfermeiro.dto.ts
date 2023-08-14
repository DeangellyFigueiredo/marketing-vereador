import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class UpdateEnfermeiroDTO {
  @IsString({ message: "Nome deve ser uma string" })
  @IsNotEmpty({ message: "Nome não pode ser vazio" })
  @IsDefined({ message: "Nome não pode ser indefinido" })
  nome: string;
  @IsString({ message: "Coren deve ser uma string" })
  @IsNotEmpty({ message: "Coren não pode ser vazio" })
  @IsDefined({ message: "Coren não pode ser indefinido" })
  coren: string;
  @IsString({ message: "Cargo deve ser uma string" })
  @IsNotEmpty({ message: "Cargo não pode ser vazio" })
  @IsDefined({ message: "Cargo não pode ser indefinido" })
  cargo: string;
}
