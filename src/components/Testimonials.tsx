import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Mariana Souza",
    text: "As empadas da Lelis são as melhores de Salvador, sem dúvida! A massa derrete na boca e os recheios são super bem servidos. Recomendo demais!",
    role: "Cliente desde 2022"
  },
  {
    name: "Carlos Ferreira",
    text: "Encomendei a Torta Salgada para o aniversário da minha esposa e foi o maior sucesso. Muito capricho e um sabor maravilhoso. Viramos clientes fiéis.",
    role: "Cliente fiel"
  },
  {
    name: "Juliana Andrade",
    text: "O Cheesecake Salgado me surpreendeu! Uma explosão de sabores, textura perfeita... Nota 10! Atendimento excelente pelo WhatsApp também.",
    role: "Amante de Salgados"
  },
  {
    name: "Fernanda Costa",
    text: "Os mini pastéis e pãezinhos delícia salvaram meu evento. Tudo chegou quentinho, muito bem embalado e delicioso. Muito obrigada equipe Lelis!",
    role: "Organizadora de Eventos"
  },
  {
    name: "Roberto Almeida",
    text: "Não tem como errar escolhendo a Lelis Empada Gourmet. A qualidade dos ingredientes é nítida. O bolo caseiro me lembrou muito a infância.",
    role: "Cliente satisfeito"
  }
];

export const Testimonials = () => {
  // Duplicate array to create a seamless infinite loop
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-brand-lilac/10 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl font-bold text-brand-dark mb-3">O que nossos clientes dizem</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          O carinho e a qualidade que colocamos em cada receita refletem no sorriso e na satisfação de quem prova as nossas delícias.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full flex overflow-hidden py-4">
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#faf8f9] to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee whitespace-nowrap gap-6 px-4 hover:pause">
          {duplicatedTestimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="w-[320px] sm:w-[380px] flex-shrink-0 bg-white rounded-2xl p-6 shadow-sm border border-brand-purple/10 whitespace-normal flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md duration-300"
            >
              <div className="flex gap-1 mb-4 text-[#F7B600]">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <p className="text-gray-600 italic mb-6 flex-1 leading-relaxed">
                "{item.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-bold text-brand-dark">{item.name}</span>
                  <span className="text-xs text-brand-purple font-medium">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
