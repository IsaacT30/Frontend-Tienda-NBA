
import React, { useState } from 'react';
import { NBA_PLAYERS } from '../data/nbaPlayers';
type Player = typeof NBA_PLAYERS[number];

const bgUrl = '/aro.jpg';

const PlayersPage: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo con imagen y gradiente */}
      <div className="absolute inset-0 z-0">
        <img src={bgUrl} alt="NBA BG" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-blue-900/20 to-red-900/20" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-12 z-10">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-yellow-400 animate-pulse drop-shadow-lg tracking-widest animate-blink">
          <span className="animate-blink">JUGADORES DESTACADOS</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {NBA_PLAYERS.map(player => (
            <div
              key={player.name}
              className="group bg-white/80 p-8 rounded-2xl shadow-xl text-center cursor-pointer hover:scale-105 hover:bg-yellow-100 transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:shadow-2xl animate-fadeIn"
              onClick={() => setSelectedPlayer(player)}
            >
              <img src={player.image} alt={player.name} className="mx-auto rounded-full w-32 h-32 object-cover mb-4 drop-shadow-xl group-hover:scale-110 transition-transform duration-300 animate-bounce" />
              <div className="text-2xl font-extrabold text-blue-900 mb-1 group-hover:text-red-700 animate-blink2">{player.name}</div>
              <div className="text-lg text-gray-700 mb-2 group-hover:text-black">{player.team}</div>
              <div className="text-base text-gray-500 group-hover:text-blue-900">#{player.number} - {player.position}</div>
            </div>
          ))}
        </div>

        {/* Modal de biografía */}
        {selectedPlayer && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative border-4 border-yellow-400 animate-popIn">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
                onClick={() => setSelectedPlayer(null)}
              >
                &times;
              </button>
              <img src={selectedPlayer.image} alt={selectedPlayer.name} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover drop-shadow-xl animate-bounce" />
              <h2 className="text-3xl font-extrabold text-center mb-2 text-blue-900 animate-blink2">{selectedPlayer.name}</h2>
              <div className="text-center text-gray-700 mb-2 text-lg animate-fadeIn2">Equipo: <span className="font-semibold">{selectedPlayer.team}</span></div>
              <div className="text-center text-gray-700 mb-2 text-lg animate-fadeIn2">Número: <span className="font-semibold">#{selectedPlayer.number}</span> | Posición: <span className="font-semibold">{selectedPlayer.position}</span></div>
              <p className="text-center text-gray-600 mt-4 text-base leading-relaxed animate-fadeIn2">{selectedPlayer.bio}</p>
            </div>
          </div>
        )}
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
        @keyframes popIn { 0%{transform:scale(.7)} 80%{transform:scale(1.05)} 100%{transform:scale(1)} }
        .animate-popIn { animation: popIn .5s; }
      `}</style>
    </div>
  );
};

export default PlayersPage;
