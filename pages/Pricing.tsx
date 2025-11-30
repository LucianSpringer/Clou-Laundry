import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PricingFactory } from '../src/core/ProceduralPricing';

const Pricing = () => {
  const [pricingData, setPricingData] = useState([]);

  useEffect(() => {
    const fetchPricing = async () => {
      const data = await PricingFactory.getLivePricing();
      setPricingData(data);
    };
    fetchPricing();
  }, []);

  const categories = Array.from(new Set(pricingData.map(item => item.category)));

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-brand-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Transparent Pricing</h1>
          <p className="text-brand-200 max-w-2xl mx-auto">No hidden fees. Free pickup and delivery for orders above Rp 100,000.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
          {categories.map((category) => (
            <div key={category}>
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-lg text-slate-800">{category}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {pricingData.filter(item => item.category === category).map((item, index) => (
                  <div key={index} className="px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-medium text-slate-900">{item.service}</p>
                      <p className="text-sm text-slate-500">{item.unit}</p>
                    </div>
                    <div className="text-right font-bold text-brand-600">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Need a custom quote?</h3>
          <p className="text-slate-600 mb-8">For commercial bulk orders or special items, please contact us.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="px-6 py-3 border border-slate-300 rounded-lg font-medium hover:bg-white transition-colors">Contact Support</Link>
            <Link to="/booking" className="px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-lg">Book Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
