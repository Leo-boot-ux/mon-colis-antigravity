import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[#1B2A4A] text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2 font-bold text-2xl">
          <Package className="text-[#0D9488]" size={32} />
          <span>Mon Colis</span>
        </div>
        <div>
          <Link to="/login" className="bg-[#F97316] hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors">
            Se Connecter
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1B2A4A] mb-6">
          Livraison • Rapide • Fiable
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl">
          La plateforme de suivi de livraison de référence au Gabon. Suivez vos colis en temps réel, de l'expédition à la réception.
        </p>
        
        <Link to="/login" className="flex items-center gap-2 bg-[#0D9488] hover:bg-teal-700 text-white text-lg font-semibold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
          Commencer maintenant
          <ArrowRight size={20} />
        </Link>
      </main>
    </div>
  );
}
