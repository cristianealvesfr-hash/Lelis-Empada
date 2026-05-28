import React, { useRef, useState, MouseEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VISUAL_CATEGORIES = [
  { id: 'simples', label: 'Empadas Simples', img: '/empadas_real.jpg' },
  { id: 'especiais', label: 'Empadas Especiais', img: '/empadas_real.jpg' },
  { id: 'paozinho', label: 'Pãozinho Delícia', img: '/paozinho_real.jpg' },
  { id: 'pasteis', label: 'Mini Pastéis', img: '/pasteis_real.jpg' },
  { id: 'hamburguer', label: 'Mini Hambúrguer', img: '/hamburguer_real.jpg' },
  { id: 'barca', label: 'Barca Gourmet', img: '/barca.jpg' },
  { id: 'quiche', label: 'Quiches', img: '/quiche.jpg' },
  { id: 'torta-maca', label: 'Torta de Maçã', img: '/torta_maca_oficial.jpeg' },
  { id: 'sanduiche', label: 'Mini Sanduíches', img: '/mini_sanduiche_oficial.jpeg' },
  { id: 'quibe', label: 'Quibe Recheado', img: '/quibe_oficial.jpeg' },
  { id: 'sufle', label: 'Suflês Salgados', img: '/sufle_oficial.jpeg' },
  { id: 'camarao', label: 'Camarão Encapotado', img: '/camarao_oficial.jpeg' },
  { id: 'rocambole', label: 'Rocamboles', img: '/rocambole_oficial.jpeg' },
  { id: 'pao-saboroso', label: 'Pão Saboroso', img: '/pao_saboroso_oficial.jpeg' },
  { id: 'torta-alta', label: 'Mini Torta Alta', img: '/mini_torta_alta_oficial.jpeg' },
  { id: 'torta-baby', label: 'Mini Torta Baby', img: '/mini_torta_baby.jpeg' },
  { id: 'dadinho', label: 'Dadinho de Tapioca', img: '/dadinho_de_tapioca.jpeg' },
  { id: 'bolo-caseiro', label: 'Bolos Caseiros', img: '/bolo_caseiro_oficial.jpeg' },
  { id: 'torta-salgada', label: 'Tortas Salgadas', img: '/torta_salgada_oficial.jpeg' },
  { id: 'cheesecake', label: 'Cheesecakes', img: '/cheesecake_salgado_oficial.jpeg' },
  { id: 'torta-vienense', label: 'Torta Vienense', img: '/torta_vienense_oficial.jpeg' },
  { id: 'taca-gourmet', label: 'Taças Gourmet', img: '/taca_gourmet_oficial.jpeg' },
  { id: 'terrine', label: 'Terrine Doce & Salgado', img: '/terrine_doce_e_salgado.jpeg' },
];

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory, onSelectCategory }) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 5) {
      setDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClick = (id: string) => {
    if (!dragged) {
      onSelectCategory(id);
    }
  };

  const handleArrowScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const targetScroll = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white py-4 sticky top-16 z-30 shadow-sm border-b border-gray-100">
      <div className="container mx-auto relative group/nav">
        
        {/* Helper gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>

        {/* Left Arrow */}
        <button 
          onClick={() => handleArrowScroll('left')}
          className="absolute left-2 top-[35%] -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors shadow-sm"
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button 
          onClick={() => handleArrowScroll('right')}
          className="absolute right-2 top-[35%] -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors shadow-sm"
          aria-label="Rolar para a direita"
        >
          <ChevronRight size={20} />
        </button>

        <ul 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex items-start gap-4 overflow-x-auto no-scrollbar px-4 snap-x justify-start select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {VISUAL_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <li 
                key={cat.id} 
                className="flex flex-col items-center gap-2 flex-shrink-0 snap-start group" 
                onClick={() => handleClick(cat.id)}
              >
                <div 
                  className={`w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden shadow-sm border-2 transition-all duration-300 pointer-events-none ${
                    isActive 
                      ? 'border-brand-purple scale-105 shadow-md ring-4 ring-brand-lilac/30' 
                      : 'border-gray-100 group-hover:border-brand-purple/40'
                  }`}
                >
                  <img 
                    src={cat.img} 
                    alt={cat.label} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none" 
                    draggable="false"
                  />
                </div>
                <span 
                  className={`text-[10px] sm:text-xs font-semibold tracking-tight transition-colors duration-200 text-center max-w-[80px] leading-tight pointer-events-none ${
                    isActive ? 'text-brand-purple font-bold' : 'text-gray-600 group-hover:text-brand-purple'
                  }`}
                >
                  {cat.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
