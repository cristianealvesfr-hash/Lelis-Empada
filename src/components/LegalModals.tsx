import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 text-gray-600 text-sm space-y-4">
          {isPrivacy ? (
            <>
              <p>A <strong>Lelis Empada Gourmet</strong> tem o compromisso com a privacidade e a segurança de seus clientes durante todo o processo de navegação e compra pelo site. Os dados cadastrais dos clientes não são vendidos, trocados ou divulgados para terceiros, exceto quando essas informações são necessárias para o processo de entrega ou cobrança.</p>
              
              <h3 className="font-bold text-gray-800 text-base mt-6">1. Coleta e Uso das Informações</h3>
              <p>Nós coletamos dados essenciais como Nome, Telefone e Endereço unicamente com a finalidade de processar o seu pedido via WhatsApp e garantir a entrega dos nossos produtos com excelência.</p>
              
              <h3 className="font-bold text-gray-800 text-base mt-6">2. Cookies e Navegação</h3>
              <p>Utilizamos cookies e informações de sua navegação (sessão do browser) com o objetivo de traçar um perfil do público que visita o site e aperfeiçoar sempre nossos serviços, produtos, conteúdos e garantir as melhores ofertas para você. Durante todo este processo mantemos suas informações em sigilo absoluto.</p>

              <h3 className="font-bold text-gray-800 text-base mt-6">3. Direitos dos Usuários (LGPD)</h3>
              <p>Você tem o direito de solicitar o acesso, a correção e a exclusão dos seus dados pessoais coletados pelo nosso site, em conformidade com a Lei Geral de Proteção de Dados (LGPD). Para exercer os seus direitos, basta entrar em contato conosco através do nosso WhatsApp oficial.</p>
            </>
          ) : (
            <>
              <p>Bem-vindo à <strong>Lelis Empada Gourmet</strong>. Ao acessar e usar nosso site, você concorda em cumprir e se vincular aos seguintes termos e condições de uso.</p>

              <h3 className="font-bold text-gray-800 text-base mt-6">1. Uso do Site e Condições de Venda</h3>
              <p>Ao realizar uma encomenda em nosso site, você declara ser maior de idade ou ter a permissão de um responsável legal. O nosso site funciona como um catálogo digital inteligente que redireciona o seu pedido formatado para o nosso WhatsApp, onde o atendimento e pagamento são concluídos.</p>

              <h3 className="font-bold text-gray-800 text-base mt-6">2. Preços, Pagamentos e Encomendas</h3>
              <p>Os preços dos nossos produtos estão sujeitos a alterações sem aviso prévio. Trabalhamos primariamente sob encomenda (com antecedência mínima de 24h), e também possuímos produtos a pronta entrega, sujeitos à disponibilidade do dia. O pagamento é realizado diretamente via WhatsApp no momento do fechamento.</p>

              <h3 className="font-bold text-gray-800 text-base mt-6">3. Cancelamentos e Prazos</h3>
              <p>Por se tratar de produtos perecíveis artesanais e feitos sob encomenda exclusiva, cancelamentos só serão aceitos se solicitados com antecedência mínima de 24 horas antes do prazo combinado para entrega. Reservamo-nos o direito de não reembolsar eventuais sinais caso o cancelamento ocorra fora do prazo ou com a produção já em andamento.</p>

              <h3 className="font-bold text-gray-800 text-base mt-6">4. Propriedade Intelectual</h3>
              <p>Todo o conteúdo deste site, incluindo imagens dos produtos, textos, logos e identidade visual são propriedade exclusiva da Lelis Empada Gourmet e não podem ser copiados, reproduzidos ou usados comercialmente sem autorização prévia por escrito.</p>
            </>
          )}
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-brand-purple text-white rounded-lg font-semibold hover:bg-[#542943] transition-colors shadow-sm"
          >
            Fechar e Concordar
          </button>
        </div>
      </div>
    </div>
  );
};
