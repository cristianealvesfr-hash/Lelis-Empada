import React, { useState } from 'react';
import { Trash2, ShoppingBag, CreditCard, Sparkles, MessageCircle } from 'lucide-react';
import type { CartItem } from './BottomSheet';
import { PRODUCTS } from '../data';
import type { Product } from '../data';

interface SideCartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: (paymentMethod: string) => void;
  onAddUpsell: (product: Product) => void;
}

export const SideCart: React.FC<SideCartProps> = ({ items, onRemoveItem, onCheckout, onAddUpsell }) => {
  const [paymentMethod, setPaymentMethod] = useState('Pix');
  
  const total = items.reduce((acc, item) => acc + item.totalPrice, 0);
  
  // Upsell Logic (If they don't have a sweet/dessert, suggest it)
  const hasDessert = items.some(item => ['u01', 'u02', 's01', 's04', 's05', 's06'].includes(item.baseProduct.id));
  const upsellProduct = PRODUCTS.find(p => p.id === 'u01'); // Bolo Caseiro de Carimã/Aipim

  const handleAddUpsellClick = () => {
    if (upsellProduct) {
      onAddUpsell(upsellProduct);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sticky top-28 max-h-[82vh] flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-base font-extrabold text-brand-dark flex items-center gap-2">
          <ShoppingBag size={18} className="text-brand-purple" />
          Seu Carrinho
        </h2>
        <span className="text-xs font-bold bg-brand-lilac text-brand-purple px-2 py-0.5 rounded-full">
          {items.length} {items.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 no-scrollbar space-y-3">
        {items.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center text-gray-400">
            <div className="w-16 h-16 rounded-full bg-brand-lilac/30 flex items-center justify-center text-brand-purple mb-4">
              <ShoppingBag size={28} />
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">Carrinho vazio</h3>
            <p className="text-xs text-gray-500 max-w-[200px]">Adicione empadas saborosas do cardápio para começar.</p>
          </div>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} className="bg-gray-50/70 p-3 rounded-xl border border-gray-100/50 flex gap-2 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                      {item.quantity}x {item.baseProduct.title}
                      {item.secondHalfProduct && ` & ${item.secondHalfProduct.title}`}
                    </h4>
                    {item.barcaSelections && (
                      <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                        <div className="truncate text-brand-purple">Sabor 1: {item.barcaSelections.flavor1.title}</div>
                        <div className="truncate text-brand-purple">Sabor 2: {item.barcaSelections.flavor2.title}</div>
                        <div className="truncate text-brand-purple">Sabor 3: {item.barcaSelections.flavor3.title}</div>
                      </div>
                    )}
                    <button 
                      onClick={() => onRemoveItem(item.id)} 
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded transition-colors ml-1 flex-shrink-0"
                      title="Remover item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="text-[10px] font-semibold text-brand-purpleLight mt-0.5">
                    Tamanho {item.size === 'festa' ? 'Festa (Caixa c/ 30)' : item.size === 'festa-integral' ? 'Pão Integral (Caixa c/ 30)' : item.size === 'pequena' ? 'Pequeno' : item.size === 'media' ? 'Médio (23cm)' : item.size === 'grande' ? 'Grande (30cm)' : item.size === 'torta20cm' ? 'Torta (20cm)' : item.size === 'minibaby' ? 'Mini Baby (8x4)' : item.size === 'sufle20cm' ? 'Suflê (20cm)' : item.size === 'sufle30cm' ? 'Suflê (30cm)' : 'Normal'}
                  </div>
                  {item.observation && (
                    <p className="text-[10px] text-gray-500 mt-1 italic leading-tight truncate">
                      Obs: {item.observation}
                    </p>
                  )}
                  <div className="font-extrabold text-brand-purple mt-1.5 text-xs">
                    R$ {item.totalPrice.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </div>
            ))}

            {/* Upsell Suggesion */}
            {!hasDessert && upsellProduct && (
              <div className="bg-brand-lilac/20 border border-brand-purple/10 rounded-xl p-3.5 mt-4 transition-all duration-300">
                <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-brand-purple mb-2 uppercase tracking-wide">
                  <Sparkles size={12} className="text-amber-500 fill-current animate-pulse" />
                  <span>Que tal uma sobremesa?</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <img src={upsellProduct.imageUrl} alt="Bolo Caseiro" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-gray-800 truncate">{upsellProduct.title}</h5>
                    <p className="text-[10px] text-brand-purple font-semibold">R$ {upsellProduct.priceNormal.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <button 
                    onClick={handleAddUpsellClick}
                    className="bg-brand-purple hover:bg-brand-dark text-white text-[10px] font-bold px-3 py-1.5 rounded-full transition-colors flex-shrink-0"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                <CreditCard size={12} className="text-brand-purple" />
                Forma de Pagamento
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['Pix', 'Dinheiro', 'Cartão Crédito', 'Cartão Débito'].map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all duration-200 ${
                      paymentMethod === method 
                        ? 'border-brand-purple bg-brand-lilac text-brand-purple' 
                        : 'border-gray-150 bg-white text-gray-600 hover:border-brand-purple/20'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Checkout Section */}
      {items.length > 0 && (
        <div className="border-t border-gray-100 pt-4 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase">Subtotal</span>
            <span className="text-lg font-extrabold text-brand-dark">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <button 
            onClick={() => onCheckout(paymentMethod)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-[0.98]"
          >
            <MessageCircle size={18} />
            Finalizar Encomenda
          </button>
          <span className="block text-[10px] text-center text-gray-400 mt-2">
            Ao finalizar, você será redirecionado para o WhatsApp.
          </span>
        </div>
      )}
    </div>
  );
};
