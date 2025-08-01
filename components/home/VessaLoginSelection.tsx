"use client"
import React, { useState } from 'react';
import { User, ArrowRight, ShoppingBag, Store, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const VessaLoginSelection = () => {
  const [selectedOption, setSelectedOption] = useState(null);
const router=useRouter()
  const handleSelection = (type) => {
    setSelectedOption(type);
    
    // Simulation de la redirection après une courte animation
    setTimeout(() => {
      if (type === 'admin') {
        // Redirection vers l'administration Vessa
        console.log('Redirection vers /admin/login');
        router.push('/admin/connexion');
      } else if (type === 'client') {
        console.log('Redirection vers /client/login');
         router.push('/login');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header avec branding Vessa */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-6 shadow-lg">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Bienvenue sur <span className="text-emerald-600">Vessa</span>
          </h1>
          <p className="text-lg text-emerald-600 font-medium mb-4">
            Votre plateforme e-commerce de confiance
          </p>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez votre type de compte pour accéder à votre espace personnalisé et découvrir toutes nos fonctionnalités.
          </p>
        </div>

        {/* Options de connexion */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Option Administrateur */}
          <div 
            onClick={() => handleSelection('admin')}
            className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 overflow-hidden transform hover:-translate-y-2 ${
              selectedOption === 'admin' ? 'border-purple-500 shadow-2xl scale-105' : 'border-transparent hover:border-purple-200'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
            
            <div className="relative p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Crown className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Administrateur Vessa
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Gérez votre boutique en ligne, suivez les commandes, 
                administrez les produits et supervisez toute l&apos;activité e-commerce.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-500">
                  <Store className="w-4 h-4 text-purple-500 mr-3" />
                  Gestion complète de la boutique
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <ShoppingBag className="w-4 h-4 text-purple-500 mr-3" />
                  Suivi des commandes et stock
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 text-purple-500 mr-3" />
                  Administration des clients
                </div>
              </div>
              
              <div className="flex items-center justify-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors duration-300">
                Accéder au back-office
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
            
            {/* Badge Admin */}
            <div className="absolute top-4 right-4 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
              ADMIN
            </div>
          </div>

          {/* Option Client */}
          <div 
            onClick={() => handleSelection('client')}
            className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 overflow-hidden transform hover:-translate-y-2 ${
              selectedOption === 'client' ? 'border-emerald-500 shadow-2xl scale-105' : 'border-transparent hover:border-emerald-200'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-300"></div>
            
            <div className="relative p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Client Vessa
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Découvrez nos produits, passez vos commandes, 
                suivez vos livraisons et profitez d&apos;une expérience shopping unique.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-500">
                  <ShoppingBag className="w-4 h-4 text-emerald-500 mr-3" />
                  Catalogue de produits exclusifs
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 text-emerald-500 mr-3" />
                  Profil et historique personnel
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <ArrowRight className="w-4 h-4 text-emerald-500 mr-3" />
                  Suivi de commandes en temps réel
                </div>
              </div>
              
              <div className="flex items-center justify-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
                Commencer mes achats
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
            
            {/* Badge Client */}
            <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
              CLIENT
            </div>
          </div>
        </div>

        {/* Footer Vessa */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-gray-600 font-medium">Vessa E-commerce</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          </div>
          <p className="text-gray-500">
            Première fois sur Vessa ? <span className="text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium">Créer un compte</span> | 
            <span className="text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium ml-2">Aide & Support</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VessaLoginSelection;