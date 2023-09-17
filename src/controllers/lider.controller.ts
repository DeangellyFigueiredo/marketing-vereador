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
import { CreateLiderDTO } from "src/dtos/lider/createLider.dto";
import { UpdateLiderDTO } from "src/dtos/lider/updateLider.dto";
import { LiderService } from "src/services/lider.service";

@ApiTags("lider")
@Controller("api/lider")
export class LiderController {
  constructor(private readonly liderService: LiderService) {}

  @Post()
  async create(@Body() payload: CreateLiderDTO) {
    return await this.liderService.create(payload);
  }

  @Roles("admin")
  @Get()
  async findAll() {
    return await this.liderService.findAll();
  }

  @Roles("admin")
  @Get(":id")
  async findOneId(@Param("id") id: string) {
    return await this.liderService.findOneId(id);
  }

  @Roles("admin")
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.liderService.delete(id);
  }

  @Roles("admin")
  @Put("/reactivate/:id")
  async reactivate(@Param("id") id: string) {
    return await this.liderService.reactivate(id);
  }

  @Roles("admin")
  @Get("colaborador/:liderId")
  async findAllByLiderId(@Param("liderId") liderId: string) {
    return await this.liderService.findAllByLiderId(liderId);
  }

  @Roles("admin")
  @Put(":id")
  async update(@Param("id") id: string, payload: UpdateLiderDTO) {
    return await this.liderService.update(payload, id);
  }
}
