export class Historico {
  data: Date;
  procedimentoRealizado: string;
  observacoes: string;
  tipoDeFerida: string;
  presencaInfeccao: string;
  tratamentoRecomendado: string;
  enfermeiro: string;
  imagem: string;
}
export class MappedPaciente {
  id: string;
  nome: string;
  idade: string;
  sexo: string;
  historico: Historico[];
}
