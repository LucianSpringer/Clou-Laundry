import React, { useState } from 'react';
import { DisasterTriageEngine, Contaminant, RestorationReport } from '../src/core/HazardRestoration';
import { AlertTriangle, Droplets, Flame, Skull, Activity, ArrowRight, CheckCircle, AlertOctagon, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const DisasterRelief = () => {
    const [contaminant, setContaminant] = useState<Contaminant>('BLACK_WATER');
    const [exposureHours, setExposureHours] = useState<number>(24);
    const [materialPorosity, setMaterialPorosity] = useState<number>(0.5); // Default to medium porosity
    const [report, setReport] = useState<RestorationReport | null>(null);

    const handleCalculate = () => {
        const result = DisasterTriageEngine.evaluateDamage(contaminant, exposureHours, materialPorosity);
        setReport(result);
    };

    const getContaminantIcon = (c: Contaminant) => {
        switch (c) {
            case 'BLACK_WATER': return <Skull className="text-slate-900 dark:text-slate-100" />;
            case 'GREY_WATER': return <Droplets className="text-blue-500" />;
            case 'SOOT_ACIDIC': return <Flame className="text-orange-500" />;
            case 'SOOT_OILY': return <Flame className="text-yellow-600" />;
            case 'MOLD_SPORES': return <AlertTriangle className="text-green-600" />;
            default: return <Activity />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Hero Section */}
            <div className="bg-red-900 text-white py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <AlertOctagon size={400} />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-red-800/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-red-700">
                        <Phone size={16} className="animate-pulse" /> 24/7 Emergency Hotline: 1-800-CLOU-SOS
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Disaster Restoration Triage</h1>
                    <p className="text-xl text-red-100 max-w-2xl mx-auto mb-8">
                        Rapid assessment for textiles affected by flood, fire, and biological contaminants.
                        We use industrial chemistry to salvage what others can't.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Calculator Form */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Activity className="text-red-600" /> Triage Calculator
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Contaminant Type</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {(['BLACK_WATER', 'GREY_WATER', 'SOOT_ACIDIC', 'SOOT_OILY', 'MOLD_SPORES'] as Contaminant[]).map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setContaminant(c)}
                                            className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${contaminant === c ? 'border-red-500 bg-red-50 dark:bg-red-900/20 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-700'}`}
                                        >
                                            <div className={`p-2 rounded-full ${contaminant === c ? 'bg-white dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                                {getContaminantIcon(c)}
                                            </div>
                                            <span className="font-medium text-slate-700 dark:text-slate-200">{c.replace('_', ' ')}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Exposure Time: <span className="font-bold text-red-600">{exposureHours} Hours</span></label>
                                <input
                                    type="range"
                                    min="1"
                                    max="168" // 1 week
                                    value={exposureHours}
                                    onChange={(e) => setExposureHours(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                                />
                                <div className="flex justify-between text-xs text-slate-400 mt-1">
                                    <span>1 Hour</span>
                                    <span>1 Week</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Material Type</label>
                                <select
                                    value={materialPorosity}
                                    onChange={(e) => setMaterialPorosity(parseFloat(e.target.value))}
                                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value={0.1}>Silk / Synthetic (Low Porosity)</option>
                                    <option value={0.5}>Cotton / Blend (Medium Porosity)</option>
                                    <option value={0.9}>Wool / Linen (High Porosity)</option>
                                </select>
                            </div>

                            <button
                                onClick={handleCalculate}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
                            >
                                Run Triage Analysis <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="space-y-6">
                        {report ? (
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Analysis Report</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Generated by Lumen Hazard Engine</p>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${report.salvageProbability > 0.5 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {(report.salvageProbability * 100).toFixed(0)}% Success Rate
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommended Treatment</span>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{report.recommendedTreatment}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chemical Load</span>
                                            <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                                <div className="h-full bg-purple-500" style={{ width: `${report.chemicalLoad * 10}%` }}></div>
                                            </div>
                                            <p className="text-right text-xs font-mono mt-1 text-purple-600 dark:text-purple-400">{report.chemicalLoad}/10</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Est. Turnaround</span>
                                            <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-1">{report.estimatedTurnaroundHours}h</p>
                                        </div>
                                    </div>

                                    {report.isBiohazard && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-xl flex items-start gap-3">
                                            <AlertOctagon className="text-red-600 dark:text-red-400 shrink-0" />
                                            <div>
                                                <h4 className="font-bold text-red-700 dark:text-red-400 text-sm">Biohazard Protocol Required</h4>
                                                <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                                                    Items must be isolated. Additional handling fees apply. Do not mix with standard laundry.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <Link to="/booking" className="block w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-center font-bold py-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                                            Schedule Emergency Pickup
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                <Activity size={48} className="mb-4 opacity-20" />
                                <p className="text-lg font-medium">Ready to Analyze</p>
                                <p className="text-sm">Select parameters and run the triage engine to see results.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisasterRelief;
