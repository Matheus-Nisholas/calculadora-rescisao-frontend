export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface HistoricoItem {
  id: number;
  criadoEm: string;
  // NOVO: Adicionado campo opcional para o nome do empregado
  nomeEmpregado?: string; 
  tipoRescisao: string;
  salarioMensal: number;
  dataDesligamento: string;
  totalLiquido: number;
}