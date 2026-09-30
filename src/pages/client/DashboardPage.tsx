import React, { useState } from 'react';
import { Package, MapPin, Navigation, Clock, Search } from 'lucide-react';
import Map from '@/components/common/Map';
import BottomSheet from '@/components/ui/BottomSheet';
import { Marker, Popup } from 'react-leaflet';

export default function DashboardPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'commander' | 'suivre'>('commander');

  // Coordinates for Libreville, Gabon (simulated user location and drivers)
  const userLocation: [number, number] = [0.3901, 9.4544];
  const driver1: [number, number] = [0.3950, 9.4600];
  const driver2: [number, number] = [0.3850, 9.4450];

  return (
    <div className="w-full h-full relative">
      {/* Map Background */}
      <Map center={userLocation} zoom={14} className="w-full h-full z-0">
        <Marker position={userLocation}>
          <Popup>Votre position</Popup>
        </Marker>
        {/* Simulate drivers nearby like Yango/Gozem */}
        <Marker position={driver1} />
        <Marker position={driver2} />
      </Map>

      {/* Floating Center Marker for Map (simulate "Set pickup location") */}
      {activeTab === 'commander' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none">
          <div className="bg-[#1B2A4A] text-white p-3 rounded-full shadow-lg">
            <Package size={24} className="text-[#0D9488]" />
          </div>
          <div className="w-1 h-8 bg-[#1B2A4A] mx-auto"></div>
          <div className="w-2 h-2 bg-black rounded-full mx-auto -mt-1 shadow-md"></div>
        </div>
      )}

      {/* Bottom Sheet containing Super-App UX */}
      <BottomSheet isOpen={isSheetOpen}>
        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          <button 
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'commander' ? 'bg-white shadow text-[#1B2A4A]' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab('commander')}
          >
            Commander
          </button>
          <button 
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'suivre' ? 'bg-white shadow text-[#1B2A4A]' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab('suivre')}
          >
            Suivre un colis
          </button>
        </div>

        {activeTab === 'commander' ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-[#1B2A4A]">Où faire livrer ?</h2>
            
            <div className="relative">
              <div className="absolute top-3 left-3 flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-[#0D9488] mb-1"></div>
                <div className="w-0.5 h-6 bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-[#F97316] mt-1"></div>
              </div>
              
              <div className="pl-8 space-y-3">
                <div className="bg-gray-100 rounded-xl p-3 flex items-center">
                  <span className="text-gray-500 text-sm font-medium w-full">Point de départ (Votre position)</span>
                </div>
                <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-3 flex items-center gap-2 cursor-text hover:bg-gray-100 transition">
                  <Search size={18} className="text-gray-400" />
                  <input type="text" placeholder="Entrez la destination..." className="bg-transparent outline-none w-full text-sm font-medium" />
                </div>
              </div>
            </div>

            <button className="w-full bg-[#1B2A4A] hover:bg-[#2A4070] text-white font-bold py-4 rounded-xl mt-4 shadow-lg transition-transform hover:scale-[1.02] flex justify-center items-center gap-2">
              <Navigation size={20} className="text-[#0D9488]" />
              Commander un coursier
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-[#1B2A4A]">Vos commandes actives</h2>
            
            {/* Example Order Card */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 flex gap-4 items-center">
              <div className="bg-[#0D9488]/10 p-3 rounded-full">
                <Package className="text-[#0D9488]" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#1B2A4A]">COLIS-A8F9</h4>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={14} /> En route (15 min)
                </p>
              </div>
              <div className="text-right">
                <span className="bg-[#F97316]/10 text-[#F97316] px-3 py-1 rounded-full text-xs font-bold uppercase">
                  Livraison
                </span>
              </div>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
