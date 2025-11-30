import React, { useState, useEffect } from 'react';
import { LogisticsEngine, GeoLocation } from '../src/core/RouteOptimizer';
import { SupplyChainBrain } from '../src/core/ResourceForecaster';
import { Truck, TrendingUp, Activity, Map, Package, AlertTriangle, ArrowRight, BarChart3, Settings } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'logistics' | 'supply'>('logistics');

    // Logistics State
    const [routeData, setRouteData] = useState<{
        initialDistance: number;
        optimizedDistance: number;
        iterations: number;
        stops: GeoLocation[];
        optimizedRoute: GeoLocation[];
    } | null>(null);

    // Supply Chain State
    const [forecastData, setForecastData] = useState<{
        history: number[];
        prediction: number;
        trend: number;
        safetyStock: number;
    } | null>(null);

    useEffect(() => {
        // 1. Initialize Logistics Simulation
        const stops: GeoLocation[] = Array.from({ length: 20 }, (_, i) => ({
            id: `stop_${i}`,
            lat: Math.random() * 100,
            lng: Math.random() * 100
        }));

        // Calculate initial distance (simple sequential)
        let initialDist = 0;
        for (let i = 0; i < stops.length - 1; i++) {
            const a = stops[i];
            const b = stops[i + 1];
            initialDist += Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2));
        }
        initialDist += Math.sqrt(Math.pow(stops[stops.length - 1].lat - stops[0].lat, 2) + Math.pow(stops[stops.length - 1].lng - stops[0].lng, 2));

        // Run Optimization
        const result = LogisticsEngine.optimizeRoute(stops);

        setRouteData({
            initialDistance: initialDist,
            optimizedDistance: result.distance,
            iterations: result.iterations,
            stops: stops,
            optimizedRoute: result.route
        });

        // 2. Initialize Supply Chain Simulation
        // Generate dummy history (e.g., last 14 days of detergent usage in ml)
        const history = [
            1200, 1250, 1180, 1320, 1400, 1380, 1450,
            1420, 1500, 1550, 1480, 1600, 1650, 1700
        ];

        const forecast = SupplyChainBrain.predictUsage(history);

        setForecastData({
            history,
            prediction: forecast.nextPeriodPrediction,
            trend: forecast.trend,
            safetyStock: forecast.safetyStockLevel
        });

    }, []);

    const renderLogistics = () => (
        <div className="space-y-6 animate-in fade-in">
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg"><Map size={20} /></div>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200">Initial Distance</h3>
                    </div>
                    <p className="text-3xl font-mono font-bold text-slate-900 dark:text-white">{routeData?.initialDistance.toFixed(1)} <span className="text-sm text-slate-400 font-sans">km</span></p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg"><Truck size={20} /></div>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200">Optimized Distance</h3>
                    </div>
                    <p className="text-3xl font-mono font-bold text-slate-900 dark:text-white">{routeData?.optimizedDistance.toFixed(1)} <span className="text-sm text-slate-400 font-sans">km</span></p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"><Activity size={20} /></div>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200">Optimization Gain</h3>
                    </div>
                    <p className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">
                        {routeData && ((1 - routeData.optimizedDistance / routeData.initialDistance) * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Simulated Annealing Iterations: {routeData?.iterations}</p>
                </div>
            </div>

            <div className="bg-slate-900 dark:bg-slate-950 text-white p-6 rounded-xl shadow-lg border border-slate-800">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Settings size={18} /> VRP Solver Visualization</h3>
                <div className="aspect-video bg-slate-800 dark:bg-slate-900 rounded-lg relative overflow-hidden border border-slate-700">
                    {/* Simple Visualization of the Route */}
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Draw Path */}
                        <path
                            d={`M ${routeData?.optimizedRoute.map(p => `${p.lat},${p.lng}`).join(' L ')} Z`}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="0.5"
                            opacity="0.8"
                        />
                        {/* Draw Points */}
                        {routeData?.optimizedRoute.map((p, i) => (
                            <circle key={p.id} cx={p.lat} cy={p.lng} r="1" fill={i === 0 ? '#ef4444' : '#3b82f6'} />
                        ))}
                    </svg>
                    <div className="absolute bottom-4 left-4 text-xs text-slate-400">
                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Depot</div>
                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Delivery Point</div>
                        <div className="flex items-center gap-2"><span className="w-8 h-0.5 bg-green-500"></span> Optimal Path</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSupply = () => (
        <div className="space-y-6 animate-in fade-in">
            <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg"><TrendingUp size={20} /></div>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200">Next Week Forecast</h3>
                    </div>
                    <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{forecastData?.prediction} <span className="text-sm text-slate-400 font-sans">ml</span></p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg"><Activity size={20} /></div>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200">Trend Factor</h3>
                    </div>
                    <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{forecastData?.trend} <span className="text-sm text-slate-400 font-sans">ml/day</span></p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg"><AlertTriangle size={20} /></div>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200">Safety Stock</h3>
                    </div>
                    <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{forecastData?.safetyStock} <span className="text-sm text-slate-400 font-sans">ml</span></p>
                </div>
                <div className="bg-brand-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/20 rounded-lg"><Package size={20} /></div>
                        <h3 className="font-bold text-white">Restock Order</h3>
                    </div>
                    <p className="text-3xl font-mono font-bold text-white">
                        {forecastData && Math.ceil((forecastData.prediction + forecastData.safetyStock) / 1000)} <span className="text-sm text-brand-200 font-sans">Liters</span>
                    </p>
                    <p className="text-xs text-brand-200 mt-1">Recommended based on Holt-Winters</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><BarChart3 size={20} /> Historical Usage vs Forecast</h3>
                <div className="h-64 flex items-end gap-2 px-4 border-b border-l border-slate-200 dark:border-slate-700 pb-2">
                    {forecastData?.history.map((val, i) => (
                        <div key={i} className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-brand-200 dark:hover:bg-brand-900/50 transition-colors rounded-t relative group" style={{ height: `${(val / 2000) * 100}%` }}>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {val}ml
                            </div>
                        </div>
                    ))}
                    {/* Forecast Bar */}
                    <div className="flex-1 bg-brand-500 rounded-t relative group animate-pulse" style={{ height: `${(forecastData?.prediction || 0) / 2000 * 100}%` }}>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-brand-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Forecast: {forecastData?.prediction}ml
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                    <span>14 Days Ago</span>
                    <span>Today</span>
                    <span className="text-brand-600 font-bold">Next Week</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Operational Twin</h1>
                        <p className="text-slate-500 dark:text-slate-400">Real-time logistics and supply chain intelligence.</p>
                    </div>
                    <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                        <button
                            onClick={() => setActiveTab('logistics')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'logistics' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                        >
                            Logistics Hyper-Router
                        </button>
                        <button
                            onClick={() => setActiveTab('supply')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'supply' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                        >
                            Predictive Supply Chain
                        </button>
                    </div>
                </div>

                {activeTab === 'logistics' ? renderLogistics() : renderSupply()}
            </div>
        </div>
    );
};

export default AdminDashboard;
