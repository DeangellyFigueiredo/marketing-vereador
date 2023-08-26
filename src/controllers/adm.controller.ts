import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { CreateAdmDTO } from "src/dtos/adm/createAdm.dto";
import { UpdateAdmDTO } from "src/dtos/adm/updateAdm.dto";
import { AdmService } from "src/services/adm.service";

@Controller("api/adm")
@ApiTags("adm")
export class AdmController {
  constructor(private readonly admService: AdmService) {}
  @Post()
  @Roles("create-adm")
  async create(@Body() payload: CreateAdmDTO) {
    return await this.admService.create(payload);
  }

  @Roles("list-adm")
  @Get()
  async findAll() {
    return await this.admService.findAll();
  }

  @Roles("list-adm")
  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return await this.admService.findOne(id);
  }

  @Roles("delete-adm")
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return await this.admService.delete(id);
  }
  @Roles("update-adm")
  @Put("/:id")
  async update(@Param("id") id: string, @Body() payload: UpdateAdmDTO) {
    return await this.admService.update(payload, id);
  }
}
