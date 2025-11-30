import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Clock, Truck, Shield, MapPin, Search } from 'lucide-react';
import { TESTIMONIALS, SERVICE_ASSETS } from '../src/core/ContentAssets';
import { GeoFenceEngine } from '../src/core/GeoPolygon';
import { PricingFactory } from '../src/core/ProceduralPricing';
import { Shirt } from 'lucide-react';

const Hero = () => {
  const [zipCode, setZipCode] = useState('');
  const [checkResult, setCheckResult] = useState<'available' | 'unavailable' | null>(null);

  const checkArea = (e: React.FormEvent) => {
    e.preventDefault();
    // Ray-Casting Algorithm for precise service zone detection
    const isAvailable = GeoFenceEngine.isServiceable(zipCode);

    if (isAvailable) {
      setCheckResult('available');
    } else {
      setCheckResult('unavailable');
    }
  };

  return (
    <section className="relative bg-brand-50 min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545173168-9f1947eebb8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block bg-brand-100 text-brand-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            #1 Laundry Service in Surabaya
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
            Fresh, Clean, & Delivered to <span className="text-brand-600">You.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-md">
            Professional laundry and dry cleaning with free pickup and delivery. Schedule your pickup online in less than 60 seconds.
          </p>

          <div className="bg-white p-2 rounded-xl shadow-lg inline-block w-full max-w-md mb-8">
            <form onSubmit={checkArea} className="flex">
              <div className="flex-grow flex items-center px-4 gap-2">
                <MapPin size={20} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter Zip Code"
                  className="w-full py-3 outline-none text-slate-700"
                  value={zipCode}
                  onChange={(e) => { setZipCode(e.target.value); setCheckResult(null); }}
                />
              </div>
              <button className="bg-brand-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-800 transition-colors">
                Check
              </button>
            </form>
            {checkResult === 'available' && (
              <div className="px-4 py-2 text-green-600 text-sm font-bold flex items-center gap-2">
                <CheckCircle size={14} /> Great! We cover your area.
              </div>
            )}
            {checkResult === 'unavailable' && (
              <div className="px-4 py-2 text-red-500 text-sm flex items-center gap-2">
                Sorry, we are not there yet.
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-lg font-medium text-center transition-all shadow-lg hover:shadow-brand-200 flex items-center justify-center gap-2">
              Schedule Pickup <ArrowRight size={18} />
            </Link>
            <Link to="/ai-quote" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-3.5 rounded-lg font-medium text-center transition-all flex items-center justify-center">
              AI Price Quote
            </Link>
          </div>
        </div>
        <div className="hidden md:block relative">
          <div className="absolute -inset-4 bg-brand-200 rounded-full blur-3xl opacity-30"></div>
          <img
            src="https://images.unsplash.com/photo-1517677208171-0bc5e2e3f603?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Clean Laundry Stack"
            className="relative rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-900">100% Satisfaction</p>
              <p className="text-sm text-slate-500">Or we re-wash for free</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: Clock, title: "24h Turnaround", desc: "Get your clean clothes back within 24 hours for standard service." },
    { icon: Truck, title: "Free Pickup & Delivery", desc: "We come to your door. Free for orders over Rp 100k." },
    { icon: Shield, title: "Damage Protection", desc: "Your clothes are insured against loss or damage while in our care." },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-2xl hover:bg-brand-50 transition-colors group border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 transition-transform">
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesPreview = () => {
  const services = PricingFactory.getLivePricing();

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We handle everything from your daily wear to your most delicate fabrics with professional care.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const asset = SERVICE_ASSETS[service.title] || { icon: Shirt, description: 'Premium laundry service.' };
            const Icon = asset.icon;

            return (
              <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3">{asset.description}</p>
                <Link to="/booking" className="text-brand-600 font-medium text-sm hover:underline">Book Now →</Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

const InstagramFeed = () => {
  const images = [
    'https://images.unsplash.com/photo-1521633606674-62299965d63c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1510154221590-ff63e90a136f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582735689369-4fe8d7520ce1?w=400&h=400&fit=crop',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Follow Us</h2>
            <p className="text-slate-500">@ClouSurabaya</p>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700">
            View Instagram <ArrowRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <a key={i} href="#" className="group relative overflow-hidden rounded-xl aspect-square block">
              <img src={src} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><Star size={16} fill="white" /> 124</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <ServicesPreview />
      <section className="py-20 bg-brand-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">Happy Customers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-left border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-400" />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-brand-200">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-200 leading-relaxed">"{t.text}"</p>
                <div className="flex gap-1 mt-4 text-brand-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <InstagramFeed />
      <section className="py-24 bg-brand-50 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Ready to Experience the Best Laundry Service?</h2>
          <p className="text-slate-600 mb-8 text-lg">Schedule your first pickup today and get 20% off with code <span className="font-mono font-bold text-brand-600 bg-brand-100 px-2 py-1 rounded">CLOU20</span></p>
          <Link to="/booking" className="inline-block bg-brand-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;