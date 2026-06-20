import { LayoutDashboard, Sparkles, Compass, ClipboardList, BarChart3, Download, Settings, HelpCircle, LogOut, Plus } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onNavigate: (page: string) => void;
  onNewAnalysis?: () => void;
  variant?: 'brand' | 'creator';
}

export default function Sidebar({ activeItem, onNavigate, onNewAnalysis, variant = 'creator' }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fit-engine', label: 'Fit Engine', icon: Sparkles },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'requests', label: 'Requests', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'exports', label: 'Exports', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-sidebar-width bg-white dark:bg-black/40 backdrop-blur-xl border-r-4 border-black flex flex-col gap-stack-sm py-8 z-50 transition-colors duration-300">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary border-[3px] border-black shadow-brutal flex items-center justify-center">
            <Sparkles className="text-black" size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-primary tracking-tight leading-none uppercase">CreatorFit</h1>
            <p className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">
              {variant === 'brand' ? 'Hack_V.01' : 'Visionary Analytics'}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-3 mx-2 flex items-center gap-3 font-bold transition-all duration-200 ${
                activeItem === item.id
                  ? 'bg-primary text-black border-2 border-black rounded-xl'
                  : 'text-black dark:text-on-surface/60 hover:text-primary dark:hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded-xl'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="px-4 mt-auto">
        <button onClick={onNewAnalysis} className="w-full bg-secondary text-black font-bold py-3 neo-button flex items-center justify-center gap-2">
          <Plus size={18} strokeWidth={3} />
          New Analysis
        </button>
      </div>

      <div className="mt-6 pt-6 border-t-2 border-black/20 dark:border-black/20">
        <button className="text-black dark:text-on-surface-variant hover:text-primary dark:hover:text-on-surface px-4 py-2 mx-2 transition-all duration-200 flex items-center gap-3 text-sm font-bold w-full">
          <HelpCircle size={18} /> Help Center
        </button>
        <button className="text-black dark:text-on-surface-variant hover:text-primary dark:hover:text-on-surface px-4 py-2 mx-2 transition-all duration-200 flex items-center gap-3 text-sm font-bold w-full">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
