import React from 'react';
import { MapPin, Navigation, Star } from 'lucide-react';

export const MapSection = () => {
  return (
    <section className="bg-white">
      {/* Section Title */}
      <div className="container mx-auto px-4 py-16 pb-8 text-center">
        <h2 className="text-3xl font-bold text-brand-dark mb-3">Nossa Localização</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Venha nos fazer uma visita ou faça sua encomenda para retirar no local.
        </p>
      </div>

      <div className="relative w-full h-[500px] md:h-[600px] bg-gray-100 overflow-hidden">
        {/* Background Map */}
      <div className="absolute inset-0 w-full h-full">
        <iframe 
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=pt-BR&amp;q=Rua%20Jata%C3%BAba,%20Campinas%20de%20Brotas,%20Salvador%20-%20BA+(Lelis%20Empada%20Gourmet)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          style={{ border: 0 }} 
          allowFullScreen 
          aria-hidden="false" 
          tabIndex={0}
          title="Localização Lelis Empada Gourmet"
          className="grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </div>

      {/* Floating Card */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-end md:items-center p-4 md:p-10 container mx-auto">
        <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl pointer-events-auto max-w-sm w-full border border-white/40 transform transition-transform hover:-translate-y-1 duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-brand-lilac/20 rounded-full flex items-center justify-center text-brand-purple">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-dark leading-tight">Nossa Localização</h3>
              <div className="flex text-[#F7B600] text-sm mt-0.5">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <span className="text-gray-600 ml-1.5 font-medium text-xs">5.0 no Google</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            <strong>Lelis Empada Gourmet</strong><br/>
            Rua Jataúba, Campinas de Brotas<br/>
            Salvador - BA<br/>
            <em>Trabalhamos sob encomenda com retirada no local ou delivery.</em>
          </p>

          <div className="flex flex-col gap-3">
            <a 
              href="https://share.google/ynpHAfUsgDgseoh7e"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-brand-purple text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#542943] active:scale-95 transition-all shadow-md group"
            >
              <Star size={18} className="group-hover:rotate-12 transition-transform" />
              Avalie no Google
            </a>
            
            <a 
              href="https://maps.google.com/maps?q=Rua%20Jata%C3%BAba,%20Campinas%20de%20Brotas,%20Salvador%20-%20BA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-brand-dark border-2 border-gray-100 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <Navigation size={18} className="text-brand-purple" />
              Traçar Rota
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
