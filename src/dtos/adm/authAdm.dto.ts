import { ApiProperty } from "@nestjs/swagger";

export class AdmDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
