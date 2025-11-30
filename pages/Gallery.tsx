import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../src/core/ContentAssets';
import { Link } from 'react-router-dom';

const BeforeAfterCard = ({ item }: { item: typeof GALLERY_ITEMS[0] }) => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden h-[400px] group cursor-pointer shadow-xl"
      onMouseEnter={() => setShowAfter(true)}
      onMouseLeave={() => setShowAfter(false)}
      onClick={() => setShowAfter(!showAfter)}
    >
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        <img src={item.before} alt="Before" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          Before
        </div>
      </div>
      <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${showAfter ? 'opacity-100' : 'opacity-0'}`}>
        <img src={item.after} alt="After" className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">
          After
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
        <h3 className="text-white font-bold text-lg">{item.title}</h3>
        <p className="text-slate-300 text-sm">{item.category}</p>
      </div>
    </div>
  );
};

const Gallery = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white py-16 border-b border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Transformation Gallery</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            See the magic of professional cleaning. Hover or click on the images to reveal the results.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map(item => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-xl text-slate-700 mb-6 font-medium">Have a stained item you're worried about?</p>
          <div className="flex justify-center gap-4">
            <Link to="/ai-quote" className="bg-brand-600 text-white px-8 py-3 rounded-full font-bold hover:bg-brand-700 transition-colors shadow-lg">
              Get an Instant Quote
            </Link>
            <Link to="/contact" className="bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-full font-bold hover:bg-slate-50 transition-colors">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;