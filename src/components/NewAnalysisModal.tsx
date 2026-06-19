import { useState } from 'react';
import { X, Sparkles, Eye, TrendingUp, MessageSquare, Zap, Database, Shield } from 'lucide-react';

interface NewAnalysisModalProps {
  onClose: () => void;
  onNavigate: (page: string) => void;
}

type Goal = 'awareness' | 'conversion' | 'engagement';

export default function NewAnalysisModal({ onClose, onNavigate }: NewAnalysisModalProps) {
  const [url, setUrl] = useState('');
  const [goal, setGoal] = useState<Goal | null>(null);
  const [running, setRunning] = useState(false);

  const goals: { id: Goal; label: string; icon: typeof Eye }[] = [
    { id: 'awareness', label: 'Awareness', icon: Eye },
    { id: 'conversion', label: 'Conversion', icon: TrendingUp },
    { id: 'engagement', label: 'Engagement', icon: MessageSquare },
  ];

  const handleAnalyze = () => {
    if (!url) return;
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      onClose();
      onNavigate('fit-engine');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl neo-card bg-surface-container-low overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 bg-surface-container-high border-2 border-black/30 rounded-full flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/40 transition-colors z-10"
        >
          <X size={16} strokeWidth={2.5} className="text-on-surface/60" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Form */}
          <div className="p-10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-primary" size={16} strokeWidth={2.5} />
              <span className="font-label-caps text-primary tracking-[0.3em] font-black">FIT ENGINE V2.4</span>
            </div>

            <h2 className="font-display text-4xl font-black text-white mb-3 leading-tight">Start a New<br />Fit Check</h2>
            <p className="text-on-surface/50 font-medium text-sm leading-relaxed mb-8">
              Analyze the semantic alignment between a creator's content history and your brand's core values.
            </p>

            {/* URL Input */}
            <div className="mb-7">
              <label className="block text-label-caps text-on-surface/40 font-black mb-3">Creator or Brand URL</label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                <input
                  className="w-full bg-surface-container border-2 border-black/30 rounded-2xl pl-11 pr-4 py-4 text-white font-bold focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface/25"
                  placeholder="https://social.com/username"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>

            {/* Campaign Goal */}
            <div className="mb-8">
              <label className="block text-label-caps text-on-surface/40 font-black mb-3">Campaign Goal</label>
              <div className="grid grid-cols-3 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`neo-card p-4 flex flex-col items-center gap-2 transition-all ${
                      goal === g.id
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-surface-container text-on-surface/50 hover:border-primary/40 hover:text-on-surface/80'
                    }`}
                  >
                    <g.icon size={22} strokeWidth={2} />
                    <span className="text-xs font-black">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAnalyze}
              disabled={!url || running}
              className="w-full neo-button bg-primary text-black py-4 font-black text-base flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {running ? (
                <>
                  <Sparkles size={18} className="animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  Analyze Alignment <Zap size={18} strokeWidth={3} />
                </>
              )}
            </button>
          </div>

          {/* Right: Status Panel */}
          <div className="bg-surface-container-lowest border-l-[3px] border-black/30 p-10 flex flex-col items-center justify-center text-center">
            <div className="w-28 h-28 rounded-full bg-surface-container border-[3px] border-black/30 flex items-center justify-center mb-6">
              <Database className="text-on-surface/20" size={48} strokeWidth={1.5} />
            </div>
            <h3 className="font-black text-white text-xl mb-2">Ready for Input</h3>
            <p className="text-on-surface/40 text-sm font-medium leading-relaxed max-w-48">
              Enter a profile to begin high-fidelity alignment testing.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-4 border-t-[3px] border-black/20 flex items-center justify-between bg-surface-container-lowest/50">
          <div className="flex items-center gap-2 text-on-surface/30 text-[10px] font-black uppercase tracking-widest">
            <Shield size={11} strokeWidth={2} /> Encrypted Data Flow
          </div>
          <div className="flex items-center gap-2 text-on-surface/30 text-[10px] font-black uppercase tracking-widest">
            <Zap size={11} strokeWidth={2} /> ~4.2s Latency
          </div>
          <div className="text-on-surface/20 text-[10px] font-black uppercase tracking-widest">
            VID: CF0-8821-X
          </div>
        </div>
      </div>
    </div>
  );
}
