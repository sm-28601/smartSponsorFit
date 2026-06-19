import { Megaphone, Users, CheckCircle, TrendingUp, Calendar, Download, Filter, MoreVertical, Search, Bell, LogOut, Plus, Sparkles, LayoutDashboard, Compass, ClipboardList, BarChart3, HelpCircle } from 'lucide-react';
import ShaderBackground from '../components/ShaderBackground';
import { useState, useEffect, useRef } from 'react';

interface BrandDashboardPageProps {
  onNavigate: (page: string) => void;
}

export default function BrandDashboardPage({ onNavigate }: BrandDashboardPageProps) {
  const [staggerIndex, setStaggerIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setStaggerIndex(1), 100);
    const t2 = setTimeout(() => setStaggerIndex(2), 300);
    const t3 = setTimeout(() => setStaggerIndex(3), 500);
    const t4 = setTimeout(() => setStaggerIndex(4), 700);
    return () => { clearTimeout(t); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const navItems = [
    { id: 'brand-dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'fit-engine', label: 'FIT ENGINE', icon: Sparkles },
    { id: 'discover', label: 'DISCOVER', icon: Compass },
    { id: 'requests', label: 'REQUESTS', icon: ClipboardList },
    { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
  ];

  const statCards = [
    { icon: Megaphone, label: 'Campaigns', value: '12', badge: '+4.2%' },
    { icon: Users, label: 'Evaluated', value: '482', badge: 'STABLE' },
    { icon: CheckCircle, label: 'Avg Fit', value: '92%', badge: 'PEAK' },
    { icon: TrendingUp, label: 'Est Reach', value: '2.4M', badge: '+84k' },
  ];

  const kanbanColumns = [
    {
      label: 'PENDING', count: 2, color: 'bg-yellow-400',
      cards: [
        { name: 'ALEX RIVERA', niche: 'Tech_Node', score: 94, msg: 'Love the aesthetic. Available for sync...', badge: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu7aam2KMas5v_eSUUuwlwi8uBlX--rucX3OI4keNGeNsa2tlaIwcrgXJ-LPz2J1DL6AxplSMYgRZli4h-ik6dr7MQq6XH6zV_1dUFAFqt3_ISWvhzbcSjRhbhwhUgCyo0aFWMpGX5OsOQlVbqH92xt8REt-CYR7RCw_DfBi1QX8mryMHb3SowDKkIiejqYwKcoNRFK7YoB_0GnAa2HPCGQHzgkR_sQzS7VOKPapsyLt3DaiqnYsgEArtfLRSZebc1jm2mpq5e_9I1' },
        { name: 'ELENA K.', niche: 'Wellness', score: 88, msg: 'Ready for deployment of next drop.', badge: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4mLJE5FHbUNCGJOTu4OGBzDXlQ4QE0k5WsnHhBUhr-M8rOrjTBWcPLdL8HGYB8GMZ2feaN1aYWfqflUQGvqEv5ENyCAyt1lDKgeIbXGQU8wKrDVqu96kgiWYDkxQRXMEvbp3C6jArw4p63UkzLjPHVzD_I7_iz2J4k5K8PNe39U1fHzWr9FHZ4kNm-LjMhPN3U7tBpsjQ9_UrxctaA7FRBt9ck3aoPKpV3gBOlxXDbgHybV1BTdYTsfHKITmxypnckAjqqk4MflXh' },
      ],
      cardStyle: 'bg-pink',
    },
    {
      label: 'VIEWED', count: 1, color: 'bg-blue-400',
      cards: [
        { name: 'JORDAN SMITH', niche: 'Streetwear', score: 0, msg: '', badge: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTYq2prllJjNbyfJg0Yc0KPTRidB7qMBfnE9d6AhFA-Ydrnayis6ohTkERGaW-jJ1Q5XEpzZn9BP3QjvEuHpSBVd5DP-iAOLWqMRk-wn1WjOYL1FoDfljQ1lLwnaoWI4xPH_4l-ST4Jz_UTGQc8hPqR0_E4TMeyIlENSjf-TC6EAsLJN1k1qF69hM8Qs-B_yaHHgRlxpEDRTcVfbq6FCC_4OtsM70fICzW4SQOWc_iFbzzuvqF8io6yKwQY934OnhHsdZ5nmf7KOX_' },
      ],
      cardStyle: 'bg-pink',
    },
    {
      label: 'ACCEPTED', count: 3, color: 'bg-primary',
      cards: [
        { name: 'SARAH OH', niche: 'Home_Design', score: 0, msg: '', badge: 'CONTRACT_LOCKED', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUbuSH9Bt_o0viT1GGv3elQUY_1kOpF61QH4oCBR_nGyat7uuIUw-5CBA5ds0vOK9Lez-eLdi31GNweHYf3s1fUGXgTJQwkOHmDSYTALmWIjQcYBesMZPfpa1Rphc4mDy9rYoovAKaKcCCKMxxL9nZaqEzf5rbHQ_lTMziOlOGUSaNAnrCsxrO_5_TqUZ-JOPF1QqTFU9TkxQg_UXtPpIpD0pwRtl7FI-HTNVJS2AQI7oKq9GrhZwC7eKhcg8hDWo4nnmvftoXvaJ8' },
      ],
      cardStyle: 'bg-primary',
    },
    {
      label: 'REJECTED', count: 0, color: 'bg-red-500',
      cards: [],
      cardStyle: '',
    },
  ];

  const tableRows = [
    {
      name: 'MARCUS CHEN', niche: 'TECH_EXPERT', engagement: '6.8%', alignment: '94%_SYNC', score: 98, engWidth: 80,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeAEFyEHlNOhU9ZiDiIIBwQTnNmGhh0jfgA5ZxfQ6_Z_yoDJY25fiztfF_Ls4vsj5Hfm5RCHsqMSehJNs5PxQPumTZUB6wZCUknFe83bLzO7I6ZVj1zIHKaUOMs9h0nT3_jSznnDo6WEzBC6VvIxAQjIeFn2qyJ-oBFuYTtXsszGlWUOTCIanF7tai-lw22p03itsS6hpY8J98sBZMR3G0UTTPUEtg6DCMx3ZpppvY5KagPYcl0tOG2CVD3pjuvw2pmjEZgvJGNyJl',
      highlight: true, nodeLabel: 'NODE_1',
    },
    {
      name: 'LUNA MENDEZ', niche: 'ADVENTURE', engagement: '4.2%', alignment: '72%_SYNC', score: 84, engWidth: 50,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_V6XqbCuRPnnSJeRKw-joeUOEcVXfy7bZPOkbVKx-3FGuTFBw3I1Jb-iTmBN477EbS928L0wNMfH71BwU8Om8Dx-UUrge3L5OCwx5k-W_lASkA0wY3I8SlsjRAUwAC2iTpjEP4L4qiSA26fTCY_wFamQaf6DYXacC6zLl8BH-zXiyguQN0xJuz9SptWPrkWdw3VHJ8jf7Q0MAcwKSWMB4UBTV2a1bo2GPF0fe6QKVpCbButQ0BTz8fbYOes89k0SEmAIy_DF-Qat0',
      highlight: false, nodeLabel: null,
    },
  ];

  return (
    <div className="dark">
      <ShaderBackground />

      {/* Side Navigation - Brand Variant */}
      <nav className="fixed left-0 top-0 h-full w-sidebar-width bg-surface border-r-4 border-black flex flex-col gap-4 py-8 z-50">
        <div className="px-8 mb-8">
          <h1 className="font-display text-3xl font-black text-primary uppercase tracking-tighter italic" style={{ WebkitTextStroke: '1px black' }}>CreatorFit</h1>
          <div className="inline-block bg-black text-primary text-[10px] px-2 py-0.5 font-bold mt-1">HACK_V.01</div>
        </div>
        <div className="flex-1 px-4 space-y-2">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => onNavigate(i === 0 ? 'brand-dashboard' : item.id)}
              className={`w-full flex items-center px-4 py-3 font-bold transition-all ${
                i === 0
                  ? 'bg-primary text-black border-2 border-black rounded-xl shadow-brutal'
                  : 'text-white/70 hover:text-primary hover:bg-black/20 rounded-xl'
              }`}
            >
              <item.icon size={20} className="mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="px-4 space-y-2 mt-auto pt-4">
          <button className="w-full flex items-center justify-center bg-primary text-black neo-button py-4 mb-4">
            <Plus size={18} strokeWidth={3} className="mr-2" /> NEW ANALYSIS
          </button>
          <button className="w-full flex items-center text-white/60 hover:text-white px-4 py-2 text-sm font-bold">
            <HelpCircle size={18} className="mr-3" /> HELP
          </button>
          <button className="w-full flex items-center text-red-400 hover:text-red-300 px-4 py-2 text-sm font-bold">
            <LogOut size={18} className="mr-3" /> SIGN OUT
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-sidebar-width min-h-screen relative overflow-y-auto h-screen custom-scrollbar">
        {/* Top Nav */}
        <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-20 bg-surface/90 border-b-4 border-black flex justify-between items-center px-10 z-40">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              <input className="w-full bg-black/40 border-2 border-black rounded-full py-3 pl-12 pr-4 text-sm focus:ring-0 focus:border-primary transition-all outline-none text-white font-bold" placeholder="SEARCH CREATOR DATABASE..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-black border-2 border-primary/20 hover:border-primary text-white p-2 rounded-full transition-all">
              <Bell size={18} />
            </button>
            <div className="h-8 w-1 bg-black/40" />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-black text-white leading-none">ADMIN_ROOT</p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Premium Level</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc214xk0ULVC7BpKPKwBqW_zCIREwZ8FmALQ3s5zVFRxKMMS1SwOcKkIA1SddwebdZZ1UPhU2FMwDVzjCW-fX2qi-SiBXZcOqtZYTuc1tu4ye-Amwjm_TjmioluT26Gb4GmLaHIhkoEularYMC0ex6a0uTPSoZRbz5zBxD0lKM_kK5QgBdTeVdQ6N_fVxIVjDDRmsVd10aaqddZjFVm_5ua-5G5UCYubVqmlWLM3uC_BXl649vfoqgtrh9jB0JWGTcfkFtN1IDaW-2" alt="Admin" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div ref={mainRef} className="mt-20 p-10 space-y-10 max-w-7xl mx-auto">
          {/* Hero Greeting */}
          <div style={{ opacity: staggerIndex >= 1 ? 1 : 0, transform: staggerIndex >= 1 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-5xl font-black text-white uppercase tracking-tighter">System Access: <span className="text-primary italic">BRAND_X</span></h2>
                <p className="text-white/60 mt-4 text-xl font-bold">Engagement metrics up <span className="text-primary">+12.4%</span> across all nodes.</p>
              </div>
              <div className="flex gap-4">
                <button className="neo-button bg-black text-white px-6 py-3 text-sm flex items-center">
                  <Calendar size={16} className="mr-2" /> LAST 30D
                </button>
                <button className="neo-button bg-primary text-black px-6 py-3 text-sm flex items-center">
                  <Download size={16} className="mr-2" /> EXPORT
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ opacity: staggerIndex >= 2 ? 1 : 0, transform: staggerIndex >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            {statCards.map((stat) => (
              <div key={stat.label} className="neo-card neo-card-lime p-8 group">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-black text-primary rounded-xl">
                    <stat.icon size={20} />
                  </div>
                  <span className="bg-black text-primary text-[10px] font-black px-2 py-1">{stat.badge}</span>
                </div>
                <p className="text-black/60 font-black text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-6xl font-black italic">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Kanban Section */}
          <section className="space-y-8" style={{ opacity: staggerIndex >= 3 ? 1 : 0, transform: staggerIndex >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black text-white uppercase italic">Active Streams</h3>
              <div className="flex gap-2">
                <button className="neo-button bg-black text-white p-3"><Filter size={18} /></button>
                <button className="neo-button bg-black text-white p-3"><MoreVertical size={18} /></button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {kanbanColumns.map((col) => (
                <div key={col.label} className="space-y-6">
                  <div className="flex items-center px-2">
                    <span className={`w-4 h-4 ${col.color} border-2 border-black rounded-full mr-3`} />
                    <span className="font-black text-sm uppercase tracking-widest text-white">{col.label} ({col.count})</span>
                  </div>
                  <div className="space-y-4">
                    {col.cards.map((card, ci) => (
                      <div key={ci} className={`neo-card ${col.cardStyle === 'bg-primary' ? 'neo-card-lime' : 'neo-card-pink'} p-6`}>
                        <div className="flex items-center gap-4 mb-4">
                          <img className="w-12 h-12 rounded-full border-2 border-black object-cover" src={card.img} alt={card.name} />
                          <div>
                            <h4 className="font-black text-sm">{card.name}</h4>
                            <p className="text-[10px] font-bold text-black/60 uppercase">{card.niche}</p>
                          </div>
                          {card.score > 0 && <div className="ml-auto bg-black text-white text-xs px-2 py-1 font-mono font-black">{card.score}</div>}
                        </div>
                        {card.msg && <p className="text-sm font-bold line-clamp-2 leading-tight">{card.msg}</p>}
                        {card.badge && card.badge.length > 0 && <p className="text-[10px] bg-black text-primary inline-block px-2 py-1 font-black mt-2">{card.badge}</p>}
                      </div>
                    ))}
                    {col.cards.length === 0 && (
                      <div className="h-40 border-4 border-dashed border-black/40 rounded-3xl flex items-center justify-center">
                        <p className="text-white/20 font-black uppercase text-xs italic">Clear_Stream</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Table Section */}
          <section className="space-y-8 pb-20" style={{ opacity: staggerIndex >= 4 ? 1 : 0, transform: staggerIndex >= 4 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black text-white uppercase italic">Creator Matrix</h3>
              <button className="neo-button bg-black text-primary px-6 py-2 text-sm uppercase font-black">Full_Report</button>
            </div>
            <div className="neo-card bg-black p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-4 border-primary">
                    <th className="p-6 font-black uppercase text-primary tracking-widest">Creator</th>
                    <th className="p-6 font-black uppercase text-primary tracking-widest">Engagement</th>
                    <th className="p-6 font-black uppercase text-primary tracking-widest">Alignment</th>
                    <th className="p-6 font-black uppercase text-primary tracking-widest text-right">F_Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-white/5">
                  {tableRows.map((row) => (
                    <tr key={row.name} className={`${row.highlight ? 'bg-primary/10' : 'hover:bg-white/5'} transition-colors`}>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img className={`w-12 h-12 rounded-full border-2 ${row.highlight ? 'border-primary' : 'border-black'} object-cover`} src={row.img} alt={row.name} />
                            {row.nodeLabel && <div className="absolute -top-2 -right-2 bg-black text-primary text-[8px] font-black px-1 border border-primary">{row.nodeLabel}</div>}
                          </div>
                          <div>
                            <p className={`font-black ${row.highlight ? 'text-white' : 'text-white'}`}>{row.name}</p>
                            <p className={`text-[10px] ${row.highlight ? 'text-primary/70' : 'text-white/40'}`}>{row.niche}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono font-black ${row.highlight ? 'text-primary' : 'font-bold text-white/60'}`}>{row.engagement}</span>
                          <div className={`w-20 h-2 bg-black border ${row.highlight ? 'border-primary/20' : 'border-white/10'}`}>
                            <div className={`h-full ${row.highlight ? 'bg-primary' : 'bg-primary/40'}`} style={{ width: `${row.engWidth}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className={`p-6 font-bold ${row.highlight ? 'text-white' : 'text-white/60'}`}>{row.alignment}</td>
                      <td className={`p-6 text-right font-mono font-black text-3xl ${row.highlight ? 'text-primary italic' : 'text-white/40'}`}>{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
