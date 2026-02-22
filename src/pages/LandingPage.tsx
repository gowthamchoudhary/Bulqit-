import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Users, IndianRupee } from 'lucide-react';
import { HowItWorksPage } from './HowItWorksPage';

type RollingWord = {
  text: string;
  color: string;
  bg: string;
  border: string;
  glow: string;
};

const words: RollingWord[] = [
  {
    text: 'Negotiator',
    color: '#B8480A',
    bg: 'rgba(236,131,60,0.13)',
    border: 'rgba(236,131,60,0.38)',
    glow: 'rgba(236,131,60,0.30)',
  },
  {
    text: 'Connector',
    color: '#0F6B54',
    bg: 'rgba(56,178,153,0.13)',
    border: 'rgba(56,178,153,0.38)',
    glow: 'rgba(56,178,153,0.28)',
  },
  {
    text: 'Powerhouse',
    color: '#2D3FCC',
    bg: 'rgba(100,116,240,0.13)',
    border: 'rgba(100,116,240,0.38)',
    glow: 'rgba(100,116,240,0.28)',
  },
  {
    text: 'Cost Cutter',
    color: '#9B1845',
    bg: 'rgba(220,80,120,0.13)',
    border: 'rgba(220,80,120,0.38)',
    glow: 'rgba(220,80,120,0.26)',
  },
  {
    text: 'Organiser',
    color: '#7A5A00',
    bg: 'rgba(180,140,40,0.13)',
    border: 'rgba(180,140,40,0.38)',
    glow: 'rgba(180,140,40,0.26)',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isSiteReady, setIsSiteReady] = useState(false);
  const scrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const loader = document.getElementById('loader');
    const site = document.getElementById('site');
    const glowBg = document.getElementById('loader-glow-bg');
    const shockRing = document.getElementById('shock-ring');
    const logoImg = document.getElementById('logo-reveal') as HTMLImageElement | null;
    const barEl = document.getElementById('loader-bar') as HTMLDivElement | null;
    const cards = ['hc1', 'hc2', 'hc3', 'hc4', 'hc5']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLDivElement[];

    if (!loader || !site || !glowBg || !shockRing || !logoImg || !barEl || cards.length !== 5) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const rafs: number[] = [];
    let canceled = false;

    function schedule(fn: () => void, delay: number) {
      const t = setTimeout(() => {
        if (!canceled) fn();
      }, delay);
      timers.push(t);
    }

    function playJoinSound() {
      try {
        const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        [[880, 0.28, 1.4], [1760, 0.12, 0.9], [2640, 0.06, 0.6]].forEach(([freq, vol, dur]) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.connect(g);
          g.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + dur * 0.4);
          g.gain.setValueAtTime(0, ctx.currentTime);
          g.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.012);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + dur + 0.1);
        });
      } catch {
        // no-op
      }
    }

    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function easeOutBack(t: number) {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    function easeOutElastic(t: number) {
      if (t === 0 || t === 1) return t;
      return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
    }

    function tween(dur: number, fn: (t: number) => void, done?: () => void) {
      const start = performance.now();
      function frame(now: number) {
        if (canceled) return;
        const t = Math.min((now - start) / dur, 1);
        fn(t);
        if (t < 1) {
          rafs.push(requestAnimationFrame(frame));
        } else if (done) {
          done();
        }
      }
      rafs.push(requestAnimationFrame(frame));
    }

    let barPct = 0;
    function advBar(to: number, dur: number, cb?: () => void) {
      const from = barPct;
      tween(
        dur,
        (t) => {
          barPct = from + (to - from) * easeOutExpo(t);
          barEl.style.width = `${barPct}%`;
        },
        cb,
      );
    }

    function spawnSparks() {
      for (let i = 0; i < 20; i += 1) {
        const sp = document.createElement('div');
        sp.className = 'spark';
        loader.appendChild(sp);

        const angle = (i / 20) * Math.PI * 2;
        const speed = 70 + Math.random() * 110;
        const size = 2 + Math.random() * 5;
        sp.style.width = `${size}px`;
        sp.style.height = `${size}px`;

        const tx = Math.cos(angle) * speed;
        const ty = Math.sin(angle) * speed;

        tween(
          750,
          (t) => {
            const e = easeOutExpo(t);
            sp.style.transform = `translate(calc(-50% + ${tx * e}px), calc(-50% + ${ty * e}px))`;
            sp.style.opacity = `${1 - t}`;
          },
          () => sp.remove(),
        );
      }
    }

    const scatter = 185;
    const cfgs = cards.map((card, i) => {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const sx = Math.cos(angle) * scatter;
      const sy = Math.sin(angle) * scatter;
      const rot = i * 72;
      card.style.transform = `translate(calc(-50% + ${sx}px), calc(-50% + ${sy}px)) rotate(${rot}deg) scale(0.65)`;
      card.style.opacity = '0';
      return { card, sx, sy, angle, rot };
    });

    function phase5() {
      const logoText = document.getElementById('loader-logo');
      const tagEl = document.getElementById('loader-tagline');
      if (!logoText || !tagEl) return;

      tween(560, (t) => {
        const e = easeOutBack(t);
        logoText.style.opacity = `${Math.min(t * 2, 1)}`;
        logoText.style.transform = `translateY(${14 * (1 - e)}px)`;
      });

      schedule(() => {
        tween(400, (t) => {
          tagEl.style.opacity = `${t}`;
        });
      }, 230);

      schedule(() => {
        loader.classList.add('exit');

        schedule(() => {
          loader.style.display = 'none';
          setIsSiteReady(true);
        }, 740);
      }, 1150);
    }

    function phase4() {
      schedule(() => {
        tween(480, (t) => {
          const e = easeInOutCubic(t);
          cfgs.forEach(({ card }) => {
            card.style.opacity = `${1 - e}`;
          });
        });

        schedule(() => {
          tween(
            780,
            (t) => {
              const e = easeOutElastic(t);
              const glowPx = Math.round(t * 80);
              logoImg.style.opacity = `${Math.min(t * 2.2, 1)}`;
              logoImg.style.transform = `translate(-50%, -50%) scale(${0.5 + 0.5 * e})`;
              logoImg.style.filter = `brightness(0) invert(1) drop-shadow(0 0 ${glowPx}px rgba(255,184,0,0.9)) drop-shadow(0 0 ${glowPx * 1.8}px rgba(255,140,0,0.55))`;
            },
            phase5,
          );
        }, 160);

        advBar(100, 620);
      }, 70);
    }

    function phase3() {
      cfgs.forEach(({ card }) => {
        const img = card.querySelector('img') as HTMLImageElement | null;
        if (!img) return;
        img.style.filter = 'brightness(0) invert(1) brightness(4)';
        schedule(() => {
          img.style.transition = 'filter 0.35s ease';
          img.style.filter = 'brightness(0) invert(1)';
        }, 60);
      });

      playJoinSound();
      spawnSparks();
      glowBg.classList.add('bloom');

      shockRing.style.opacity = '1';
      shockRing.style.transform = 'translate(-50%, -50%) scale(0)';
      rafs.push(
        requestAnimationFrame(() => {
          tween(700, (t) => {
            const e = easeOutExpo(t);
            shockRing.style.transform = `translate(-50%, -50%) scale(${e * 1.5})`;
            shockRing.style.opacity = `${1 - t}`;
          });
        }),
      );

      advBar(80, 300, phase4);
    }

    function phase2() {
      schedule(() => {
        tween(
          950,
          (t) => {
            const e = easeOutExpo(t);
            cfgs.forEach(({ card, sx, sy, rot, angle }) => {
              const cx = sx * (1 - e);
              const cy = sy * (1 - e);
              const cr = rot * (1 - e * 0.72);
              const sc = 0.65 + 0.38 * e;
              const spi = Math.sin(t * Math.PI) * 18;
              const spx = cx + Math.sin(angle + Math.PI / 2) * spi;
              const spy = cy + Math.cos(angle + Math.PI / 2) * spi;
              card.style.transform = `translate(calc(-50% + ${spx}px), calc(-50% + ${spy}px)) rotate(${cr}deg) scale(${sc})`;
            });
          },
          phase3,
        );
        advBar(65, 950);
      }, 60);
    }

    function phase1() {
      cfgs.forEach(({ card }, i) => {
        schedule(() => {
          tween(380, (t) => {
            card.style.opacity = `${easeOutExpo(t)}`;
          });
        }, i * 60);
      });
      advBar(25, 500, phase2);
    }

    schedule(phase1, 200);

    return () => {
      canceled = true;
      timers.forEach((t) => clearTimeout(t));
      rafs.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  useEffect(() => {
    if (!isSiteReady) return;

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      setIsExiting(true);

      timeout = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsExiting(false);
      }, 420);
    }, 2200);

    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [isSiteReady]);

  const activeWord = useMemo(() => words[wordIndex], [wordIndex]);

  return (
    <div className="bulqit-page">
      <div id="loader">
        <div id="loader-glow-bg" />
        <div id="shock-ring" />
        <div id="hand-canvas">
          <div className="hand-card" id="hc1"><img src="/placeholder.svg" alt="" draggable="false" /></div>
          <div className="hand-card" id="hc2"><img src="/placeholder.svg" alt="" draggable="false" /></div>
          <div className="hand-card" id="hc3"><img src="/placeholder.svg" alt="" draggable="false" /></div>
          <div className="hand-card" id="hc4"><img src="/placeholder.svg" alt="" draggable="false" /></div>
          <div className="hand-card" id="hc5"><img src="/placeholder.svg" alt="" draggable="false" /></div>
          <img id="logo-reveal" src="/placeholder.svg" alt="Bulqit" draggable="false" />
        </div>
        <div id="loader-logo">Bulqit</div>
        <div id="loader-tagline">Collective Power. Smarter Buying.</div>
        <div id="loader-bar-track"><div id="loader-bar" /></div>
      </div>

      <div id="site" className={isSiteReady ? 'show' : ''}>
        {isSiteReady && (
          <>
        <nav className="bulqit-nav">
          <div className="bulqit-nav-logo">Bulqit</div>
          <ul className="bulqit-nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToHowItWorks(); }}>How it Works</a></li>
            <li><a href="#">For Retailers</a></li>
            <li><a href="#">Suppliers</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
          <button className="bulqit-nav-cta" onClick={() => navigate('/dashboard')}>Plans and Pricing</button>
        </nav>

        <section className="bulqit-hero">
          <div className="bulqit-banner bulqit-fade-up bulqit-delay-1" onClick={() => navigate('/dashboard')}>
            <div className="bulqit-banner-badge"><span>{'\u{1F525}'}</span> New</div>
            Now live in Bangalore - <span className="bulqit-banner-link">500+ kirana stores joined</span>
            <span className="bulqit-banner-arrow">›</span>
          </div>

          <h1 className="bulqit-headline bulqit-fade-up bulqit-delay-2">A buying group</h1>
          <div className="bulqit-headline bulqit-headline-line2 bulqit-fade-up bulqit-delay-2">
            <span className="bulqit-headline-static">acting like a</span>

            <div className="bulqit-rolling-wrapper">
              <span
                className={`bulqit-rolling-pill-word ${isExiting ? 'bulqit-word-exit' : 'bulqit-word-enter'}`}
                style={{
                  ['--pill-tint-bg' as keyof CSSProperties]: activeWord.bg,
                  ['--pill-tint-border' as keyof CSSProperties]: activeWord.border,
                  ['--pill-tint-glow' as keyof CSSProperties]: activeWord.glow,
                  color: activeWord.color,
                  textShadow: `0 1px 0 rgba(255,255,255,0.45), 0 2px 16px ${activeWord.glow}`,
                } as CSSProperties}
              >
                {activeWord.text}
              </span>
            </div>
          </div>

          <p className="bulqit-subheadline bulqit-fade-up bulqit-delay-3">
            Not your average procurement tool. <strong>Bulqit</strong> is an AI-powered buying group that connects kirana stores, pharmacies &amp; restaurants - slashing costs by <strong>15-40%</strong> through collective bargaining.
          </p>

          <div className="bulqit-cta-group bulqit-fade-up bulqit-delay-4">
            <button className="bulqit-btn-primary" onClick={() => navigate('/register')}>
              <ArrowRight size={18} />
              Join as a Retailer
            </button>
            <button className="bulqit-btn-secondary" onClick={scrollToHowItWorks}>
              <div className="bulqit-btn-secondary-avatar">{'\u20B9'}</div>
              See How It Works
            </button>
          </div>

          <div className="bulqit-features-strip bulqit-fade-up bulqit-delay-5">
            <div className="bulqit-feature-item">
              <div className="bulqit-feature-icon"><Users size={20} /></div>
              AI-Matched Buying Groups
            </div>
            <div className="bulqit-feature-item">
              <div className="bulqit-feature-icon"><IndianRupee size={20} /></div>
              Save {'\u20B9'}15,000+ Per Month
            </div>
            <div className="bulqit-feature-item">
              <div className="bulqit-feature-icon"><Mail size={20} /></div>
              Instant AI Negotiation Emails
            </div>
          </div>
        </section>

        <section id="how-it-works-section">
          <HowItWorksPage />
        </section>
          </>
        )}
      </div>
    </div>
  );
}










