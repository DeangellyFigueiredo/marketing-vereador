import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class HeaderDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorization: string;
}
