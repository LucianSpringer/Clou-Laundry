import React, { useEffect } from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Loyalty from './pages/Loyalty';
import Blog from './pages/Blog';
import Testimonials from './pages/Testimonials';
import OrderStatus from './pages/OrderStatus';
import OrderHistory from './pages/OrderHistory';
import Subscriptions from './pages/Subscriptions';
import Gallery from './pages/Gallery';
import AiQuote from './pages/AiQuote';
import Careers from './pages/Careers';
import GiftCards from './pages/GiftCards';
import SmartLockers from './pages/SmartLockers';
import AdminDashboard from './pages/AdminDashboard';
import Commercial from './pages/Commercial';
import DisasterRelief from './pages/DisasterRelief';

// Simple ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Placeholder for About page
const About = () => (
  <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-4xl font-serif font-bold mb-6">About Clou Laundry</h1>
    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
      Founded in 2023 in the heart of Surabaya, Clou aims to revolutionize the way you think about laundry.
      We combine modern technology with traditional care to deliver the freshest clothes to your doorstep.
    </p>
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Our Team" className="rounded-xl shadow-lg" />
      <div className="text-left flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
        <p className="text-slate-600 mb-4">To provide convenient, eco-friendly, and high-quality fabric care services that give our customers the luxury of time.</p>
        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
        <p className="text-slate-600">To be Surabaya's most trusted household partner.</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/tracking" element={<OrderStatus />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/ai-quote" element={<AiQuote />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/smart-lockers" element={<SmartLockers />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="/disaster-relief" element={<DisasterRelief />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;