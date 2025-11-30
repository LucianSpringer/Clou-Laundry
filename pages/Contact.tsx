import React, { useState } from 'react';
import { MapPin, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, FAQS } from '../constants';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-white">
      <div className="bg-brand-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-brand-200">We'd love to hear from you. Here's how to reach us.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Get in Touch</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500" />
                <input type="email" placeholder="Email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500" />
                <textarea rows={4} placeholder="Message" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"></textarea>
                <button className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors">Send Message</button>
              </form>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Visit Us</h4>
                  <p className="text-slate-600">{COMPANY_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Call Us</h4>
                  <p className="text-slate-600">{COMPANY_PHONE}</p>
                  <p className="text-sm text-slate-400">Mon-Sat: 08:00 - 20:00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Us</h4>
                  <p className="text-slate-600">{COMPANY_EMAIL}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] bg-slate-200 rounded-2xl overflow-hidden relative shadow-lg">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63320.43002272847!2d112.7272825!3d-7.2754438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x3027a76e352be40!2sSurabaya%2C%20Surabaya%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1709222222222!5m2!1sen!2sid" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Google Maps"
            ></iframe>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800">{faq.question}</span>
                  {openFaq === index ? <ChevronUp className="text-brand-500" /> : <ChevronDown className="text-slate-400" />}
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-slate-50 text-slate-600 border-t border-slate-100 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
