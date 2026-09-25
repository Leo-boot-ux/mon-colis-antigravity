import React from 'react';
import { Package } from 'lucide-react';

export default function DriverDashboardPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold text-[#1B2A4A] flex items-center gap-2 mb-4">
        <Package className="text-[#0D9488]" />
        Bienvenue Livreur
      </h1>
      <p className="text-gray-600">
        Ceci est votre tableau de bord de livraison.
      </p>
    </div>
  );
}
