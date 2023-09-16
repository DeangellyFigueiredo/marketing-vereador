import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class FirstLoginDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
}
