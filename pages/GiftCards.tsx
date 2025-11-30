import React, { useState } from 'react';
import { GIFT_CARD_DESIGNS, COMPANY_NAME } from '../src/core/ContentAssets';
import { CardSecurity } from '../src/core/CardValidator';
import { Gift, CreditCard, Copy, Check, Sparkles } from 'lucide-react';

const GiftCards = () => {
  const [selectedDesign, setSelectedDesign] = useState(GIFT_CARD_DESIGNS[0]);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  // Generate a valid card number for preview
  const [previewCardNumber] = useState(() => CardSecurity.generateValidNumber());
  const formattedCardNumber = CardSecurity.format(previewCardNumber);

  const amounts = [100000, 250000, 500000, 1000000];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-brand-900 text-white py-16 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">Give the Gift of Free Time</h1>
        <p className="text-brand-200">The perfect present for busy friends and family.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* Preview Section */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">1. Choose Design</h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
              <div className="relative rounded-xl overflow-hidden aspect-video shadow-lg mb-6 group">
                <img src={selectedDesign.image} alt={selectedDesign.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-6 text-white w-full px-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-brand-200 text-xs uppercase tracking-widest mb-1">Card Number</p>
                      <p className="font-mono text-xl tracking-wider text-white drop-shadow-md">{formattedCardNumber}</p>
                    </div>
                    <Sparkles className="text-brand-300" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {GIFT_CARD_DESIGNS.map(design => (
                  <button
                    key={design.id}
                    onClick={() => setSelectedDesign(design)}
                    className={`rounded-lg overflow-hidden aspect-video border-2 transition-all ${selectedDesign.id === design.id ? 'border-brand-600 ring-2 ring-brand-200' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={design.image} alt={design.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">2. Gift Details</h2>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Amount</label>
                <div className="grid grid-cols-3 gap-3">
                  {['100000', '250000', '500000'].map(val => (
                    <button
                      key={val}
                      onClick={() => setSelectedAmount(parseInt(val))}
                      className={`py-3 px-2 rounded-lg font-bold text-sm border transition-all ${selectedAmount === parseInt(val) ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-700 border-slate-200 hover:border-brand-400'}`}
                    >
                      Rp {(parseInt(val) / 1000)}k
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Recipient Email</label>
                  <input type="email" placeholder="friend@example.com" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-brand-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                  <input type="text" placeholder="John Doe" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-brand-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Personal Message</label>
                  <textarea rows={3} placeholder="Enjoy your free time!" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-brand-500 outline-none"></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg flex items-center justify-center gap-2">
                  <Gift size={20} /> Purchase Gift Card
                </button>
                <p className="text-xs text-center text-slate-400 mt-4">Delivered instantly via email. Never expires.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;