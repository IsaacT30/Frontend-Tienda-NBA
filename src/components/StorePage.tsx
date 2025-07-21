// ...existing code...
import React, { useState } from 'react';
// ...existing code...
import { Product } from '../types';
import ProductGrid from './Product/ProductGrid';
import jugadoresLogo from '../assets/logos/ecu logo.jpg';

interface StorePageProps {
  products: Product[];
  isLoading: boolean;
  onProductSelect?: (product: Product) => void;
}

const StorePage: React.FC<StorePageProps> = ({ products, isLoading, onProductSelect }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Trivia interactiva
  const trivia = [
    {
      question: '¿Qué jugador tiene el récord de más puntos anotados en un solo partido de la NBA?',
      answer: 'Wilt Chamberlain (100 puntos)'
    },
    {
      question: '¿Cuántos equipos conforman la NBA actualmente?',
      answer: '30 equipos'
    },
    {
      question: '¿Quién es el máximo anotador histórico de la NBA?',
      answer: 'LeBron James'
    },
    {
      question: '¿Qué equipo ha ganado más campeonatos de la NBA?',
      answer: 'Boston Celtics y Los Angeles Lakers (17 cada uno)'
    },
    {
      question: '¿Quién fue el primer MVP internacional de la NBA?',
      answer: 'Hakeem Olajuwon (Nigeria)'
    }
  ];
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo con imagen y gradiente */}
      <div className="absolute inset-0 z-0">
        <img src="/Mi.jpg" alt="NBA BG" className="w-full h-full object-cover opacity-40" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-12 z-10">
        {/* Banner NBA */}
        <div className="flex items-center justify-between bg-gradient-to-r from-black via-gray-900 to-gray-800 rounded-xl shadow-lg px-8 py-6 mb-8 animate-fadeIn">
          <div className="flex items-center gap-4">
            <span className="text-5xl animate-bounce">🏀</span>
            <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow animate-blink">Tienda Oficial NBA</h1>
          </div>
          <span className="text-2xl font-extrabold text-yellow-400 drop-shadow-lg animate-pulse animate-blink2">
            ¡Exprésate como fan, viste como leyenda y vive la emoción NBA al máximo!
          </span>
        </div>

        {/* Filtros visuales y categorías */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <aside className="md:col-span-1 flex flex-col gap-6 bg-white/80 rounded-xl shadow p-6 h-fit items-center animate-fadeIn2">
            <img src={jugadoresLogo} alt="NBA Logo" className="w-40 h-40 object-contain mb-4 drop-shadow-2xl animate-bounce" />
            <span className="text-xl font-extrabold text-black text-center animate-blink">¡Vive la experiencia NBA!</span>
            <span className="text-base text-gray-700 text-center">Descubre productos oficiales, coleccionables y la pasión del baloncesto en cada detalle.</span>
            {/* Sección interactiva: Trivia NBA */}
            <div className="w-full bg-gray-100 rounded-lg shadow p-4 mt-6 flex flex-col items-center animate-fadeIn2">
              <span className="text-lg font-bold text-black mb-2 animate-pulse">Trivia NBA</span>
              <span className="text-base text-gray-700 text-center mb-2">{trivia[triviaIndex].question}</span>
              {!showAnswer ? (
                <button
                  className="px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold shadow hover:bg-black hover:text-yellow-400 transition animate-blink2"
                  onClick={() => setShowAnswer(true)}
                >
                  Mostrar respuesta
                </button>
              ) : (
                <span className="text-green-600 font-bold mt-2 animate-bounce">{trivia[triviaIndex].answer}</span>
              )}
              <button
                className="mt-4 px-3 py-1 bg-black text-white rounded shadow hover:bg-yellow-400 hover:text-black transition text-sm animate-blink"
                onClick={() => { setTriviaIndex((triviaIndex + 1) % trivia.length); setShowAnswer(false); }}
              >
                Siguiente pregunta
              </button>
            </div>
          </aside>
          {/* Productos */}
          <main className="md:col-span-3">
            {/* Separador visual */}
            <div className="flex items-center mb-8">
              <div className="flex-1 border-t-2 border-black"></div>
              <span className="mx-4 text-lg text-yellow-400 font-bold animate-blink2">Productos Destacados</span>
              <div className="flex-1 border-t-2 border-black"></div>
            </div>
            {/* Grid de productos */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-bounce text-6xl text-yellow-400">🏀</div>
              </div>
            ) : (
              <ProductGrid products={products} onProductSelect={onProductSelect || setSelectedProduct} />
            )}
          </main>
        </div>
      </div>
      {/* Animaciones keyframes */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        .animate-blink { animation: blink 1.2s infinite; }
        @keyframes blink2 { 0%,100%{color:#eab308} 50%{color:#dc2626} }
        .animate-blink2 { animation: blink2 1.2s infinite; }
        @keyframes fadeIn { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
        .animate-fadeIn { animation: fadeIn .7s; }
        @keyframes fadeIn2 { from{opacity:0} to{opacity:1} }
        .animate-fadeIn2 { animation: fadeIn2 1.2s; }
      `}</style>
    </div>
  );
};

export default StorePage;