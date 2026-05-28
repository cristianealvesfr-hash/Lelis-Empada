import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Award, Calculator } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  badgeBg: string;
  image: string;
  actionText?: string;
  icon?: React.ReactNode;
}

export const HeroSlider: React.FC<{ onOpenCalculator?: () => void }> = ({ onOpenCalculator }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Empadas Artesanais & Gourmet",
      subtitle: "Massa leve que derrete na boca. Produzidas sob encomenda com ingredientes selecionados.",
      badge: "MÍNIMO 24h DE ANTECEDÊNCIA",
      badgeBg: "bg-amber-500",
      image: "/sufle_oficial.jpeg",
      actionText: "Ver Cardápio",
      icon: <Clock size={16} />
    },
    {
      id: 2,
      title: "Caixa Festa Meio a Meio",
      subtitle: "Escolha até 2 sabores especiais na sua caixa de 30 unidades. Ideal para qualquer comemoração!",
      badge: "NOVIDADE",
      badgeBg: "bg-emerald-500",
      image: "/quibe_oficial.jpeg",
      actionText: "Montar Caixa",
      icon: <Award size={16} />
    },
    {
      id: 3,
      title: "Calculadora de Encomendas",
      subtitle: "Planejando um evento? Calcule na hora a quantidade exata de empadas para seus convidados.",
      badge: "FERRAMENTA ÚTIL",
      badgeBg: "bg-brand-purple",
      image: "/paozinho_real.jpg",
      actionText: "Calcular Agora",
      icon: <Calculator size={16} />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handleAction = (slideId: number) => {
    if (slideId === 3 && onOpenCalculator) {
      onOpenCalculator();
    } else {
      const el = document.getElementById('simples');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] overflow-hidden bg-brand-dark">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/70 to-transparent z-10" />
          
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
          />

          {/* Text Container */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] md:w-[60%] flex flex-col justify-center px-6 sm:px-12 md:px-16 z-20 text-white">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-white uppercase mb-3 w-fit ${slide.badgeBg}`}>
              {slide.icon}
              {slide.badge}
            </span>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2">
              {slide.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-200/90 leading-relaxed mb-6 font-medium line-clamp-2 sm:line-clamp-none">
              {slide.subtitle}
            </p>
            <button
              onClick={() => handleAction(slide.id)}
              className="bg-brand-purple hover:bg-brand-purpleLight active:scale-95 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg border border-brand-lilac/20 w-fit transition-all duration-200"
            >
              {slide.actionText}
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-black/60 p-2 rounded-full text-white z-20 transition-all hover:scale-105 active:scale-90"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-black/60 p-2 rounded-full text-white z-20 transition-all hover:scale-105 active:scale-90"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-6 bg-brand-lilac' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
