import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';

interface PartyCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartyCalculator: React.FC<PartyCalculatorProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState<number | ''>('');

  if (!isOpen) return null;

  const calculateEmpadas = () => {
    if (!guests || guests <= 0) return 0;
    // Suggestion: 5 to 6 units per person
    return {
      min: guests * 4,
      max: guests * 6,
      boxes: Math.ceil((guests * 5) / 30) // average 5, divided by box of 30
    };
  };

  const result = calculateEmpadas();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={onClose} />
      
      <div className="bg-white w-full max-w-sm rounded-3xl relative z-10 p-6 shadow-2xl animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-brand-lilac text-brand-purple p-3 rounded-2xl">
            <Calculator size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 leading-tight">Calculadora<br/>de Festas</h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Número de convidados:</label>
          <input 
            type="number" 
            value={guests}
            onChange={(e) => setGuests(e.target.value ? parseInt(e.target.value) : '')}
            className="w-full text-center text-3xl font-bold text-brand-purple border-2 border-brand-lilac rounded-xl py-4 focus:outline-none focus:border-brand-purple"
            placeholder="Ex: 20"
          />
        </div>

        {result ? (
          <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100">
            <p className="text-gray-500 text-sm mb-1">Você vai precisar de aprox.</p>
            <div className="text-2xl font-bold text-gray-800 mb-3">
              {result.min} a {result.max} empadas
            </div>
            <div className="bg-white border border-brand-lilac text-brand-purple py-2 px-4 rounded-xl text-sm font-semibold inline-block shadow-sm">
              Sugerimos {result.boxes} Caixas Festa (30 un)
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm h-[132px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
            Digite o número de convidados para ver a sugestão.
          </p>
        )}

        <button 
          onClick={onClose}
          className="w-full bg-brand-purple text-white py-3 rounded-xl font-bold mt-6 hover:bg-brand-dark transition-colors"
        >
          Entendi
        </button>
      </div>
    </div>
  );
};
