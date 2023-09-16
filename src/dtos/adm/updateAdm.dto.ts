import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdmDTO {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  password?: string;
}
