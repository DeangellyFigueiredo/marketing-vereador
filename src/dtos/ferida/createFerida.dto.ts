import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { EGrauFerida, ETipoFerida } from "src/utils/ETypes";

export class CreateFeridaDTO {
  @ApiProperty()
  @IsEnum(ETipoFerida, {
    message: `Tipo de ferida tem que ser ${Object.keys(ETipoFerida).join(",")}`,
  })
  tipoFerida: ETipoFerida;
  @ApiProperty()
  @IsEnum(EGrauFerida, {
    message: `Grau de ferida tem que ser ${Object.keys(EGrauFerida).join(",")}`,
  })
  grauDaFerida: EGrauFerida;
  @ApiProperty()
  @IsString()
  presencaInfeccao: string;
  @ApiProperty()
  @IsString()
  tratamentoRecomendado: string;
}
