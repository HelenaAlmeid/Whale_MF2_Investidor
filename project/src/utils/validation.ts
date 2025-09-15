import { FormErrors, InvestidorData } from '../types/investidor';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Remove todos os caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  // Aceita telefones com 10 ou 11 dígitos (com ou sem DDD)
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

export const validateForm = (data: InvestidorData): FormErrors => {
  const errors: FormErrors = {};

  // Validação do nome
  if (!data.nome.trim()) {
    errors.nome = 'Nome é obrigatório';
  } else if (data.nome.trim().length < 2) {
    errors.nome = 'Nome deve ter pelo menos 2 caracteres';
  }

  // Validação do email
  if (!data.email.trim()) {
    errors.email = 'E-mail é obrigatório';
  } else if (!validateEmail(data.email)) {
    errors.email = 'E-mail deve ter um formato válido';
  }

  // Validação do contato
  if (!data.contato.trim()) {
    errors.contato = 'Contato é obrigatório';
  } else if (!validatePhone(data.contato)) {
    errors.contato = 'Contato deve ser um telefone válido';
  }

  return errors;
};

export const formatPhone = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Formata o telefone
  if (numbers.length <= 10) {
    // (XX) XXXX-XXXX
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    // (XX) XXXXX-XXXX
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
};