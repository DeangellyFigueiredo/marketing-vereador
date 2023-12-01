import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Headers,
  Query,
  HttpCode,
  HttpStatus,
  Response,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Page } from "src/configs/database/page.model";
import { Public } from "src/decorators/public.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { FirstLoginDTO } from "src/dtos/adm/firstLogin.dto";
import { CreateColaboradorDTO } from "src/dtos/colaborador/createColaborador.dto";
import {
  ChangeRoleColaboradorDTO,
  FilterColaboradorDTO,
} from "src/dtos/colaborador/filterColaborador.dto";
import { UpdateColaboradorDTO } from "src/dtos/colaborador/updateColaborador.dto";
import { ColaboradorService } from "src/services/colaborador.service";

@ApiTags("colaborador")
@Controller("api/colaborador")
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) {}

  @Public()
  @Post()
  async create(
    @Body() payload: CreateColaboradorDTO,
    @Headers("authorization") token: string
  ) {
    return await this.colaboradorService.create(payload, token);
  }

  @Roles("list-colaborador")
  @Get()
  async findAllNoPaginated() {
    return await this.colaboradorService.findAllNoPaginated();
  }

  @Roles("list-colaborador")
  @Get("/findAll")
  async findAll(@Query() filter: FilterColaboradorDTO, @Query() page: Page) {
    return await this.colaboradorService.findAll(filter, page);
  }

  @Roles("list-colaborador")
  @Get(":id")
  async findOneId(@Param("id") id: string) {
    return await this.colaboradorService.findOneId(id);
  }

  @Roles("delete-colaborador")
  @Delete(":id")
  async delete(
    @Param("id") id: string,
    @Headers("authorization") token: string,
    @Headers("password") password: string
  ) {
    return await this.colaboradorService.delete(id, token, password);
  }

  @Roles("update-colaborador")
  @Put("/update/:id")
  async update(@Body() payload: UpdateColaboradorDTO, @Param("id") id: string) {
    return await this.colaboradorService.update(payload, id);
  }

  @Roles("update-colaborador-role")
  @Put("role/:id")
  async updateRole(
    @Param("id") id: string,
    @Query() query: ChangeRoleColaboradorDTO,
    @Headers("authorization") token: string
  ) {
    return await this.colaboradorService.changeRole(id, token, query);
  }

  @Put("/first-login/")
  @Roles("first-login")
  async firstLogin(
    @Body() payload: FirstLoginDTO,
    @Headers("authorization") token: string
  ) {
    return await this.colaboradorService.firstLogin(payload, token);
  }

  @Get("all/recrutados/:id")
  async findAllRecrutados(
    @Param("id") id: string,
    @Query() filter: FilterColaboradorDTO
  ) {
    return await this.colaboradorService.findAllRecrutados(id, filter);
  }

  @Get("download/file")
  @Roles("export-colaborador")
  @HttpCode(HttpStatus.OK)
  async exportsColaboradorFile(
    @Response({ passthrough: true }) res,
    @Query() filters: FilterColaboradorDTO
  ): Promise<any> {
    const fileName = "Colaboradores Exportados.xlsx";
    res.set({
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    });
    return await this.colaboradorService.exportsColaboradorFile(filters);
  }

  @Get("download/recrutados/:id")
  @Roles("export-colaborador")
  @HttpCode(HttpStatus.OK)
  async exportsColaboradorRecrutadosFile(
    @Response({ passthrough: true }) res,
    @Param("id") id: string,
    @Query() filters: FilterColaboradorDTO
  ): Promise<any> {
    const fileName = "Colaboradores Recrutados Exportados.xlsx";
    res.set({
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    });
    return await this.colaboradorService.exportsColaboradorRecrutadosFile(
      id,
      filters
    );
  }

  @Put("/update/password/:id")
  @Roles("update-password")
  async updatePassword(
    @Param("id") id: string,
    @Headers("authorization") token: string
  ) {
    return await this.colaboradorService.updatePassword(id, token);
  }
}
