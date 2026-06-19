import { Download, Users, Brain, Network, Sliders, BarChart3, Building2, UserSearch, Link2, AtSign, ChevronDown, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import ShaderBackground from '../components/ShaderBackground';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import { useState, useEffect } from 'react';

interface FitEnginePageProps {
  onNavigate: (page: string) => void;
  onNewAnalysis?: () => void;
}

export default function FitEnginePage({ onNavigate, onNewAnalysis }: FitEnginePageProps) {
  const [activeTab, setActiveTab] = useState<'brand' | 'creator'>('brand');
  const [brandUrl, setBrandUrl] = useState('https://acme-global.com');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [showPipeline, setShowPipeline] = useState(false);
  const [pipelineStage, setPipelineStage] = useState(0);
  const [resultsBlurred, setResultsBlurred] = useState(false);
  const [gaugeScore, setGaugeScore] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSectionVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => animateGauge(89), 500);
    return () => clearTimeout(t);
  }, []);

  function animateGauge(finalScore: number) {
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();
    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(easedProgress * finalScore);
      setGaugeScore(current);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function simulateAnalysis() {
    setAnalyzing(true);
    setResultsBlurred(true);
    setShowPipeline(true);
    setPipelineStage(0);

    const stages = [0, 1, 2, 3, 4];
    let i = 0;
    const interval = setInterval(() => {
      if (i < stages.length) {
        setPipelineStage(i + 1);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setAnalyzing(false);
          setResultsBlurred(false);
          setShowPipeline(false);
          animateGauge(89);
        }, 500);
      }
    }, 800);
  }

  const pipelineSteps = [
    { icon: Download, label: 'Extraction' },
    { icon: Users, label: 'Audience' },
    { icon: Brain, label: 'Tone' },
    { icon: Network, label: 'Embedding' },
    { icon: Sliders, label: 'Scoring' },
  ];

  const gaugeOffset = 440 - (gaugeScore / 100) * 440;

  return (
    <div className="dark">
      <ShaderBackground />
      <Sidebar activeItem="fit-engine" onNavigate={onNavigate} onNewAnalysis={onNewAnalysis} />
      <TopNav />

      <main className="ml-[260px] pt-24 px-margin-desktop pb-12 max-w-container-max mx-auto">
        {/* Header */}
        <header className="mb-12" style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}>
          <h2 className="font-display text-display text-white uppercase italic tracking-tighter">Fit Engine</h2>
          <p className="text-on-surface-variant font-body-lg max-w-2xl mt-2 font-bold">Precision alignment modeling using neural embedding. Predict collaboration performance before the first outreach.</p>
        </header>

        {/* Engine Input Card */}
        <section className="neo-card bg-primary p-8 mb-12 relative overflow-hidden" style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
        }}>
          <div className="flex items-center gap-8 border-b-[3px] border-black mb-8">
            <button
              onClick={() => setActiveTab('brand')}
              className={`pb-4 font-black flex items-center gap-2 uppercase tracking-tight ${activeTab === 'brand' ? 'text-black border-b-4 border-black' : 'text-black/60 hover:text-black'}`}
            >
              <Building2 size={18} strokeWidth={3} /> Brand Searching Creator
            </button>
            <button
              onClick={() => setActiveTab('creator')}
              className={`pb-4 font-bold flex items-center gap-2 uppercase tracking-tight ${activeTab === 'creator' ? 'text-black border-b-4 border-black' : 'text-black/60 hover:text-black'}`}
            >
              <UserSearch size={18} strokeWidth={3} /> Creator Searching Brand
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div className="space-y-4">
              <label className="block font-label-caps text-black uppercase font-black">Target Brand URL or Handle</label>
              <div className="relative">
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} strokeWidth={3} />
                <input
                  className="w-full bg-white border-[3px] border-black rounded-xl pl-12 pr-4 py-4 focus:ring-0 focus:outline-none text-black font-bold transition-all"
                  type="text"
                  value={brandUrl}
                  onChange={(e) => setBrandUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="block font-label-caps text-black uppercase font-black">Target Creator URL or Handle</label>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} strokeWidth={3} />
                <input
                  className="w-full bg-white border-[3px] border-black rounded-xl pl-12 pr-4 py-4 focus:ring-0 focus:outline-none text-black font-bold transition-all"
                  placeholder="@creator_handle"
                  type="text"
                  value={creatorHandle}
                  onChange={(e) => setCreatorHandle(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={simulateAnalysis}
              disabled={analyzing}
              className="px-12 py-4 bg-black text-primary font-black rounded-full neo-button flex items-center gap-3 uppercase italic tracking-wider disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {analyzing ? (
                <>
                  <BarChart3 size={18} className="animate-spin" strokeWidth={3} /> PROCESSING...
                </>
              ) : (
                <>
                  <BarChart3 size={18} strokeWidth={3} /> Analyze Alignment
                </>
              )}
            </button>
          </div>
        </section>

        {/* Pipeline Section */}
        {showPipeline && (
          <section className="neo-card bg-white p-12 mb-12 text-center">
            <h3 className="font-label-caps text-black tracking-[0.4em] font-black uppercase mb-12">Neural Processing Pipeline</h3>
            <div className="flex items-center justify-between max-w-4xl mx-auto relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-black -translate-y-1/2 z-0" />
              <div className="absolute top-1/2 left-0 w-full h-1 pipeline-line -translate-y-1/2 z-0" />
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-300 ${i < pipelineStage ? '' : 'opacity-40'}`}>
                  <div className={`w-14 h-14 rounded-full border-4 border-black flex items-center justify-center ${i < pipelineStage ? 'bg-primary' : 'bg-white'}`}>
                    <step.icon className="text-black" size={24} strokeWidth={3} />
                  </div>
                  <span className="text-[10px] font-black font-mono text-black uppercase">{step.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Results Section */}
        <div className={`space-y-stack-lg transition-all duration-300 ${resultsBlurred ? 'opacity-30 blur-md pointer-events-none' : ''}`}>
          {/* Gauge + Explanation Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
          }}>
            {/* Fit Score Gauge */}
            <div className="neo-card bg-secondary p-8 flex flex-col items-center justify-center text-center">
              <h3 className="font-label-caps text-black uppercase font-black mb-8">Overall Fit Score</h3>
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" fill="transparent" r="70" stroke="rgba(0,0,0,0.1)" strokeWidth="15" />
                  <circle
                    cx="80" cy="80" fill="transparent" r="70" stroke="#c7f02d" strokeWidth="15" strokeLinecap="round"
                    className="score-high-glow"
                    style={{
                      strokeDasharray: 440,
                      strokeDashoffset: gaugeOffset,
                      transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </svg>
                <div className="z-10 flex flex-col items-center">
                  <span className="font-display text-[64px] font-black text-black leading-none">{gaugeScore}</span>
                  <span className="font-label-caps text-black/60 font-black tracking-widest mt-2 uppercase">Optimal</span>
                </div>
              </div>
              <p className="mt-8 text-sm text-black font-bold italic">High confidence level (0.94) based on historical cross-campaign data.</p>
            </div>

            {/* Explanation Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="neo-card bg-primary p-6">
                <div className="flex justify-between items-start mb-4">
                  <Users className="text-black" size={20} strokeWidth={3} />
                  <span className="font-mono text-black font-black">92%</span>
                </div>
                <h4 className="font-black text-black uppercase mb-2">Audience</h4>
                <p className="text-sm text-black/80 font-bold">Overlapping demographic clusters in tech-focused Gen-Z verticals. Minimal saturation risk.</p>
              </div>
              <div className="neo-card bg-tertiary p-6">
                <div className="flex justify-between items-start mb-4">
                  <BarChart3 className="text-black" size={20} strokeWidth={3} />
                  <span className="font-mono text-black font-black">84%</span>
                </div>
                <h4 className="font-black text-black uppercase mb-2">Tone</h4>
                <p className="text-sm text-black/80 font-bold">Semantic analysis reveals 84% brand voice compatibility. High alignment in "Educational Tech" niches.</p>
              </div>
              <div className="neo-card bg-secondary p-6">
                <div className="flex justify-between items-start mb-4">
                  <Sliders className="text-black" size={20} strokeWidth={3} />
                  <span className="font-mono text-black font-black">88%</span>
                </div>
                <h4 className="font-black text-black uppercase mb-2">Engagement</h4>
                <p className="text-sm text-black/80 font-bold">Historical conversion coefficients suggest a 1.4x uplift over standard baseline benchmarks.</p>
              </div>
            </div>
          </div>

          {/* Why This Score Details */}
          <div className="neo-card bg-white overflow-hidden" style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s',
          }}>
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <BarChart3 className="text-black" size={24} strokeWidth={3} />
                <span className="font-display text-h2 text-black uppercase italic">Why This Score?</span>
              </div>
              <ChevronDown
                className="text-black transition-transform duration-300"
                size={24}
                strokeWidth={3}
                style={{ transform: detailsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            {detailsOpen && (
              <div className="px-8 pb-8 space-y-6 border-t-[3px] border-black pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h5 className="font-label-caps text-black font-black uppercase">Competitive Advantage</h5>
                    <p className="text-body-md text-black font-bold">
                      The creator's unique positioning in <span className="bg-primary border-2 border-black px-2 rounded text-black font-black">Sustainable Hardware</span> mirrors your upcoming product roadmap. This alignment is significantly higher than 92% of creators in this category.
                    </p>
                    <div className="flex items-center gap-3 p-4 bg-secondary border-[3px] border-black rounded-xl">
                      <Lightbulb className="text-black" size={20} strokeWidth={3} />
                      <p className="text-sm text-black font-bold">AI Recommendation: Focus outreach on "Future of Mobility" themes.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-label-caps text-black font-black uppercase">Risk Assessment</h5>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm font-bold text-black">
                        <CheckCircle className="text-black" size={18} strokeWidth={3} /> Zero recent competitive brand partnerships
                      </li>
                      <li className="flex items-center gap-3 text-sm font-bold text-black">
                        <CheckCircle className="text-black" size={18} strokeWidth={3} /> High comment sentiment score (0.88)
                      </li>
                      <li className="flex items-center gap-3 text-sm font-bold text-black">
                        <AlertTriangle className="text-tertiary" size={18} strokeWidth={3} style={{ filter: 'drop-shadow(1px 1px 0 #000)' }} /> Slight audience overlap with existing campaign 04
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bento Mini Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6" style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
          }}>
            <div className="neo-card bg-primary p-6 flex flex-col justify-between">
              <p className="font-label-caps text-black font-black uppercase">Predicted CPM</p>
              <div className="mt-4">
                <span className="font-display text-h2 text-black italic">$12.40</span>
                <span className="text-black/60 text-[12px] ml-2 font-black font-mono">-$2.10 VS AVG</span>
              </div>
            </div>
            <div className="neo-card bg-tertiary p-6 flex flex-col justify-between">
              <p className="font-label-caps text-black font-black uppercase">Conversion Est.</p>
              <div className="mt-4">
                <span className="font-display text-h2 text-black italic">4.8%</span>
                <span className="text-black/60 text-[12px] ml-2 font-black font-mono">+1.2%</span>
              </div>
            </div>
            <div className="md:col-span-2 neo-card bg-white p-6 flex flex-col justify-between">
              <p className="font-label-caps text-black font-black uppercase">Top Keyword Match</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Minimalism', 'Productivity', 'Premium Tech', 'Workflow'].map((kw) => (
                  <span key={kw} className={`border-2 border-black px-3 py-1 rounded-full text-sm text-black font-black ${kw === 'Productivity' ? 'bg-secondary' : kw === 'Premium Tech' ? 'bg-tertiary' : 'bg-primary'}`}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
