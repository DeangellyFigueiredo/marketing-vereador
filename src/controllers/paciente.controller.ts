import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Response,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { CreatePacienteDTO } from "src/dtos/paciente/createPaciente.dto";
import { CreateTodoPaciente } from "src/dtos/paciente/createTodoPaciente.dto";
import { PacienteService } from "src/services/paciente.service";
@Controller("api/paciente")
@ApiTags("paciente")
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}
  @Post()
  @Roles("create-paciente")
  async create(@Body() payload: CreatePacienteDTO) {
    return await this.pacienteService.create(payload);
  }

  @Roles("list-paciente")
  @Get()
  async findAll() {
    return await this.pacienteService.findAll();
  }
  @Roles("list-paciente")
  @Get("/:id")
  async findOne(@Param("id") id: string) {
    console.log("pegando");
    return await this.pacienteService.findOne(id);
  }

  @Roles("delete-paciente")
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return await this.pacienteService.delete(id);
  }

  @Get("/atendimento/:id")
  async findById(@Param("id") id: string): Promise<any> {
    return await this.pacienteService.findById(id);
  }
}
