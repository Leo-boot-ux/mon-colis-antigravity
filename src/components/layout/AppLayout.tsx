import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Package, LogOut, Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#1B2A4A] text-white p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Package className="text-teal-500" />
          <span>Mon Colis</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "bg-[#1B2A4A] text-white w-full md:w-64 md:flex flex-col flex-shrink-0 transition-all absolute md:static z-10 h-screen md:h-auto",
        isMobileMenuOpen ? "flex" : "hidden"
      )}>
        <div className="hidden md:flex p-6 items-center gap-2 font-bold text-2xl border-b border-gray-700">
          <Package className="text-teal-500" size={32} />
          <span>Mon Colis</span>
        </div>
        
        <div className="flex-1 p-4 flex flex-col gap-2">
          {/* Menu items would go here */}
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-500 p-2 rounded-full">
              <User size={20} />
            </div>
            <div>
              <div className="font-medium text-sm">{user ? ` ` : 'Utilisateur'}</div>
              <div className="text-xs text-gray-400 capitalize">{user?.role || 'RÃ´le'}</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
          >
            <LogOut size={18} />
            <span>DÃ©connexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm p-4 hidden md:flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[#1B2A4A]">Tableau de bord</h1>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
            <span>âš ï¸ Mode DÃ©monstration â€” Les donnÃ©es affichÃ©es sont fictives</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-[#F3F4F6]">
          {children}
        </main>
      </div>
    </div>
  );
}

