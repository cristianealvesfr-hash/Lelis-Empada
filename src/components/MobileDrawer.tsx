import React, { useState } from 'react';
import { X, ChevronUp, ChevronDown, History, Truck, Info, Phone } from 'lucide-react';
import { CATEGORIES } from '../data';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: 'home' | 'history' | 'entrega' | 'condicoes';
  onNavigate: (view: 'home' | 'history' | 'entrega' | 'condicoes') => void;
  onSelectCategory: (categoryId: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ 
  isOpen, 
  onClose, 
  currentView,
  onNavigate,
  onSelectCategory 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  if (!isOpen) return null;

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 left-0 w-[85%] max-w-[320px] h-full bg-[#FCF8F8] z-50 shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div className="p-5 flex flex-col h-full">
          {/* Header */}
          <button 
            onClick={() => {
              onNavigate('home');
              onClose();
            }}
            className="flex items-center gap-2 text-[#6A3951] font-bold text-lg mb-8 hover:opacity-80 active:scale-95 transition-all w-max"
          >
            <X size={24} />
            <span>Início</span>
          </button>

          {/* Cardápio Section */}
          <div className="mb-6">
            <h2 className="text-[#6A3951] font-bold text-lg mb-4">Cardápio completo</h2>
            
            <div>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-between w-full text-left text-[#6A3951] font-bold text-base border-b border-[#6A3951]/20 pb-2 mb-3"
              >
                <span>Cardápio</span>
                {isMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {isMenuOpen && (
                <ul className="flex flex-col gap-1 pl-2">
                  {CATEGORIES.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryClick(category.id)}
                        className="w-full text-left text-[#7A4B62] hover:text-[#6A3951] py-2 px-2 hover:bg-[#6A3951]/5 rounded-md text-[15px] font-medium transition-colors"
                      >
                        {category.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-auto pt-6 border-t border-[#6A3951]/10 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('entrega');
                onClose();
              }}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${
                currentView === 'entrega' 
                  ? 'bg-[#6A3951] text-white font-bold' 
                  : 'text-[#6A3951] font-medium hover:bg-[#6A3951]/10'
              }`}
            >
              <Truck size={20} />
              <span className="text-lg">Entrega</span>
            </button>
            
            <button
              onClick={() => {
                onNavigate('condicoes');
                onClose();
              }}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${
                currentView === 'condicoes' 
                  ? 'bg-[#6A3951] text-white font-bold' 
                  : 'text-[#6A3951] font-medium hover:bg-[#6A3951]/10'
              }`}
            >
              <Info size={20} />
              <span className="text-lg">Condições</span>
            </button>
            
            <button
              onClick={() => {
                onNavigate('history');
                onClose();
              }}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${
                currentView === 'history' 
                  ? 'bg-[#6A3951] text-white font-bold' 
                  : 'text-[#6A3951] font-medium hover:bg-[#6A3951]/10'
              }`}
            >
              <History size={20} />
              <span className="text-lg">Nossa História</span>
            </button>
            
            <a
              href="https://wa.me/5571987265754"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-3 w-full p-3 rounded-xl transition-all text-[#6A3951] font-medium hover:bg-[#6A3951]/10"
            >
              <Phone size={20} />
              <span className="text-lg">Contato</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
