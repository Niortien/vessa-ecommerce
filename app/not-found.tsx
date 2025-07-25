"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';



export default function NotFound() {
   
    
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Lignes décoratives d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="lines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,50 Q25,30 50,50 T100,50" stroke="#e5e7eb" strokeWidth="2" fill="none" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lines)"/>
          
          {/* Lignes fluides supplémentaires */}
          <path d="M0,100 Q200,50 400,100 T800,100 L1000,100 L1000,150 Q800,200 600,150 T200,150 L0,150 Z" 
                fill="none" stroke="#e5e7eb" strokeWidth="2" opacity="0.3"/>
          <path d="M0,200 Q300,150 600,200 T1000,200 L1000,250 Q700,300 400,250 T0,250 Z" 
                fill="none" stroke="#e5e7eb" strokeWidth="2" opacity="0.3"/>
          <path d="M0,400 Q250,350 500,400 T1000,400 L1000,450 Q750,500 500,450 T0,450 Z" 
                fill="none" stroke="#e5e7eb" strokeWidth="2" opacity="0.3"/>
          <path d="M0,600 Q200,550 400,600 T800,600 L1000,600 L1000,650 Q800,700 600,650 T200,650 L0,650 Z" 
                fill="none" stroke="#e5e7eb" strokeWidth="2" opacity="0.3"/>
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-md w-full">
        {/* Conteneur principal 404 */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            {/* Premier "4" */}
            <div className="text-6xl sm:text-8xl md:text-9xl font-bold text-indigo-600">
              4
            </div>
            
            {/* Loupe au centre */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-blue-400 bg-blue-50 flex items-center justify-center relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/80"></div>
              </div>
              {/* Manche de la loupe */}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500 rounded-full transform rotate-45 origin-top-left">
                <div className="w-2 h-6 sm:w-3 sm:h-8 bg-indigo-600 rounded-full mx-auto"></div>
              </div>
            </div>
            
            {/* Deuxième "4" */}
            <div className="text-6xl sm:text-8xl md:text-9xl font-bold text-indigo-600">
              4
            </div>
          </div>
        </div>

        {/* Texte "PAGE NOT FOUND" */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-600 mb-8 tracking-wide">
          PAGE NOT FOUND
        </h1>

        {/* Bouton de retour (optionnel) */}
        <Button
          onClick={() => window.history.back()
            
          }
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Link href="/" className="flex items-center justify-center space-x-2">
          Retour à l&apos;accueil
          </Link>
        </Button>
      </div>

      {/* Credit en bas */}
      <div className="absolute bottom-4 text-xs text-gray-400">
        <a href="https://freepik.com" className="hover:text-indigo-600 transition-colors duration-200">
          designed by freepik.com
        </a>
      </div>
    </div>
  );
}