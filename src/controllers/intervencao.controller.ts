import { Body, Controller, Post, Headers, Put, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateIntervencaoDTO } from "src/dtos/intervencao/createIntervencao.dto";
import { UpdateIntervencaoDTO } from "src/dtos/intervencao/updateIntervencao.dto";
import { IntervencaoService } from "src/services/intervencao.service";

@ApiTags("intervencao")
@Controller("api/intervencao")
export class IntervencaoController {
  constructor(private readonly intervencaoService: IntervencaoService) {}

  @Post()
  async create(
    @Body() payload: CreateIntervencaoDTO,
    @Headers("authorization") token: string
  ) {
    return await this.intervencaoService.create(payload, token);
  }

  @Put("/:id")
  async update(@Body() payload: UpdateIntervencaoDTO, @Param("id") id: string) {
    return await this.intervencaoService.update(payload, id);
  }
}
