import React from 'react';
import { Search, MapPin, ChevronDown, Bell, Clock } from 'lucide-react';

interface HeaderProps {
  onSearchChange?: (val: string) => void;
  searchValue?: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange, searchValue = "" }) => {
  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm transition-all duration-300">
      {/* Top Banner Alert */}
      <div className="bg-brand-purple text-white text-[11px] sm:text-xs py-2 px-4 flex items-center justify-center gap-2 font-medium tracking-wide shadow-inner">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <Clock size={14} className="text-brand-lilac" />
        <span>Trabalhamos sob Encomenda (Mínimo 24h) | Consulte Pronta Entrega</span>
      </div>

      <div className="container mx-auto px-4 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5">
          {/* Logo & Delivery Info */}
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-brand-purple overflow-hidden shadow-md flex items-center justify-center p-0.5 bg-white hover:scale-105 transition-transform duration-200">
                <img 
                  src="/logo.jpg" 
                  alt="Lelis Empada Gourmet" 
                  className="w-full h-full object-contain rounded-full" 
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-xl font-bold text-brand-purple">L</span>'; 
                  }}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-extrabold text-brand-dark leading-tight flex items-center gap-1.5">
                  Lelis Empada Gourmet
                </h1>
                <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold cursor-pointer hover:text-brand-purple transition-colors mt-0.5">
                  <MapPin size={12} className="text-brand-purple" />
                  <span>Brotas, Salvador - BA</span>
                  <ChevronDown size={12} className="text-brand-purple" />
                </div>
              </div>
            </div>

            {/* Notification Bell (Mobile only) */}
            <div className="sm:hidden flex items-center">
              <button className="relative p-2 text-gray-500 hover:text-brand-purple transition-colors" aria-label="Notificações">
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </div>
          
          {/* Search bar & Actions */}
          <div className="flex items-center gap-3 flex-1 max-w-xl w-full sm:ml-auto">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search size={18} className="text-brand-purple opacity-70" />
              </div>
              <input 
                type="text" 
                placeholder="Buscar sabor de empada ou doce..." 
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full bg-gray-100 text-gray-800 rounded-full py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple focus:bg-white transition-all shadow-inner border border-transparent focus:border-gray-200"
              />
            </div>

            {/* Bell Icon (Desktop only) */}
            <button className="hidden sm:inline-flex relative p-2.5 text-gray-500 hover:text-brand-purple hover:bg-gray-550 rounded-full transition-colors" aria-label="Notificações">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border border-white"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
