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
import { CreateLiderDTO } from "src/dtos/lider/createLider.dto";
import { UpdateLiderDTO } from "src/dtos/lider/updateLider.dto";
import { LiderService } from "src/services/lider.service";

@ApiTags("lider")
@Controller("api/lider")
export class LiderController {
  constructor(private readonly liderService: LiderService) {}

  @Roles("create-lider")
  @Post()
  async create(@Body() payload: CreateLiderDTO) {
    return await this.liderService.create(payload);
  }

  @Post("/vinculate/:id")
  async createByLider(
    @Body() payload: CreateColaboradorDTO,
    @Param("id") id: string
  ) {
    return await this.liderService.createByLider(payload, id);
  }

  @Roles("list-lider")
  @Get()
  async findAll() {
    return await this.liderService.findAll();
  }

  @Roles("list-lider")
  @Get(":id")
  async findOneId(@Param("id") id: string) {
    return await this.liderService.findOneId(id);
  }

  @Roles("delete-lider")
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.liderService.delete(id);
  }

  @Roles("activate-lider")
  @Put("/reactivate/:id")
  async reactivate(@Param("id") id: string) {
    return await this.liderService.reactivate(id);
  }

  @Roles("list-lider")
  @Get("colaborador/:liderId")
  async findAllByLiderId(@Param("liderId") liderId: string) {
    return await this.liderService.findAllByLiderId(liderId);
  }

  @Roles("update-lider")
  @Put(":id")
  async update(@Param("id") id: string, payload: UpdateLiderDTO) {
    return await this.liderService.update(payload, id);
  }
}
