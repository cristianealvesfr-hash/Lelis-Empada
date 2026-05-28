import React from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../data';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="group bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-gray-100 hover:border-brand-purple/20 -translate-y-0 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex gap-4"
    >
      {/* Details (Left side) */}
      <div className="flex-1 flex flex-col justify-between py-0.5">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-purple bg-brand-lilac px-2.5 py-0.5 rounded-full">
            {product.code}
          </span>
          <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight mt-1.5 group-hover:text-brand-purple transition-colors">
            {product.title}
          </h3>
          {product.description && (
            <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-extrabold text-brand-purple text-base">
              {product.priceNormal > 0 
                ? `R$ ${product.priceNormal.toFixed(2).replace('.', ',')}` 
                : product.priceFesta > 0 
                  ? `R$ ${product.priceFesta.toFixed(2).replace('.', ',')}`
                  : product.pricePequena 
                    ? `A partir de R$ ${product.pricePequena.toFixed(2).replace('.', ',')}` 
                    : product.priceMiniBaby 
                      ? `A partir de R$ ${product.priceMiniBaby.toFixed(2).replace('.', ',')}` 
                      : product.priceSufle20cm
                        ? `A partir de R$ ${product.priceSufle20cm.toFixed(2).replace('.', ',')}`
                        : 'R$ 0,00'
              }
            </span>
            {product.priceNormal > 0 && product.priceFesta > 0 && (
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                Festa: R$ {product.priceFesta.toFixed(2).replace('.', ',')}
              </span>
            )}
            {product.priceNormal === 0 && product.priceFesta > 0 && (
              <span className="text-[10px] text-brand-purpleLight font-bold bg-brand-lilac/30 px-2 py-0.5 rounded border border-brand-lilac/10">
                Tamanho Festa
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Image & Add Button (Right side) */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative overflow-hidden rounded-xl bg-gray-50 shadow-sm border border-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        
        {product.isAvailableNow && (
          <div className="absolute top-1 right-1 bg-brand-purple text-white text-[8px] uppercase font-extrabold px-1.5 py-0.5 rounded shadow-md border border-brand-lilac/30">
            Pronta Entrega
          </div>
        )}

        {/* Plus Button overlays bottom-right */}
        <div className="absolute bottom-1.5 right-1.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-gray-100 group-hover:bg-brand-purple group-hover:border-brand-purple transition-all duration-300 flex items-center gap-1">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-purple group-hover:text-white transition-colors">Adicionar</span>
          <Plus size={12} strokeWidth={3} className="text-brand-purple group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  );
};
