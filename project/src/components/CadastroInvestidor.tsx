import React, { useState, FormEvent, ChangeEvent } from 'react';
import { User, Mail, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { InvestidorData, FormErrors } from '../types/investidor';
import { cadastrarInvestidor } from '../services/api';
import { validateForm, formatPhone } from '../utils/validation';

interface StatusMessage {
  type: 'success' | 'error';
  message: string;
}

export const CadastroInvestidor: React.FC = () => {
  const [formData, setFormData] = useState<InvestidorData>({
    nome: '',
    email: '',
    contato: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Formata o telefone enquanto digita
    if (name === 'contato') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Remove o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Remove a mensagem de status quando o usuário edita o formulário
    if (status) {
      setStatus(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Valida o formulário
    const formErrors = validateForm(formData);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setStatus(null);

    try {
      const result = await cadastrarInvestidor(formData);
      
      if (result.success) {
        setStatus({
          type: 'success',
          message: result.message
        });
        
        // Limpa o formulário após sucesso
        setFormData({
          nome: '',
          email: '',
          contato: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Erro inesperado. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ nome: '', email: '', contato: '' });
    setErrors({});
    setStatus(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Cadastro de Investidor
          </h1>
          <p className="text-gray-600 text-sm">
            Preencha seus dados para começar a investir
          </p>
        </div>

        {/* Mensagem de Status */}
        {status && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            status.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {status.type === 'success' ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{status.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.nome 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                placeholder="Digite seu nome completo"
                disabled={isLoading}
              />
            </div>
            {errors.nome && (
              <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.nome}</span>
              </p>
            )}
          </div>

          {/* Campo E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.email 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                placeholder="seu.email@exemplo.com"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Campo Contato */}
          <div>
            <label htmlFor="contato" className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="contato"
                name="contato"
                value={formData.contato}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.contato 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                placeholder="(11) 99999-9999"
                maxLength={15}
                disabled={isLoading}
              />
            </div>
            {errors.contato && (
              <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.contato}</span>
              </p>
            )}
          </div>

          {/* Botões */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Cadastrando...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Cadastrar</span>
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={resetForm}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Limpar
            </button>
          </div>
        </form>

        {/* Informação sobre a API */}
        {import.meta.env.DEV && (
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>API URL:</strong> {import.meta.env.VITE_API_URL || 'Não configurado'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CadastroInvestidor;