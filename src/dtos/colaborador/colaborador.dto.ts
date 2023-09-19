import { IsDefined, IsString } from "class-validator";

export class ColaboradorDTO {
  @IsString()
  @IsDefined()
  email: string;
  @IsString()
  @IsDefined()
  password: string;
}
