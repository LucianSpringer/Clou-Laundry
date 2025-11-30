import React, { useState, useEffect } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Bell, Star, Gift, Navigation } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { TelemetryEngine } from '../src/core/DeliveryTrajectory';

const OrderStatus = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setOrderId(idFromUrl);
      performSearch(idFromUrl);
    }
  }, [searchParams]);

  const performSearch = (id: string) => {
    if (!id.trim()) return;

    setIsSearching(true);
    setOrderData(null);

    // Real-time calculation instead of setTimeout
    const arrival = TelemetryEngine.estimateArrival(id);

    let mockStatus = 'in_progress';
    let mockSteps = [
      { status: 'placed', label: 'Order Placed', time: 'Oct 24, 09:30 AM', completed: true },
      { status: 'pickup_scheduled', label: 'Pickup Scheduled', time: 'Oct 24, 10:00 AM', completed: true },
      { status: 'in_progress', label: 'Cleaning in Progress', time: 'Oct 24, 02:15 PM', completed: true },
      { status: 'out_for_delivery', label: 'Out for Delivery', time: 'Pending', completed: false },
      { status: 'delivered', label: 'Delivered', time: 'Pending', completed: false },
    ];

    if (id.toUpperCase().includes('DEL') || id.toUpperCase() === 'ORD-7654') {
      mockStatus = 'delivered';
      mockSteps = mockSteps.map(s => ({ ...s, completed: true, time: s.time === 'Pending' ? 'Oct 25, 10:00 AM' : s.time }));
    }
    if (id.toUpperCase().includes('OUT') || id.toUpperCase() === 'ORD-3321') {
      mockStatus = 'out_for_delivery';
      mockSteps[3].completed = true;
      mockSteps[3].time = 'Oct 25, 08:30 AM';
    }

    setOrderData({
      id: id.toUpperCase(),
      status: mockStatus,
      estimatedDelivery: mockStatus === 'delivered' ? 'Delivered' : arrival,
      items: ['Wash & Fold (5kg)', 'Suit (2 pcs)'],
      steps: mockSteps
    });

    setIsSearching(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(orderId);
  };

  const enableNotifications = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationsEnabled(true);
          new Notification("Clou Laundry Notifications", { body: `Updates enabled for Order #${orderId || '...'}` });
        }
      });
    }
  };

  const calculateProgress = () => {
    if (!orderData) return 0;
    const totalSteps = orderData.steps.length;
    const completedCount = orderData.steps.filter((s: any) => s.completed).length;
    if (completedCount === totalSteps) return 100;
    if (completedCount === 0) return 5;
    return (completedCount / totalSteps) * 100;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-brand-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Track Your Order</h1>
          <p className="text-brand-200">Enter your order ID to see real-time updates.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start">

          <div className="flex-grow w-full">
            {/* Search Box */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
              <form onSubmit={handleSearch} className="flex gap-4">
                <input
                  type="text"
                  placeholder="Order ID"
                  className="flex-1 p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-brand-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                  {isSearching ? '...' : 'Track'}
                </button>
              </form>
            </div>

            {/* Result Card */}
            {orderData && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                <div className="h-3 w-full bg-slate-100">
                  <div className="h-full bg-brand-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(14,165,233,0.5)]" style={{ width: `${calculateProgress()}%` }}></div>
                </div>

                <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">Order #{orderData.id}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1"><Clock size={14} /> Est: {orderData.estimatedDelivery}</p>
                  </div>
                  <button onClick={enableNotifications} className={`p-2 rounded-full ${notificationsEnabled ? 'bg-brand-100 text-brand-600' : 'bg-slate-200 text-slate-500'}`}>
                    <Bell size={20} />
                  </button>
                </div>

                {orderData.status === 'out_for_delivery' && (
                  <div className="h-64 bg-slate-200 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] bg-cover opacity-50"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50 animate-pulse">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-brand-100 rounded-full text-brand-600">
                            <Navigation size={24} className="animate-bounce" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Live Telemetry</p>
                            <p className="font-mono font-bold text-slate-800">
                              {TelemetryEngine.getDriverPosition(orderData.id).lat.toFixed(4)}, {TelemetryEngine.getDriverPosition(orderData.id).lng.toFixed(4)}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-600 border-t border-slate-200 pt-2 mt-2">
                          <span>Bearing: {Math.round(TelemetryEngine.getDriverPosition(orderData.id).bearing)}°</span>
                          <span className="text-brand-600 font-bold">Updating...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {orderData.status === 'delivered' && (
                    <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-8 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-brand-800">Delivered!</h4>
                        <p className="text-brand-600 text-sm">Rate your experience?</p>
                      </div>
                      <Link to="/testimonials" className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Rate</Link>
                    </div>
                  )}

                  <div className="relative pl-4 space-y-0">
                    <div className="absolute left-[27px] top-4 bottom-10 w-0.5 bg-slate-100">
                      <div className="w-full bg-green-500 transition-all duration-1000 ease-out" style={{ height: `${(orderData.steps.filter((s: any) => s.completed).length - 1) / (orderData.steps.length - 1) * 100}%` }}></div>
                    </div>
                    {orderData.steps.map((step: any, index: number) => (
                      <div key={index} className={`relative flex gap-6 pb-8 last:pb-0 ${step.completed ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                        <div className={`z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-4 transition-all ${step.completed ? 'bg-brand-50 text-brand-600 border-white shadow-md' : 'bg-slate-50 text-slate-300 border-slate-50'}`}>
                          <CheckCircle size={24} />
                        </div>
                        <div className="pt-2">
                          <h4 className="font-bold text-lg">{step.label}</h4>
                          <p className="text-sm text-slate-500 mt-1">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Referral Widget */}
          <div className="w-full md:w-80 shrink-0">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Gift size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Give Rp 20k, Get Rp 20k</h3>
              <p className="text-purple-100 text-sm mb-6">Refer a friend to Clou and you both get Rp 20,000 off your next order!</p>
              <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center mb-4 border border-white/20">
                <code className="font-mono font-bold">CLOU-USER-123</code>
                <button className="text-xs font-bold bg-white text-purple-700 px-2 py-1 rounded hover:bg-purple-50">COPY</button>
              </div>
              <button className="w-full bg-white text-purple-700 font-bold py-2 rounded-lg hover:bg-purple-50 transition-colors">
                Share Link
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderStatus;