import { Body, Controller, Post, Headers } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateIntervencaoDTO } from "src/dtos/intervencao/createIntervencao.dto";
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
}
