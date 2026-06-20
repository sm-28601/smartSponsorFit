import { useState } from 'react';
import { User, Share2, Brain, Shield, Camera, Save, X } from 'lucide-react';
import ShaderBackground from '../components/ShaderBackground';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
  onNewAnalysis?: () => void;
}

type Tab = 'profile' | 'social' | 'ai' | 'security';

export default function SettingsPage({ onNavigate, onNewAnalysis }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [displayName, setDisplayName] = useState('Pratik');
  const [bio, setBio] = useState('Digital architect specialising in performance-driven creative strategy for AI-driven ecosystems.');
  const [email, setEmail] = useState('pratik@smartsponsorfit.ai');
  const [location, setLocation] = useState('Berlin, Germany');
  const [saved, setSaved] = useState(false);
  const [aiPreferences, setAiPreferences] = useState({
    pitchDrafts: true,
    smartNotifications: true,
    profileTips: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile' as Tab, label: 'Profile', icon: User },
    { id: 'social' as Tab, label: 'Social Accounts', icon: Share2 },
    { id: 'ai' as Tab, label: 'AI Preferences', icon: Brain },
    { id: 'security' as Tab, label: 'Security', icon: Shield },
  ];

  return (
    <div>
      <ShaderBackground opacity={40} />
      <Sidebar activeItem="settings" onNavigate={onNavigate} onNewAnalysis={onNewAnalysis} />
      <TopNav
        userName="Pratik"
        userRole="Pro Plan"
        avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAsl6oqHJA5QTo39561LQg3z2l5CmpLpUvvI0Pry_A77pDXwegYuePfpPpwCmh69NxI3IDlL8wcSuOYBx6tmR30fDAQ2xnejMx46cbIigcyigqbjOaKekGiHV9j5BMku5hcOTFZcTkn40U2zFOKe30wG85AdBDGBXFvYsm7xHJXoY7gkW9PHFZgciJ5ftjnWQipUrkAdt6W_9sii8Pbklq-g1rPwV4QvB5oELXm1PRVfQs39mvePGHxfN6n-9UTLkuLLScK_iOLP4db"
      />

      <main className="ml-sidebar-width pt-16 min-h-screen overflow-y-auto custom-scrollbar">
        <div className="px-10 py-10 max-w-[1100px] mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display text-5xl font-black text-white uppercase tracking-tighter mb-2">Settings</h1>
            <p className="text-on-surface/60 font-medium text-lg">Manage your account identity, AI behavior, and connected platforms.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sub-nav */}
            <div className="lg:col-span-1">
              <nav className="neo-card bg-surface-container overflow-hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-all border-b border-black/10 last:border-0 ${
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary border-l-4 border-l-primary'
                        : 'text-on-surface/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon size={16} strokeWidth={2.5} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="neo-card bg-surface-container p-8">
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    {/* Avatar */}
                    <div className="flex items-start gap-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDznBBNh6ORAXUjHRc_iPYFlEcLMP8VLJHW5gY9IaURTyA5dZd3sYyAUZTCI3sBIi1ftgjL_knDIGpzjXVBmtLG3TM6Qd8yq6I_hqwnypYpMwTsgfh8N-b2b1DtQtB4oxnG98Do_zsO1aAvxpNOLQd5N3GWtLeVtRdkIDTXkqsxl1YQrB0mfpTKtZ1ywBo1Ow0sFNFll9-7HxFCpmSVUXICXZC3VXOUhRgFb4LB1-LPsWu2xwLmHKcpX1AzOMUaQX2kxXkApsFWM88d"
                          alt="Profile"
                          className="w-24 h-24 rounded-2xl object-cover border-[3px] border-black shadow-brutal"
                        />
                        <button className="absolute bottom-1 right-1 w-8 h-8 bg-surface-container-high border-2 border-black rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                          <Camera size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-on-surface/40 text-label-caps font-black">DISPLAY NAME</p>
                        <input
                          className="w-full bg-surface-container-high border-2 border-black/30 rounded-2xl px-5 py-3.5 text-white font-bold focus:outline-none focus:border-primary transition-colors"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <p className="text-on-surface/40 text-label-caps font-black">BIO</p>
                      <textarea
                        className="w-full bg-surface-container-high border-2 border-black/30 rounded-2xl px-5 py-3.5 text-white font-bold focus:outline-none focus:border-primary transition-colors resize-none h-32"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>

                    {/* Email + Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-on-surface/40 text-label-caps font-black">PROFESSIONAL EMAIL</p>
                        <input
                          className="w-full bg-surface-container-high border-2 border-black/30 rounded-2xl px-5 py-3.5 text-white font-bold focus:outline-none focus:border-primary transition-colors"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-on-surface/40 text-label-caps font-black">LOCATION</p>
                        <input
                          className="w-full bg-surface-container-high border-2 border-black/30 rounded-2xl px-5 py-3.5 text-white font-bold focus:outline-none focus:border-primary transition-colors"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'social' && (
                  <div className="space-y-6">
                    <h3 className="font-black text-white text-xl">Connected Platforms</h3>
                    {['YouTube', 'Instagram', 'TikTok', 'Twitter/X', 'LinkedIn'].map((platform) => (
                      <div key={platform} className="flex items-center justify-between p-4 neo-card bg-surface-container-high">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-300 dark:bg-black/40 rounded-xl flex items-center justify-center">
                            <Share2 className="text-primary" size={18} />
                          </div>
                          <div>
                            <p className="font-black text-white">{platform}</p>
                            <p className="text-on-surface/40 text-xs font-bold">Not connected</p>
                          </div>
                        </div>
                        <button className="neo-button bg-primary text-black px-5 py-2 text-sm font-black">Connect</button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="space-y-6">
                    <h3 className="font-black text-white text-xl">AI Behavior Settings</h3>
                    {[
                      { key: 'pitchDrafts' as const, label: 'Auto-generate pitch drafts', desc: 'Let the AI create initial pitch templates for new brand matches.' },
                      { key: 'smartNotifications' as const, label: 'Smart notifications', desc: 'Receive AI-powered alerts when high-fit brands become available.' },
                      { key: 'profileTips' as const, label: 'Profile optimization tips', desc: 'Daily AI suggestions to improve your creator profile score.' },
                    ].map((pref) => (
                      <div key={pref.label} className="flex items-start justify-between gap-4 p-5 neo-card bg-surface-container-high">
                        <div>
                          <p className="font-black text-white">{pref.label}</p>
                          <p className="text-on-surface/40 text-sm font-bold mt-1">{pref.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAiPreferences((current) => ({ ...current, [pref.key]: !current[pref.key] }))}
                          className={`w-12 h-6 rounded-full border-2 border-black relative overflow-hidden flex-shrink-0 mt-1 transition-colors ${aiPreferences[pref.key] ? 'bg-primary' : 'bg-surface-container-highest'}`}
                          aria-pressed={aiPreferences[pref.key]}
                        >
                          <span className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-black transition-transform ${aiPreferences[pref.key] ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h3 className="font-black text-white text-xl">Security & Privacy</h3>
                    {[
                      { label: 'Change Password', desc: 'Update your login credentials.' },
                      { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account.', badge: 'Recommended' },
                      { label: 'Active Sessions', desc: 'View and revoke active login sessions.' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-5 neo-card bg-surface-container-high">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-black text-white">{item.label}</p>
                            {item.badge && <span className="text-[10px] font-black bg-primary/20 text-primary px-2 py-0.5 rounded-full">{item.badge}</span>}
                          </div>
                          <p className="text-on-surface/40 text-sm font-bold mt-1">{item.desc}</p>
                        </div>
                        <button className="neo-button bg-surface-container text-on-surface/70 px-5 py-2 text-sm font-black hover:bg-primary hover:text-black">
                          Manage
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Save Buttons */}
              <div className="flex items-center gap-4 mt-6 justify-end">
                <button className="neo-button bg-surface-container text-on-surface/70 px-8 py-3 font-black flex items-center gap-2 hover:border-white">
                  <X size={16} strokeWidth={2.5} /> Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  className={`neo-button px-8 py-3 font-black flex items-center gap-2 transition-colors ${saved ? 'bg-green-500 text-black' : 'bg-primary text-black'}`}
                >
                  {saved ? <><Check size={16} strokeWidth={3} /> Saved!</> : <><Save size={16} strokeWidth={2.5} /> Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Check(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
