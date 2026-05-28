import React, { useState, useEffect } from 'react';

interface CookieConsentProps {
  onOpenPrivacy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-4 border-t border-gray-200">
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 flex-1 text-center sm:text-left">
          Nós usamos cookies e outras tecnologias semelhantes para melhorar a sua experiência em nossos serviços e direcionar o melhor conteúdo. 
          Ao continuar navegando, você concorda com nossa{' '}
          <button onClick={onOpenPrivacy} className="text-brand-purple font-semibold hover:underline">
            Política de Privacidade
          </button>.
        </div>
        <button 
          onClick={handleAccept}
          className="bg-brand-purple text-white px-8 py-2.5 rounded-full font-semibold hover:bg-[#542943] transition-colors whitespace-nowrap shadow-md active:scale-95"
        >
          Li e Aceito
        </button>
      </div>
    </div>
  );
};
