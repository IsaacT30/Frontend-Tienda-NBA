
import React, { useState } from 'react';
import { NBA_TEAMS } from '../data/nbaTeams';
type Team = typeof NBA_TEAMS[number];

const bgUrl = '/Ju.jpg'; 

const TeamsPage: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo con imagen y gradiente */}
      <div className="absolute inset-0 z-0">
        <img src={bgUrl} alt="NBA BG" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-blue-900/20 to-red-900/20" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-12 z-10">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-white drop-shadow-2xl tracking-widest animate-blink" style={{textShadow:'0 2px 16px #000, 0 0 8px #fff'}}>
          EQUIPOS NBA
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {NBA_TEAMS.map(team => (
            <div
              key={team.abbr}
              className="group text-center p-4 bg-white/80 rounded-2xl shadow-xl hover:scale-105 hover:bg-yellow-100 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-yellow-400 hover:shadow-2xl animate-fadeIn"
              onClick={() => setSelectedTeam(team)}
            >
              <img src={team.logo} alt={team.name} className="w-20 h-20 mx-auto mb-3 drop-shadow-xl group-hover:scale-110 transition-transform duration-300" />
              <div className="text-2xl font-extrabold mb-1 text-white group-hover:text-yellow-400 drop-shadow-lg" style={{textShadow:'0 2px 8px #000, 0 0 4px #fff'}}>{team.abbr}</div>
              <div className="text-base font-medium text-white group-hover:text-yellow-200 drop-shadow" style={{textShadow:'0 1px 4px #000'}}>{team.name}</div>
            </div>
          ))}
        </div>

        {/* Modal de biografía */}
        {selectedTeam && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative border-4 border-yellow-400 animate-popIn">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
                onClick={() => setSelectedTeam(null)}
              >
                &times;
              </button>
              <img src={selectedTeam.logo} alt={selectedTeam.name} className="w-24 h-24 mx-auto mb-4 drop-shadow-xl animate-bounce" />
              <h2 className="text-3xl font-extrabold text-center mb-2 text-blue-900" style={{color:'#fff',textShadow:'0 2px 8px #000, 0 0 4px #fff'}}>{selectedTeam.name}</h2>
              <p className="text-center text-gray-700 mb-2 text-lg animate-fadeIn2">{selectedTeam.bio}</p>
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

export default TeamsPage;
