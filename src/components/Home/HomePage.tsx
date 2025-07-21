

import React from 'react';
import FeaturedProducts from './FeaturedProducts';
import HeroSection from './HeroSection';

const backgroundUrl = '/c.jpg'; // Imagen de fondo principal

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden bg-gray-50 animate-fadein">
      {/* Imagen de fondo y overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${backgroundUrl})`, filter: 'brightness(0.85) blur(0.1px)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-white/80 z-10" />

      {/* Hero principal */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center">
        <section className="w-full flex flex-col items-center text-center mb-16">
          <img 
            src="/nba.jpg" 
            alt="NBA Ecuador" 
            className="w-32 h-32 mx-auto mb-4 drop-shadow-xl rounded-full bg-white/80 p-2 animate-bounce-slow"
            style={{ animationDelay: '0.5s' }}
          />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight animate-fadein-up">
            NBA Ecuador <span className="text-yellow-400">Store</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto drop-shadow animate-fadein-up" style={{ animationDelay: '0.2s' }}>
            Productos oficiales, camisetas, zapatillas, accesorios y coleccionables de todos los equipos y estrellas de la NBA. ¡Compra como un verdadero fan!
          </p>
        </section>


        {/* Biografía / Historia de la tienda */}
        <section className="w-full mb-16 flex flex-col items-center animate-fadein-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl font-extrabold text-white mb-6 drop-shadow">Nuestra historia</h2>
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-3xl text-gray-800 text-lg leading-relaxed text-center">
            <p>
              Este proyecto nace de algo muy personal para mí, mi pasión por el baloncesto. Desde pequeño he sido fanático de la NBA, y siempre soñé con tener una forma de acercar esa emoción a más personas en Ecuador.
            </p>
            <p className="mt-4">
              Por eso creé esta tienda, dedicada a todos los que, como yo, viven el deporte con el corazón. Aquí comparto lo que más me gusta: camisetas, zapatillas, accesorios y todo lo que representa la magia de la NBA.
            </p>
            <p className="mt-4">
              Más que un negocio, esto es una forma de expresar lo que me inspira desde niño. ¡Bienvenido a esta comunidad de fans y gracias por ser parte de este sueño!
            </p>
          </div>
        </section>

        {/* Beneficios */}
        <section className="w-full mb-8 animate-fadein-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl font-bold text-white mb-6 drop-shadow">¿Por qué comprar aquí?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-500">
              <span className="text-3xl mb-2 animate-bounce">🚚</span>
              <span className="font-bold text-lg text-gray-800 mb-1">Envío rápido y seguro</span>
              <span className="text-gray-600 text-center">Recibe tus productos en todo Ecuador con seguimiento.</span>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-500">
              <span className="text-3xl mb-2 animate-bounce">✅</span>
              <span className="font-bold text-lg text-gray-800 mb-1">100% Original</span>
              <span className="text-gray-600 text-center">Solo productos oficiales y originales de la NBA.</span>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-500">
              <span className="text-3xl mb-2 animate-bounce">🏆</span>
              <span className="font-bold text-lg text-gray-800 mb-1">Atención personalizada</span>
              <span className="text-gray-600 text-center">Soporte y asesoría para que compres como un campeón.</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default HomePage;