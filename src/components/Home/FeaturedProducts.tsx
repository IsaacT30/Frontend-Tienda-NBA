import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

interface FeaturedProduct {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  isNew?: boolean;
  isPopular?: boolean;
}

const FeaturedProducts: React.FC = () => {
  const featuredProducts: FeaturedProduct[] = [
    {
      id: '1',
      name: "Men's Los Angeles Lakers Mitchell & Ness x BLACKPINK Purple Hardwood Classics Swingman Jersey - Limited Edition",
      price: '$110.00',
      originalPrice: '$130.00',
      image: 'https://fanatics.frgimages.com/los-angeles-lakers/mens-fanatics-lebron-james-gold-los-angeles-lakers-fast-break-replica-jersey-icon-edition_ss5_p-201451085+pv-1+u-jgui2u1zrf8sskilncqf+v-iu0lumeluujvokwnr4kk.jpg?_hv=2&w=900',
      rating: 4.8,
      isNew: true,
      isPopular: true,
    },
    {
      id: '2',
      name: "Men's Golden State Warriors Stephen Curry Nike Royal 2022/23 Swingman Jersey - Icon Edition",
      price: '$89.99',
      image: '//fanatics.frgimages.com/golden-state-warriors/mens-fanatics-stephen-curry-royal-golden-state-warriors-big-and-tall-fast-break-player-jersey-icon-edition_ss5_p-5266040+u-jysmi3d6qnz4ujclnnkh+v-ghwb3pcxamz3zfn8k1ks.jpg?_hv=2&w=600',
      rating: 4.9,
      isPopular: true,
    },
    {
      id: '3',
      name: "Men's Boston Celtics Jayson Tatum Nike Kelly Green Authentic Jersey - Icon Edition",
      price: '$199.99',
      image: '//fanatics.frgimages.com/boston-celtics/mens-nike-jayson-tatum-kelly-green-boston-celtics-authentic-jersey-icon-edition_pi3773000_ff_3773274-8e7d94631989a1444a97_full.jpg?_hv=2&w=600',
      rating: 4.7,
    },
    {
      id: '4',
      name: "Men's Chicago Bulls Michael Jordan Mitchell & Ness Scarlet 1997/98 Hardwood Classics Authentic Jersey",
      price: '$229.99',
      image: '//fanatics.frgimages.com/chicago-bulls/mens-mitchell-and-ness-michael-jordan-scarlet-chicago-bulls-1997/98-hardwood-classics-authentic-jersey_pi3902000_ff_3902287-1c1317b0ddf7fbe59314_full.jpg?_hv=2&w=600',
      rating: 5.0,
      isNew: true,
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Productos destacados
          </h2>
          <p className="text-lg text-gray-600">
            Descubre los productos más recientes y populares de la NBA </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Nuevo
                    </span>
                  )}
                  {product.isPopular && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Populares
                    </span>
                  )}
                </div>

                {/* Quick Add Button */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({product.rating})</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-red-600">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Most Popular Badge */}
                {product.isPopular && (
                  <div className="text-xs text-red-600 font-medium">
                    Los más populares en Jerseys
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Ver todos los productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;