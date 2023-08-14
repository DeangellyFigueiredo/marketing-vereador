import { HttpException, HttpStatus } from "@nestjs/common";
import { v4 as uuid } from "uuid";
export const editFileName = (req: any, file: any, callback: any) => {
  const fileExtName = file.originalname.split(".")[1];
  callback(null, `${uuid()}.${fileExtName}`);
};

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new HttpException(
        "Apenas arquivos de tipo imagem são permitidos!",
        HttpStatus.BAD_REQUEST
      ),
      false
    );
  }
  callback(null, true);
};
