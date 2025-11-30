import React, { useState, useEffect } from 'react';
import { BookingStep, BookingData } from '../types';

import { PricingFactory, DynamicService } from '../src/core/ProceduralPricing';
import { Calendar, Clock, CreditCard, CheckCircle, ChevronRight, ChevronLeft, AlertCircle, Calendar as CalendarIcon, Download, Calculator, Scale, Droplets, Zap, Leaf, Heart, Shirt, Sparkles, Briefcase, Truck } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const Booking = () => {
  const [searchParams] = useSearchParams();

  // Local Scent Options (Moved from constants.ts)
  const SCENT_OPTIONS = [
    { id: 'lavender', name: 'Lavender Fields', description: 'Calming and floral', price: 0 },
    { id: 'eucalyptus', name: 'Eucalyptus Mint', description: 'Fresh and invigorating', price: 5000 },
    { id: 'citrus', name: 'Citrus Burst', description: 'Zesty lemon and lime', price: 5000 },
    { id: 'unscented', name: 'Hypoallergenic Free & Clear', description: 'No scent, gentle on skin', price: 0 },
  ];

  const [services] = useState<DynamicService[]>(() => PricingFactory.getLivePricing());

  const [step, setStep] = useState<BookingStep>(BookingStep.SERVICE_SELECTION);
  const [formData, setFormData] = useState<BookingData>({
    services: [],
    items: { 'T-Shirt': 0, 'Pants': 0, 'Dress': 0, 'Bed Sheet': 0 },
    estimatedWeight: 0,
    scent: 'lavender',
    isRush: false,
    ownDetergent: false,
    tipAmount: 0,
    date: '',
    timeSlot: '',
    name: '',
    address: '',
    phone: '',
    notes: '',
    paymentMethod: 'stripe'
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});

  // Effect to handle pre-selection
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      // Fuzzy match for legacy IDs or new dynamic IDs
      const serviceExists = services.some(s => s.id === serviceParam || s.id.includes(serviceParam));
      if (serviceExists) {
        setFormData(prev => {
          if (prev.services.includes(serviceParam)) return prev;
          return { ...prev, services: [...prev.services, serviceParam] };
        });
        setStep(BookingStep.PREFERENCES); // Skip to prefs if service selected
      }
    }
  }, [searchParams]);

  // Calculator Logic
  useEffect(() => {
    // Rough estimate: T-shirt 0.2kg, Pants 0.5kg, Dress 0.4kg, Sheet 0.8kg
    const weight =
      (formData.items['T-Shirt'] * 0.2) +
      (formData.items['Pants'] * 0.5) +
      (formData.items['Dress'] * 0.4) +
      (formData.items['Bed Sheet'] * 0.8);
    setFormData(prev => ({ ...prev, estimatedWeight: parseFloat(weight.toFixed(1)) }));
  }, [formData.items]);

  const validateStep = (currentStep: BookingStep): boolean => {
    const newErrors: Partial<Record<keyof BookingData, string>> = {};
    let isValid = true;

    if (currentStep === BookingStep.SERVICE_SELECTION) {
      if (formData.services.length === 0) {
        newErrors.services = "Please select at least one service.";
        isValid = false;
      }
    } else if (currentStep === BookingStep.DATE_TIME) {
      if (!formData.date) {
        newErrors.date = "Please select a pickup date.";
        isValid = false;
      }
      if (!formData.timeSlot) {
        newErrors.timeSlot = "Please select a time slot.";
        isValid = false;
      }
    } else if (currentStep === BookingStep.DETAILS) {
      if (!formData.name.trim()) {
        newErrors.name = "Full Name is required.";
        isValid = false;
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone Number is required.";
        isValid = false;
      }
      if (!formData.address.trim()) {
        newErrors.address = "Pickup Address is required.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const updateItemCount = (item: string, delta: number) => {
    setFormData(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [item]: Math.max(0, prev.items[item] + delta)
      }
    }));
  };

  const toggleService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id]
    }));
    if (errors.services) setErrors(prev => ({ ...prev, services: undefined }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof BookingData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const Steps = [
    { title: "Calculator", icon: Calculator },
    { title: "Service", icon: CheckCircle },
    { title: "Preferences", icon: Droplets },
    { title: "Schedule", icon: Calendar },
    { title: "Details", icon: CheckCircle },
    { title: "Payment", icon: CreditCard },
  ];

  const renderProgress = () => (
    <div className="mb-8 hidden md:block">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-500 -z-10 transition-all duration-500" style={{ width: `${(step / 6) * 100}%` }}></div>
        {Steps.map((s, i) => (
          <div key={i} className={`flex flex-col items-center gap-2 bg-white px-2 ${i <= step ? 'text-brand-600' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${i <= step ? 'border-brand-600 bg-brand-50' : 'border-slate-300 bg-white'}`}>
              <span className="text-xs font-bold">{i + 1}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wide">{s.title}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Step Components ---

  const CalculatorStep = () => (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-brand-50 p-6 rounded-xl border border-brand-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-brand-900 text-lg flex items-center gap-2"><Scale size={20} /> Instant Estimate</h3>
          <p className="text-brand-700 text-sm">Add items to estimate weight and price.</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-brand-600">{formData.estimatedWeight} kg</p>
          <p className="text-xs text-brand-500">Approx. Weight</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(formData.items).map(item => (
          <div key={item} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white">
            <span className="font-medium text-slate-700">{item}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => updateItemCount(item, -1)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold">-</button>
              <span className="w-6 text-center font-bold">{formData.items[item]}</span>
              <button onClick={() => updateItemCount(item, 1)} className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 hover:bg-brand-200 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-slate-500 mb-4">This is just an estimate. We weigh everything exactly upon pickup.</p>
        <button onClick={handleNext} className="text-brand-600 font-bold hover:underline">Skip Calculator</button>
      </div>
    </div>
  );

  const ServiceSelection = () => (
    <div className="animate-in fade-in">
      {errors.services && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-4 text-sm">
          <AlertCircle size={16} /> {errors.services}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          {services.map(service => {
            let Icon = Shirt;
            if (service.title.toLowerCase().includes('dry')) Icon = Sparkles;
            if (service.title.toLowerCase().includes('iron')) Icon = Zap;
            if (service.title.toLowerCase().includes('leather')) Icon = Briefcase;

            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${formData.services.includes(service.id) ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-brand-200'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{service.title}</h3>
                      <div className="flex gap-2 mt-1">
                        {service.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {formData.services.includes(service.id) && <CheckCircle className="text-brand-600" size={24} />}
                </div>
                <p className="text-slate-500 text-sm mt-2">Starting from Rp {service.basePrice.toLocaleString()}</p>
                {service.surgeMultiplier > 1 && (
                  <p className="text-xs text-orange-600 font-bold mt-1 flex items-center gap-1"><Zap size={12} /> Surge Pricing Active (x{service.surgeMultiplier})</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );

  const PreferencesStep = () => (
    <div className="space-y-8 animate-in fade-in">
      {/* Scent Menu */}
      <div>
        <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2"><Droplets size={20} className="text-brand-500" /> Scent Menu</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {SCENT_OPTIONS.map(scent => (
            <div
              key={scent.id}
              onClick={() => setFormData(prev => ({ ...prev, scent: scent.id }))}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.scent === scent.id ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500' : 'border-slate-200 hover:border-brand-300'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800">{scent.name}</span>
                {scent.price > 0 && <span className="text-xs font-bold text-brand-600">+Rp {scent.price}</span>}
              </div>
              <p className="text-xs text-slate-500">{scent.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rush & Detergent */}
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-slate-900 mb-2">Options</h3>

        <div
          onClick={() => setFormData(prev => ({ ...prev, isRush: !prev.isRush }))}
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${formData.isRush ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${formData.isRush ? 'bg-orange-200 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>
              <Zap size={20} fill={formData.isRush ? "currentColor" : "none"} />
            </div>
            <div>
              <p className={`font-bold ${formData.isRush ? 'text-orange-900' : 'text-slate-700'}`}>Date Night Rush ⚡</p>
              <p className="text-xs text-slate-500">Same day delivery (if booked before 10am)</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-orange-600">+Rp 25k</span>
          </div>
        </div>

        <div
          onClick={() => setFormData(prev => ({ ...prev, ownDetergent: !prev.ownDetergent }))}
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${formData.ownDetergent ? 'border-brand-500 bg-brand-50' : 'border-slate-200'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${formData.ownDetergent ? 'bg-brand-200 text-brand-700' : 'bg-slate-100 text-slate-500'}`}>
              <Leaf size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-700">I have my own detergent</p>
              <p className="text-xs text-slate-500">Provide your pods/liquid at pickup</p>
            </div>
          </div>
          {formData.ownDetergent && <CheckCircle className="text-brand-600" size={20} />}
        </div>
      </div>
    </div>
  );

  const DateTimeSelection = () => (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Date</label>
        <input
          type="date"
          name="date"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none ${errors.date ? 'border-red-500' : 'border-slate-300'}`}
          value={formData.date}
          onChange={handleInputChange}
          min={new Date().toISOString().split('T')[0]}
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Time Slot</label>
        <div className="grid grid-cols-2 gap-3">
          {['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00', '19:00 - 21:00'].map(slot => (
            <button
              key={slot}
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, timeSlot: slot }));
                if (errors.timeSlot) setErrors(prev => ({ ...prev, timeSlot: undefined }));
              }}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${formData.timeSlot === slot ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-300 text-slate-600 hover:border-brand-400'}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock size={16} /> {slot}
              </div>
            </button>
          ))}
        </div>
        {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
      </div>
    </div>
  );

  const DetailsForm = () => (
    <div className="space-y-4 animate-in fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`w-full p-3 border rounded-lg outline-none ${errors.name ? 'border-red-500' : 'border-slate-300'}`} placeholder="John Doe" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full p-3 border rounded-lg outline-none ${errors.phone ? 'border-red-500' : 'border-slate-300'}`} placeholder="+62 812..." />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Address</label>
        <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className={`w-full p-3 border rounded-lg outline-none ${errors.address ? 'border-red-500' : 'border-slate-300'}`} placeholder="Address, Unit No, etc." />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>
    </div>
  );

  const PaymentStep = () => (
    <div className="space-y-6 animate-in fade-in">
      {/* Tipping */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Heart size={16} className="text-red-500" fill="currentColor" /> Tip your Courier & Folders?</h3>
        <div className="flex gap-2">
          {[0, 5000, 10000, 20000].map(amount => (
            <button
              key={amount}
              onClick={() => setFormData(prev => ({ ...prev, tipAmount: amount }))}
              className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${formData.tipAmount === amount ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-300'}`}
            >
              {amount === 0 ? 'No Tip' : `Rp ${amount / 1000}k`}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-bold text-slate-900 mb-2">Order Summary</h3>
        <ul className="space-y-2 text-sm text-slate-600 mb-4">
          {formData.services.map(sid => <li key={sid} className="flex justify-between"><span>Service:</span> <span className="font-medium capitalize">{sid.replace('-', ' ')}</span></li>)}
          <li className="flex justify-between"><span>Scent:</span> <span className="font-medium capitalize">{SCENT_OPTIONS.find(s => s.id === formData.scent)?.name}</span></li>
          {formData.isRush && <li className="flex justify-between text-orange-600"><span>Rush Fee:</span> <span>Rp 25,000</span></li>}
          {formData.tipAmount > 0 && <li className="flex justify-between text-green-600"><span>Driver Tip:</span> <span>Rp {formData.tipAmount.toLocaleString()}</span></li>}
        </ul>

        {/* Carbon Footprint */}
        <div className="bg-green-50 p-3 rounded-lg flex items-center gap-3 text-xs text-green-800 border border-green-100">
          <Leaf size={16} />
          <span>Estimated Carbon Saved: <strong>{(formData.estimatedWeight * 0.5).toFixed(1)} kg</strong> CO2e compared to home washing.</span>
        </div>
      </div>

      <h4 className="font-medium text-slate-900 mb-3">Payment Method</h4>
      <div className="space-y-2">
        {['stripe', 'paypal', 'cash', 'crypto'].map(method => (
          <label key={method} className="flex items-center gap-4 p-3 border rounded-xl cursor-pointer hover:border-brand-400 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50">
            <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleInputChange} className="w-4 h-4 text-brand-600" />
            <span className="font-medium capitalize">{method === 'stripe' ? 'Credit Card' : method}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const Confirmation = () => (
    <div className="text-center py-12 animate-in zoom-in">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">Your courier is notified. Order ID: <span className="font-mono font-bold">#ORD-{(Math.random() * 10000).toFixed(0)}</span></p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-300 px-6 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">
          <CalendarIcon size={18} /> Add to Calendar
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-300 px-6 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">
          <Download size={18} /> Receipt
        </button>
      </div>

      <div className="flex justify-center gap-4">
        <Link to="/tracking" className="bg-brand-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-700 shadow-lg">Track Order</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {step !== BookingStep.CONFIRMATION && (
            <>
              <h1 className="text-2xl font-serif font-bold text-center mb-8">Schedule Pickup</h1>
              {renderProgress()}
            </>
          )}

          <div className="min-h-[300px]">
            {step === BookingStep.CALCULATOR && <CalculatorStep />}
            {step === BookingStep.SERVICE_SELECTION && <ServiceSelection />}
            {step === BookingStep.PREFERENCES && <PreferencesStep />}
            {step === BookingStep.DATE_TIME && <DateTimeSelection />}
            {step === BookingStep.DETAILS && <DetailsForm />}
            {step === BookingStep.PAYMENT && <PaymentStep />}
            {step === BookingStep.CONFIRMATION && <Confirmation />}
          </div>

          {step !== BookingStep.CONFIRMATION && (
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <ChevronLeft size={20} /> Back
              </button>
              <button
                onClick={handleNext}
                className="bg-brand-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-brand-700 flex items-center gap-2 shadow-lg shadow-brand-200"
              >
                {step === BookingStep.PAYMENT ? 'Book Now' : 'Next'} <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;