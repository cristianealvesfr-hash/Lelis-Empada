import React from 'react';
import { SharedFooter } from './SharedFooter';

export const Condicoes = () => {
  return (
    <div className="bg-[#FCF9F9] min-h-screen pt-16 pb-24 lg:pt-24 animate-fade-in flex flex-col items-center">
      <div className="w-full max-w-2xl px-6 bg-white shadow-sm py-8 md:rounded-2xl border-t-4 border-[#542943] mb-8">
        <p className="text-[#542943] font-bold text-lg mb-8 leading-relaxed">
          OBS: Só agendamos pedidos mediante comprovante de pagamento.
        </p>

        <div className="border-t border-dashed border-[#542943]/30 my-6"></div>

        <div className="mb-8">
          <h3 className="text-[#542943] font-bold text-lg mb-3">Condições para Empadas, Tortas e Bolos:</h3>
          <ul className="text-[#542943] space-y-2 text-base font-medium">
            <li>- Quantidade para tamanho normal: mínimo de 06 unidades (02 sabores de cada)</li>
            <li>- Quantidade para tamanho festa: mínimo de 40 unidades (2 sabores)</li>
            <li>- Encomendas de Empadas por quantidade e de Tortas por unidade (único sabor)</li>
          </ul>
        </div>

        <div className="border-t border-dashed border-[#542943]/30 my-6"></div>

        <div className="mb-6">
          <h3 className="text-[#542943] font-bold text-lg mb-3">Cancelamento:</h3>
          <ul className="text-[#542943] space-y-2 text-base font-medium">
            <li>- Informar via whatsapp <a href="https://wa.me/5571987265754" className="underline hover:text-brand-purpleLight font-bold">(71 98726-5754)</a> com 48h de antecedência</li>
            <li>- O reembolso pode ser realizado com até 10 dias úteis</li>
          </ul>
        </div>
      </div>
      
      <SharedFooter showPayments={true} />
    </div>
  );
};
