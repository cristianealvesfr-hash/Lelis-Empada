import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, AlertCircle, ShoppingBag } from 'lucide-react';
import { PRODUCTS, BARCA_SIMPLES, BARCA_ESPECIAIS } from '../data';
import type { Product } from '../data';

export interface CartItem {
  id: string; // unique id for cart item
  baseProduct: Product;
  size: 'normal' | 'festa' | 'festa-integral' | 'pequena' | 'media' | 'grande' | 'torta20cm' | 'minibaby' | 'sufle20cm' | 'sufle30cm';
  quantity: number;
  secondHalfProduct?: Product;
  barcaSelections?: {
    type: 'padrao' | 'especial'; // padrao = 1 simples + 2 especiais, especial = 3 especiais
    flavor1: { code: string; title: string };
    flavor2: { code: string; title: string };
    flavor3: { code: string; title: string };
  };
  observation: string;
  totalPrice: number;
}

interface BottomSheetProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [size, setSize] = useState<'normal' | 'festa' | 'festa-integral' | 'pequena' | 'media' | 'grande' | 'torta20cm' | 'minibaby' | 'sufle20cm' | 'sufle30cm'>('normal');
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');
  const [isHalfHalf, setIsHalfHalf] = useState(false);
  const [secondHalfId, setSecondHalfId] = useState<string>('');
  
  // Barca states
  const [barcaType, setBarcaType] = useState<'padrao' | 'especial'>('padrao');
  const [barcaFlavor1, setBarcaFlavor1] = useState<string>(''); // Simples (padrão) ou Especial (especial)
  const [barcaFlavor2, setBarcaFlavor2] = useState<string>(''); // Especial
  const [barcaFlavor3, setBarcaFlavor3] = useState<string>(''); // Especial

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (isOpen && product) {
      if (product.category === 'quiche') {
        setSize('pequena');
      } else if (product.category === 'torta-maca') {
        setSize('torta20cm');
      } else if (product.category === 'sufle') {
        setSize('sufle20cm');
      } else {
        setSize(product.priceNormal === 0 ? 'festa' : 'normal');
      }
      setQuantity(1);
      setObservation('');
      setIsHalfHalf(false);
      setSecondHalfId('');
      setBarcaType('padrao');
      setBarcaFlavor1('');
      setBarcaFlavor2('');
      setBarcaFlavor3('');
    }
  }, [isOpen, product]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!product) return null;

  // Lógica de Preço
  const calculateTotal = () => {
    if (product.category === 'barca') {
      const basePrice = barcaType === 'padrao' ? 89.00 : 94.00;
      return basePrice * quantity;
    }
    
    if (product.category === 'quiche') {
      if (size === 'pequena') return (product.pricePequena || 0) * quantity;
      if (size === 'media') return (product.priceMedia || 0) * quantity;
      if (size === 'grande') return (product.priceGrande || 0) * quantity;
    }
    
    if (product.category === 'torta-maca') {
      if (size === 'torta20cm') return (product.priceTorta20cm || 0) * quantity;
      if (size === 'minibaby') return (product.priceMiniBaby || 0) * quantity;
    }

    if (product.category === 'sufle') {
      if (size === 'sufle20cm') return (product.priceSufle20cm || 0) * quantity;
      if (size === 'sufle30cm') return (product.priceSufle30cm || 0) * quantity;
    }
    
    if (size === 'normal') {
      return product.priceNormal * quantity;
    } else {
      // Tamanho festa (caixa com 30, ou múltiplos de 30)
      const unitsPerBox = 30;
      const boxes = quantity; // quantity here means number of boxes of 30
      
      let festaPrice = product.priceFesta;
      if (size === 'festa-integral' && product.priceFestaIntegral) {
        festaPrice = product.priceFestaIntegral;
      }
      
      if (isHalfHalf && secondHalfId) {
        const secondProduct = PRODUCTS.find(p => p.id === secondHalfId);
        if (secondProduct) {
          return ((festaPrice * 15) + (secondProduct.priceFesta * 15)) * boxes;
        }
      }
      return (festaPrice * unitsPerBox) * boxes;
    }
  };

  const totalPrice = calculateTotal();

  const handleAddToCart = () => {
    let barcaSelections = undefined;
    if (product.category === 'barca') {
      const f1List = barcaType === 'padrao' ? BARCA_SIMPLES : BARCA_ESPECIAIS;
      const f1 = f1List.find((f: {code: string, title: string}) => f.code === barcaFlavor1) || { code: barcaFlavor1, title: '' };
      const f2 = BARCA_ESPECIAIS.find((f: {code: string, title: string}) => f.code === barcaFlavor2) || { code: barcaFlavor2, title: '' };
      const f3 = BARCA_ESPECIAIS.find((f: {code: string, title: string}) => f.code === barcaFlavor3) || { code: barcaFlavor3, title: '' };
      
      barcaSelections = {
        type: barcaType,
        flavor1: f1,
        flavor2: f2,
        flavor3: f3
      };
    }

    onAddToCart({
      id: crypto.randomUUID(),
      baseProduct: product,
      size: (size as 'normal' | 'festa' | 'pequena' | 'media' | 'grande' | 'torta20cm' | 'minibaby' | 'sufle20cm' | 'sufle30cm'),
      quantity: size === 'festa' ? quantity * 30 : quantity,
      secondHalfProduct: isHalfHalf && secondHalfId ? PRODUCTS.find(p => p.id === secondHalfId) : undefined,
      barcaSelections,
      observation,
      totalPrice,
    });
    onClose();
  };

  const availableForSecondHalf = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category && p.priceFesta > 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-gray-50 rounded-t-3xl z-50 transition-transform duration-300 transform flex flex-col max-h-[90vh] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Header/Image */}
        <div className="relative h-48 w-full flex-shrink-0">
          <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover rounded-t-3xl" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md text-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto pb-24">
          <h2 className="text-2xl font-bold text-brand-dark leading-tight">{product.code} - {product.title}</h2>
          {product.description && <p className="text-gray-500 mt-2 text-sm">{product.description}</p>}

          {/* Ficha Técnica / Especificações do Sabor */}
          <div className="mt-4 bg-white rounded-xl border border-gray-150 p-3.5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100">
              <span className="text-gray-500 font-semibold">Especificações do Sabor</span>
              <span className="font-bold text-brand-purple uppercase tracking-wider">{product.code}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider mb-0.5">Categoria</span>
                <span className="font-bold text-gray-800">
                  {product.category === 'simples' ? 'Empadas Simples' : product.category === 'especiais' ? 'Empadas Especiais' : product.category === 'paozinho' ? 'Pãozinho Delícia' : product.category === 'pasteis' ? 'Mini Pastéis' : product.category === 'hamburguer' ? 'Mini Hambúrguer' : 'Outros'}
                </span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider mb-0.5">Tipo de Sabor</span>
                <span className="font-bold text-gray-800">
                  {['S01', 'S04', 'S05', 'S06', 'S10', 'E12', 'E23', 'E27', 'E31'].includes(product.code) ? 'Doce / Sobremesa' : 'Salgado Gourmet'}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 space-y-1.5 pt-1">
              <div className="flex justify-between">
                <span>⚖️ Peso aproximado (unidade):</span>
                <span className="font-semibold text-gray-700">
                  {product.category === 'paozinho' ? '~25g' : product.category === 'pasteis' ? '~25g' : product.category === 'hamburguer' ? '~45g' : '~80g (Normal) / ~25g (Festa)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>⏱️ Antecedência de preparo:</span>
                <span className="font-semibold text-gray-700">Mínimo 24 horas</span>
              </div>
              <div className="flex justify-between">
                <span>📦 Embalagem para Encomenda:</span>
                <span className="font-semibold text-gray-700">Inclusa</span>
              </div>
            </div>
          </div>

          {/* Conditionally render Barca Selector or Regular Size Selector */}
          {product.category === 'barca' ? (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-gray-800 mb-3">Monte sua Barca Gourmet</h3>
              
              <div className="bg-white p-4 rounded-xl border border-brand-purple shadow-sm">
                <p className="text-sm text-gray-600 mb-4">
                  A barca contém 28 empadas tamanho festa. Escolha o formato:
                </p>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="radio" name="barcaType" checked={barcaType === 'padrao'} onChange={() => { setBarcaType('padrao'); setBarcaFlavor1(''); setBarcaFlavor2(''); setBarcaFlavor3(''); }} className="mt-1 text-brand-purple focus:ring-brand-purple" />
                    <div>
                      <span className="font-medium text-gray-800 block">Padrão (1 Simples + 2 Especiais)</span>
                      <span className="text-xs text-brand-purple font-bold">R$ 89,00</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="radio" name="barcaType" checked={barcaType === 'especial'} onChange={() => { setBarcaType('especial'); setBarcaFlavor1(''); setBarcaFlavor2(''); setBarcaFlavor3(''); }} className="mt-1 text-brand-purple focus:ring-brand-purple" />
                    <div>
                      <span className="font-medium text-gray-800 block">Tudo Especial (3 Especiais)</span>
                      <span className="text-xs text-brand-purple font-bold">R$ 94,00</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 space-y-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">{barcaType === 'padrao' ? '1º Sabor (SIMPLES):' : '1º Sabor (ESPECIAL):'}</p>
                  <select 
                    className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg p-2.5 focus:border-brand-purple focus:ring-brand-purple"
                    value={barcaFlavor1}
                    onChange={(e) => setBarcaFlavor1(e.target.value)}
                  >
                    <option value="" disabled>Selecione...</option>
                    {(barcaType === 'padrao' ? BARCA_SIMPLES : BARCA_ESPECIAIS).map((p: {code: string, title: string}) => (
                      <option key={p.code} value={p.code}>{p.code} - {p.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">2º Sabor (ESPECIAL):</p>
                  <select 
                    className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg p-2.5 focus:border-brand-purple focus:ring-brand-purple"
                    value={barcaFlavor2}
                    onChange={(e) => setBarcaFlavor2(e.target.value)}
                  >
                    <option value="" disabled>Selecione...</option>
                    {BARCA_ESPECIAIS.map((p: {code: string, title: string}) => (
                      <option key={p.code} value={p.code}>{p.code} - {p.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">3º Sabor (ESPECIAL):</p>
                  <select 
                    className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg p-2.5 focus:border-brand-purple focus:ring-brand-purple"
                    value={barcaFlavor3}
                    onChange={(e) => setBarcaFlavor3(e.target.value)}
                  >
                    <option value="" disabled>Selecione...</option>
                    {BARCA_ESPECIAIS.map((p: {code: string, title: string}) => (
                      <option key={p.code} value={p.code}>{p.code} - {p.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : product.category === 'quiche' ? (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Escolha o tamanho</h3>
              <div className="space-y-3">
                {product.pricePequena && (
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === 'pequena' ? 'border-brand-purple bg-brand-lilac/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="size" checked={size === 'pequena'} onChange={() => setSize('pequena')} className="text-brand-purple focus:ring-brand-purple h-4 w-4" />
                      <div>
                        <span className="font-medium text-gray-800 block">Tamanho Pequeno</span>
                      </div>
                    </div>
                    <span className="font-bold text-brand-purple">R$ {product.pricePequena.toFixed(2).replace('.', ',')}</span>
                  </label>
                )}

                {product.priceMedia && (
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === 'media' ? 'border-brand-purple bg-brand-lilac/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="size" checked={size === 'media'} onChange={() => setSize('media')} className="text-brand-purple focus:ring-brand-purple h-4 w-4" />
                      <div>
                        <span className="font-medium text-gray-800 block">Tamanho Médio (23cm)</span>
                        <span className="text-[10px] text-gray-500 block">2,5 de altura - Rende de 09 a 12 fatias</span>
                      </div>
                    </div>
                    <span className="font-bold text-brand-purple">R$ {product.priceMedia.toFixed(2).replace('.', ',')}</span>
                  </label>
                )}

                {product.priceGrande && (
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === 'grande' ? 'border-brand-purple bg-brand-lilac/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="size" checked={size === 'grande'} onChange={() => setSize('grande')} className="text-brand-purple focus:ring-brand-purple h-4 w-4" />
                      <div>
                        <span className="font-medium text-gray-800 block">Tamanho Grande (30cm)</span>
                        <span className="text-[10px] text-gray-500 block">2,5 de altura - Rende 16 a 17 fatias</span>
                      </div>
                    </div>
                    <span className="font-bold text-brand-purple">R$ {product.priceGrande.toFixed(2).replace('.', ',')}</span>
                  </label>
                )}
              </div>
            </div>
          ) : product.category === 'torta-maca' ? (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Escolha o tamanho</h3>
              <div className="space-y-3">
                {product.priceTorta20cm && (
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === 'torta20cm' ? 'border-brand-purple bg-brand-lilac/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="size" checked={size === 'torta20cm'} onChange={() => setSize('torta20cm')} className="text-brand-purple focus:ring-brand-purple h-4 w-4" />
                      <div>
                        <span className="font-medium text-gray-800 block">Torta de Maçã (20 cm)</span>
                        <span className="text-[10px] text-gray-500 block">Creme branco, castanha. Rende de 12 a 15 fatias.</span>
                      </div>
                    </div>
                    <span className="font-bold text-brand-purple">R$ {product.priceTorta20cm.toFixed(2).replace('.', ',')}</span>
                  </label>
                )}

                {product.priceMiniBaby && (
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === 'minibaby' ? 'border-brand-purple bg-brand-lilac/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="size" checked={size === 'minibaby'} onChange={() => setSize('minibaby')} className="text-brand-purple focus:ring-brand-purple h-4 w-4" />
                      <div>
                        <span className="font-medium text-gray-800 block">Mini Baby (8x4)</span>
                        <span className="text-[10px] text-gray-500 block">Mínimo de 5 unidades. (Preço por unidade)</span>
                      </div>
                    </div>
                    <span className="font-bold text-brand-purple">R$ {product.priceMiniBaby.toFixed(2).replace('.', ',')}</span>
                  </label>
                )}
              </div>
            </div>
          ) : product.category === 'sufle' ? (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Escolha o tamanho do Suflê</h3>
              <div className="space-y-3">
                {product.priceSufle20cm && (
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === 'sufle20cm' ? 'border-brand-purple bg-brand-lilac/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="size" checked={size === 'sufle20cm'} onChange={() => setSize('sufle20cm')} className="text-brand-purple focus:ring-brand-purple h-4 w-4" />
                      <div>
                        <span className="font-medium text-gray-800 block">Tamanho 20cm</span>
                      </div>
                    </div>
                    <span className="font-bold text-brand-purple">R$ {product.priceSufle20cm.toFixed(2).replace('.', ',')}</span>
                  </label>
                )}

                {product.priceSufle30cm && (
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === 'sufle30cm' ? 'border-brand-purple bg-brand-lilac/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="size" checked={size === 'sufle30cm'} onChange={() => setSize('sufle30cm')} className="text-brand-purple focus:ring-brand-purple h-4 w-4" />
                      <div>
                        <span className="font-medium text-gray-800 block">Tamanho 30cm</span>
                      </div>
                    </div>
                    <span className="font-bold text-brand-purple">R$ {product.priceSufle30cm.toFixed(2).replace('.', ',')}</span>
                  </label>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Escolha o tamanho</h3>
              <div className="space-y-3">
                {product.priceNormal > 0 && (
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === 'normal' ? 'border-brand-purple bg-brand-lilac/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="size" checked={size === 'normal'} onChange={() => setSize('normal')} className="text-brand-purple focus:ring-brand-purple h-4 w-4" />
                      <span className="font-medium text-gray-800">Tamanho Normal</span>
                    </div>
                    <span className="font-bold text-brand-purple">R$ {product.priceNormal.toFixed(2).replace('.', ',')} / un</span>
                  </label>
                )}

                {product.priceFesta > 0 && (
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === 'festa' ? 'border-brand-purple bg-brand-lilac/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="size" checked={size === 'festa'} onChange={() => setSize('festa')} className="text-brand-purple focus:ring-brand-purple h-4 w-4" />
                      <div>
                        <span className="font-medium text-gray-800 block">Tamanho Festa (Caixa c/ 30)</span>
                        <span className="text-xs text-brand-purpleLight">A partir de R$ {(product.priceFesta * 30).toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </label>
                )}

                {product.priceFestaIntegral && (
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${size === 'festa-integral' ? 'border-brand-purple bg-brand-lilac/20' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="size" checked={size === 'festa-integral'} onChange={() => setSize('festa-integral')} className="text-brand-purple focus:ring-brand-purple h-4 w-4" />
                      <div>
                        <span className="font-medium text-gray-800 block">Pão Integral (Caixa c/ 30)</span>
                        <span className="text-xs text-brand-purpleLight">A partir de R$ {(product.priceFestaIntegral * 30).toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Regras do Tamanho Festa & Meio a Meio */}
          {(size === 'festa' || size === 'festa-integral') && product.category !== 'barca' && (
            <div className="mt-4 bg-orange-50 border border-orange-100 p-4 rounded-xl">
              <div className="flex items-start gap-2 text-orange-800 text-sm mb-3">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <p><strong>Regra da loja:</strong> Mínimo 30 unidades | 15 unidades de cada sabor.</p>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-sm border border-orange-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isHalfHalf} onChange={(e) => setIsHalfHalf(e.target.checked)} className="rounded text-brand-purple focus:ring-brand-purple h-4 w-4" />
                  <span className="font-medium text-sm text-gray-800">Quero Meio a Meio (15 de cada)</span>
                </label>

                {isHalfHalf && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">Escolha o 2º sabor (15 unidades):</p>
                    <select 
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-brand-purple focus:border-brand-purple block p-2.5"
                      value={secondHalfId}
                      onChange={(e) => setSecondHalfId(e.target.value)}
                    >
                      <option value="" disabled>Selecione um sabor...</option>
                      {availableForSecondHalf.map(p => (
                        <option key={p.id} value={p.id}>{p.code} - {p.title} (+ R$ {(p.priceFesta * 15).toFixed(2).replace('.', ',')})</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Observations */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Observações</h3>
            <textarea 
              rows={2}
              className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent resize-none"
              placeholder="Ex: Tirar azeitona, embalar separado..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 pb-safe flex flex-col gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button 
                className="w-8 h-8 flex items-center justify-center text-brand-purple rounded-full hover:bg-white transition-colors disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button 
                className="w-8 h-8 flex items-center justify-center text-brand-purple rounded-full hover:bg-white transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Total</span>
              <span className="font-extrabold text-brand-purple text-base">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-brand-purple hover:bg-brand-dark text-white py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={(size === 'festa' && isHalfHalf && !secondHalfId) || (product.category === 'barca' && (!barcaFlavor1 || !barcaFlavor2 || !barcaFlavor3))}
          >
            <ShoppingBag size={18} />
            <span>Adicionar ao Carrinho</span>
          </button>
        </div>
      </div>
    </>
  );
};
