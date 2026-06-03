import React, { useState } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HeroSlider } from './components/HeroSlider';
import { ProductSection } from './components/ProductSection';
import { Footer } from './components/Footer';
import { BottomSheet } from './components/BottomSheet';
import type { CartItem } from './components/BottomSheet';
import { FloatingCart } from './components/FloatingCart';
import { CartModal } from './components/CartModal';
import { PartyCalculator } from './components/PartyCalculator';
import { SideCart } from './components/SideCart';
import { CookieConsent } from './components/CookieConsent';
import { LegalModal } from './components/LegalModals';
import { Testimonials } from './components/Testimonials';
import { MapSection } from './components/MapSection';
import { NossaHistoria } from './components/NossaHistoria';
import { Entrega } from './components/Entrega';
import { Condicoes } from './components/Condicoes';
import { MobileDrawer } from './components/MobileDrawer';
import { PRODUCTS, CATEGORIES } from './data';
import type { Product } from './data';
import { Home, Calculator, ShoppingBag, PhoneCall, Menu } from 'lucide-react';

function App() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'history' | 'entrega' | 'condicoes'>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Intersection Observer removed - categories are now filtered instead of scrolled

  const handleScrollToCategory = (id: string) => {
    setCurrentView('home');
    setActiveCategory(id);
    
    // We need a small delay to allow DOM to render if switching from history view
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 135;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = (paymentMethod: string) => {
    const phone = '5571987265754'; // Número real da Lelis
    const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    
    let text = `Olá Lelis Empada Gourmet! Gostaria de fazer uma encomenda:\n\n`;
    
    cart.forEach(item => {
      const isFesta = item.size === 'festa' || item.size === 'festa-integral';
      let sizeStr = item.size === 'festa-integral' ? 'Pão Integral (Caixa c/ 30)' : item.size === 'festa' ? 'Festa' : 'Normal';
      if (item.size === 'pequena') sizeStr = 'Pequeno';
      if (item.size === 'media') sizeStr = 'Médio (23cm)';
      if (item.size === 'grande') sizeStr = 'Grande (30cm)';
      if (item.size === 'torta20cm') sizeStr = 'Torta 20cm';
      if (item.size === 'minibaby') sizeStr = 'Mini Baby 8x4';
      if (item.size === 'sufle20cm') sizeStr = 'Suflê (20cm)';
      if (item.size === 'sufle30cm') sizeStr = 'Suflê (30cm)';
      
      const categoryLabel = CATEGORIES.find(c => c.id === item.baseProduct.category)?.label || '';
      let productStr = `${categoryLabel} - ${item.baseProduct.title}`;
      
      if (item.secondHalfProduct) {
        productStr = `Caixa Meio a Meio [15x ${categoryLabel} - ${item.baseProduct.title}, 15x ${CATEGORIES.find(c => c.id === item.secondHalfProduct!.category)?.label || ''} - ${item.secondHalfProduct.title}]`;
      }
      
      text += `${isFesta ? item.quantity / 30 : item.quantity}x ${productStr} - Tamanho ${sizeStr} - R$ ${item.totalPrice.toFixed(2).replace('.', ',')}\n`;
      
      if (item.barcaSelections) {
        text += `   ↳ Sabor 1: [${item.barcaSelections.flavor1.code}] ${item.barcaSelections.flavor1.title}\n`;
        text += `   ↳ Sabor 2: [${item.barcaSelections.flavor2.code}] ${item.barcaSelections.flavor2.title}\n`;
        text += `   ↳ Sabor 3: [${item.barcaSelections.flavor3.code}] ${item.barcaSelections.flavor3.title}\n`;
      }
      
      if (item.observation) {
        text += `   ↳ Obs: ${item.observation}\n`;
      }
    });

    text += `\n*Subtotal: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
    text += `Total: R$ ${total.toFixed(2).replace('.', ',')}\n`;
    text += `Pagamento: ${paymentMethod}\n\n`;
    text += `*Informações adicionais*\n`;
    text += `Sua RESERVA só será garantida mediante pagamento 50% ou TOTAL\n`;
    text += `- PIX, CNPJ: 61518568/000193 LELIS EMPADA GOURMET - (Banco INTER).\n`;
    text += `- Cartão de crédito:\n`;
    text += `Link de pagamento on-line ( com acréscimo - parcela em até 12x.)\n\n`;
    text += `Obrigada pela preferência e confiança!`;

    const encodedText = encodeURIComponent(text);
    window.location.href = `https://wa.me/${phone}?text=${encodedText}`;
  };

  // Filter products based on search value (ignoring accents and case)
  const normalizeString = (str: string) => {
    return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const searchLower = normalizeString(searchValue).trim();
    if (!searchLower) return true;
    return (
      normalizeString(p.title).includes(searchLower) ||
      normalizeString(p.code).includes(searchLower) ||
      normalizeString(p.description).includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 lg:pb-0 relative text-gray-800 antialiased selection:bg-brand-purple selection:text-white">
      {/* Top sticky header */}
      <Header onSearchChange={setSearchValue} searchValue={searchValue} />
      
      {/* Promotional Slideshow */}
      {!searchValue && <HeroSlider onOpenCalculator={() => setIsCalcOpen(true)} />}
      
      {/* Horizontal categories anchor menu */}
      {currentView === 'home' && !searchValue && (
        <CategoryNav activeCategory={activeCategory} onSelectCategory={handleScrollToCategory} />
      )}
      
      {/* Main content grid */}
      {currentView === 'home' ? (
        <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Menu / Catalog column */}
          <div className="lg:col-span-8 space-y-2">
            {CATEGORIES.map(category => {
              // If not searching, only show the active category
              if (!searchValue && category.id !== activeCategory) return null;

              const categoryProducts = filteredProducts.filter(p => p.category === category.id);
              if (categoryProducts.length === 0) return null;
              
              return (
                <ProductSection 
                  key={category.id}
                  id={category.id}
                  title={category.label}
                  products={categoryProducts}
                  onProductClick={(product) => setSelectedProduct(product)}
                />
              );
            })}
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-150 shadow-sm max-w-md mx-auto">
                <p className="text-gray-500 font-medium">Nenhuma empada encontrada para "{searchValue}".</p>
                <button 
                  onClick={() => setSearchValue('')}
                  className="mt-3 text-sm font-bold text-brand-purple hover:underline"
                >
                  Limpar busca
                </button>
              </div>
            )}
          </div>

          {/* Persistent Order Summary / Sidebar (Desktop only) */}
          <div className="hidden lg:block lg:col-span-4">
            <SideCart 
              items={cart}
              onRemoveItem={handleRemoveFromCart}
              onCheckout={handleCheckout}
              onAddUpsell={(product) => {
                const item: CartItem = {
                  id: Math.random().toString(36).substr(2, 9),
                  baseProduct: product,
                  size: 'normal',
                  quantity: 1,
                  totalPrice: product.priceNormal,
                  observation: 'Adicionado do painel lateral'
                };
                handleAddToCart(item);
              }}
            />
          </div>
        </div>
        
        <Testimonials />
        <MapSection />
      </main>
      ) : (
        <main>
          {currentView === 'history' && <NossaHistoria />}
          {currentView === 'entrega' && <Entrega />}
          {currentView === 'condicoes' && <Condicoes />}
        </main>
      )}

      {/* Footer Info */}
      <Footer 
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Mobile Floating Cart (Shows at the bottom of the viewport, replaced by Sidebar on desktop) */}
      <div className="lg:hidden">
        <FloatingCart 
          itemCount={cart.length} 
          totalPrice={cart.reduce((acc, item) => acc + item.totalPrice, 0)}
          onClick={() => setIsCartOpen(true)}
        />
      </div>

      {/* Mobile Bottom Navigation Bar (iFood style) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2.5 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-around z-40 select-none">
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-brand-purple active:scale-95 transition-all"
        >
          <Menu size={20} className="text-gray-500" />
          <span className="text-[10px] font-semibold">Menu</span>
        </button>

        <button 
          onClick={() => {
            setCurrentView('home');
            setSearchValue('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-brand-purple active:scale-95 transition-all"
        >
          <Home size={20} className="text-gray-500" />
          <span className="text-[10px] font-semibold">Início</span>
        </button>

        <button 
          onClick={() => setIsCalcOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-brand-purple active:scale-95 transition-all"
        >
          <Calculator size={20} className="text-gray-500" />
          <span className="text-[10px] font-semibold">Calcular Festa</span>
        </button>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-gray-500 hover:text-brand-purple active:scale-95 transition-all"
        >
          <ShoppingBag size={20} className="text-gray-500" />
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white font-extrabold text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white animate-bounce shadow-sm">
              {cart.length}
            </span>
          )}
          <span className="text-[10px] font-semibold">Carrinho</span>
        </button>

        <button 
          onClick={() => {
            const footerEl = document.querySelector('footer');
            footerEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-brand-purple active:scale-95 transition-all"
        >
          <PhoneCall size={20} className="text-gray-500" />
          <span className="text-[10px] font-semibold">Contato</span>
        </button>
      </nav>

      <MobileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleScrollToCategory}
      />

      {/* Modal/BottomSheet components */}
      <BottomSheet 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
      
      <PartyCalculator 
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
      />

      <CookieConsent onOpenPrivacy={() => setLegalModalType('privacy')} />
      
      <LegalModal 
        isOpen={legalModalType !== null} 
        onClose={() => setLegalModalType(null)} 
        type={legalModalType || 'privacy'} 
      />

      {/* Floating Animated Contact Buttons (WhatsApp & Instagram) */}
      <div className="fixed right-4 bottom-36 sm:right-6 sm:bottom-6 flex flex-col gap-3.5 z-40 select-none">
        {/* Instagram Floating Button */}
        <a 
          href="https://www.instagram.com/lelisempadagourmet" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 group drop-shadow-xl rounded-[25%]"
          title="Siga no Instagram"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-[25%] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] animate-ping opacity-35 pointer-events-none"></span>
          <img src="/btn_instagram.png" alt="Instagram" className="w-full h-full object-cover rounded-[25%] z-10" />
        </a>

        {/* WhatsApp Floating Button */}
        <a 
          href="https://wa.me/5571987265754?text=Gostaria%20de%20fazer%20um%20pedido!" 
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 group drop-shadow-xl rounded-full"
          title="Fale conosco no WhatsApp"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-45 pointer-events-none"></span>
          <img src="/btn_whatsapp.png" alt="WhatsApp" className="w-full h-full object-cover rounded-full z-10" />
        </a>
      </div>
    </div>
  );
}

export default App;
