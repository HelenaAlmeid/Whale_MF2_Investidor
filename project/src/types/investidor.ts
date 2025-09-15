export interface InvestidorData {
  nome: string;
  email: string;
  contato: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface FormErrors {
  nome?: string;
  email?: string;
  contato?: string;
}