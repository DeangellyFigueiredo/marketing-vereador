import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Headers,
} from "@nestjs/common";
import { query } from "express";
import { Roles } from "src/decorators/roles.decorator";
import { CreateBairroDTO } from "src/dtos/bairro/createBairro.dto";
import { FilterBairroDTO } from "src/dtos/bairro/filterBairro.dto";
import { BairroService } from "src/services/bairro.service";

@Controller("api/bairro")
export class BairroController {
  constructor(private readonly bairroService: BairroService) {}

  @Roles("create-bairro")
  @Post()
  async create(@Body() payload: CreateBairroDTO) {
    return await this.bairroService.create(payload);
  }

  @Roles("list-bairro")
  @Get()
  async findAll(@Query() query: FilterBairroDTO) {
    return await this.bairroService.findAll(query);
  }

  @Roles("list-bairro")
  @Get("/:id")
  async findById(@Param("id") id: string) {
    return await this.bairroService.findById(id);
  }

  @Roles("delete-bairro")
  @Delete("/:id")
  async delete(
    @Param("id") id: string,
    @Headers("authorization") token: string,
    @Headers("password") password: string
  ) {
    return await this.bairroService.delete(id, password, token);
  }
}
