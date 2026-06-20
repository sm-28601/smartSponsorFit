import { Search, Bell, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface TopNavProps {
  variant?: 'brand' | 'creator';
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
}

export default function TopNav({ userName = 'Alex Rivers', userRole = 'Pro Creator', avatarUrl }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-16 bg-white/60 dark:bg-black/20 backdrop-blur-md border-b-4 border-black dark:border-black transition-colors duration-300 z-40 flex justify-between items-center px-margin-desktop">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black font-bold" size={18} />
          <input
            className="w-full bg-white dark:bg-surface-container border-[3px] border-black dark:border-black dark:text-on-surface rounded-full pl-12 pr-4 py-2 text-sm focus:ring-0 focus:outline-none text-black placeholder:text-black/50 dark:placeholder:text-on-surface/50 font-bold transition-colors duration-300"
            placeholder="Search creators, brands, or scores..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-white dark:bg-surface-container border-2 border-black dark:border-black rounded-full p-2 hover:bg-primary dark:hover:bg-primary transition-colors relative">
          <Bell className="text-black dark:text-on-surface" size={18} strokeWidth={2.5} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-tertiary border-2 border-black dark:border-black rounded-full" />
        </button>
        <button 
          onClick={toggleTheme}
          className="bg-white dark:bg-surface-container border-2 border-black dark:border-black rounded-full p-2 hover:bg-primary dark:hover:bg-primary transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="text-black dark:text-on-surface" size={18} strokeWidth={2.5} />
          ) : (
            <Moon className="text-black dark:text-on-surface" size={18} strokeWidth={2.5} />
          )}
        </button>
        <div className="flex items-center gap-4 bg-white/40 dark:bg-black/20 p-1 pr-4 rounded-full border-[3px] border-black dark:border-black transition-colors duration-300">
          {avatarUrl ? (
            <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" src={avatarUrl} alt={userName} />
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-high dark:bg-surface-container-high flex items-center justify-center">
              <User className="text-black dark:text-on-surface" size={18} />
            </div>
          )}
          <div className="leading-none">
            <p className="text-sm font-bold text-black dark:text-on-surface">{userName}</p>
            <p className="text-[10px] text-primary dark:text-primary uppercase font-black">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
