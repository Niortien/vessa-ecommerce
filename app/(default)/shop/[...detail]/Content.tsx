"use client";
import React, { useState } from 'react';
import { Star, Heart,  } from 'lucide-react';

import Image from 'next/image';
import { Article } from '@/type/type';
import { useFinc } from '@/Store/Store';
import { it } from 'node:test';

export default function Content({ product }: { product: Article }) {
  // const [quantity, setQuantity] = useState(2);
  const [activeTab, setActiveTab] = useState('description');
  
  // const handleQuantityChange = (type) => {
  //   if (type === 'increase') {
  //     setQuantity(prev => prev + 1);
  //   } else if (type === 'decrease' && quantity > 1) {
  //     setQuantity(prev => prev - 1);
  //   }
  // };
    const {addToCart}=useFinc()
     const handlclick = () => {
    addToCart(product)
    alert(`The Watch ${product.nom} has been added to your cart!`);
  } ; 

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 4; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    stars.push(<Star key={4} className="w-4 h-4 text-gray-400" />);
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-300 to-white-400 p-4 md:p-8  ">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Product Image */}
            <div className="w-full lg:w-1/2 bg-gray-50 p-4 md:p-8 relative">
              <div className="absolute top-4 left-4">
                <span className="bg-white px-3 py-1 rounded-full text-xs md:text-sm text-gray-600 font-medium">
                  {product.reference}
                </span>
              </div>
              
              <div className="flex items-center justify-center h-64 md:h-80 lg:h-96">
                <Image   src={`${process.env.NEXT_PUBLIC_API_URL}/${product.image}`} alt={product.nom} width={600} height={600} className="object-contain max-h-full max-w-full" />
              </div>
              
              {/* Image indicators */}
             <div className='border-4 border-red-600 flex justify-around items-center '>
               {product.varietes.map((item)=>(
                <div key={item.id}  className={`rounded-lg ring-2 ring-${item.couleur}-900 p-1`}>
                         <Image   src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image}`} alt={item.couleur} width={600} height={600} className="object-contain max-h-20 max-w-20 border-2 border-amber-300" />
                  {item.couleur}
                </div>
              ))}
             </div>
            </div>
            
            {/* Right side - Product Details */}
            <div className="w-full lg:w-1/2 bg-gray-800 text-white p-4 md:p-8">
              <div className="mb-2">
                <span className="text-yellow-400 text-xs md:text-sm font-medium uppercase tracking-wider">
                  {product.description}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-1"> { product.nom} </h1>
              <p className="text-gray-400 mb-4 italic text-sm md:text-base"> {product.genre} </p>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl md:text-4xl font-bold"> ${product.prix} </span>
                <div className="flex items-center space-x-1">
                  {renderStars()}
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex space-x-4 md:space-x-8 mb-6 border-b border-gray-700 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 text-xs md:text-sm font-medium whitespace-nowrap ${
                    activeTab === 'description' 
                      ? 'text-yellow-400 border-b-2 border-yellow-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  DESCRIPTION
                </button>
               
               
              </div>
              
              {/* Description */}
              <div className="mb-6 md:mb-8">
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
          
          {product.description} .{' '}
                  <span className="text-yellow-400 cursor-pointer hover:underline">read more</span>
                </p>
              </div>
             
              {/* Product Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
                
                
               
                
               
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
               {product.varietes.map((item)=>(
                <div key={item.id}>
                  
                  <h1> {item.couleur} </h1>
                </div>
              ))}
                
                <button className="w-full bg-yellow-400 text-black py-3 rounded-full font-bold hover:bg-yellow-500 transition-colors text-sm md:text-base"  onClick={handlclick} >
                  ADD TO CART
                </button>
              </div>
               {product.varietes.map((item)=>(
                <div key={item.id}>
                  {item.couleur}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}