import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const CardFlags: React.FC = () => {
  return (
    <div className="mt-2 w-full max-w-[280px]">
      <img 
        src="/bandeiras_cartoes.png" 
        alt="Bandeiras de Cartões Aceitas: Visa, Mastercard, Maestro, Elo, Alelo, Amex, Banco do Brasil, Hipercard, Diners Club" 
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

const TeardropIcon = ({ onClick, ariaLabel, children }: { onClick: () => void, ariaLabel: string, children: React.ReactNode }) => (
  <button 
    onClick={onClick}
    aria-label={ariaLabel}
    className="group relative w-12 h-12 bg-[#6A3756] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
    style={{ borderRadius: '0 50% 50% 50%' }}
  >
    <div className="w-[75%] h-[75%] rounded-full border-2 border-white flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#6A3756] transition-colors duration-300">
      {children}
    </div>
  </button>
);

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/lelisempadagourmet', '_blank');
  };

  const handleFacebookClick = () => {
    window.open('https://pt-br.facebook.com/@lelisempadagourmet/?hr=1&wtsid=rdr_0OtgqNvlGxWczPhbu', '_blank');
  };

  const handleWhatsappClick = () => {
    window.open('https://wa.me/5571987265754', '_blank');
  };

  return (
    <footer className="bg-brand-dark text-white pt-12 pb-24 px-6 border-t border-brand-purple/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left items-start">
          
          {/* Column 1 - Logo & About */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-brand-lilac/30 overflow-hidden bg-white shadow-md flex items-center justify-center p-1">
                <img 
                  src="/logo.jpg" 
                  alt="Lelis Empada Gourmet Logo" 
                  className="w-full h-full object-contain rounded-full" 
                  onError={(e) => { e.currentTarget.src = '/logo.png' }}
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-bold tracking-tight text-brand-lilac leading-tight">Lelis</span>
                <span className="text-[10px] tracking-widest text-gray-300 font-semibold uppercase">Empada Gourmet</span>
              </div>
            </div>
            
            <div className="flex items-start gap-2.5 text-sm text-gray-300">
              <MapPin className="text-brand-lilac flex-shrink-0 mt-1" size={16} />
              <p className="leading-relaxed">
                Rua Jataúba, Campinas de Brotas,<br />
                Salvador - BA
              </p>
            </div>
          </div>

          {/* Column 2 - Socials & Operating Hours */}
          <div className="flex flex-col items-center md:items-start space-y-5">
            <h3 className="text-brand-lilac font-bold text-base tracking-wide uppercase">Horário & Contato</h3>
            
            <div className="flex items-start gap-2.5 text-sm text-gray-300">
              <Clock className="text-brand-lilac flex-shrink-0 mt-0.5" size={16} />
              <div className="space-y-1">
                <p className="font-semibold text-white">Horário de Funcionamento:</p>
                <p>Segunda à Sábado das 08h às 15h</p>
                <p>Domingos e Feriados das 08h às 14h</p>
              </div>
            </div>

            <div className="flex gap-2.5 mt-2">
              <TeardropIcon onClick={handleInstagramClick} ariaLabel="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </TeardropIcon>
              <TeardropIcon onClick={handleFacebookClick} ariaLabel="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </TeardropIcon>
              <TeardropIcon onClick={handleWhatsappClick} ariaLabel="WhatsApp">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.989-1.873-1.874-4.361-2.906-7.001-2.907-5.439 0-9.865 4.42-9.87 9.865-.001 1.639.427 3.24 1.24 4.673l-.995 3.635 3.737-.98zm11.387-5.464c-.307-.154-1.817-.897-2.097-.999-.28-.102-.484-.153-.687.154-.202.307-.783.999-.96 1.205-.177.205-.355.23-.662.077-1.284-.64-2.222-1.123-3.08-2.6-.228-.393.228-.365.654-1.218.077-.154.038-.288-.019-.393-.058-.105-.484-1.168-.663-1.6-.174-.42-.365-.363-.502-.363h-.428c-.149 0-.39.056-.594.278-.204.223-.78.762-.78 1.856 0 1.094.796 2.15 1.025 2.456.229.306 1.525 2.329 3.696 3.267.516.222.918.355 1.233.456.518.165.99.141 1.362.085.414-.061 1.817-.743 2.074-1.46.257-.718.257-1.332.18-1.46-.077-.128-.282-.205-.589-.359z"/>
                </svg>
              </TeardropIcon>
            </div>
          </div>

          {/* Column 3 - Payment Forms & Flags */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-brand-lilac font-bold text-base tracking-wide uppercase">Formas de Pagamento</h3>
            
            <div className="text-sm text-gray-300 space-y-1.5">
              <p>• Pagamento à vista (PIX ou depósito em conta) 50% ou 100%</p>
              <p>• Cartão de Crédito (com acréscimo)</p>
            </div>

            {/* Custom Payment Flags */}
            <div className="w-full flex flex-col items-center md:items-start">
              <span className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Cartões aceitos:</span>
              <CardFlags />
            </div>

            <p className="text-xs text-[#FEB813] font-medium italic mt-2">
              Pedidos com 24h de antecedência ou enquanto houver disponibilidade.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 mt-10 pt-6 text-center text-xs text-gray-400">
          <p>© 2024 Lelis Empada Gourmet. Todos os direitos reservados.</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">Política de Privacidade</button>
            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
            <button onClick={onOpenTerms} className="hover:text-white transition-colors">Termos de Uso</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
