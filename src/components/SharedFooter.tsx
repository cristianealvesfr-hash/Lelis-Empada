import React from 'react';
import { MessageCircle } from 'lucide-react';

interface SharedFooterProps {
  showPayments?: boolean;
}

export const SharedFooter: React.FC<SharedFooterProps> = ({ showPayments = false }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-12 w-full max-w-2xl mx-auto px-6 animate-fade-in">
      {/* Logo */}
      <img src="/logo.png" alt="Lelis Empada Gourmet" className="w-32 mb-8" />
      
      {/* Address */}
      <div className="w-full text-left mb-6">
        <h4 className="text-[#542943] font-bold text-sm mb-1">Lelis Empada Gourmet</h4>
        <p className="text-[#542943] text-sm">Rua Jataúba, Campinas de Brotas, Salvador - BA</p>
      </div>

      {/* Horário */}
      <div className="w-full text-left mb-8">
        <h4 className="text-[#542943] font-bold text-sm mb-1">Horário de Funcionamento:</h4>
        <p className="text-[#542943] text-sm">Segunda à sábado das 8h às 15h</p>
        <p className="text-[#542943] text-sm">Domingos e feriados das 8h às 14h</p>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4 mb-8 justify-center w-full">
        <a 
          href="https://www.instagram.com/lelisempadagourmet" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#542943] text-white p-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm hover:scale-110 transition-transform flex items-center justify-center w-14 h-14"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </a>
        <a 
          href="https://www.facebook.com/lelisempadagourmet" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#542943] text-white p-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm hover:scale-110 transition-transform flex items-center justify-center w-14 h-14"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        <a 
          href="https://wa.me/5571987265754" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#542943] text-white p-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm hover:scale-110 transition-transform flex items-center justify-center w-14 h-14"
        >
          <MessageCircle size={28} />
        </a>
      </div>

      {/* Formas de Pagamento */}
      {showPayments && (
        <div className="w-full text-left border-t border-[#542943]/10 pt-6">
          <h4 className="text-[#542943] font-bold text-sm mb-1">Forma de Pagamento:</h4>
          <p className="text-[#542943] text-sm mb-4">- Pagamento à vista (depósito em conta) 50% ou 100%</p>
          <p className="text-[#542943] text-sm mb-4">- Cartão de Crédito (com acréscimo)</p>
          
          <img src="/bandeiras_cartoes.png" alt="Bandeiras Aceitas" className="h-6 object-contain" />
        </div>
      )}
    </div>
  );
};
