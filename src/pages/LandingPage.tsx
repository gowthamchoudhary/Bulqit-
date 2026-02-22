import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowRight, Users, Brain, TrendingDown, ShoppingBag, Handshake, Zap } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

function AnimatedNumber({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{val.toLocaleString('en-IN')}{suffix}</span>;
}

const features = [
  { icon: Brain, title: 'AI-Powered Matching', desc: 'Our algorithm finds retailers with overlapping product needs in your neighborhood.' },
  { icon: Handshake, title: 'Group Negotiation', desc: 'Combine order volumes to unlock bulk discounts of 15-22% from verified suppliers.' },
  { icon: Zap, title: 'Instant Email Drafts', desc: 'AI generates professional negotiation emails ready to send to suppliers.' },
];

const stats = [
  { value: 15000, prefix: '₹', suffix: '+', label: 'Avg Monthly Savings' },
  { value: 500, prefix: '', suffix: '+', label: 'Retailers Connected' },
  { value: 40, prefix: '', suffix: '%', label: 'Cost Reduction' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground mb-6 animate-fade-in">
            <ShoppingBag className="h-4 w-4" />
            Built for Indian Retailers
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            Turning Small Retailers into
            <br />
            <span className="relative">
              Bulk Buying Powerhouses
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8 Q75 2 150 6 Q225 10 298 4" stroke="hsl(38 92% 50%)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/80 mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Connect with nearby retailers, combine your buying power, and negotiate unbeatable bulk prices from verified suppliers — all powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => navigate('/register')}
              className="flex items-center gap-2 rounded-xl bg-primary-foreground px-8 py-4 text-base font-bold text-primary btn-scale shadow-lg"
            >
              Get Started — It's Free <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 rounded-xl border-2 border-primary-foreground/30 px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 p-5 animate-fade-in opacity-0"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <p className="text-3xl font-extrabold text-primary-foreground">
                  <AnimatedNumber target={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="text-sm text-primary-foreground/70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-3">How BulkBridge AI Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three simple steps to start saving on every purchase.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-7 hover-lift opacity-0 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-primary">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Save Big?</h2>
          <p className="text-primary-foreground/80 mb-8">Join hundreds of retailers already saving ₹15,000+ every month.</p>
          <button
            onClick={() => navigate('/register')}
            className="rounded-xl bg-primary-foreground px-8 py-4 text-base font-bold text-primary btn-scale shadow-lg"
          >
            Register Your Store Now
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
