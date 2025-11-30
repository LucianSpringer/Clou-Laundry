import React, { useState } from 'react';
import { Camera, Upload, Loader2, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FabricEntropyEngine } from '../src/core/FabricEntropyEngine';

const AiQuote = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ item: string, price: string, treatment: string } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };



  const analyzeImage = async () => {
    if (!image) return;
    setAnalyzing(true);
    setResult(null);

    try {
      const analysis = await FabricEntropyEngine.analyzeTexture(image);

      setResult({
        item: `Fabric Density: ${analysis.fabricDensity} (Entropy: ${analysis.entropyScore})`,
        price: `Rp ${Math.round(analysis.estimatedCost).toLocaleString()}`,
        treatment: analysis.fabricDensity === 'Light' ? 'Delicate Wash' : 'Standard Wash'
      });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-brand-900 p-8 text-center text-white">
            <div className="w-16 h-16 bg-brand-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-700">
              <Camera size={32} />
            </div>
            <h1 className="text-2xl font-serif font-bold mb-2">AI Price Quote</h1>
            <p className="text-brand-200 text-sm">Upload a photo of your item for an instant price estimate.</p>
          </div>

          <div className="p-8">
            {!image ? (
              <label className="border-3 border-dashed border-slate-200 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-all group">
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <p className="font-bold text-slate-700">Click to Upload Photo</p>
                <p className="text-sm text-slate-400 mt-2">or drag and drop here</p>
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200">
                <img src={image} alt="Uploaded" className="w-full h-64 object-cover" />
                {analyzing && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                    <Loader2 size={48} className="animate-spin mb-4 text-brand-400" />
                    <p className="font-bold animate-pulse">Analyzing Fabric...</p>
                  </div>
                )}
                {!analyzing && result && (
                  <button
                    onClick={() => { setImage(null); setResult(null); }}
                    className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-slate-700 hover:text-red-600 transition-colors shadow-lg"
                  >
                    <RefreshCw size={20} />
                  </button>
                )}
              </div>
            )}

            {result && (
              <div className="mt-8 animate-in slide-in-from-bottom-4 fade-in">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <CheckCircle className="text-green-600 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">Analysis Complete</h3>
                      <p className="text-slate-600 text-sm">We've identified your item.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-green-100">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Item Detected</p>
                      <p className="font-bold text-slate-800">{result.item}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-green-100">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Estimated Price</p>
                      <p className="font-bold text-brand-600">{result.price}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-green-100 mb-6">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Recommended Treatment</p>
                    <p className="font-bold text-slate-800">{result.treatment}</p>
                  </div>

                  <Link to="/booking" className="block w-full bg-brand-600 text-white text-center py-4 rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg flex items-center justify-center gap-2">
                    Book This Service <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiQuote;