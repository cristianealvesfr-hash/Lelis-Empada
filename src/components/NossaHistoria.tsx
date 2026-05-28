import React from 'react';
import { Heart } from 'lucide-react';

export const NossaHistoria = () => {
  return (
    <div className="bg-[#FEF9F6] min-h-screen pt-4 pb-24 lg:pt-8 animate-fade-in">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Aesthetic Header */}
        <div className="text-center mb-8 pt-4">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl text-[#D89379] font-serif italic mb-2" style={{ fontFamily: "'Clicker Script', 'Great Vibes', cursive" }}>
              bem vindo
            </h1>
            <Heart className="absolute -top-4 left-1/2 -translate-x-1/2 text-[#D89379]" fill="currentColor" size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-[#542943] tracking-wider uppercase mb-2">
            AO MUNDO DA LELIS.
          </h2>
          <p className="text-[#D89379] font-serif italic text-xl md:text-2xl" style={{ fontFamily: "'Clicker Script', 'Great Vibes', cursive" }}>
            Um universo de sabor espera por você! <Heart className="inline-block text-[#D89379] ml-1" size={16} />
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#542943]/10">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2 relative h-[400px] md:h-auto">
              <img 
                src="/minha_historia.jpeg" 
                alt="Gabriela - Fundadora da Lelis Empada Gourmet" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="font-bold text-xl">Gabriela</p>
                  <p className="text-sm opacity-90">Diretora e Fundadora</p>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#542943] mb-6 border-b pb-4 border-[#542943]/10">
                Nossa História
              </h3>
              
              <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                <p>
                  A história da <strong>Lelis Empada Gourmet</strong> começou em abril de 2015, nasceu dentro do coração de Gabriela pela falta de retorno do mercado de trabalho.
                </p>
                <p>
                  Um pouco desacreditada e sem confianças, surgiu em mim uma semente do empreendedorismo que só precisaria ser regada. Tudo isso aconteceu bem na época que a palavra gourmet estava em alta. Todo mundo ouvia falar nesse termo e foi nesse momento que eu pensei com meus botões: <em>"por que não inovar e criar empadas gourmet?"</em>
                </p>
                <p>
                  No mercado soteropolitano pouco se ouvia falar em empadas gourmet, por isso não fiquei parada e coloquei a mão na massa para transformar uma empada convencional em destaque, super diferente, com inovação e muito sabor.
                </p>
                <p>
                  Com o passar do tempo e o retorno positivo dos clientes, senti a necessidade de expandir meu leque de produtos e a partir disto, continuei inovando, mas tendo todo o cuidado de seguir o mesmo padrão: oferecer aos meus clientes produtos de qualidade, agradável aos olhos e muito saboroso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
