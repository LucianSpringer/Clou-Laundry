import React from 'react';
import { Link } from 'react-router-dom';
import { LOYALTY_TIERS } from '../src/core/ContentAssets';
import { SocialGraphEngine } from '../src/core/InfluenceGraph';
import { Crown, Check, Gift, TrendingUp, Truck, Zap, Tag, UserCheck, Star, Sparkles, Share2, Users, BarChart } from 'lucide-react';

const Loyalty = () => {
  const [socialRank, setSocialRank] = React.useState<{ rank: number, percentile: number, totalNodes: number } | null>(null);

  React.useEffect(() => {
    // Simulate Social Graph Calculation
    const networkSize = 50;
    const network = SocialGraphEngine.generateNetwork(networkSize);
    const rankedNodes = SocialGraphEngine.computePageRank(network);

    // Simulate "User" being one of the top nodes (e.g., index 3)
    const userIndex = 3;
    const userNode = rankedNodes[userIndex];

    setSocialRank({
      rank: userIndex + 1,
      percentile: Math.round(((networkSize - userIndex) / networkSize) * 100),
      totalNodes: networkSize
    });
  }, []);

  const getBenefitIcon = (benefit: string) => {
    const text = benefit.toLowerCase();
    if (text.includes('pickup')) return Truck;
    if (text.includes('birthday')) return Gift;
    if (text.includes('discount')) return Tag;
    if (text.includes('express') || text.includes('priority')) return Zap;
    if (text.includes('detergent') || text.includes('eco')) return Sparkles;
    if (text.includes('manager')) return UserCheck;
    if (text.includes('point')) return Star;
    return Check;
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-brand-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
          <Crown size={400} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Join 2,000+ Happy Members
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Clou Rewards</h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto mb-10">
            Earn points with every wash. Unlock exclusive benefits, discounts, and priority service as you move up the tiers.
          </p>
          <Link to="/booking" className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-brand-500/50">
            Start Earning Today
          </Link>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-slate-600 dark:text-slate-400">Simple steps to get rewarded for your clean clothes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-center transition-colors duration-300">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Sign Up Free</h3>
              <p className="text-slate-600 dark:text-slate-400">Create an account when you book your first service. You're automatically enrolled as a Bronze Member.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-center transition-colors duration-300">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Earn Points</h3>
              <p className="text-slate-600 dark:text-slate-400">Get 1 point for every Rp 10,000 you spend on any of our laundry or dry cleaning services.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-center transition-colors duration-300">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Get Rewarded</h3>
              <p className="text-slate-600 dark:text-slate-400">Redeem points for discounts and enjoy automatic tier upgrades for permanent perks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Influence Graph Section */}
      <div className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="text-brand-600 dark:text-brand-400 font-bold tracking-wider uppercase text-sm mb-2 block">Viral Influence Graph</span>
              <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6">Your Social Capital</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                We use Google's <strong>PageRank Algorithm</strong> to map your influence in the Clou community.
                Refer friends to increase your centrality score and unlock hidden "Influencer" tiers.
              </p>

              {socialRank && (
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">#{socialRank.rank}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mt-1">Global Rank</div>
                  </div>
                  <div className="text-center border-l border-slate-200 dark:border-slate-700">
                    <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">Top {100 - socialRank.percentile}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mt-1">Percentile</div>
                  </div>
                  <div className="text-center border-l border-slate-200 dark:border-slate-700">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{socialRank.totalNodes}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mt-1">Network Size</div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-4">
                <button className="flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors">
                  <Share2 size={18} /> Invite Friends
                </button>
                <button className="flex items-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <BarChart size={18} /> View Graph
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-purple-600 rounded-full blur-3xl opacity-20"></div>
              <div className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><Users size={20} className="text-brand-500" /> Network Topology</h3>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Live</span>
                </div>
                {/* Abstract Graph Visualization */}
                <svg viewBox="0 0 400 300" className="w-full h-auto rounded bg-slate-50 dark:bg-slate-800">
                  <circle cx="200" cy="150" r="40" fill="#4f46e5" opacity="0.2" className="animate-pulse" />
                  <circle cx="200" cy="150" r="8" fill="#4f46e5" />
                  {/* Nodes */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const x = 200 + Math.cos(angle) * 100;
                    const y = 150 + Math.sin(angle) * 80;
                    return (
                      <g key={i}>
                        <line x1="200" y1="150" x2={x} y2={y} stroke="#cbd5e1" strokeWidth="1" />
                        <circle cx={x} cy={y} r="4" fill="#94a3b8" />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center text-slate-900 dark:text-white mb-12">Membership Tiers</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-end">
          {LOYALTY_TIERS.map((tier) => (
            <div key={tier.id} className={`rounded-2xl overflow-hidden shadow-xl transition-transform hover:-translate-y-2 ${tier.id === 'gold' ? 'border-2 border-yellow-400 relative md:-mt-8' : 'border border-slate-100 dark:border-slate-800'}`}>
              {tier.id === 'gold' && (
                <div className="bg-yellow-400 text-yellow-900 text-center text-xs font-bold uppercase py-1 tracking-wider">Most Popular</div>
              )}
              <div className={`p-8 ${tier.color}`}>
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="opacity-80 text-sm font-medium uppercase tracking-wide">
                  {tier.minPoints === 0 ? 'Entry Level' : `${tier.minPoints}+ Points`}
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-8">
                <ul className="space-y-4">
                  {tier.benefits.map((benefit, index) => {
                    const Icon = getBenefitIcon(benefit);
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${tier.id === 'gold' ? 'bg-yellow-100 text-yellow-600' : 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'}`}>
                          <Icon size={14} strokeWidth={2.5} />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
                  <Link to="/booking" className={`inline-block w-full py-3 rounded-lg font-bold text-sm transition-colors ${tier.id === 'gold' ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                    {tier.id === 'bronze' ? 'Join Now' : `Reach ${tier.name}`}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loyalty;