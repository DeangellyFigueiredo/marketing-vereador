import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FeridaService } from "src/services/ferida.service";
import { Express } from "express";
import { CreateFeridaDTO } from "src/dtos/ferida/createFerida.dto";
import {
  editFileName,
  imageFileFilter,
} from "src/middlewares/image.middleware";
import { diskStorage } from "multer";
import { EGrauFerida, ETipoFerida } from "src/utils/ETypes";

@Controller("api/ferida")
@ApiTags("ferida")
export class FeridaController {
  constructor(private readonly feridaService: FeridaService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Rota para fazer o upload de uma foto",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "file",
          format: "binary",
        },
        tipoFerida: {
          enum: [
            ETipoFerida.TIPO_A,
            ETipoFerida.TIPO_B,
            ETipoFerida.TIPO_C,
            ETipoFerida.TIPO_D,
          ],
          default: ETipoFerida.TIPO_A,
        },
        grauDaFerida: {
          enum: [
            EGrauFerida.GRAU_0,
            EGrauFerida.GRAU_1,
            EGrauFerida.GRAU_2,
            EGrauFerida.GRAU_3,
          ],
          default: EGrauFerida.GRAU_1,
        },
        presencaInfeccao: {
          type: "string",
          example: "SIM",
        },
        tratamentoRecomendado: {
          type: "string",
          example: "Limpar com água e sabão e aplicar pomada",
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./tmp/uploads/",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async create(
    @Body() body: CreateFeridaDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      })
    )
    file: any
  ) {
    return this.feridaService.create(body, file.filename);
  }

  @Get()
  async findAll() {
    return this.feridaService.findAll();
  }
}
