export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // número da página atual (0-indexed)
  first: boolean;
  last: boolean;
}

export interface HistoricoItem {
  id: number;
  criadoEm: string;
  tipoRescisao: string;
  salarioMensal: number;
  dataDesligamento: string;
  totalLiquido: number;
}