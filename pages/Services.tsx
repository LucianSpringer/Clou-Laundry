import React, { useState } from 'react';
import { PricingFactory, DynamicService } from '../src/core/ProceduralPricing';
import { MachineDoctor } from '../src/core/SpectralAudioEngine';
import { Check, ImageOff, ChevronDown, ChevronUp, Share2, ArrowRight, Shirt, Sparkles, Briefcase, Truck, Zap, Feather, CheckCircle, Activity, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const [services] = useState(() => PricingFactory.getLivePricing());
  const [diagnosis, setDiagnosis] = useState<{ status: string, faultType: string, peakFrequency: number } | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const toggleService = (id: string) => {
    setExpandedServiceId(prev => prev === id ? null : id);
  };

  const toggleFaq = (serviceId: string, index: number) => {
    setOpenFaq(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === index ? null : index
    }));
  };

  const handleShare = async (service: DynamicService) => {
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

  const handleDiagnosis = () => {
    setIsDiagnosing(true);
    setDiagnosis(null);

    // Simulate recording delay
    setTimeout(() => {
      const result = MachineDoctor.analyzeSpectrum(Math.random());
      setDiagnosis(result);
      setIsDiagnosing(false);
    }, 2000);
  };

  return (
    <div className="bg-white">
      <div className="bg-brand-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">We offer a comprehensive range of laundry solutions tailored to your specific needs.</p>

          {/* Machine Doctor Feature */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
              <Activity size={20} className="text-brand-600" /> Machine Doctor
            </h3>
            <p className="text-sm text-slate-500 mb-4">Is your home washer making weird noises? Use our AI to diagnose it.</p>

            {!diagnosis && (
              <button
                onClick={handleDiagnosis}
                disabled={isDiagnosing}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${isDiagnosing ? 'bg-slate-100 text-slate-400' : 'bg-brand-600 text-white hover:bg-brand-700'}`}
              >
                {isDiagnosing ? (
                  <>Listening... <span className="animate-pulse">●</span></>
                ) : (
                  <><Mic size={18} /> Diagnose My Machine</>
                )}
              </button>
            )}

            {diagnosis && (
              <div className="animate-in fade-in zoom-in duration-300">
                <div className={`p-4 rounded-lg mb-4 ${diagnosis.status === 'HEALTHY' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Status</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${diagnosis.status === 'HEALTHY' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {diagnosis.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{diagnosis.faultType}</h4>
                  <p className="text-xs text-slate-500">Peak Frequency: {diagnosis.peakFrequency}Hz</p>
                </div>
                <button
                  onClick={() => setDiagnosis(null)}
                  className="text-sm text-brand-600 font-medium hover:underline"
                >
                  Test Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 space-y-20">
        {services.map((service, index) => (
          <div key={service.id} id={service.id} className="border-b border-slate-100 pb-20 last:border-0 last:pb-0 scroll-mt-24">
            <div className={`flex flex-col md:flex-row gap-12 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full">
                {/* Distinct Icon */}
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  {/* Icon rendering logic based on service title or ID could go here, but for now we rely on the generic structure or add icon to service object if needed. 
                      Since the service object from PricingFactory doesn't have an icon component directly, we can skip or infer it. 
                      For safety, let's use a default or infer from title. */}
                  <Shirt size={32} />
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
                <div className="flex gap-4 mb-8">
                  <Link to={`/booking?service=${service.id}`} className="bg-brand-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors flex items-center gap-2">
                    Book Now <ArrowRight size={18} />
                  </Link>
                  <button
                    onClick={() => toggleService(service.id)}
                    className="border border-slate-200 text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    {expandedServiceId === service.id ? 'Show Less' : 'Learn More'}
                    {expandedServiceId === service.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedServiceId === service.id && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-slate-50 rounded-xl p-6 mb-8">
                      <h3 className="font-bold text-slate-900 mb-4">What's Included:</h3>
                      <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Base Price</p>
                          <p className="text-xl font-bold text-brand-600">Rp {service.basePrice.toLocaleString()}<span className="text-sm font-normal text-slate-500">/kg</span></p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500 uppercase font-bold">Turnaround</p>
                          <p className="text-slate-900 font-bold flex items-center gap-1 justify-end"><Zap size={14} className="text-orange-500" /> {service.turnaroundTime}h</p>
                        </div>
                      </div>
                    </div>

                    {/* FAQ Section */}
                    <div>
                      <h3 className="font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
                      <div className="space-y-2">
                        {service.faq.map((faq, i) => (
                          <div key={i} className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => toggleFaq(service.id, i)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                            >
                              <span className="font-medium text-slate-800">{faq.question}</span>
                              {openFaq[service.id] === i ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                            </button>
                            {openFaq[service.id] === i && (
                              <div className="p-4 pt-0 text-sm text-slate-600 bg-slate-50 border-t border-slate-100">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Service Image */}
              <div className="flex-1 w-full">
                <ServiceImage src={service.imageUrl} alt={service.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;