import { useState } from 'react';
import { Filter, Grid, List, ChevronDown, Loader } from 'lucide-react';
import ShaderBackground from '../components/ShaderBackground';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

interface DiscoverPageProps {
  onNavigate: (page: string) => void;
  onNewAnalysis?: () => void;
}

const BRANDS = [
  { name: 'Luminal Tech', desc: 'High-performance computing & cloud infrastructure for creative workflows.', industry: 'SaaS / Cloud', budget: '$15k - $45k', fit: 98, color: '#7C3AED', icon: '⚡' },
  { name: 'Aura Lifestyle', desc: 'Sustainable premium apparel designed for the modern nomadic professional.', industry: 'Fashion / Eco', budget: '$5k - $12k', fit: 94, color: '#ef4444', icon: '✦' },
  { name: 'Veloce Audio', desc: 'Next-gen spatial audio solutions for streamers and content producers.', industry: 'Tech / Hardware', budget: '$8k - $20k', fit: 89, color: '#0ea5e9', icon: '◈' },
  { name: 'Nexus Capital', desc: 'Simplified investment tracking and wealth management for creator business.', industry: 'Fintech', budget: '$25k - $100k', fit: 76, color: '#10b981', icon: '◇' },
  { name: 'Pulse Energy', desc: 'Bio-hacking focused hydration for high-intensity gaming and creative sessions.', industry: 'Beverage / Wellness', budget: '$2k - $8k', fit: 91, color: '#84cc16', icon: '⬡' },
  { name: 'Etheria Home', desc: 'Artisanal minimalist furniture crafted for aesthetic studio environments.', industry: 'Home / Decor', budget: '$10k - $25k', fit: 68, color: '#f59e0b', icon: '◎' },
  { name: 'Kinetik Gear', desc: 'Precision fitness trackers optimized for high-performance creative routines.', industry: 'Health / Tech', budget: '$6k - $15k', fit: 82, color: '#06b6d4', icon: '◈' },
  { name: 'Synthetix Visuals', desc: 'Neural-network powered post-production tools for cinematic content creators.', industry: 'AI / Media', budget: '$12k - $30k', fit: 95, color: '#8b5cf6', icon: '✦' },
];

const fitColor = (score: number) => {
  if (score >= 90) return 'text-primary';
  if (score >= 75) return 'text-blue-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-red-400';
};

const fitBarColor = (score: number) => {
  if (score >= 90) return 'bg-primary';
  if (score >= 75) return 'bg-blue-400';
  if (score >= 60) return 'bg-yellow-400';
  return 'bg-red-400';
};

export default function DiscoverPage({ onNavigate, onNewAnalysis }: DiscoverPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div>
      <ShaderBackground opacity={40} />
      <Sidebar activeItem="discover" onNavigate={onNavigate} onNewAnalysis={onNewAnalysis} />
      <TopNav avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAsl6oqHJA5QTo39561LQg3z2l5CmpLpUvvI0Pry_A77pDXwegYuePfpPpwCmh69NxI3IDlL8wcSuOYBx6tmR30fDAQ2xnejMx46cbIigcyigqbjOaKekGiHV9j5BMku5hcOTFZcTkn40U2zFOKe30wG85AdBDGBXFvYsm7xHJXoY7gkW9PHFZgciJ5ftjnWQipUrkAdt6W_9sii8Pbklq-g1rPwV4QvB5oELXm1PRVfQs39mvePGHxfN6n-9UTLkuLLScK_iOLP4db" />

      <main className="ml-sidebar-width pt-16 min-h-screen custom-scrollbar overflow-y-auto">
        <div className="px-10 py-10 max-w-[1400px] mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="font-display text-5xl font-black text-white uppercase tracking-tighter mb-2">Discover Brands</h1>
              <p className="text-on-surface/60 font-medium text-lg">AI-powered alignment engine matching you with high-affinity partners.</p>
            </div>
            <div className="neo-card bg-surface-container-high px-6 py-4 flex items-center gap-3">
              <span className="text-on-surface/50 text-label-caps font-black">YOUR AVG. FIT</span>
              <span className="text-primary font-black font-mono text-2xl">88.4%</span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <button className="neo-button bg-surface-container text-on-surface/70 px-5 py-2.5 text-sm flex items-center gap-2 hover:bg-primary hover:text-black">
                <Filter size={14} strokeWidth={2.5} /> All Filters
              </button>
              {['Niche: Lifestyle', 'Budget: High', 'Alignment: >90%'].map((f) => (
                <button key={f} className="neo-button bg-surface-container text-on-surface px-4 py-2.5 text-sm flex items-center gap-1.5 hover:border-primary">
                  {f} <ChevronDown size={13} strokeWidth={2.5} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-on-surface/40 text-sm font-bold mr-2">VIEW:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 neo-button ${viewMode === 'grid' ? 'bg-primary text-black' : 'bg-surface-container text-on-surface/60'}`}
              >
                <Grid size={16} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 neo-button ${viewMode === 'list' ? 'bg-primary text-black' : 'bg-surface-container text-on-surface/60'}`}
              >
                <List size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Brand Grid */}
          <div className={`grid gap-6 mb-10 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
            {BRANDS.map((brand) => (
              <div key={brand.name} className={`neo-card bg-surface-container p-7 flex gap-4 min-w-0 overflow-hidden ${viewMode === 'list' ? 'flex-col xl:flex-row xl:items-center' : 'flex-col'}`}>
                {/* Top Row */}
                <div className={`flex min-w-0 ${viewMode === 'grid' ? 'justify-between items-start' : 'items-center gap-6 flex-1'}`}>
                  <div
                    className="w-14 h-14 rounded-2xl border-[3px] border-black shadow-brutal flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: brand.color + '33', borderColor: brand.color }}
                  >
                    <span style={{ color: brand.color }}>{brand.icon}</span>
                  </div>
                  {viewMode === 'list' && (
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-xl text-white uppercase italic">{brand.name}</h3>
                      <p className="text-on-surface/50 text-sm font-bold leading-relaxed">{brand.desc}</p>
                    </div>
                  )}
                  <div className="text-right flex-shrink-0">
                    <div className={`font-black font-mono text-3xl leading-none ${fitColor(brand.fit)}`}>{brand.fit}</div>
                    <div className="text-on-surface/40 text-[10px] font-black uppercase tracking-widest">FIT SCORE</div>
                  </div>
                </div>

                {viewMode === 'grid' && (
                  <>
                    <div>
                      <h3 className="font-black text-xl text-white uppercase italic mb-1">{brand.name}</h3>
                      <p className="text-on-surface/60 text-sm leading-relaxed">{brand.desc}</p>
                    </div>
                    <div className="space-y-1.5 text-sm mt-auto">
                      <div className="flex gap-2">
                        <span className="text-on-surface/40 font-bold">Industry</span>
                        <span className="text-on-surface/80 font-bold">{brand.industry}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-on-surface/40 font-bold">Budget Range</span>
                        <span className="text-primary font-black">{brand.budget}</span>
                      </div>
                    </div>
                  </>
                )}

                {viewMode === 'list' && (
                  <div className="flex flex-wrap items-center gap-6 flex-shrink-0 text-sm">
                    <div>
                      <div className="text-on-surface/40 text-[10px] font-black uppercase">Industry</div>
                      <div className="text-on-surface/80 font-bold">{brand.industry}</div>
                    </div>
                    <div>
                      <div className="text-on-surface/40 text-[10px] font-black uppercase">Budget</div>
                      <div className="text-primary font-black">{brand.budget}</div>
                    </div>
                  </div>
                )}

                {/* Score bar (grid only) */}
                {viewMode === 'grid' && (
                  <div className="w-full bg-gray-300 dark:bg-black/40 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${fitBarColor(brand.fit)}`} style={{ width: `${brand.fit}%` }} />
                  </div>
                )}

                <div className={`grid grid-cols-2 gap-3 min-w-0 ${viewMode === 'list' ? 'w-full xl:w-[220px] xl:flex-shrink-0' : 'mt-1'}`}>
                  <button className="neo-button bg-surface-container-high text-on-surface/80 px-4 py-2 text-sm min-w-0 flex items-center justify-center text-center hover:bg-black dark:hover:bg-black hover:text-white dark:hover:text-white">
                    Details
                  </button>
                  <button className="neo-button bg-primary text-black px-4 py-2 text-sm min-w-0 font-black flex items-center justify-center text-center">
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center space-y-6 pb-10">
            <p className="text-on-surface/40 text-sm font-bold">Showing 8 of 142 recommended brands</p>
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="neo-button bg-surface-container text-on-surface px-12 py-4 font-black uppercase tracking-widest hover:bg-primary hover:text-black flex items-center gap-3 mx-auto"
            >
              {loading ? <><Loader size={16} className="animate-spin" /> Loading...</> : 'Load More Results'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
