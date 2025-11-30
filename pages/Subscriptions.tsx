import React from 'react';
import { SUBSCRIPTION_PLANS } from '../src/core/ContentAssets';
import { Check, Star, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Subscriptions = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-brand-900 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold mb-4">Build Your Plan</h1>
          <p className="text-brand-200 max-w-2xl mx-auto text-lg">
            Forget about laundry day forever. Choose a plan that fits your lifestyle and save up to 30%.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div key={plan.id} className={`bg-white rounded-2xl shadow-xl overflow-hidden border transition-transform hover:-translate-y-2 ${plan.popular ? 'border-brand-500 ring-2 ring-brand-200 relative' : 'border-slate-100'}`}>
              {plan.popular && (
                <div className="bg-brand-500 text-white text-center py-1 text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="p-8 text-center border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-serif font-bold text-brand-600 mb-1">{plan.price}</div>
                <p className="text-slate-500 text-sm">{plan.frequency} Billing</p>
              </div>
              <div className="p-8 bg-slate-50/50">
                <div className="flex items-center justify-center gap-2 mb-6 text-slate-700 font-medium bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <ShoppingBag size={20} className="text-brand-500" />
                  {plan.bagSize}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-left">
                      <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/booking?subscription=${plan.id}`}
                  className={`block w-full py-4 rounded-xl font-bold transition-all shadow-lg ${plan.popular ? 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-brand-500/30' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
                >
                  Select Plan
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div className="bg-yellow-100 p-6 rounded-full text-yellow-600 shrink-0">
            <Star size={48} fill="currentColor" />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Not sure which plan is right?</h2>
            <p className="text-slate-600">Start with a <strong>One-Time Wash</strong> and if you subscribe within 7 days, we'll credit the cost towards your first month!</p>
          </div>
          <Link to="/booking" className="whitespace-nowrap bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
            Book Trial Wash
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;