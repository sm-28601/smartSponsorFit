import { Eye, Download, Link2, Check, Plus, MapPin, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import ShaderBackground from '../components/ShaderBackground';
import Sidebar from '../components/Sidebar';

interface ExportsPageProps {
  onNavigate: (page: string) => void;
  onNewAnalysis?: () => void;
}

export default function ExportsPage({ onNavigate, onNewAnalysis }: ExportsPageProps) {
  const [includeData, setIncludeData] = useState({
    audienceDemographics: true,
    brandCollaborations: false,
    aiVerificationBadges: true,
  });

  const engagementTrend = [
    { month: 'Jan', value: 4.2 },
    { month: 'Feb', value: 4.8 },
    { month: 'Mar', value: 4.5 },
    { month: 'Apr', value: 5.4 },
    { month: 'May', value: 5.1 },
    { month: 'Jun', value: 6.0 },
    { month: 'Jul', value: 6.8 },
  ];
  const trendPoints = engagementTrend
    .map((point, index) => {
      const x = 18 + index * 37;
      const y = 112 - ((point.value - 3.5) / 3.8) * 86;
      return `${x},${y}`;
    })
    .join(' ');
  const trendAreaPoints = `18,118 ${trendPoints} 240,118`;

  return (
    <div>
      <ShaderBackground opacity={40} />
      <Sidebar activeItem="exports" onNavigate={onNavigate} onNewAnalysis={onNewAnalysis} />

      {/* Custom top bar for exports - matches screenshot layout */}
      <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-16 bg-black/20 backdrop-blur-md border-b-4 border-black z-40 flex justify-between items-center px-10">
        <div>
          <h1 className="font-display text-2xl font-black text-white">Media Kit Exports</h1>
          <p className="text-on-surface/40 text-xs font-bold">Generate AI-verified performance reports for brands and partners.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input className="bg-surface-container border-2 border-black/40 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-on-surface/30 focus:outline-none focus:border-primary w-52" placeholder="Search exports..." />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
          <button className="p-2 bg-surface-container border-2 border-black/20 rounded-full hover:border-primary transition-colors relative">
            <svg className="w-5 h-5 text-on-surface/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-surface" />
          </button>
          <img className="w-9 h-9 rounded-full border-2 border-primary object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsl6oqHJA5QTo39561LQg3z2l5CmpLpUvvI0Pry_A77pDXwegYuePfpPpwCmh69NxI3IDlL8wcSuOYBx6tmR30fDAQ2xnejMx46cbIigcyigqbjOaKekGiHV9j5BMku5hcOTFZcTkn40U2zFOKe30wG85AdBDGBXFvYsm7xHJXoY7gkW9PHFZgciJ5ftjnWQipUrkAdt6W_9sii8Pbklq-g1rPwV4QvB5oELXm1PRVfQs39mvePGHxfN6n-9UTLkuLLScK_iOLP4db" alt="user" />
        </div>
      </header>

      <main className="ml-sidebar-width pt-16 min-h-screen overflow-y-auto custom-scrollbar">
        <div className="px-10 py-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Live Preview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Preview Card */}
              <div className="neo-card bg-surface-container overflow-hidden">
                <div className="flex items-center justify-between px-8 py-5 border-b-2 border-black/20">
                  <div className="flex items-center gap-2 text-on-surface font-black">
                    <Eye size={18} strokeWidth={2.5} /> Live Preview
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs font-black">
                    <Check size={12} strokeWidth={3} /> AI Verified Data
                  </div>
                </div>

                {/* Profile Section */}
                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDznBBNh6ORAXUjHRc_iPYFlEcLMP8VLJHW5gY9IaURTyA5dZd3sYyAUZTCI3sBIi1ftgjL_knDIGpzjXVBmtLG3TM6Qd8yq6I_hqwnypYpMwTsgfh8N-b2b1DtQtB4oxnG98Do_zsO1aAvxpNOLQd5N3GWtLeVtRdkIDTXkqsxl1YQrB0mfpTKtZ1ywBo1Ow0sFNFll9-7HxFCpmSVUXICXZC3VXOUhRgFb4LB1-LPsWu2xwLmHKcpX1AzOMUaQX2kxXkApsFWM88d"
                      alt="Elena Vance"
                      className="w-24 h-24 rounded-2xl object-cover border-[3px] border-black shadow-brutal flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <h2 className="font-display text-3xl font-black text-white">Elena Vance</h2>
                          <p className="text-primary font-black uppercase tracking-widest text-sm mt-1">TECH & AI STORYTELLER</p>
                          <div className="flex items-center gap-4 mt-3 text-on-surface/50 text-sm font-bold">
                            <span className="flex items-center gap-1"><MapPin size={13} /> Austin, TX</span>
                            <span className="flex items-center gap-1"><Link2 size={13} /> linktr.ee/elena</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-on-surface/40 text-label-caps font-black">TOTAL REACH</p>
                          <p className="font-display text-4xl font-black text-white">2.4M+</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Subscribers', value: '842K', sub: '+12.4% MoM' },
                      { label: 'Avg. Engagement', value: '6.8%', sub: 'Top 2% Tier' },
                      { label: 'Watch Time', value: '1.2M hrs', sub: '' },
                      { label: 'Fit Score', value: '98/100', sub: 'Elite Accuracy', isScore: true },
                    ].map((s) => (
                      <div key={s.label} className={`neo-card p-4 ${s.isScore ? 'bg-primary/10 border-primary/30' : 'bg-surface-container-high'}`}>
                        <p className="text-on-surface/40 text-[10px] font-black uppercase mb-1">{s.label}</p>
                        <p className={`font-black text-xl ${s.isScore ? 'text-primary' : 'text-white'}`}>{s.value}</p>
                        {s.sub && <p className="text-on-surface/40 text-xs font-bold mt-0.5">{s.sub}</p>}
                      </div>
                    ))}
                  </div>

                  {/* Demographics + Chart Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="neo-card bg-surface-container-high p-6">
                      <h4 className="font-black text-white mb-4">Audience Demographics</h4>
                      <div className="space-y-4">
                        {[{ label: 'Gen Z (18-24)', pct: 42 }, { label: 'Millennials (25-34)', pct: 38 }].map((d) => (
                          <div key={d.label}>
                            <div className="flex justify-between mb-1.5 text-sm">
                              <span className="text-on-surface/70 font-bold">{d.label}</span>
                              <span className="text-white font-black">{d.pct}%</span>
                            </div>
                            <div className="w-full bg-gray-300 dark:bg-black/40 h-2 rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: `${d.pct * 2}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="neo-card bg-surface-container-high p-6 overflow-hidden">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h4 className="font-black text-white">Engagement Trend</h4>
                          <p className="text-on-surface/40 text-xs font-bold mt-1">Mock 7-month verified engagement rate</p>
                        </div>
                        <div className="text-right">
                          <p className="text-primary font-black text-2xl leading-none">6.8%</p>
                          <p className="text-on-surface/40 text-[10px] font-black uppercase">Current</p>
                        </div>
                      </div>
                      <div className="h-36 rounded-2xl bg-black/20 border-2 border-black/20 p-3">
                        <svg viewBox="0 0 260 130" className="w-full h-full" role="img" aria-label="Engagement trend graph">
                          <defs>
                            <linearGradient id="engagementFill" x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0%" stopColor="#c7f02d" stopOpacity="0.45" />
                              <stop offset="100%" stopColor="#c7f02d" stopOpacity="0.02" />
                            </linearGradient>
                          </defs>
                          {[32, 60, 88, 116].map((y) => (
                            <line key={y} x1="12" x2="248" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                          ))}
                          <polygon points={trendAreaPoints} fill="url(#engagementFill)" />
                          <polyline points={trendPoints} fill="none" stroke="#c7f02d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                          {trendPoints.split(' ').map((point) => {
                            const [cx, cy] = point.split(',');
                            return <circle key={point} cx={cx} cy={cy} r="5" fill="#c7f02d" stroke="#000" strokeWidth="3" />;
                          })}
                        </svg>
                      </div>
                      <div className="flex justify-between mt-2 text-on-surface/30 text-[10px] font-black uppercase">
                        {engagementTrend.map((point) => <span key={point.month}>{point.month}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Exports Table */}
              <div className="neo-card bg-surface-container overflow-hidden">
                <div className="px-8 py-5 border-b-2 border-black/20">
                  <h3 className="font-black text-white text-lg">Recent Exports</h3>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black/10">
                      {['Report Name', 'Type', 'Date', 'Status', 'Action'].map((h) => (
                        <th key={h} className="px-7 py-4 text-left text-label-caps text-on-surface/40 font-black">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Q3 Partnership Kit', type: 'Media Kit PDF', date: 'Oct 24, 2023', status: 'ACTIVE', statusColor: 'bg-primary/20 text-primary', action: 'Download' },
                      { name: 'YouTube Verification', type: 'Stats Snapshot', date: 'Oct 18, 2023', status: 'EXPIRED', statusColor: 'bg-red-500/20 text-red-400', action: 'Renew' },
                    ].map((r) => (
                      <tr key={r.name} className="border-b border-black/10 hover:bg-white/3 transition-colors">
                        <td className="px-7 py-5 font-bold text-white">{r.name}</td>
                        <td className="px-7 py-5 text-on-surface/50 text-sm font-bold">{r.type}</td>
                        <td className="px-7 py-5 text-on-surface/50 text-sm font-bold">{r.date}</td>
                        <td className="px-7 py-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-black ${r.statusColor}`}>{r.status}</span>
                        </td>
                        <td className="px-7 py-5">
                          <button className="text-primary font-black text-sm hover:underline">{r.action}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Actions + Customize */}
            <div className="space-y-5">
              {/* Download */}
              <button className="w-full neo-button bg-primary text-black py-4 font-black flex items-center justify-center gap-3 text-base">
                <Download size={18} strokeWidth={3} /> Download PDF Kit
              </button>
              {/* Copy Link */}
              <button className="w-full neo-button bg-surface-container text-white py-4 font-black flex items-center justify-center gap-3 text-base border-2 border-black/40">
                <Link2 size={18} strokeWidth={2.5} /> Copy Shareable Link
              </button>
              <p className="text-on-surface/30 text-xs text-center font-bold leading-relaxed">
                Shareable links expire automatically after 30 days unless verified. Verified creators get unlimited active links.
              </p>

              {/* Customize Kit */}
              <div className="neo-card bg-surface-container p-7 space-y-5">
                <h3 className="font-black text-white text-lg">Customize Kit</h3>

                <div>
                  <p className="text-label-caps text-on-surface/40 font-black mb-3">Visual Theme</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="neo-button bg-surface-container-high border-primary text-white py-3 text-sm font-black text-center">
                      Midnight Glow
                    </button>
                    <button className="neo-button bg-surface-container-high text-on-surface/50 py-3 text-sm font-bold text-center hover:border-primary">
                      Cyber Mint
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-label-caps text-on-surface/40 font-black mb-3">Include Data</p>
                  <div className="space-y-3">
                    {[
                      { key: 'audienceDemographics' as const, label: 'Audience Demographics' },
                      { key: 'brandCollaborations' as const, label: 'Brand Collaborations' },
                      { key: 'aiVerificationBadges' as const, label: 'AI Verification Badges' },
                    ].map((t) => (
                      <div key={t.label} className="flex items-center justify-between">
                        <span className="text-white text-sm font-bold">{t.label}</span>
                        <button
                          type="button"
                          onClick={() => setIncludeData((current) => ({ ...current, [t.key]: !current[t.key] }))}
                          className={`w-12 h-6 rounded-full border-2 border-black relative overflow-hidden transition-colors flex-shrink-0 ${includeData[t.key] ? 'bg-primary' : 'bg-surface-container-highest'}`}
                          aria-pressed={includeData[t.key]}
                        >
                          <span className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-black shadow transition-transform ${includeData[t.key] ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-label-caps text-on-surface/40 font-black mb-3">Featured Content</p>
                  <div className="neo-card bg-surface-container-high p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-black/40 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <BarChart3 className="text-primary" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-black truncate">Why AI is the new creative...</p>
                      <p className="text-on-surface/40 text-xs font-bold">1.2M Views</p>
                    </div>
                    <Check className="text-primary flex-shrink-0" size={16} strokeWidth={3} />
                  </div>
                  <button className="w-full mt-3 py-2.5 border-2 border-dashed border-black/30 text-on-surface/40 text-sm font-black rounded-2xl hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                    <Plus size={14} strokeWidth={3} /> Add more content
                  </button>
                </div>
              </div>

              {/* Upgrade CTA */}
              <div className="neo-card bg-surface-container p-7">
                <span className="text-[10px] font-black bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-400/30">UPGRADE</span>
                <h3 className="font-black text-white text-xl mt-4 mb-2">Unlock Custom Branding</h3>
                <p className="text-on-surface/50 text-sm leading-relaxed mb-4">Remove the CreatorFit logo and add your own custom agency branding to all exports.</p>
                <button className="text-primary font-black text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  View Pro Plans →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
