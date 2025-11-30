import React, { useState } from 'react';
import { MaterialPhysicsEngine, LifecycleStatus } from '../src/core/LinenLifecycle';
import { Building2, Shirt, AlertTriangle, CheckCircle, ShoppingCart, BarChart3, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Commercial = () => {
    const [materialType, setMaterialType] = useState<keyof typeof MaterialPhysicsEngine['MAX_WASH_CYCLES']>('COTTON_400TC');
    const [washCount, setWashCount] = useState<number>(100);
    const [washTemp, setWashTemp] = useState<number>(60);
    const [status, setStatus] = useState<LifecycleStatus | null>(null);

    const handleAnalyze = () => {
        const result = MaterialPhysicsEngine.predictFailure(materialType, washCount, washTemp);
        setStatus(result);
    };

    const getStatusColor = (category: LifecycleStatus['tensileCategory']) => {
        switch (category) {
            case 'PRISTINE': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
            case 'STABLE': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
            case 'FRAGILE': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
            case 'CRITICAL': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <Building2 size={400} />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-slate-700">
                        <Building2 size={16} /> B2B & Hospitality Solutions
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Commercial Linen Intelligence</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mb-8">
                        Predictive inventory management for hotels, Airbnbs, and hospitals.
                        Know exactly when your linens will fail before they do.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Analysis Form */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Shirt className="text-brand-600" /> Inventory Health Check
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Material Type</label>
                                <select
                                    value={materialType}
                                    onChange={(e) => setMaterialType(e.target.value as any)}
                                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
                                >
                                    <option value="COTTON_200TC">Standard Cotton (200TC)</option>
                                    <option value="COTTON_400TC">Premium Cotton (400TC)</option>
                                    <option value="POLY_BLEND">Polyester Blend (Durable)</option>
                                    <option value="LINEN">Pure Linen (Luxury)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Wash Count: <span className="font-bold text-brand-600">{washCount} Cycles</span></label>
                                <input
                                    type="range"
                                    min="0"
                                    max="400"
                                    value={washCount}
                                    onChange={(e) => setWashCount(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Avg. Wash Temperature: <span className="font-bold text-brand-600">{washTemp}°C</span></label>
                                <input
                                    type="range"
                                    min="30"
                                    max="95"
                                    value={washTemp}
                                    onChange={(e) => setWashTemp(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
                                />
                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Info size={12} /> Higher temperatures accelerate fiber degradation.</p>
                            </div>

                            <button
                                onClick={handleAnalyze}
                                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
                            >
                                Run Physics Engine <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="space-y-6">
                        {status ? (
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lifecycle Report</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Generated by MaterialPhysicsEngine</p>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(status.tensileCategory)}`}>
                                        {status.tensileCategory}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                                            <span>Structural Integrity</span>
                                            <span>{status.currentHealth}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${status.currentHealth > 70 ? 'bg-green-500' : status.currentHealth > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                style={{ width: `${status.currentHealth}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining Cycles</span>
                                            <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-1">{status.remainingWashes}</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Est. Restock Date</span>
                                            <p className="text-lg font-mono font-bold text-slate-900 dark:text-white mt-1">{status.recommendedRestockDate}</p>
                                        </div>
                                    </div>

                                    {status.tensileCategory === 'FRAGILE' && (
                                        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 p-4 rounded-xl flex items-start gap-3">
                                            <AlertTriangle className="text-orange-600 dark:text-orange-400 shrink-0" />
                                            <div>
                                                <h4 className="font-bold text-orange-700 dark:text-orange-400 text-sm">Wash Matrix Adjustment Required</h4>
                                                <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                                                    RPM will be automatically capped at 600 to prevent tearing.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {status.tensileCategory === 'CRITICAL' && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-xl">
                                            <div className="flex items-start gap-3 mb-3">
                                                <AlertTriangle className="text-red-600 dark:text-red-400 shrink-0" />
                                                <div>
                                                    <h4 className="font-bold text-red-700 dark:text-red-400 text-sm">Critical Failure Imminent</h4>
                                                    <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                                                        Material has exceeded safe usage limits. Immediate replacement recommended.
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                                <ShoppingCart size={18} /> Order Replacements
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                <BarChart3 size={48} className="mb-4 opacity-20" />
                                <p className="text-lg font-medium">Ready to Predict</p>
                                <p className="text-sm">Input material details to simulate lifecycle.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Commercial;
