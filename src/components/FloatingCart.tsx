import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface FloatingCartProps {
  itemCount: number;
  totalPrice: number;
  onClick: () => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({ itemCount, totalPrice, onClick }) => {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40">
      <button 
        onClick={onClick}
        className="w-full bg-brand-purple text-white shadow-[0_8px_30px_rgb(88,57,83,0.3)] rounded-2xl p-4 flex items-center justify-between transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-brand-lilac text-brand-purple text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          </div>
          <span className="font-medium text-sm">Ver Carrinho</span>
        </div>
        
        <div className="font-bold">
          R$ {totalPrice.toFixed(2).replace('.', ',')}
        </div>
      </button>
    </div>
  );
};
