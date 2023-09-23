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

export function convertFaixaSalarial(value: number): string {
  if (value === 0) return "Abaixo de um salário mínimo ";
  if (value === 1) return "Um salário mínimo ";
  if (value === 2) return "Dois salários mínimos ";
  if (value === 3) return "Três salários mínimos ";
  if (value === 4) return "Quatro salários mínimos ";
  if (value === 5) return "Cinco salários mínimos ";
  if (value === 6) return "Seis salários mínimos ";
  if (value === 7) return "Mais de 6 salários mínimos ";
  return "";
}
