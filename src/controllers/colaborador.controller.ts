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

  @Get()
  async findAll() {
    return await this.colaboradorService.findAll();
  }

  @Get(":id")
  async findOneId(@Param() id: string) {
    return await this.colaboradorService.findOneId(id);
  }

  @Delete(":id")
  async delete(@Param() id: string) {
    return await this.colaboradorService.delete(id);
  }

  @Put(":id")
  async update(@Body() payload: UpdateColaboradorDTO, @Param() id: string) {
    return await this.colaboradorService.update(payload, id);
  }

  @Put("lider/:id")
  async updateToLider(
    @Param("id") id: string,
    @Headers("authorization") token: string
  ) {
    return await this.colaboradorService.updateToLider(id, token);
  }
}
