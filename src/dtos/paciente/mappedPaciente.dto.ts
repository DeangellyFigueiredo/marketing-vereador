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
export class Intervencao {
  data: Date;
  diagnostico: string;
  tratamento: string;
  resultadosObtidos: string;
  resultadosEsperados: string;
}

export class MappedPaciente {
  id: string;
  nome: string;
  idade: string;
  sexo: string;
  historico: Historico[];
  intervencao: Intervencao[];
}
