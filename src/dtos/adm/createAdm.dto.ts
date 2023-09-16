import { ApiProperty } from "@nestjs/swagger";

export class CreateAdmDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  cpf: string;
}
