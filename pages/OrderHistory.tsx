import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_ORDER_HISTORY } from '../constants';
import { 
  Package, Clock, RefreshCw, ChevronRight, Star, Filter, 
  Calendar, ChevronDown, ChevronUp, XCircle, Truck, 
  CheckCircle, ClipboardList, Timer, Camera, X
} from 'lucide-react';
import { OrderHistoryItem } from '../types';

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderHistoryItem[]>(MOCK_ORDER_HISTORY);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({ start: '', end: '' });
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [viewingPhotos, setViewingPhotos] = useState<string[] | null>(null);
  const navigate = useNavigate();

  const toggleExpand = (id: string) => {
    setExpandedOrderId(prev => prev === id ? null : id);
  };

  const handleCancelOrder = (id: string, status: string) => {
    if (status === 'Out for Delivery') {
       if (!window.confirm('Order is out for delivery. Cancelling now may incur a delivery fee. Continue?')) return;
    } else {
       if (!window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) return;
    }
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
  };
  
  const handleReorder = (orderId: string) => {
     navigate(`/booking?reorder=${orderId}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    let matchesDate = true;
    
    if (dateRange.start) {
      matchesDate = matchesDate && new Date(order.date) >= new Date(dateRange.start);
    }
    if (dateRange.end) {
      matchesDate = matchesDate && new Date(order.date) <= new Date(dateRange.end);
    }
    
    return matchesStatus && matchesDate;
  });
  
  const getStatusConfig = (status: string) => {
    switch(status) {
        case 'Placed': return { icon: ClipboardList, color: 'bg-blue-50 text-blue-600', badge: 'bg-blue-100 text-blue-700' };
        case 'Scheduled': return { icon: Calendar, color: 'bg-indigo-50 text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' };
        case 'In Progress': return { icon: Timer, color: 'bg-amber-50 text-amber-600', badge: 'bg-amber-100 text-amber-700' };
        case 'Out for Delivery': return { icon: Truck, color: 'bg-purple-50 text-purple-600', badge: 'bg-purple-100 text-purple-700' };
        case 'Completed': return { icon: CheckCircle, color: 'bg-green-50 text-green-600', badge: 'bg-green-100 text-green-700' };
        case 'Cancelled': return { icon: XCircle, color: 'bg-red-50 text-red-600', badge: 'bg-red-100 text-red-700' };
        default: return { icon: Package, color: 'bg-slate-50 text-slate-600', badge: 'bg-slate-100 text-slate-700' };
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Photo Viewer Modal */}
      {viewingPhotos && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button onClick={() => setViewingPhotos(null)} className="absolute top-4 right-4 text-white p-2">
            <X size={32} />
          </button>
          <div className="flex gap-4 overflow-x-auto max-w-full p-4 snap-x">
            {viewingPhotos.map((photo, i) => (
              <img key={i} src={photo} alt="Inventory" className="h-[60vh] rounded-lg shadow-2xl snap-center" />
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border-b border-slate-200 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Order History</h1>
          <p className="text-slate-600">View and manage your past laundry orders.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Filters */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter size={18} className="text-slate-400" />
              <select 
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5 outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Placed">Placed</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Calendar size={18} className="text-slate-400" />
              <div className="flex gap-2 items-center">
                <input 
                  type="date" 
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-500 block w-full p-2.5 outline-none"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
                />
                <span className="text-slate-400">-</span>
                <input 
                  type="date" 
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-500 block w-full p-2.5 outline-none"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
                />
              </div>
            </div>
            
            {(statusFilter !== 'All' || dateRange.start || dateRange.end) && (
              <button 
                onClick={() => { setStatusFilter('All'); setDateRange({start: '', end: ''}); }}
                className="text-sm text-brand-600 hover:text-brand-800 underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group">
                  {/* Header Row */}
                  <div 
                    className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => toggleExpand(order.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${statusConfig.color}`}>
                        <StatusIcon size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-slate-900">{order.id}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${statusConfig.badge}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mb-2">
                          <Clock size={14} /> {order.date}
                        </p>
                        <div className="flex flex-wrap gap-2 md:hidden">
                          {order.items.slice(0, 2).map((item, i) => (
                             <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-2 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                      <div className="flex items-center justify-between w-full md:w-auto gap-4">
                        <span className="font-bold text-slate-900 text-lg">{order.total}</span>
                        {expandedOrderId === order.id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedOrderId === order.id && (
                    <div className="px-6 pb-6 pt-0 bg-slate-50/50 border-t border-slate-100">
                      <div className="py-4 grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-sm text-slate-700 mb-3 uppercase tracking-wide">Items Summary</h4>
                          <ul className="space-y-2 mb-4">
                            {order.items.map((item, i) => (
                              <li key={i} className="flex justify-between text-sm text-slate-600 bg-white p-2 rounded border border-slate-100">
                                <span>{item}</span>
                                <span>Rp {(parseInt(order.total.replace(/\D/g,'')) / order.items.length).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</span> 
                              </li>
                            ))}
                          </ul>
                          {order.photoInventory && (
                            <button 
                              onClick={() => setViewingPhotos(order.photoInventory!)}
                              className="text-sm font-medium text-brand-600 flex items-center gap-2 hover:text-brand-700"
                            >
                              <Camera size={16} /> View Photo Inventory
                            </button>
                          )}
                        </div>
                        <div className="flex flex-col justify-between">
                           <div>
                              <h4 className="font-bold text-sm text-slate-700 mb-3 uppercase tracking-wide">Actions</h4>
                              <div className="flex flex-wrap gap-3">
                                {order.status === 'Completed' && (
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleReorder(order.id); }}
                                    className="flex items-center gap-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
                                  >
                                    <RefreshCw size={16} /> Reorder
                                  </button>
                                )}
                                {order.status !== 'Cancelled' && order.status !== 'Completed' && (
                                  <Link to={`/tracking?id=${order.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors">
                                    Track Order <ChevronRight size={16} />
                                  </Link>
                                )}
                                {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleCancelOrder(order.id, order.status); }}
                                    className="flex items-center gap-2 text-sm font-medium text-red-600 bg-white border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                                  >
                                    <XCircle size={16} /> Cancel Order
                                  </button>
                                )}
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
               <Package size={48} className="mx-auto text-slate-300 mb-4" />
               <h3 className="text-lg font-bold text-slate-900 mb-2">No orders found</h3>
               <button onClick={() => { setStatusFilter('All'); setDateRange({start: '', end: ''}); }} className="text-brand-600 font-medium hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;