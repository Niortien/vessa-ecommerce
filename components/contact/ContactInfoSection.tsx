import React from 'react';
import { Phone, Mail } from 'lucide-react';

export default function ContactInfoSection() {
  return (
    <div className="bg-gray-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Section Informations */}
          <div className="space-y-8">
            {/* En-tête */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">
                We&apos;re here to help! Whether you have a question about our products, an order, or 
                just want to connect, we&apos;d love to hear from you.
              </p>
            </div>

            {/* Informations de contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Général */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">General Contact</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Contact us for any support or general inquiries.
                </p>
                
                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex-shrink-0">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">+1 (239) 555-0108</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Get in touch with us through email for quick support.
                </p>
                
                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex-shrink-0">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">info@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
              {/* Image de fond avec overlay */}
              <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 relative">
                {/* Simulation d'une image de couturière */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {/* Bibliothèque en arrière-plan */}
                    <div className="absolute top-4 left-4 right-4 h-16 bg-white/20 rounded-lg backdrop-blur-sm"></div>
                    <div className="absolute top-6 left-6 right-6 h-12 bg-white/30 rounded backdrop-blur-sm"></div>
                    
                    {/* Personne travaillant */}
                    <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Éléments de couture */}
                    <div className="absolute bottom-8 left-8 w-4 h-4 bg-green-400 rounded-full"></div>
                    <div className="absolute bottom-12 left-12 w-6 h-6 bg-purple-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-6 right-8 w-5 h-5 bg-pink-400 rounded-full"></div>
                    <div className="absolute bottom-16 right-12 w-3 h-3 bg-blue-400 rounded-full"></div>
                    
                    {/* Table de travail */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-300/50 to-transparent"></div>
                    
                    {/* Ruban à mesurer */}
                    <div className="absolute top-1/2 left-1/4 w-24 h-2 bg-yellow-400 rounded-full transform -rotate-12 opacity-70"></div>
                  </div>
                </div>
                
                {/* Overlay pour améliorer le contraste */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}