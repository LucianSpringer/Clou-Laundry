import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { Check, ImageOff, ChevronDown, ChevronUp, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Service } from '../types';

const ServiceImage = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-[300px] md:h-[400px] bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400 border border-slate-200">
        <ImageOff size={48} className="mb-2 opacity-50" />
        <span className="text-sm font-medium">Image not available</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="rounded-2xl shadow-xl w-full object-cover h-[300px] md:h-[400px]"
      onError={() => setHasError(true)}
    />
  );
};

const Services = () => {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<{ [serviceId: string]: number | null }>({});

  const toggleService = (id: string) => {
    setExpandedServiceId(prev => prev === id ? null : id);
  };

  const toggleFaq = (serviceId: string, index: number) => {
    setOpenFaq(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === index ? null : index
    }));
  };

  const handleShare = async (service: Service) => {
    const url = `${window.location.origin}/services`;
    const text = `Check out the ${service.title} service at Clou Laundry!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: service.title,
          text: text,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      await navigator.clipboard.writeText(`${text} ${url}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-brand-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">We offer a comprehensive range of laundry solutions tailored to your specific needs.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 space-y-20">
        {SERVICES.map((service, index) => (
          <div key={service.id} id={service.id} className="border-b border-slate-100 pb-20 last:border-0 last:pb-0 scroll-mt-24">
            <div className={`flex flex-col md:flex-row gap-12 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full">
                {/* Distinct Icon */}
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <service.icon size={32} />
                </div>
                
                <div className="flex justify-between items-start">
                   <h2 className="text-3xl font-bold text-slate-900 mb-4">{service.title}</h2>
                   <button 
                     onClick={() => handleShare(service)}
                     className="p-2 text-slate-400 hover:text-brand-600 transition-colors rounded-full hover:bg-slate-50"
                     title="Share Service"
                   >
                     <Share2 size={20} />
                   </button>
                </div>

                <p className="text-lg text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                   <Link 
                     to={`/booking?service=${service.id}`}
                     className="bg-brand-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                   >
                     Book This Service <ArrowRight size={18} />
                   </Link>
                   <button 
                     onClick={() => toggleService(service.id)}
                     className="flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors px-4 py-3 rounded-lg hover:bg-brand-50"
                   >
                     {expandedServiceId === service.id ? 'Hide Details' : 'Show Details & Pricing'}
                     <ChevronDown 
                       size={20} 
                       className={`transition-transform duration-300 ${expandedServiceId === service.id ? 'rotate-180' : ''}`}
                     />
                   </button>
                </div>

                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    expandedServiceId === service.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                    <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-brand-600">{service.priceStart}</span>
                        <span className="text-slate-500 text-sm ml-2">starting price</span>
                      </div>
                      
                      {service.benefits && service.benefits.length > 0 && (
                        <ul className="space-y-3 mb-6">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700">
                              <Check size={20} className="text-green-500 shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    {/* Service specific FAQ */}
                    {service.faqs && service.faqs.length > 0 && (
                      <div className="mt-8">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                           <span className="w-1 h-6 bg-brand-500 rounded-full"></span>
                           Frequently Asked Questions
                        </h4>
                        <div className="space-y-3">
                          {service.faqs.map((faq, idx) => (
                            <div 
                              key={idx} 
                              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                                openFaq[service.id] === idx ? 'border-brand-200 bg-brand-50/30' : 'border-slate-200 bg-white'
                              }`}
                            >
                              <button 
                                onClick={() => toggleFaq(service.id, idx)}
                                className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50 transition-colors"
                              >
                                <span className={`font-medium ${openFaq[service.id] === idx ? 'text-brand-700' : 'text-slate-700'}`}>
                                  {faq.question}
                                </span>
                                <ChevronDown 
                                  size={18} 
                                  className={`transition-transform duration-300 ${
                                    openFaq[service.id] === idx ? 'text-brand-600 rotate-180' : 'text-slate-400'
                                  }`} 
                                />
                              </button>
                              <div 
                                className={`grid transition-all duration-300 ease-in-out ${
                                  openFaq[service.id] === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                }`}
                              >
                                <div className="overflow-hidden">
                                  <div className="p-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100/50">
                                    <div className="pt-2">{faq.answer}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

              </div>
              <div className="flex-1 w-full md:sticky md:top-24">
                <ServiceImage 
                  src={`https://picsum.photos/seed/${service.id}/600/400`} 
                  alt={service.title} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;