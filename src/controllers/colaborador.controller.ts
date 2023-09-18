import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Headers,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { CreateColaboradorDTO } from "src/dtos/colaborador/createColaborador.dto";
import { UpdateColaboradorDTO } from "src/dtos/colaborador/updateColaborador.dto";
import { ColaboradorService } from "src/services/colaborador.service";

@ApiTags("colaborador")
@Controller("api/colaborador")
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) {}

  @Post()
  async create(@Body() payload: CreateColaboradorDTO) {
    return await this.colaboradorService.create(payload);
  }

  @Roles("list-colaborador")
  @Get()
  async findAll() {
    return await this.colaboradorService.findAll();
  }

  @Roles("list-colaborador")
  @Get(":id")
  async findOneId(@Param("id") id: string) {
    return await this.colaboradorService.findOneId(id);
  }

  @Roles("delete-colaborador")
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.colaboradorService.delete(id);
  }

  @Roles("update-colaborador")
  @Put(":id")
  async update(@Body() payload: UpdateColaboradorDTO, @Param("id") id: string) {
    return await this.colaboradorService.update(payload, id);
  }

  @Roles("update-to-lider")
  @Put("lider/:id")
  async updateToLider(
    @Param("id") id: string,
    @Headers("authorization") token: string
  ) {
    return await this.colaboradorService.updateToLider(id, token);
  }
}
