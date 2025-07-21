import React from 'react';
import { ShoppingBag, Star, Truck, Shield } from 'lucide-react';
import ChicagoBullsLogo from '../../assets/logos/ChicagoBullsLogo.jpg';
import LakersLogo from '../../assets/logos/LakersLogo.jpg';
import Brooklyn from '../../assets/logos/Brooklyn.jpg';
import Miami from '../../assets/logos/Miami.jpg';
import Boston from '../../assets/logos/Boston.jpg';
import Golden from '../../assets/logos/Golden.jpg';
import Team from '../../assets/logos/team.jpg';
import Zapa from '../../assets/logos/zapa.jpg';
import Jersey from '../../assets/logos/Jersey.jpg';
import Acc from '../../assets/logos/ac.jpg';



const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      {/* Main Hero */}
      <div className="bg-gradient-to-r from-black via-gray-800 to-white text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                 NBA ECUADOR +593
                <span className="block text-yellow-300">Store</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Compra camisetas, zapatillas y artículos auténticos de la NBA de tus equipos y jugadores favoritos.
                Consigue todo lo que usan los campeones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Compra ya</span>
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                  Ver Colecciones
                </button>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">Envío gratuito en compras superiores a $75</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">100% Original </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">Devoluciones en 30 días</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={Team} alt="Team"
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                Lo mejor de la NBA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Comprar por categoría          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
                <img
                  src={Jersey}
                  alt="Jerseys"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Jerseys</h3>
                <p className="text-gray-600">Camisetas Originales de los jugadores de los 30 equipos NBA </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
                <img
                  src={Zapa} alt="Zapatillas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Calzado</h3>
                <p className="text-gray-600">Zapatillas de baloncesto</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-green-500 to-green-600 relative overflow-hidden">
                <img
                  src={Acc} alt="Zapatillas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Accesorios</h3>
                <p className="text-gray-600">Gorras, bolsos y artículos de equipo entre otros</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Teams */}
     <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Equipos Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { 
                name: 'Lakers', 
                color: 'bg-purple-600', 
                logo: <img src={LakersLogo} alt="Lakers Logo" className="w-12 h-12 object-contain mb-2" />
              },

              { name: 'Warriors', 
                color: 'bg-blue-600', 
                logo: <img src={Golden} alt="Bulls Logo" className="w-12 h-12 object-contain mb-2" /> },

              { name: 'Celtics', 
                color: 'bg-green-600', 
                logo: <img src={Boston} alt="Bulls Logo" className="w-12 h-12 object-contain mb-2" /> },
              { 
                name: 'Bulls', 
                color: 'bg-red-600', 
                logo: <img src={ChicagoBullsLogo} alt="Bulls Logo" className="w-12 h-12 object-contain mb-2" />
              },
              { name: 'Heat', 
                color: 'bg-red-500', 
                logo: <img src={Miami} alt="Lakers Logo" className="w-12 h-12 object-contain mb-2" /> },

              { name: 'Nets', 
                color: 'bg-black', 
                logo: <img src={Brooklyn} alt="Brooklyn Logo" className="w-12 h-12 object-contain mb-2" /> },

            ].map((team) => (
              <div
                key={team.name}
                className={`${team.color} text-white rounded-lg p-4 text-center hover:scale-105 transition-transform cursor-pointer flex flex-col items-center justify-center`}
              >
                {team.logo}
                <div className="text-sm font-medium">{team.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;