import axios from 'axios';
import { InvestidorData, ApiResponse } from '../types/investidor';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.exemplo.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging em desenvolvimento
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log('📤 Enviando requisição:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log('📥 Resposta recebida:', response.status, response.data);
    }
    return response;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('❌ Erro na requisição:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export const cadastrarInvestidor = async (dados: InvestidorData): Promise<ApiResponse> => {
  try {
    const response = await api.post('/investidores', dados);
    return {
      success: true,
      message: 'Investidor cadastrado com sucesso!',
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao cadastrar investidor. Tente novamente.',
    };
  }
};

export default api;