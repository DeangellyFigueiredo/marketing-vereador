import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateLiderDTO } from "src/dtos/lider/createLider.dto";
import { UpdateLiderDTO } from "src/dtos/lider/updateLider.dto";
import { LiderService } from "src/services/lider.service";

@ApiTags("lider")
@Controller("api/lider")
export class LiderController {
  constructor(private readonly liderService: LiderService) {}

  @Post()
  async create(payload: CreateLiderDTO) {
    return await this.liderService.create(payload);
  }

  @Get()
  async findAll() {
    return await this.liderService.findAll();
  }

  @Get(":id")
  async findOneId(@Param("id") id: string) {
    return await this.liderService.findOneId(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.liderService.delete(id);
  }

  @Get("colaborador/:liderId")
  async findAllByLiderId(@Param("liderId") liderId: string) {
    return await this.liderService.findAllByLiderId(liderId);
  }

  @Put(":id")
  async update(@Param("id") id: string, payload: UpdateLiderDTO) {
    return await this.liderService.update(payload, id);
  }
}
