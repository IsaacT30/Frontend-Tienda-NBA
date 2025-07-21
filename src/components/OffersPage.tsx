

import React, { useState } from 'react';
const bgUrl = '/nba1.jpg';


const OffersPage: React.FC = () => {
  // ...existing code...
  const [raffleCount, setRaffleCount] = useState(7);

  // Simula un contador animado de plazas para el sorteo
  React.useEffect(() => {
    if (raffleCount > 0) {
      const timer = setTimeout(() => setRaffleCount(raffleCount - 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [raffleCount]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo con imagen y gradiente */}
      <div className="absolute inset-0 z-0">
        <img src={bgUrl} alt="NBA BG" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-blue-900/20 to-red-900/20" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-12 z-10">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-yellow-400 animate-pulse drop-shadow-lg tracking-widest animate-blink">
          <span className="animate-blink">BENEFICIOS Y EXPERIENCIAS EXCLUSIVAS</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Tarjeta Sorteo VIP */}
          <div className="bg-white/90 border-2 border-blue-400 p-8 rounded-2xl shadow-xl flex flex-col items-center hover:scale-105 hover:bg-blue-50 hover:border-yellow-400 transition-all duration-300 animate-fadeIn relative">
            <div className="text-5xl font-extrabold text-blue-600 mb-2 animate-bounce">🏆</div>
            <div className="text-xl font-semibold text-black mb-2">Sorteos de Entradas VIP</div>
            <div className="text-gray-700 text-center mb-4">Participa cada mes en el sorteo de entradas VIP para partidos de la NBA y vive la emoción desde la primera fila.</div>
            {/* Plazas disponibles eliminado */}
            {/* Botón eliminado */}
            <span className="absolute top-2 right-4 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full animate-blink">VIP</span>
          </div>
          {/* Tarjeta Meet & Greet */}
          <div className="bg-white/90 border-2 border-yellow-400 p-8 rounded-2xl shadow-xl flex flex-col items-center hover:scale-105 hover:bg-yellow-50 hover:border-blue-400 transition-all duration-300 animate-fadeIn">
            <div className="text-5xl font-extrabold text-yellow-500 mb-2 animate-bounce">🏀</div>
            <div className="text-xl font-semibold text-black mb-2">Clínicas y Meet & Greet</div>
            <div className="text-gray-700 text-center mb-4">Acceso exclusivo a clínicas de baloncesto y encuentros con jugadores y leyendas de la NBA.</div>
            {/* Botón eliminado */}
          </div>
          {/* Tarjeta Comunidad Premium */}
          <div className="bg-white/90 border-2 border-purple-400 p-8 rounded-2xl shadow-xl flex flex-col items-center hover:scale-105 hover:bg-purple-50 hover:border-teal-400 transition-all duration-300 animate-fadeIn">
            <div className="text-5xl font-extrabold text-purple-600 mb-2 animate-bounce">💬</div>
            <div className="text-xl font-semibold text-black mb-2">Comunidad Premium</div>
            <div className="text-gray-700 text-center mb-4">Acceso a foros privados, grupos de WhatsApp y Discord para interactuar con otros fans y expertos.</div>
            {/* Botón eliminado */}
          </div>
          {/* Tarjeta Experiencias Virtuales */}
          <div className="bg-white/90 border-2 border-green-400 p-8 rounded-2xl shadow-xl flex flex-col items-center hover:scale-105 hover:bg-green-50 hover:border-pink-400 transition-all duration-300 animate-fadeIn">
            <div className="text-5xl font-extrabold text-green-600 mb-2 animate-bounce">�</div>
            <div className="text-xl font-semibold text-black mb-2">Experiencias Virtuales</div>
            <div className="text-gray-700 text-center mb-4">Disfruta de tours virtuales por estadios, sesiones de preguntas y respuestas en vivo y contenido exclusivo detrás de cámaras.</div>
            {/* Botón eliminado */}
          </div>
          {/* Tarjeta Eventos Temáticos */}
          <div className="bg-white/90 border-2 border-pink-400 p-8 rounded-2xl shadow-xl flex flex-col items-center hover:scale-105 hover:bg-pink-50 hover:border-green-400 transition-all duration-300 animate-fadeIn">
            <div className="text-5xl font-extrabold text-pink-500 mb-2 animate-bounce">🎉</div>
            <div className="text-xl font-semibold text-black mb-2">Eventos Temáticos NBA</div>
            <div className="text-gray-700 text-center mb-4">Invitaciones a fiestas, viewing parties y celebraciones temáticas para los fans más apasionados.</div>
            {/* Botón eliminado */}
          </div>
          {/* Tarjeta Galería */}
          <div className="bg-white/90 border-2 border-teal-400 p-8 rounded-2xl shadow-xl flex flex-col items-center hover:scale-105 hover:bg-teal-50 hover:border-purple-400 transition-all duration-300 animate-fadeIn">
            <div className="text-5xl font-extrabold text-teal-600 mb-2 animate-bounce">📸</div>
            <div className="text-xl font-semibold text-black mb-2">Galería de Fotos y Videos Exclusivos</div>
            <div className="text-gray-700 text-center mb-4">Accede a contenido multimedia único de partidos, entrenamientos y momentos históricos de la NBA.</div>
            {/* Botón eliminado */}
          </div>
        </div>

        {/* Sección interactiva: Preguntas Frecuentes (FAQ) */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 mt-12 max-w-2xl mx-auto flex flex-col items-center animate-fadeIn">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Preguntas Frecuentes</h2>
          <img src="/nba.jpg" alt="NBA Logo" className="w-24 h-24 mb-6 object-contain" />
          <FAQ />
        </div>

        {/* CTA final */}
        <div className="mt-16 flex flex-col items-center animate-fadeIn2">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4 animate-blink">¡Únete a la experiencia NBA y vive momentos inolvidables!</h3>
        </div>
      </div>
      {/* Animaciones keyframes */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        .animate-blink { animation: blink 1.2s infinite; }
        @keyframes blink2 { 0%,100%{color:#1e3a8a} 50%{color:#dc2626} }
        .animate-blink2 { animation: blink2 1.2s infinite; }
        @keyframes fadeIn { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
        .animate-fadeIn { animation: fadeIn .7s; }
        @keyframes fadeIn2 { from{opacity:0} to{opacity:1} }
        .animate-fadeIn2 { animation: fadeIn2 1.2s; }
      `}</style>
    </div>
  );
};


// Componente FAQ interactivo tipo acordeón
const faqData = [
  {
    q: '¿Cómo participo en los sorteos VIP?',
    a: 'Solo debes hacer clic en el botón “¡Participar ahora!” en la tarjeta de Sorteos VIP y seguir las instrucciones. ¡Mucha suerte!'
  },
  {
    q: '¿Qué beneficios tiene la Comunidad Premium?',
    a: 'Acceso a foros privados, grupos exclusivos y eventos especiales solo para miembros premium.'
  },
  {
    q: '¿Puedo asistir a los eventos temáticos si no soy miembro premium?',
    a: 'Algunos eventos son abiertos a todos, pero los miembros premium tienen prioridad y acceso a experiencias exclusivas.'
  },
  {
    q: '¿Cómo accedo a la galería de fotos y videos?',
    a: 'Haz clic en la tarjeta de Galería y disfruta del contenido multimedia exclusivo para fans registrados.'
  },
  {
    q: '¿Las experiencias virtuales tienen costo?',
    a: 'Algunas experiencias son gratuitas y otras pueden requerir una suscripción premium o pago único.'
  },
];

function FAQ() {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <div className="w-full">
      {faqData.map((item, idx) => (
        <div key={idx} className="mb-3">
          <button
            className={`w-full flex justify-between items-center px-4 py-3 rounded-lg font-semibold text-left transition bg-blue-50 hover:bg-yellow-100 focus:outline-none border-2 border-blue-200 ${open === idx ? 'border-yellow-400 bg-yellow-50' : ''}`}
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
          >
            <span className="text-blue-900">{item.q}</span>
            <span className={`ml-2 text-xl transition-transform ${open === idx ? 'rotate-90 text-yellow-400' : 'text-blue-400'}`}>▶</span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${open === idx ? 'max-h-40 py-2 px-4' : 'max-h-0 py-0 px-4'}`}
            style={{ color: '#1e293b', fontSize: '1rem' }}
          >
            {open === idx && <div>{item.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OffersPage;
