import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Roles } from "src/decorators/roles.decorator";
import { CreateEquipeDTO } from "src/dtos/equipe/createEquipe.dto";
import { EquipeService } from "src/services/equipe.service";

@Controller("api/equipe")
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Roles("create-equipe")
  @Post()
  async create(@Body() payload: CreateEquipeDTO) {
    return await this.equipeService.create(payload);
  }

  @Roles("list-equipe")
  @Get()
  async findAll() {
    return await this.equipeService.findAll();
  }

  @Roles("list-equipe")
  @Get(":/id")
  async findOneId(@Param("id") id: string) {
    return await this.equipeService.findById(id);
  }

  @Roles("delete-equipe")
  @Delete(":/id")
  async delete(@Param("id") id: string) {
    return await this.equipeService.delete(id);
  }
}
