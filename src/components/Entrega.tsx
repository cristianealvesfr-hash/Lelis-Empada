import React from 'react';
import { SharedFooter } from './SharedFooter';

export const Entrega = () => {
  return (
    <div className="bg-[#FCF9F9] min-h-screen pt-16 pb-24 lg:pt-24 animate-fade-in flex flex-col items-center">
      <div className="w-full max-w-2xl px-4">
        {/* Banner de Entrega */}
        <div className="w-full overflow-hidden rounded-2xl shadow-md mb-8">
          <img 
            src="/entrega.jpeg" 
            alt="Delivery Lelis Empada Gourmet" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      
      <SharedFooter showPayments={false} />
    </div>
  );
};
