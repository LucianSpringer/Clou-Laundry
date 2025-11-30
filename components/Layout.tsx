import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Phone, MapPin, Mail, MessageCircle, Send, QrCode, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_NAME, COMPANY_PHONE, COMPANY_ADDRESS, COMPANY_EMAIL } from '../src/core/ContentAssets';
import { useTheme } from '../src/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Subscriptions', path: '/subscriptions' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-3' : 'bg-white/90 dark:bg-slate-900/50 backdrop-blur-sm md:bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-brand-800 dark:text-brand-400 flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white text-lg">C</div>
          {COMPANY_NAME}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors ${location.pathname === link.path ? 'text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <Link to="/booking" className="bg-brand-600 text-white px-5 py-2 rounded-full font-medium hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 dark:shadow-none">
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 dark:text-slate-200">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-lg py-4 px-4 flex flex-col gap-4 border-t dark:border-slate-800 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-slate-700 dark:text-slate-200 font-medium py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/ai-quote" className="text-slate-700 dark:text-slate-200 font-medium py-2 border-b border-slate-100 dark:border-slate-800">AI Quote</Link>
          <Link to="/smart-lockers" className="text-slate-700 dark:text-slate-200 font-medium py-2 border-b border-slate-100 dark:border-slate-800">Smart Lockers</Link>
          <Link to="/contact" className="text-slate-700 dark:text-slate-200 font-medium py-2 border-b border-slate-100 dark:border-slate-800">Contact</Link>
          <Link to="/booking" className="bg-brand-600 text-white text-center py-3 rounded-lg font-medium mt-2">
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const [showQr, setShowQr] = useState(false);

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-12 border-t dark:border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-serif font-bold text-white mb-4">{COMPANY_NAME}</h3>
          <p className="text-slate-400 mb-4">Professional laundry and dry cleaning services delivered to your doorstep in Surabaya.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-400 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-brand-400 transition-colors"><MessageCircle size={20} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-white transition-colors">Wash & Fold</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Dry Cleaning</Link></li>
            <li><Link to="/smart-lockers" className="hover:text-white transition-colors">Smart Lockers</Link></li>
            <li><Link to="/subscriptions" className="hover:text-white transition-colors">Subscriptions</Link></li>
            <li><Link to="/ai-quote" className="hover:text-white transition-colors">AI Price Quote</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition-colors">Transformation Gallery</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/gift-cards" className="hover:text-white transition-colors">Gift Cards</Link></li>
            <li><Link to="/loyalty" className="hover:text-white transition-colors text-brand-300">Clou Rewards</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Support</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/tracking" className="hover:text-white transition-colors text-brand-400">Track Order</Link></li>
            <li><Link to="/history" className="hover:text-white transition-colors">Order History</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li className="pt-2">
              <button onClick={() => setShowQr(true)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <QrCode size={16} /> Get the App
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setShowQr(false)}>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl text-center max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Scan to Download</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Never carry laundry again. Get the Clou app.</p>
            <div className="w-48 h-48 bg-slate-100 dark:bg-white mx-auto rounded-lg flex items-center justify-center mb-6">
              <QrCode size={100} className="text-slate-800" />
            </div>
            <button onClick={() => setShowQr(false)} className="text-brand-600 dark:text-brand-400 font-bold hover:underline">Close</button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a
    href="https://wa.me/"
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={28} />
  </a>
);

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-brand-600 p-4 text-white flex justify-between items-center">
            <span className="font-medium">Clou Support</span>
            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          <div className="h-64 p-4 bg-slate-50 dark:bg-slate-900 overflow-y-auto flex flex-col gap-3">
            <div className="self-start bg-white dark:bg-slate-800 p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-slate-700 dark:text-slate-200 max-w-[85%]">
              Hello! 👋 Need help with a booking or stain advice?
            </div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-800 border-t dark:border-slate-700 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 text-sm outline-none px-2 bg-transparent dark:text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="text-brand-600 dark:text-brand-400 hover:text-brand-700">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-700 hover:bg-brand-800 text-white p-3 rounded-full shadow-lg transition-all"
      >
        <span className="sr-only">Toggle Chat</span>
        {isOpen ? <X size={20} /> : <span className="font-bold text-sm px-2">Chat</span>}
      </button>
    </div>
  );
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <LiveChatWidget />
    </div>
  );
};

export default Layout;