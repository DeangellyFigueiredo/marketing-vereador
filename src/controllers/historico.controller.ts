import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Headers,
  Get,
  Param,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiBody, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { TokenDTO } from "src/dtos/auth/token.dto";
import { CreateHistoricoDTO } from "src/dtos/historico/createHistorico.dto";
import {
  editFileName,
  imageFileFilter,
} from "src/middlewares/image.middleware";
import { HistoricoService } from "src/services/historico.service";
import { ETipoFerida, EGrauFerida } from "src/utils/ETypes";

@ApiTags("historico")
@Controller("api/historico")
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

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
        procedimentoRealizado: {
          type: "string",
          default: "Limpeza com gaze",
        },
        observacoes: {
          type: "string",
          default: "Muito inflamado",
        },
        localizacaoFerida: {
          type: "string",
          example: "Dedo do pé",
        },
        feridaId: {
          type: "string",
        },
        pacienteId: {
          type: "string",
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
    @Body() payload: CreateHistoricoDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      })
    )
    file: any,
    @Headers("authorization") token: string
  ) {
    return await this.historicoService.create(payload, file.filename, token);
  }
}
