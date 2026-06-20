import { TrendingUp, Filter, Download, ChevronLeft, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';
import ShaderBackground from '../components/ShaderBackground';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

interface RequestsPageProps {
  onNavigate: (page: string) => void;
  onNewAnalysis?: () => void;
}

const REQUESTS = [
  { brand: 'Lumina Wellness', category: 'Health & Fitness', fit: 94, date: 'Oct 24, 2023', status: 'Accepted', statusColor: 'bg-primary/20 text-primary border-primary/30', barColor: 'bg-primary', action: 'View Pitch' },
  { brand: 'Vertex Dynamics', category: 'Tech & Software', fit: 78, date: 'Oct 26, 2023', status: 'Viewed', statusColor: 'bg-blue-500/20 text-blue-400 border-blue-400/30', barColor: 'bg-blue-400', action: 'View Pitch' },
  { brand: 'Aether Apparels', category: 'Sustainable Fashion', fit: 62, date: 'Oct 28, 2023', status: 'Pending', statusColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30', barColor: 'bg-yellow-400', action: 'View Pitch' },
  { brand: 'Nova Energy', category: 'Renewables', fit: 41, date: 'Oct 21, 2023', status: 'Declined', statusColor: 'bg-red-500/20 text-red-400 border-red-400/30', barColor: 'bg-red-400', action: 'Archive' },
  { brand: 'Onyx Travel', category: 'Luxury Lifestyle', fit: 89, date: 'Nov 01, 2023', status: 'Pending', statusColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30', barColor: 'bg-yellow-400', action: 'View Pitch' },
];

const brandIcons: Record<string, { bg: string; char: string }> = {
  'Lumina Wellness': { bg: 'bg-primary/30', char: '▲' },
  'Vertex Dynamics': { bg: 'bg-blue-500/30', char: '◈' },
  'Aether Apparels': { bg: 'bg-amber-500/30', char: '◻' },
  'Nova Energy': { bg: 'bg-orange-500/30', char: '◉' },
  'Onyx Travel': { bg: 'bg-slate-500/30', char: '◇' },
};

export default function RequestsPage({ onNavigate, onNewAnalysis }: RequestsPageProps) {
  return (
    <div>
      <ShaderBackground opacity={40} />
      <Sidebar activeItem="requests" onNavigate={onNavigate} onNewAnalysis={onNewAnalysis} />
      <TopNav avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAsl6oqHJA5QTo39561LQg3z2l5CmpLpUvvI0Pry_A77pDXwegYuePfpPpwCmh69NxI3IDlL8wcSuOYBx6tmR30fDAQ2xnejMx46cbIigcyigqbjOaKekGiHV9j5BMku5hcOTFZcTkn40U2zFOKe30wG85AdBDGBXFvYsm7xHJXoY7gkW9PHFZgciJ5ftjnWQipUrkAdt6W_9sii8Pbklq-g1rPwV4QvB5oELXm1PRVfQs39mvePGHxfN6n-9UTLkuLLScK_iOLP4db" />

      <main className="ml-sidebar-width pt-16 min-h-screen overflow-y-auto custom-scrollbar">
        <div className="px-10 py-10 max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display text-5xl font-black text-white uppercase tracking-tighter mb-2">My Requests</h1>
            <p className="text-on-surface/60 font-medium text-lg">Manage and track your active collaboration pitches and endorsement requests.</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="neo-card bg-surface-container p-7">
              <p className="text-on-surface/40 text-label-caps font-black mb-2">TOTAL SENT</p>
              <p className="font-display text-5xl font-black text-white">48</p>
              <p className="text-primary text-sm font-bold mt-2 flex items-center gap-1">
                <TrendingUp size={13} strokeWidth={2.5} /> 12% from last month
              </p>
            </div>
            <div className="neo-card bg-surface-container p-7">
              <p className="text-on-surface/40 text-label-caps font-black mb-2">ACCEPTED</p>
              <p className="font-display text-5xl font-black text-white">24</p>
              <p className="text-on-surface/40 text-sm font-bold mt-2">50% conversion rate</p>
            </div>
            <div className="neo-card bg-surface-container p-7">
              <p className="text-on-surface/40 text-label-caps font-black mb-2">AVG. FIT SCORE</p>
              <div className="flex items-baseline gap-1">
                <p className="font-display text-5xl font-black text-white">86</p>
                <span className="text-on-surface/40 font-bold">/100</span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-black/40 h-2 rounded-full mt-3">
                <div className="bg-primary h-full rounded-full" style={{ width: '86%' }} />
              </div>
            </div>
            <div className="neo-card bg-surface-container p-7 flex flex-col gap-3">
              <button className="neo-button bg-surface-container-high text-on-surface px-4 py-2.5 text-sm flex items-center gap-2 w-full justify-center">
                <Filter size={14} strokeWidth={2.5} /> Filter View
              </button>
              <button className="neo-button bg-surface-container-high text-on-surface px-4 py-2.5 text-sm flex items-center gap-2 w-full justify-center">
                <Download size={14} strokeWidth={2.5} /> Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="neo-card bg-surface-container overflow-hidden mb-10">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black/40">
                  <th className="px-7 py-5 text-left font-black text-label-caps text-on-surface/40 uppercase tracking-widest">Brand Name</th>
                  <th className="px-7 py-5 text-left font-black text-label-caps text-on-surface/40 uppercase tracking-widest">Fit Score</th>
                  <th className="px-7 py-5 text-left font-black text-label-caps text-on-surface/40 uppercase tracking-widest">Date Sent</th>
                  <th className="px-7 py-5 text-left font-black text-label-caps text-on-surface/40 uppercase tracking-widest">Status</th>
                  <th className="px-7 py-5 text-left font-black text-label-caps text-on-surface/40 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/20">
                {REQUESTS.map((req) => {
                  const ic = brandIcons[req.brand];
                  return (
                    <tr key={req.brand} className="hover:bg-white/3 transition-colors">
                      <td className="px-7 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-2xl ${ic.bg} border-2 border-black/20 flex items-center justify-center text-lg font-black`}>
                            {ic.char}
                          </div>
                          <div>
                            <p className="font-black text-white">{req.brand}</p>
                            <p className="text-on-surface/40 text-xs font-bold">{req.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-7 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-300 dark:bg-black/40 h-2 rounded-full overflow-hidden border border-black/20 dark:border-white/10">
                            <div className={`h-full rounded-full ${req.barColor}`} style={{ width: `${req.fit}%` }} />
                          </div>
                          <span className="font-mono font-black text-white">{req.fit}%</span>
                        </div>
                      </td>
                      <td className="px-7 py-5 text-on-surface/60 font-bold text-sm">{req.date}</td>
                      <td className="px-7 py-5">
                        <span className={`px-3 py-1 rounded-full border text-xs font-black ${req.statusColor} flex items-center gap-1.5 w-fit`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {req.status}
                        </span>
                      </td>
                      <td className="px-7 py-5">
                        <button className={`neo-button px-5 py-2 text-sm font-black ${req.action === 'Archive' ? 'bg-surface-container-high text-on-surface/60' : 'bg-primary text-black'}`}>
                          {req.action}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-7 py-5 border-t-2 border-black/20">
              <p className="text-on-surface/40 text-sm font-bold">Showing 1-5 of 48 requests</p>
              <div className="flex items-center gap-2">
                <button className="neo-button bg-surface-container-high p-2 text-on-surface/60 hover:bg-primary hover:text-black">
                  <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
                {[1, 2, 3].map((p) => (
                  <button key={p} className={`neo-button w-9 h-9 text-sm font-black ${p === 1 ? 'bg-primary text-black' : 'bg-surface-container-high text-on-surface/60'}`}>
                    {p}
                  </button>
                ))}
                <button className="neo-button bg-surface-container-high p-2 text-on-surface/60 hover:bg-primary hover:text-black">
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom CTA Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
            <div className="neo-card bg-surface-container p-8">
              <h3 className="font-black text-xl text-white mb-2">Need a higher Fit Score?</h3>
              <p className="text-on-surface/50 text-sm leading-relaxed">Our AI suggested brand list updates daily. Re-optimize your profile to unlock higher-affinity matches.</p>
              <button className="neo-button bg-primary text-black px-6 py-3 mt-6 font-black text-sm">
                Optimize Profile
              </button>
            </div>
            <div className="neo-card bg-surface-container p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 neo-card bg-surface-container-high flex items-center justify-center mb-4">
                <HelpCircle className="text-primary" size={28} />
              </div>
              <h3 className="font-black text-lg text-white mb-2">How pitching works</h3>
              <p className="text-on-surface/40 text-sm">Learn how our AI crafts personalised pitch decks for each brand you target.</p>
              <button className="text-primary font-black text-sm mt-4 flex items-center gap-1 hover:gap-2 transition-all">
                <Sparkles size={13} /> Read the guide
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
