import React from 'react';
import { Link } from 'react-router-dom';
import { LOYALTY_TIERS } from '../constants';
import { Crown, Check, Gift, TrendingUp, Truck, Zap, Tag, UserCheck, Star, Sparkles } from 'lucide-react';

const Loyalty = () => {
  const getBenefitIcon = (benefit: string) => {
    const text = benefit.toLowerCase();
    if (text.includes('pickup')) return Truck;
    if (text.includes('birthday')) return Gift;
    if (text.includes('discount')) return Tag;
    if (text.includes('express') || text.includes('priority')) return Zap;
    if (text.includes('detergent') || text.includes('eco')) return Sparkles;
    if (text.includes('manager')) return UserCheck;
    if (text.includes('point')) return Star;
    return Check;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-brand-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
          <Crown size={400} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Join 2,000+ Happy Members
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Clou Rewards</h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto mb-10">
            Earn points with every wash. Unlock exclusive benefits, discounts, and priority service as you move up the tiers.
          </p>
          <Link to="/booking" className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-brand-500/50">
            Start Earning Today
          </Link>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600">Simple steps to get rewarded for your clean clothes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Sign Up Free</h3>
              <p className="text-slate-600">Create an account when you book your first service. You're automatically enrolled as a Bronze Member.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Earn Points</h3>
              <p className="text-slate-600">Get 1 point for every Rp 10,000 you spend on any of our laundry or dry cleaning services.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Get Rewarded</h3>
              <p className="text-slate-600">Redeem points for discounts and enjoy automatic tier upgrades for permanent perks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center text-slate-900 mb-12">Membership Tiers</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-end">
          {LOYALTY_TIERS.map((tier) => (
            <div key={tier.id} className={`rounded-2xl overflow-hidden shadow-xl transition-transform hover:-translate-y-2 ${tier.id === 'gold' ? 'border-2 border-yellow-400 relative md:-mt-8' : 'border border-slate-100'}`}>
              {tier.id === 'gold' && (
                <div className="bg-yellow-400 text-yellow-900 text-center text-xs font-bold uppercase py-1 tracking-wider">Most Popular</div>
              )}
              <div className={`p-8 ${tier.color}`}>
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="opacity-80 text-sm font-medium uppercase tracking-wide">
                  {tier.minPoints === 0 ? 'Entry Level' : `${tier.minPoints}+ Points`}
                </p>
              </div>
              <div className="bg-white p-8">
                <ul className="space-y-4">
                  {tier.benefits.map((benefit, index) => {
                    const Icon = getBenefitIcon(benefit);
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${tier.id === 'gold' ? 'bg-yellow-100 text-yellow-600' : 'bg-brand-50 text-brand-600'}`}>
                          <Icon size={14} strokeWidth={2.5} />
                        </div>
                        <span className="text-slate-700 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                  <Link to="/booking" className={`inline-block w-full py-3 rounded-lg font-bold text-sm transition-colors ${tier.id === 'gold' ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    {tier.id === 'bronze' ? 'Join Now' : `Reach ${tier.name}`}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loyalty;