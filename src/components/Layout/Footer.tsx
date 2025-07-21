import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white mt-16 shadow-lg border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-yellow-400 tracking-wide">NBA Store</h3>
            <p className="text-gray-400 text-base">
              Tu destino oficial para productos y artículos de colección de la NBA.
            </p>
            <div className="flex space-x-6 mt-2">
              <Facebook className="h-7 w-7 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors duration-200" />
              <Twitter className="h-7 w-7 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors duration-200" />
              <Instagram className="h-7 w-7 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors duration-200" />
              <Youtube className="h-7 w-7 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Atención al Cliente</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Contáctanos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Guía de Tallas</a></li>
            </ul>
          </div>

          {/* Shopping */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Compras</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Jerseys</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Zapatos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Accesorios</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Coleccionables</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Mantente Conectado</h4>
            <p className="text-gray-400 text-base">Suscríbete para recibir actualizaciones sobre nuevos productos y ofertas exclusivas.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Ingresa tu email"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-white placeholder-gray-400"
              />
              <button className="bg-yellow-400 text-black px-5 py-3 rounded-r-md hover:bg-black hover:text-yellow-400 transition-colors font-bold">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-gray-800 text-center text-gray-500 text-base">
          <p>&copy; 2025 NBA Store. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;