import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DemoBanner: React.FC = () => (
  <div className="bg-yellow-400 text-yellow-900 text-center py-1.5 px-4 text-sm font-medium flex items-center justify-center gap-2 relative z-50">
    <AlertTriangle className="h-4 w-4" />
    <span>Mode Démonstration — Les données affichées sont fictives</span>
  </div>
);
