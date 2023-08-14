import { HttpException, HttpStatus } from "@nestjs/common";

export function convertAndVerifyNumber(value: number): number {
  const valueConverted = Number(value);

  if (isNaN(valueConverted)) {
    throw new HttpException(
      `O valor informado deve ser do tipo numérico: ${value}`,
      HttpStatus.BAD_REQUEST
    );
  }

  return valueConverted;
}

export function prettifyString(value: string): string {
  const firstLetter = (name) => name.charAt(0).toUpperCase() + name.slice(1);
  const separeString = (name) => name.replace(/([A-Z])/g, " $1").trim();
  const prettify = firstLetter(value);
  return separeString(prettify);
}
