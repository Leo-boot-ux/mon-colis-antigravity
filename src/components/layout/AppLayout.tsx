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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
      {/* Mobile Header - Floating over map */}
      <div className="md:hidden absolute top-0 left-0 w-full z-[2000] bg-transparent p-4 flex justify-between items-center pointer-events-none">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-full pointer-events-auto">
          <Package className="text-[#0D9488]" />
          <span className="text-[#1B2A4A]">Mon Colis</span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white/90 backdrop-blur shadow-md p-2 rounded-full pointer-events-auto text-[#1B2A4A]"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar - Floating Drawer on all screens */}
      <div className={cn(
        "fixed inset-y-0 left-0 bg-[#1B2A4A] text-white w-64 flex flex-col z-[3000] shadow-2xl transition-transform duration-300",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex p-6 items-center justify-between font-bold text-2xl border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Package className="text-[#0D9488]" size={32} />
            <span>Mon Colis</span>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}><X /></button>
        </div>
        
        <div className="flex-1 p-4 flex flex-col gap-2">
          {/* Menu items would go here */}
          <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            Tableau de bord
          </Link>
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#0D9488] p-2 rounded-full">
              <User size={20} />
            </div>
            <div>
              <div className="font-medium text-sm">{user?.email || 'Utilisateur'}</div>
              <div className="text-xs text-gray-400 capitalize">{user?.role || 'client'}</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content (Map takes full screen) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="absolute top-4 right-4 z-[2000] hidden md:flex items-center pointer-events-none">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="mr-4 bg-white/90 backdrop-blur shadow-md p-3 rounded-full pointer-events-auto text-[#1B2A4A] hover:bg-gray-100 transition"
          >
            <Menu />
          </button>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-md gap-2 pointer-events-auto">
            <span>⚠️ Mode Démo</span>
          </div>
        </header>
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
}

