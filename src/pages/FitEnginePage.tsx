import { Download, Users, Brain, Network, Sliders, BarChart3, Building2, UserSearch, Link2, AtSign, ChevronDown, CheckCircle, AlertTriangle, Lightbulb, History } from 'lucide-react';
import ShaderBackground from '../components/ShaderBackground';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import { useState, useEffect } from 'react';
import { findBrand, findCreator, generateFitAnalysis, type FitAnalysis } from '../utils/fitScoring';

interface FitEnginePageProps {
  onNavigate: (page: string) => void;
  onNewAnalysis?: () => void;
}

type FitHistoryItem = FitAnalysis & {
  checkedAt: string;
};

export default function FitEnginePage({ onNavigate, onNewAnalysis }: FitEnginePageProps) {
  const [activeTab, setActiveTab] = useState<'brand' | 'creator'>('brand');
  const [brandUrl, setBrandUrl] = useState('');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [inputError, setInputError] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [showPipeline, setShowPipeline] = useState(false);
  const [pipelineStage, setPipelineStage] = useState(0);
  const [resultsBlurred, setResultsBlurred] = useState(false);
  const [gaugeScore, setGaugeScore] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [fitAnalysis, setFitAnalysis] = useState<FitAnalysis | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<FitHistoryItem[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setSectionVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => animateGauge(fitAnalysis?.overallFitScore ?? 0), 500);
    return () => clearTimeout(t);
  }, [fitAnalysis?.overallFitScore]);

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
    if (!brandUrl.trim() || !creatorHandle.trim()) {
      setInputError('Add both a brand and creator before running analysis.');
      return;
    }

    const brand = findBrand(brandUrl);
    const creator = findCreator(creatorHandle);

    if (!brand || !creator) {
      setInputError('No profile found in prototype dataset.');
      return;
    }

    const generatedAnalysis = generateFitAnalysis(brand, creator);

    setInputError('');
    setAnalyzing(true);
    setResultsBlurred(true);
    setShowPipeline(true);
    setPipelineStage(0);
    setGaugeScore(0);

    const stages = [0, 1, 2, 3, 4];
    let i = 0;
    const interval = setInterval(() => {
      if (i < stages.length) {
        setPipelineStage(i + 1);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setFitAnalysis(generatedAnalysis);
          setAnalysisHistory((current) => [
            { ...generatedAnalysis, checkedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
            ...current.filter((item) => `${item.brand.name}-${item.creator.handle}` !== `${generatedAnalysis.brand.name}-${generatedAnalysis.creator.handle}`),
          ].slice(0, 3));
          setAnalyzing(false);
          setResultsBlurred(false);
          setShowPipeline(false);
          animateGauge(generatedAnalysis.overallFitScore);
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
  const scoreLabel = fitAnalysis
    ? fitAnalysis.overallFitScore >= 85
      ? 'Optimal'
      : fitAnalysis.overallFitScore >= 65
        ? 'Strong'
        : fitAnalysis.overallFitScore >= 45
          ? 'Selective'
          : 'Low Fit'
    : 'Awaiting';

  return (
    <div>
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
                  placeholder="brand.com or @brand"
                  aria-invalid={inputError && !brandUrl.trim() ? 'true' : 'false'}
                  onChange={(e) => {
                    setBrandUrl(e.target.value);
                    if (inputError) setInputError('');
                  }}
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
                  aria-invalid={inputError && !creatorHandle.trim() ? 'true' : 'false'}
                  onChange={(e) => {
                    setCreatorHandle(e.target.value);
                    if (inputError) setInputError('');
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-end gap-3">
            {inputError && (
              <p className="text-sm text-black font-black uppercase tracking-tight" role="alert">
                {inputError}
              </p>
            )}
            <button
              onClick={simulateAnalysis}
              disabled={analyzing || !brandUrl.trim() || !creatorHandle.trim()}
              className="fit-engine-analyze-button px-12 py-4 bg-black dark:bg-black text-primary dark:text-primary font-black rounded-full neo-button flex items-center gap-3 uppercase italic tracking-wider disabled:opacity-80 disabled:cursor-not-allowed"
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

        {analysisHistory.length > 0 && (
          <section className="neo-card bg-white p-6 mb-12" style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
          }}>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <History className="text-black" size={22} strokeWidth={3} />
                <h3 className="font-label-caps text-black uppercase font-black tracking-widest">Recent Checks</h3>
              </div>
              <span className="text-[10px] font-black text-black/50 uppercase tracking-widest">Latest 3</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysisHistory.map((item) => (
                <button
                  key={`${item.brand.name}-${item.creator.handle}-${item.checkedAt}`}
                  onClick={() => {
                    setFitAnalysis(item);
                    setGaugeScore(0);
                    animateGauge(item.overallFitScore);
                  }}
                  className="neo-button bg-surface-container-high p-4 text-left rounded-2xl border-[3px] border-black hover:bg-primary min-w-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-black font-black uppercase truncate">{item.brand.name}</p>
                      <p className="text-black/60 text-xs font-bold truncate">{item.creator.handle}</p>
                    </div>
                    <span className="text-black font-mono font-black text-xl flex-shrink-0">{item.overallFitScore}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-[10px] font-black uppercase text-black/50">
                    <span>${item.predictedCpm.toFixed(2)} CPM</span>
                    <span>{item.checkedAt}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Pipeline Section */}
        {showPipeline && (
          <section className="neo-card bg-white p-12 mb-12 text-center">
            <h3 className="font-label-caps text-black tracking-[0.4em] font-black uppercase mb-12">Neural Processing Pipeline</h3>
            <div className="flex items-center justify-between max-w-4xl mx-auto relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-black dark:bg-black -translate-y-1/2 z-0" />
              <div className="absolute top-1/2 left-0 w-full h-1 pipeline-line -translate-y-1/2 z-0" />
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-300 ${i < pipelineStage ? '' : 'opacity-40'}`}>
                  <div className={`w-14 h-14 rounded-full border-4 border-black flex items-center justify-center ${i < pipelineStage ? 'bg-primary' : 'bg-white'}`}>
                    <step.icon className="text-black dark:text-black" size={24} strokeWidth={3} />
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
                  <span className="font-label-caps text-black/60 font-black tracking-widest mt-2 uppercase">{scoreLabel}</span>
                </div>
              </div>
              <p className="mt-8 text-sm text-black font-bold italic">
                {fitAnalysis
                  ? `Confidence level (${fitAnalysis.confidence}) based on prototype creator-brand signals.`
                  : 'Enter a known brand and creator to generate prototype fit intelligence.'}
              </p>
            </div>

            {/* Explanation Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="neo-card bg-primary p-6">
                <div className="flex justify-between items-start mb-4">
                  <Users className="text-black dark:text-black" size={20} strokeWidth={3} />
                  <span className="font-mono text-black font-black">{fitAnalysis ? `${fitAnalysis.audienceMatch}%` : '--'}</span>
                </div>
                <h4 className="font-black text-black uppercase mb-2">Audience</h4>
                <p className="text-sm text-black/80 font-bold">
                  {fitAnalysis
                    ? `Overlap across ${fitAnalysis.brand.audience.slice(0, 2).join(' and ')} with ${fitAnalysis.creator.handle}'s active audience.`
                    : 'Audience compatibility will appear after analysis.'}
                </p>
              </div>
              <div className="neo-card bg-tertiary p-6">
                <div className="flex justify-between items-start mb-4">
                  <BarChart3 className="text-black dark:text-black" size={20} strokeWidth={3} />
                  <span className="font-mono text-black font-black">{fitAnalysis ? `${fitAnalysis.toneMatch}%` : '--'}</span>
                </div>
                <h4 className="font-black text-black uppercase mb-2">Tone</h4>
                <p className="text-sm text-black/80 font-bold">
                  {fitAnalysis
                    ? `Voice compatibility across ${fitAnalysis.brand.tone.slice(0, 2).join(' and ')} brand signals.`
                    : 'Tone compatibility will appear after analysis.'}
                </p>
              </div>
              <div className="neo-card bg-secondary p-6">
                <div className="flex justify-between items-start mb-4">
                  <Sliders className="text-black dark:text-black" size={20} strokeWidth={3} />
                  <span className="font-mono text-black font-black">{fitAnalysis ? `${fitAnalysis.engagementPrediction}%` : '--'}</span>
                </div>
                <h4 className="font-black text-black uppercase mb-2">Engagement</h4>
                <p className="text-sm text-black/80 font-bold">
                  {fitAnalysis
                    ? `${fitAnalysis.creator.engagementLevel.toUpperCase()} engagement profile with an estimated ${fitAnalysis.predictedCpm.toFixed(2)} CPM.`
                    : 'Engagement prediction will appear after analysis.'}
                </p>
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
                      {fitAnalysis ? (
                        <>
                          <span className="bg-primary border-2 border-black px-2 rounded text-black font-black">{fitAnalysis.creator.niche}</span> gives {fitAnalysis.brand.name} a prototype advantage. {fitAnalysis.advantage}
                        </>
                      ) : (
                        'Run a match to surface the strongest creator-brand advantage.'
                      )}
                    </p>
                    <div className="flex items-center gap-3 p-4 bg-secondary border-[3px] border-black rounded-xl">
                      <Lightbulb className="text-black dark:text-black" size={20} strokeWidth={3} />
                      <p className="text-sm text-black font-bold">
                        AI Recommendation: {fitAnalysis ? fitAnalysis.recommendationSummary : 'Choose a creator and brand to generate a recommendation.'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-label-caps text-black font-black uppercase">Risk Assessment</h5>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm font-bold text-black">
                        <CheckCircle className="text-black" size={18} strokeWidth={3} /> Brand safety score: {fitAnalysis ? `${fitAnalysis.brandSafetyScore}%` : '--'}
                      </li>
                      <li className="flex items-center gap-3 text-sm font-bold text-black">
                        <CheckCircle className="text-black" size={18} strokeWidth={3} /> Follower base: {fitAnalysis ? fitAnalysis.creator.followerCount.toLocaleString() : '--'}
                      </li>
                      <li className="flex items-center gap-3 text-sm font-bold text-black">
                        <AlertTriangle className="text-tertiary" size={18} strokeWidth={3} style={{ filter: 'drop-shadow(1px 1px 0 #000)' }} /> {fitAnalysis ? fitAnalysis.riskNote : 'Risk assessment pending'}
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
                <span className="font-display text-h2 text-black italic">{fitAnalysis ? `$${fitAnalysis.predictedCpm.toFixed(2)}` : '--'}</span>
                <span className="text-black/60 text-[12px] ml-2 font-black font-mono">
                  {fitAnalysis ? `$${fitAnalysis.creator.estimatedCpm.toFixed(2)} BASE` : 'BASE'}
                </span>
              </div>
            </div>
            <div className="neo-card bg-tertiary p-6 flex flex-col justify-between">
              <p className="font-label-caps text-black font-black uppercase">Conversion Est.</p>
              <div className="mt-4">
                <span className="font-display text-h2 text-black italic">
                  {fitAnalysis ? `${(fitAnalysis.engagementPrediction / 18).toFixed(1)}%` : '--'}
                </span>
                <span className="text-black/60 text-[12px] ml-2 font-black font-mono">
                  {fitAnalysis ? `${fitAnalysis.overallFitScore}% FIT` : 'FIT'}
                </span>
              </div>
            </div>
            <div className="md:col-span-2 neo-card bg-white p-6 flex flex-col justify-between">
              <p className="font-label-caps text-black font-black uppercase">Top Keyword Match</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(fitAnalysis?.topKeywordMatches ?? ['Awaiting', 'Prototype', 'Match', 'Signals']).map((kw) => (
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
