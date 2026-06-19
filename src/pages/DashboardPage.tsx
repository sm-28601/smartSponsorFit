import { Users, Eye, Heart, Handshake, Sparkles, Cpu, Brain, BarChart3, Zap, Code, MessageSquare, Terminal, PenSquare } from 'lucide-react';
import ShaderBackground from '../components/ShaderBackground';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import { useState, useEffect, useRef } from 'react';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  onNewAnalysis?: () => void;
}

function animateValue(el: HTMLElement, start: number, end: number, duration: number) {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentVal = progress * (end - start) + start;
    el.innerHTML = currentVal % 1 === 0 ? Math.floor(currentVal).toString() : currentVal.toFixed(1);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function DashboardPage({ onNavigate, onNewAnalysis }: DashboardPageProps) {
  const [fitScore, setFitScore] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach((el) => {
      const val = parseFloat((el as HTMLElement).getAttribute('data-count') || '0');
      setTimeout(() => animateValue(el as HTMLElement, 0, val, 1500), 800);
    });
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setFitScore(0);
    setTimeout(() => {
      setAnalyzing(false);
      let current = 0;
      const target = 94;
      const duration = 1000;
      const startTime = performance.now();
      function update(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        current = Math.floor(progress * target);
        setFitScore(current);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }, 1500);
  };

  const stats = [
    { icon: Users, label: 'Subscribers', value: '1.2M', dataCount: '1.2', change: '+12%', changeColor: 'text-primary' },
    { icon: Eye, label: 'Avg Views', value: '342K', dataCount: '342', change: '+5.4%', changeColor: 'text-primary' },
    { icon: Heart, label: 'Engagement', value: '4.8%', dataCount: '4.8', change: '0.0%', changeColor: 'text-on-surface/40' },
    { icon: Handshake, label: 'Matches', value: '28', dataCount: '28', change: '+2', changeColor: 'text-primary' },
  ];

  const brands = [
    { icon: Code, name: 'Vercel', desc: 'Frontend Cloud', fit: 98, color: 'bg-black', shadowColor: '#c7f02d', budget: '$5k-$15k', fitBg: 'bg-primary' },
    { icon: MessageSquare, name: 'Discord', desc: 'Social Platform', fit: 92, color: 'bg-[#5865F2]', shadowColor: '#000000', budget: '$10k-$25k', fitBg: 'bg-primary' },
    { icon: Terminal, name: 'Warp', desc: 'Modern Terminal', fit: 87, color: 'bg-black', shadowColor: '#C9C0E6', budget: '$3k-$8k', fitBg: 'bg-primary' },
    { icon: PenSquare, name: 'Raycast', desc: 'Productivity', fit: 78, color: 'bg-[#7C3AED]', shadowColor: '#000000', budget: '$2k-$6k', fitBg: 'bg-pink' },
  ];

  return (
    <div className="dark">
      <ShaderBackground opacity={40} />
      <Sidebar activeItem="dashboard" onNavigate={onNavigate} onNewAnalysis={onNewAnalysis} />
      <TopNav />

      <main className="ml-sidebar-width pt-28 px-10 pb-16 max-w-container-max mx-auto">
        {/* Header */}
        <div ref={heroRef} className="mb-12" style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <h2 className="font-display text-5xl font-black tracking-tight mb-3 uppercase italic text-primary">Welcome back, Creator</h2>
          <p className="text-xl text-on-surface/70 font-medium">Performance snapshot for the last 30 days.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="neo-card p-6 bg-surface-container" style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 50}ms`,
            }}>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl border-2 border-black shadow-brutal-sm ${stat.icon === Users ? 'bg-primary' : stat.icon === Eye ? 'bg-lavender' : stat.icon === Heart ? 'bg-pink' : 'bg-primary'}`}>
                  <stat.icon className="text-black font-bold" size={20} />
                </div>
                <span className={`${stat.changeColor} text-sm font-black`}>{stat.change}</span>
              </div>
              <p className="text-on-surface/40 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black font-mono" data-count={stat.dataCount}>{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* AI Profile Analysis */}
          <div className="lg:col-span-2 neo-card p-8 bg-surface-container relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -rotate-45 translate-x-12 -translate-y-12 border-b-4 border-black" />
            <div className="flex items-center gap-3 mb-8">
              <div className="px-4 py-1 rounded-full bg-primary border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-brutal-sm">AI INSIGHTS</div>
              <span className="text-on-surface/30 text-xs font-bold">Refreshed 2h ago</span>
            </div>
            <h2 className="text-4xl font-black uppercase italic mb-10 text-primary">AI Profile Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="neo-card p-4 bg-pink/5 border-pink/20 hover:bg-pink/10">
                <label className="text-[10px] font-black uppercase text-pink mb-2 block tracking-widest">Core Niche</label>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="text-pink font-bold" size={20} />
                  <span className="text-xl font-bold text-on-surface">Technology</span>
                </div>
                <p className="text-xs text-on-surface/50 leading-relaxed">High-end hardware and software automation focus.</p>
              </div>
              <div className="neo-card p-4 bg-primary/5 border-primary/20 hover:bg-primary/10">
                <label className="text-[10px] font-black uppercase text-primary mb-2 block tracking-widest">Audience</label>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="text-primary font-bold" size={20} />
                  <span className="text-xl font-bold text-on-surface">18-34</span>
                </div>
                <p className="text-xs text-on-surface/50 leading-relaxed">Gen Z and Millennial tech early adopters.</p>
              </div>
              <div className="neo-card p-4 bg-lavender/5 border-lavender/20 hover:bg-lavender/10">
                <label className="text-[10px] font-black uppercase text-lavender mb-2 block tracking-widest">Tone</label>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="text-lavender font-bold" size={20} />
                  <span className="text-xl font-bold text-on-surface">Expert</span>
                </div>
                <p className="text-xs text-on-surface/50 leading-relaxed">Authoritative, clear and technical depth.</p>
              </div>
            </div>
            <div className="mt-12 p-8 neo-card bg-black shadow-none border-dashed">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-black text-primary italic uppercase flex items-center gap-2">
                  <TrendingUp className="font-bold text-primary" size={20} />
                  Growth Potential
                </h4>
                <span className="text-2xl font-black font-mono text-primary">92%</span>
              </div>
              <div className="w-full bg-white/10 h-6 border-[3px] border-black rounded-full p-1">
                <div className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '92%' }} />
              </div>
            </div>
          </div>

          {/* Fit Check Tool */}
          <div className="neo-card p-8 bg-surface-container flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="text-primary" size={28} strokeWidth={2.5} />
              <h3 className="text-3xl font-black uppercase italic">Fit Check</h3>
            </div>
            <p className="text-sm text-on-surface/60 mb-8 font-medium">Predict campaign compatibility with AI brand-syncing.</p>
            <div className="space-y-6 flex-1">
              <input
                className="w-full bg-black/40 border-[3px] border-black rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all placeholder:text-on-surface/30 font-bold"
                placeholder="BRAND URL (e.g. linear.app)"
                type="text"
              />
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full neo-button bg-primary py-4 text-black uppercase tracking-widest hover:-translate-y-1 active:scale-95 disabled:opacity-50"
              >
                {analyzing ? 'SYNCING...' : 'ANALYZE FIT'}
              </button>

              <div className="mt-8 pt-8 border-t-4 border-black border-dotted">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-black border-[3px] border-black shadow-brutal flex items-center justify-center overflow-hidden">
                    <Sparkles className="text-primary" size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-on-surface">Linear</h4>
                    <p className="text-[10px] text-primary uppercase font-bold tracking-widest">SaaS / Productivity</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border-2 border-black">
                    <span className="text-xs font-bold uppercase opacity-60">Alignment</span>
                    <span className="text-xs text-primary font-black">EXCELLENT</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border-2 border-black">
                    <span className="text-xs font-bold uppercase opacity-60">Est. ROI</span>
                    <span className="text-xs text-primary font-black">3.4X</span>
                  </div>
                  <div className="mt-6 p-6 rounded-2xl bg-primary border-[3px] border-black shadow-brutal-lg text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">AI FIT SCORE</p>
                    <span className="text-5xl font-black font-mono">{fitScore}</span>
                    <span className="text-xl font-black">/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discover Brands */}
        <div className="mt-20">
          <div className="flex justify-between items-end mb-10 border-b-4 border-black pb-4">
            <div>
              <h3 className="text-4xl font-black uppercase italic text-primary">Discover Brands</h3>
              <p className="text-on-surface/60 font-bold">AI curated matches for your unique profile.</p>
            </div>
            <button className="neo-button bg-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-primary hover:text-black">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brands.map((brand) => (
              <div key={brand.name} className="neo-card p-6 bg-surface-container group">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl ${brand.color} border-[3px] border-black shadow-brutal flex items-center justify-center`} style={{ boxShadow: `4px 4px 0px 0px ${brand.shadowColor}` }}>
                    <brand.icon className="text-white" size={28} strokeWidth={2} style={{ fill: 'currentColor' }} />
                  </div>
                  <div className={`${brand.fitBg} px-3 py-1 rounded-full border-2 border-black text-[10px] font-black shadow-brutal-sm`}>
                    {brand.fit} FIT
                  </div>
                </div>
                <h4 className="text-2xl font-black italic uppercase mb-1 text-on-surface">{brand.name}</h4>
                <p className="text-xs text-on-surface/50 font-bold mb-6">{brand.desc}</p>
                <div className="flex justify-between items-center pt-4 border-t-[3px] border-black border-dotted">
                  <span className="text-[10px] font-black uppercase opacity-40">Budget</span>
                  <span className="text-sm font-mono font-black text-primary">{brand.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function TrendingUp(props: React.SVGProps<SVGSVGElement> & { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
