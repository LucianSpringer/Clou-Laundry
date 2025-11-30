import React, { useState } from 'react';
import { ContentFactory } from '../src/core/ContentFactory';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const [jobs] = useState(() => ContentFactory.getCareers());

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-brand-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-6">Join the Revolution</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We're building the future of laundry in Surabaya. If you're passionate about quality and technology, we want you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Clou?</h2>
            <ul className="space-y-4">
              {[
                'Competitive Salary & Bonuses',
                'Health Insurance & Benefits',
                'Modern, Air-Conditioned Facilities',
                'Career Growth Opportunities',
                'Tech-First Environment'
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Team Meeting"
            className="rounded-2xl shadow-xl rotate-1"
          />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Open Positions</h2>
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-8 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all flex flex-col md:flex-row justify-between items-center group">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Briefcase size={16} /> {job.department}</span>
                  <span className="flex items-center gap-1"><Clock size={16} /> {job.type}</span>
                  <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                </div>
              </div>
              <button className="px-6 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-200 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all whitespace-nowrap">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-slate-900 text-white rounded-3xl p-12">
          <h2 className="text-2xl font-bold mb-4">Don't see your role?</h2>
          <p className="text-slate-400 mb-8">We are always looking for talent. Send your CV to careers@clousurabaya.com</p>
          <a href="mailto:careers@clousurabaya.com" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors">
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Careers;