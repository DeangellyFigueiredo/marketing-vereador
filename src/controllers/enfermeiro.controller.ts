import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";

import { CreateEnfermeiroDTO } from "src/dtos/enfermeiro/createEnfermeiro.dto";
import { UpdateEnfermeiroDTO } from "src/dtos/enfermeiro/updateEnfermeiro.dto";
import { EnfermeiroService } from "src/services/enfermeiro.service";

@Controller("api/enfermeiro")
@ApiTags("enfermeiro")
export class EnfermeiroController {
  constructor(private readonly enfermeiroService: EnfermeiroService) {}
  @Post()
  @Roles("create-enfermeiro")
  async create(@Body() payload: CreateEnfermeiroDTO) {
    return await this.enfermeiroService.create(payload);
  }

  @Roles("list-enfermeiro")
  @Get()
  async findAll() {
    return await this.enfermeiroService.findAll();
  }

  @Roles("list-enfermeiro")
  @Get("/:id")
  async findOne(@Param("id") id: string) {
    console.log("pegando enf");
    return await this.enfermeiroService.findOne(id);
  }

  @Roles("delete-enfermeiro")
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return await this.enfermeiroService.delete(id);
  }
  @Roles("update-enfermeiro")
  @Put("/:id")
  async update(@Param("id") id: string, @Body() payload: UpdateEnfermeiroDTO) {
    return await this.enfermeiroService.update(payload, id);
  }
}
