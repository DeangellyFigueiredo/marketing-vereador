import { ApiProperty } from "@nestjs/swagger";
import { CreatePacienteDTO } from "./createPaciente.dto";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateTodoPaciente {
  @ApiProperty({ type: CreatePacienteDTO })
  @ValidateNested()
  @Type(() => CreatePacienteDTO)
  paciente: CreatePacienteDTO;
}
