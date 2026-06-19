import { Sparkles, Play, Database, Filter, TrendingUp, Brain, Users, CheckCircle, ArrowRight, Globe, Share } from 'lucide-react';
import ShaderBackground from '../components/ShaderBackground';
import Reveal from '../components/RevealSection';
import { useEffect, useRef, useState } from 'react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [heroWordsVisible, setHeroWordsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroWordsVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const navItems = [
    { label: 'HOW IT WORKS', href: '#how-it-works' },
    { label: 'AI FIT SCORING', href: '#ai-fit-scoring' },
    { label: 'DISCOVERY', href: '#discovery' },
    { label: 'PRICING', href: '#pricing' },
  ];

  const heroWords = ['FIND', 'THE', 'PERFECT', 'CREATOR-BRAND', 'MATCH', 'WITH', 'AI'];

  return (
    <div className="dark">
      <ShaderBackground opacity={40} />
      <div className="fixed inset-0 -z-[5] grid-overlay" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 h-20 border-b-2 border-on-surface-alt bg-surface/90 backdrop-blur-sm flex justify-between items-center px-margin-desktop">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-on-surface-alt bg-primary flex items-center justify-center">
            <Sparkles className="text-on-primary font-bold" size={20} />
          </div>
          <span className="font-display text-h2 text-on-surface-alt uppercase tracking-tighter">CreatorFit AI</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="font-label-caps text-on-surface-alt hover:text-primary transition-colors">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <button className="hover:text-primary transition-colors">
            <Sparkles size={20} />
          </button>
          <button onClick={() => onNavigate('dashboard')} className="neo-button bg-primary text-on-primary px-6 py-2 font-label-caps">
            GET STARTED
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-primary/15 to-transparent filter blur-[80px] rounded-full animate-blob-float" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/15 to-transparent filter blur-[80px] rounded-full animate-blob-float" style={{ animationDelay: '-5s' }} />

        <div className="container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-on-surface-alt bg-surface-container-high mb-8">
              <span className="w-3 h-3 bg-primary animate-pulse" />
              <span className="font-label-caps text-on-surface-alt">SYSTEM UPDATE: GPT-4O ENABLED</span>
            </div>

            <h1 ref={heroTitleRef} className="font-display text-display text-on-surface-alt mb-8 leading-[0.95] uppercase italic">
              {heroWords.map((word, i) => (
                <span
                  key={i}
                  className="inline-block transition-all duration-500"
                  style={{
                    opacity: heroWordsVisible ? 1 : 0,
                    transform: heroWordsVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  {word === 'CREATOR-BRAND' ? (
                    <span className="gradient-text italic">CREATOR-BRAND MATCH</span>
                  ) : word === 'MATCH' || word === 'WITH' || word === 'AI' ? null : (
                    word + ' '
                  )}
                </span>
              ))}
            </h1>

            <p className="font-body-lg text-on-surface-variant mb-12 max-w-xl border-l-4 border-primary pl-6">
              Bridge the gap between raw data and creative intuition. Our AI Engine analyzes audience alignment, tonal resonance, and engagement quality to ensure every partnership is a guaranteed fit.
            </p>

            <div className="flex flex-wrap gap-6">
              <button onClick={() => onNavigate('dashboard')} className="neo-button bg-primary text-on-primary px-10 py-5 font-label-caps text-lg">
                GET STARTED NOW
              </button>
              <button onClick={() => onNavigate('fit-engine')} className="neo-button bg-transparent text-on-surface-alt border-2 border-on-surface-alt shadow-brutal px-10 py-5 font-label-caps text-lg flex items-center gap-3">
                <Play size={20} /> TRY DEMO
              </button>
            </div>

            <div className="mt-16 flex items-center gap-6 opacity-60">
              <span className="font-label-caps text-[10px] whitespace-nowrap">TRUSTED BY //</span>
              <div className="flex gap-8 font-black italic tracking-tighter">
                <span>LOREAL</span><span>ADIDAS</span><span>REVOLUT</span>
              </div>
            </div>
          </Reveal>

          {/* Hero Visual */}
          <Reveal delay={0.2}>
            <div className="relative w-full aspect-square flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow" />
              <svg className="w-[85%] h-[85%] -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="45" stroke="#363a25" strokeWidth="10" />
                <circle cx="50" cy="50" fill="transparent" r="45" stroke="#c7f02d" strokeWidth="10" strokeLinecap="butt"
                  className="fit-gauge-animation" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-display text-[100px] font-black text-on-surface-alt leading-none italic">89</span>
                <span className="font-label-caps text-primary tracking-[0.3em] mt-2">FIT_SCORE.EXE</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 relative border-t-2 border-on-surface-alt" id="how-it-works">
        <div className="container-max mx-auto px-margin-desktop">
          <Reveal>
            <div className="mb-24">
              <h2 className="font-display text-h1 text-on-surface-alt mb-6 uppercase italic">PRECISION-ENGINEERED WORKFLOW</h2>
              <div className="w-32 h-2 bg-primary mb-8" />
              <p className="font-body-lg text-on-surface-variant max-w-2xl">Three steps to identifying your next top-performing creator partner.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Database, title: '01. DATA INGESTION', desc: 'Upload your brand guidelines and target demographics. Our AI ingests every nuance of your identity.' },
              { icon: Filter, title: '02. NEURAL FILTERING', desc: 'Our model cross-references 10M+ creators against your unique "Brand Fit" signature in seconds.' },
              { icon: TrendingUp, title: '03. PREDICTIVE ROI', desc: 'Get deep analytical reports predicting engagement, reach, and sentiment before you sign.' },
            ].map((step, i) => (
              <Reveal key={step.title} delay={0.1 * (i + 1)}>
                <div className="neo-card p-12">
                  <div className="w-16 h-16 border-2 border-on-surface-alt bg-primary flex items-center justify-center mb-10">
                    <step.icon className="text-on-primary" size={32} />
                  </div>
                  <h3 className="font-display text-h2 text-on-surface-alt mb-6 uppercase">{step.title}</h3>
                  <p className="font-body-md text-on-surface-variant">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Fit Scoring */}
      <section className="py-32 bg-surface-container-lowest border-y-2 border-on-surface-alt" id="ai-fit-scoring">
        <div className="container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <div className="relative neo-card p-2 bg-on-surface-alt">
              <img
                className="w-full h-[500px] object-cover grayscale contrast-125"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd65MseFJT_XXu3IzV5T-jWXJQrlX_5N0M1iki6x-b-QPShPYBgSuglJxqRbSmbfP15owBQPO-pnJDLnUVQ3riqbzs062lFFBDe0FAaoKc6NOSZEVXlU0nv0b32UoNab5dKhrIDSdUwqlN2U9dArgie9TmVsWDhiFGAcMa_pXazucFSbKlWVmDzq-bkCTSrU63uMxX6pVp_r2DPkILwOypoTDw1uQ6cwQISOMIlpuYMNqlBrUveOyz81Mv5m_BUqnT055FOEsZrWCf"
                alt="Futuristic dashboard"
              />
              <div className="absolute bottom-10 left-10 right-10 neo-card p-8 bg-surface">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-label-caps text-primary mb-2">ANALYSIS_LIVE</p>
                    <p className="font-display text-xl font-bold uppercase italic">PREDICTING 92% VIRAL POTENTIAL</p>
                  </div>
                  <TrendingUp className="text-primary" size={36} />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <h2 className="font-display text-display text-on-surface-alt mb-12 uppercase leading-tight italic">
                GO BEYOND <br /><span className="gradient-text">VANITY METRICS</span>
              </h2>
              <div className="space-y-12">
                {[
                  { icon: Brain, title: 'Semantic Tone Alignment', desc: 'AI analyzes years of content to ensure the creator\'s natural voice aligns with your brand\'s formal or informal guidelines.' },
                  { icon: Users, title: 'Demographic Overlap', desc: 'Precisely identify where your customers and their fans intersect across age, location, and interests.' },
                  { icon: CheckCircle, title: 'Engagement Authenticity', desc: 'Our engine detects bot activity and passive scrolling to surface only creators with a truly active and loyal community.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-16 h-16 border-2 border-on-surface-alt bg-surface-container-high flex items-center justify-center group-hover:bg-primary transition-colors">
                      <item.icon className="group-hover:text-on-primary transition-colors" size={24} />
                    </div>
                    <div>
                      <h4 className="font-display text-h2 text-on-surface-alt text-xl mb-3 uppercase">{item.title}</h4>
                      <p className="font-body-md text-on-surface-variant">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Discovery */}
      <section className="py-32" id="discovery">
        <div className="container-max mx-auto px-margin-desktop">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-display text-h1 text-on-surface-alt mb-6 uppercase italic">DISCOVER YOUR FUTURE PARTNERS</h2>
                <p className="font-body-lg text-on-surface-variant border-l-4 border-primary pl-6">AI-curated selections based on your specific campaign objectives and industry niche.</p>
              </div>
              <button className="font-label-caps text-primary flex items-center gap-4 group">
                EXPLORE_DIRECTORY <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
              </button>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-8 h-[800px]">
            <Reveal className="md:col-span-2 md:row-span-2 neo-card relative overflow-hidden group">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASK7DqBMOaRHkP85B4wxwUeVLOBrDzRopOX--3S_hhH2Nus8bf8ptuigoU5F9lRBoInE-NVAeiaiAgvS6uPeGYq3UohFDtAAhLnXwVpyGDutt-XLNbvkqKDqO797F8cXH-Xl3FjsIJSTJwy5XdZJH-lB5VeIW5MQmp14a_fXNKWBgyBpGS8fGFIqQucyLsJBwuOy0BmAgpm6dbR1swwZ5OKqhsMvrnKlHgRq3BShxVSvBAfTcA3EzPpnCywtp4eiYiN-WAk3zpmTXv"
                alt="Elena Sterling"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-90" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1 bg-primary text-on-primary font-label-caps italic">LIFESTYLE</span>
                  <span className="px-4 py-1 border-2 border-on-surface-alt bg-surface text-on-surface-alt font-label-caps italic">94% FIT</span>
                </div>
                <h3 className="font-display text-4xl text-on-surface-alt mb-4 uppercase italic">Elena Sterling</h3>
                <p className="font-body-md text-on-surface-variant max-w-sm">Top-tier engagement in luxury fashion and sustainable living niches.</p>
              </div>
            </Reveal>
            <Reveal className="md:col-span-2 neo-card relative overflow-hidden group">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-H5goMTyuuUk6wXrXt4MvzOviYoYHljABkx1ZMUQxRhA5W9CRTRJJcgFmE5HIRYBY03vkosh7URxf254a-4dPV-Y8s1FJ__aVAII5nREhzjc0xi9Z8hr0ZyioG_T0Oj3jljFW2X9gSXj-o89by9DLcxTTj2zh2V96zj57msaIpYwbKUkSZGdBid9Y0LH_DLrWv7joHTeHcPzKXAE4T3XuqjSlAnRZQ0XGNlw3DlRc1EXnXEOjxjs6ZfHimtgvCNtP-36NLQrBSgbs"
                alt="Marcus Vane"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-70" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-display text-2xl text-on-surface-alt uppercase italic">Marcus Vane</h3>
                <p className="font-label-caps text-primary italic">TECH_MATCH // 88%</p>
              </div>
            </Reveal>
            <Reveal className="neo-card relative overflow-hidden group">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDznBBNh6ORAXUjHRc_iPYFlEcLMP8VLJHW5gY9IaURTyA5dZd3sYyAUZTCI3sBIi1ftgjL_knDIGpzjXVBmtLG3TM6Qd8yq6I_hqwnypYpMwTsgfh8N-b2b1DtQtB4oxnG98Do_zsO1aAvxpNOLQd5N3GWtLeVtRdkIDTXkqsxl1YQrB0mfpTKtZ1ywBo1Ow0sFNFll9-7HxFCpmSVUXICXZC3VXOUhRgFb4LB1-LPsWu2xwLmHKcpX1AzOMUaQX2kxXkApsFWM88d"
                alt="Sarah Chen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6">
                <p className="font-display text-lg uppercase italic text-on-surface-alt">Sarah Chen</p>
                <p className="font-label-caps text-primary text-[10px]">WELLNESS_91%</p>
              </div>
            </Reveal>
            <Reveal className="neo-card relative overflow-hidden group">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZDd1xWqYuom225sdx2FF669lPa4yMReyQJ79KmUKcB6XZ6W8qj6kVcadwOzEBplAcbtf0GGAQpnsgwxGLbtX4R4bYTmXubVZGI_E6oH7j1OPjp21hAHrEdDRf7hXAs_Dj75gFkZ-xUZ68MjzFkUCGYWHHlm75mSPWz2CfSjiYVIcakHdz0nyl3FlC-1Hz3JuN6LcdS6UD-Wa_as7iG9CH-oj54X5MQrQsoRNCwYvIqHS2p6HOFLYYHae6ijdvv8JV1R966zwJKvBO"
                alt="David J."
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6">
                <p className="font-display text-lg uppercase italic text-on-surface-alt">David J.</p>
                <p className="font-label-caps text-primary text-[10px]">TRAVEL_85%</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 relative border-t-2 border-on-surface-alt" id="pricing">
        <div className="container-max mx-auto px-margin-desktop">
          <Reveal>
            <div className="mb-24">
              <h2 className="font-display text-h1 text-on-surface-alt mb-6 uppercase italic">SCALABLE INTELLIGENCE</h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl border-l-4 border-primary pl-6">Plans designed for boutique agencies and global enterprises alike.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Reveal delay={0.1}>
              <div className="neo-card p-12 flex flex-col">
                <p className="font-label-caps text-on-surface-variant mb-6 tracking-widest">_STARTER</p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-6xl font-black italic text-on-surface-alt">$499</span>
                  <span className="text-on-surface-variant font-label-caps">/MO</span>
                </div>
                <ul className="space-y-6 mb-16 flex-grow">
                  <li className="flex items-center gap-4"><CheckCircle className="text-primary" size={18} /><span className="font-body-md uppercase text-on-surface-alt">50 AI Analysis Tokens</span></li>
                  <li className="flex items-center gap-4 opacity-50"><CheckCircle size={18} /><span className="font-body-md uppercase text-on-surface-alt">Standard Search</span></li>
                  <li className="flex items-center gap-4 opacity-50"><CheckCircle size={18} /><span className="font-body-md uppercase text-on-surface-alt">Exportable Reports</span></li>
                </ul>
                <button className="neo-button bg-transparent text-on-surface-alt border-2 border-on-surface-alt shadow-brutal w-full py-5 font-label-caps">CHOOSE STARTER</button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="neo-card p-12 bg-surface-container-high border-primary flex flex-col relative scale-105 z-10" style={{ boxShadow: '8px 8px 0px #e4e3d6' }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-6 py-2 border-2 border-on-surface-alt font-label-caps italic">MOST_POPULAR.EXE</div>
                <p className="font-label-caps text-primary mb-6 tracking-widest">_PROFESSIONAL</p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-6xl font-black italic text-on-surface-alt">$1,299</span>
                  <span className="text-on-surface-variant font-label-caps">/MO</span>
                </div>
                <ul className="space-y-6 mb-16 flex-grow">
                  <li className="flex items-center gap-4"><CheckCircle className="text-primary" size={22} /><span className="font-body-md uppercase font-bold text-on-surface-alt">Unlimited AI Analysis</span></li>
                  <li className="flex items-center gap-4"><CheckCircle className="text-primary" size={18} /><span className="font-body-md uppercase text-on-surface-alt">Advanced Neural Matching</span></li>
                  <li className="flex items-center gap-4"><CheckCircle className="text-primary" size={18} /><span className="font-body-md uppercase text-on-surface-alt">Competitor Benchmarking</span></li>
                </ul>
                <button className="neo-button bg-primary text-on-primary w-full py-5 font-label-caps text-lg">GO PROFESSIONAL</button>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="neo-card p-12 flex flex-col">
                <p className="font-label-caps text-on-surface-variant mb-6 tracking-widest">_ENTERPRISE</p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-6xl font-black italic text-on-surface-alt">CUSTOM</span>
                </div>
                <ul className="space-y-6 mb-16 flex-grow">
                  <li className="flex items-center gap-4"><CheckCircle className="text-primary" size={18} /><span className="font-body-md uppercase text-on-surface-alt">Custom Model Training</span></li>
                  <li className="flex items-center gap-4"><CheckCircle className="text-primary" size={18} /><span className="font-body-md uppercase text-on-surface-alt">Account Manager</span></li>
                </ul>
                <button className="neo-button bg-transparent text-on-surface-alt border-2 border-on-surface-alt shadow-brutal w-full py-5 font-label-caps">CONTACT SALES</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t-2 border-on-surface-alt bg-surface-container-lowest">
        <div className="container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between gap-16">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 border-2 border-on-surface-alt bg-primary flex items-center justify-center">
                <Sparkles className="text-on-primary font-bold" size={20} />
              </div>
              <span className="font-display text-3xl text-on-surface-alt uppercase italic font-black">CreatorFit AI</span>
            </div>
            <p className="font-body-md text-on-surface-variant mb-10">Building the next generation of marketing intelligence through cutting-edge AI and precision data analytics.</p>
            <div className="flex gap-6">
              <a className="w-12 h-12 border-2 border-on-surface-alt bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="#">
                <Globe size={20} />
              </a>
              <a className="w-12 h-12 border-2 border-on-surface-alt bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="#">
                <Share size={20} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
            <div>
              <p className="font-label-caps text-primary mb-8 underline decoration-2 underline-offset-8">PLATFORM</p>
              <ul className="space-y-4 text-on-surface-alt font-body-sm font-bold uppercase italic">
                <li><a className="hover:text-primary transition-colors" href="#">Discovery</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">AI Engine</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Analytics</a></li>
              </ul>
            </div>
            <div>
              <p className="font-label-caps text-primary mb-8 underline decoration-2 underline-offset-8">COMPANY</p>
              <ul className="space-y-4 text-on-surface-alt font-body-sm font-bold uppercase italic">
                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="font-label-caps text-primary mb-8 underline decoration-2 underline-offset-8">LEGAL</p>
              <ul className="space-y-4 text-on-surface-alt font-body-sm font-bold uppercase italic">
                <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Terms</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-max mx-auto px-margin-desktop mt-24 pt-10 border-t-2 border-on-surface-alt flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-body-sm text-on-surface-variant font-bold uppercase">&copy; 2024 CREATORFIT AI // ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-3 px-4 py-2 border-2 border-on-surface-alt bg-surface">
            <span className="w-2 h-2 rounded-full bg-[#52ff00] animate-pulse" />
            <span className="font-label-caps text-[10px] tracking-widest text-on-surface-alt">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
