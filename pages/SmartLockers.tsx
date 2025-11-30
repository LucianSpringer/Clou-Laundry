import React from 'react';
import { Lock, Clock, MapPin, Smartphone, Key, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LockerProtocol } from '../src/core/LockerSecurity';

const SmartLockers = () => {
  const [accessCode, setAccessCode] = React.useState<string | null>(null);
  const [timer, setTimer] = React.useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && accessCode) {
      setAccessCode(null); // Expire code
    }
    return () => clearInterval(interval);
  }, [timer, accessCode]);

  const generateCode = () => {
    const code = LockerProtocol.generateAccessCode('LOCKER-01');
    setAccessCode(code);
    setTimer(30); // 30 second validity
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595515106967-434074db1f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">24/7 Smart Lockers</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Drop off and pick up on your schedule. No waiting, no contact, complete freedom.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-3 rounded-full font-bold transition-all">
              Find Nearest Locker
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 bg-slate-50 rounded-2xl">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-brand-600">
              <Smartphone size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">1. Scan & Drop</h3>
            <p className="text-slate-600">Use the Clou app to scan the QR code on any available locker. Place your bag inside and lock it.</p>
          </div>
          <div className="text-center p-8 bg-slate-50 rounded-2xl">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-brand-600">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">2. We Clean</h3>
            <p className="text-slate-600">Our courier picks up your items. We wash, fold, or dry clean them according to your preferences.</p>
          </div>
          <div className="text-center p-8 bg-slate-50 rounded-2xl">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-brand-600">
              <Lock size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">3. Pick Up Anytime</h3>
            <p className="text-slate-600 mb-4">You'll get a secure code when your laundry is ready. Visit the locker 24/7 to collect your fresh clothes.</p>

            {!accessCode ? (
              <button
                onClick={generateCode}
                className="bg-brand-100 text-brand-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-200 transition-colors flex items-center gap-2 mx-auto"
              >
                <Key size={16} /> Generate Access Code
              </button>
            ) : (
              <div className="bg-slate-900 text-white p-4 rounded-xl animate-in zoom-in">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Secure TOTP</p>
                <div className="font-mono text-3xl font-bold tracking-widest text-brand-400 mb-2">{accessCode}</div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <RefreshCw size={12} className={timer < 10 ? "animate-spin text-red-500" : ""} />
                  Expires in {timer}s
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-brand-600 rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Host a Locker at Your Building</h2>
            <p className="text-brand-100 mb-8 text-lg">
              Increase tenant satisfaction by adding Clou Smart Lockers to your apartment complex or office building. We handle installation and maintenance.
            </p>
            <Link to="/contact" className="bg-white text-brand-900 px-8 py-3 rounded-lg font-bold hover:bg-brand-50 transition-colors">
              Partner with Us
            </Link>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Lock size={80} className="opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartLockers;