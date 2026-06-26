'use client';
import GoBackBtn from '@/components/ui/goback-btn';

export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página Não Encontrada</h2>
      <p className="text-gray-500 mb-6 text-center max-w-sm">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
        <GoBackBtn />
    </div>
  );
}
