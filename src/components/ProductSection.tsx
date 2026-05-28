import React from 'react';
import type { Product } from '../data';
import { ProductCard } from './ProductCard';

interface ProductSectionProps {
  id: string;
  title: string;
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ id, title, products, onProductClick }) => {
  if (products.length === 0) return null;
  
  return (
    <section id={id} className="pt-8 pb-4 scroll-mt-[130px] sm:scroll-mt-[150px]">
      <div className="flex items-center gap-3 mb-5 px-4">
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl font-extrabold text-brand-dark tracking-tight">{title}</h2>
          {id === 'pasteis' && (
            <span className="text-[10px] sm:text-xs text-orange-600 font-bold mt-0.5 bg-orange-50 px-2 py-0.5 rounded border border-orange-100/50 self-start">
              ⚠️ Mínimo 30 unidades, 15 de cada sabor
            </span>
          )}
          {id === 'hamburguer' && (
            <div className="flex flex-col gap-1.5 mt-1 bg-amber-50/80 border border-amber-100 p-2.5 rounded-xl max-w-xl self-start">
              <span className="text-[10px] sm:text-[11px] text-amber-900 font-extrabold leading-normal">
                🍔 Pão artesanal - blend de carne bovina com complementos / decorados com uva roxa nos espetinhos
              </span>
              <span className="text-[9px] sm:text-[10px] text-amber-700 font-bold leading-none">
                Mínimo 30 unidades • Pode escolher até 2 sabores (15 de cada)
              </span>
            </div>
          )}
        </div>
        <div className="h-0.5 bg-brand-lilac flex-1 rounded-full opacity-60"></div>
        <span className="text-xs font-semibold text-brand-purple bg-brand-lilac/50 px-2.5 py-1 rounded-full flex-shrink-0">
          {products.length} {products.length === 1 ? 'sabor' : 'sabores'}
        </span>
      </div>
      
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={onProductClick} 
            
          />
        ))}
      </div>
    </section>
  );
};
