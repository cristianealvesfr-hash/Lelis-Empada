import React, { useState } from 'react';
import { X, Trash2, PartyPopper } from 'lucide-react';
import type { CartItem } from './BottomSheet';
import { PRODUCTS } from '../data';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: (paymentMethod: string) => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items, onRemoveItem, onCheckout }) => {
  const [paymentMethod, setPaymentMethod] = useState('Pix');
  
  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.totalPrice, 0);
  
  // Upsell Logic (If they don't have a sweet/dessert, suggest it)
  const hasDessert = items.some(item => ['u01', 'u02', 's01', 's04', 's05', 's06'].includes(item.baseProduct.id));
  const upsellProduct = PRODUCTS.find(p => p.id === 'u01'); // Bolo Caseiro

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={onClose} />
      
      <div className="bg-gray-50 w-full sm:w-[400px] h-[90vh] sm:h-[80vh] rounded-t-3xl sm:rounded-3xl relative z-10 flex flex-col shadow-2xl overflow-hidden animate-slideUp sm:animate-fadeIn">
        <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">Seu Pedido</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 pb-32">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <PartyPopper size={48} className="mb-4 text-brand-lilac" />
              <p>Seu carrinho está vazio.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {item.quantity}x {item.baseProduct.title}
                        {item.secondHalfProduct && ` & ${item.secondHalfProduct.title}`}
                      </h4>
                      {item.barcaSelections && (
                        <div className="text-xs text-gray-500 mt-1 leading-tight w-full">
                          <div className="truncate text-brand-purple">Sabor 1: {item.barcaSelections.flavor1.title}</div>
                          <div className="truncate text-brand-purple">Sabor 2: {item.barcaSelections.flavor2.title}</div>
                          <div className="truncate text-brand-purple">Sabor 3: {item.barcaSelections.flavor3.title}</div>
                        </div>
                      )}
                      <button onClick={() => onRemoveItem(item.id)} className="text-red-400 hover:text-red-600 p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="text-xs text-brand-purpleLight mt-1">
                      Tamanho {item.size === 'festa' ? 'Festa (Caixa c/ 30)' : item.size === 'festa-integral' ? 'Pão Integral (Caixa c/ 30)' : item.size === 'pequena' ? 'Pequeno' : item.size === 'media' ? 'Médio (23cm)' : item.size === 'grande' ? 'Grande (30cm)' : item.size === 'torta20cm' ? 'Torta (20cm)' : item.size === 'minibaby' ? 'Mini Baby (8x4)' : item.size === 'sufle20cm' ? 'Suflê (20cm)' : item.size === 'sufle30cm' ? 'Suflê (30cm)' : 'Normal'}
                    </div>
                    {item.observation && (
                      <p className="text-xs text-gray-500 mt-1 italic">Obs: {item.observation}</p>
                    )}
                    <div className="font-bold text-brand-purple mt-2 text-sm">
                      R$ {item.totalPrice.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell */}
              {!hasDessert && upsellProduct && (
                <div className="mt-8 bg-brand-lilac/30 border border-brand-lilac rounded-xl p-4">
                  <h4 className="text-sm font-bold text-brand-purple mb-2 flex items-center gap-2">
                    <span className="bg-brand-purple text-white text-[10px] px-2 py-0.5 rounded uppercase">Falta Pouco</span>
                    Que tal adicionar?
                  </h4>
                  <div className="flex items-center gap-3">
                    <img src={upsellProduct.imageUrl} alt="Upsell" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{upsellProduct.title}</div>
                      <div className="text-xs text-gray-600">Por R$ {upsellProduct.priceNormal.toFixed(2).replace('.', ',')}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pagamento */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-800 mb-3">Forma de Pagamento</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Pix', 'Dinheiro', 'Cartão Crédito', 'Cartão Débito'].map(method => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        paymentMethod === method 
                        ? 'border-brand-purple bg-brand-lilac/20 text-brand-purple' 
                        : 'border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-5 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Total do Pedido</span>
              <span className="text-xl font-bold text-brand-dark">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <button 
              onClick={() => onCheckout(paymentMethod)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              Finalizar no WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
