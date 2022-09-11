export interface CompanyResult {
  ca: number;
  margin: number;
  ebitda: number;
  loss: number;
  year: number | string;
}
export interface Company {
  name: string;
  sector: string;
  siren: number;
  results: CompanyResult[];
}
