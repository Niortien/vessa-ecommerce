'use client'
import React from 'react';
import { ArrowRight, ShoppingBag, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import Button from '@mui/material/Button';

const Collections = () => {
  const collections = [
    {
      id: 1,
      name: "Collection Été 2024",
      description: "Découvrez notre nouvelle collection estivale avec des pièces légères et colorées",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      itemCount: 45,
      featured: true,
      discount: 20
    },
    {
      id: 2,
      name: "Accessoires Premium",
      description: "Une sélection d'accessoires haut de gamme pour compléter votre style",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop",
      itemCount: 28,
      featured: false,
      discount: null
    },
    {
      id: 3,
      name: "Mode Urbaine",
      description: "Style décontracté pour la ville moderne",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
      itemCount: 67,
      featured: true,
      discount: 15
    },
    {
      id: 4,
      name: "Élégance Classique",
      description: "Intemporels et sophistiqués, ces pièces traversent les saisons",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
      itemCount: 32,
      featured: false,
      discount: null
    },
    {
      id: 5,
      name: "Sport & Bien-être",
      description: "Confort et performance pour vos activités sportives",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      itemCount: 54,
      featured: false,
      discount: 25
    },
    {
      id: 6,
      name: "Tendances Automne",
      description: "Les dernières tendances pour la saison automnale",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop",
      itemCount: 38,
      featured: true,
      discount: null
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Nos Collections
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection soigneusement curatée de collections uniques, 
            chacune racontant sa propre histoire de style et d'élégance.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {collection.featured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 shadow-sm">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Tendance
                    </span>
                  )}
                  {collection.discount && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                          style={{ backgroundColor: '#1A56DC' }}>
                      -{collection.discount}%
                    </span>
                  )}
                </div>

                {/* Heart Icon */}
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200 opacity-0 group-hover:opacity-100">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                </button>

                {/* Hover overlay content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                

                    className="px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    style={{ backgroundColor: '#1A56DC' }}
                  >
                    <Link href={'/shop'}>
                    Découvrir
                    </Link>
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {collection.name}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    {collection.itemCount}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {collection.description}
                </p>

                {/* CTA Button */}
              <Link href='/shop' >
                <Button
                  className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 border-2 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{ 
                    borderColor: '#1A56DC',
                    color: '#1A56DC',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1A56DC';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#1A56DC';
                  }}
                >
                  Voir les articles
                </Button>
              </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div 
            className="max-w-4xl mx-auto rounded-3xl p-12 text-white relative overflow-hidden"
            style={{ backgroundColor: '#1A56DC' }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Restez à la pointe de la mode
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Inscrivez-vous à notre newsletter et soyez les premiers informés de nos nouvelles collections
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;