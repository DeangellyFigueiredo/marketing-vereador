import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/decorators/public.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { CreatePreCadastroDTO } from "src/dtos/pre-cadastro/createPreCadastro.dto";
import { PreCadastroService } from "src/services/pre-cadastro.service";

@ApiTags("pre-cadastro")
@Controller("pre-cadastro")
export class PreCadastroController {
  constructor(private readonly preCadastroService: PreCadastroService) {}

  @Public()
  @Post()
  async create(@Body() payload: CreatePreCadastroDTO) {
    return await this.preCadastroService.create(payload);
  }

  @Roles("list-pre-cadastro")
  @Get()
  async findAll() {
    return await this.preCadastroService.findAll();
  }

  @Roles("list-pre-cadastro")
  @Get("/:id")
  async findById(@Param("id") id: string) {
    return await this.preCadastroService.findById(id);
  }

  @Roles("delete-pre-cadastro")
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return await this.preCadastroService.delete(id);
  }
}
