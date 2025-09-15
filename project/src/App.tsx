import React from 'react';
import { CadastroInvestidor } from './components/CadastroInvestidor';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Whale Investimentos</h1>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm text-gray-600">Plataforma MFE v1.0</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Bem-vindo à Whale Investimentos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comece sua jornada de investimentos conosco. Cadastre-se e descubra 
              as melhores oportunidades do mercado financeiro.
            </p>
          </div>

          <div className="flex justify-center">
            <CadastroInvestidor />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2025 Whale Investimentos. Todos os direitos reservados.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Aplicação desenvolvida com React + TypeScript + Azure SWA
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;