'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log do erro em algum serviço de monitoramento (Sentry, LogRocket, etc.)
    console.error('Erro capturado:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Ops! Algo deu errado.</h2>
      <p className="text-gray-600 mb-4 text-center">
        Ocorreu um erro inesperado. Já fomos notificados e estamos trabalhando nisso.
      </p>
      
      {/* O botão reset tenta renderizar a rota novamente para ver se o erro passa */}
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Tentar Novamente
      </button>
    </div>
  );
}