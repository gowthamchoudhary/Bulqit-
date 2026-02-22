import { type CSSProperties, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Users,
  ShoppingCart,
  TrendingDown,
  Clock,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

/* -----------------------------------------------------------------------------
   DESIGN TOKENS — mirrors the landing page exactly
   bg: #F0EFED · dashed grid · DM Sans · dark-pill CTAs · black+gold accents
----------------------------------------------------------------------------- */

export function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: '#F0EFED',
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        color: '#111111',
      }}
    >

      {/* -- HERO ----------------------------------------------------------- */}
      <section
        style={{
          textAlign: 'center',
          padding: '96px 24px 80px',
          borderBottom: '1px dashed rgba(0,0,0,0.12)',
          position: 'relative',
        }}
      >
        {/* Eyebrow pill */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 100, padding: '5px 14px 5px 5px',
            fontSize: 13, color: '#555', marginBottom: 28,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <span
            style={{
              background: '#FFB800', color: '#000', borderRadius: 100,
              padding: '3px 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
            }}
          >
            Simple
          </span>
          No coordination. No calls. Just savings.
        </div>

        <h1
          style={{
            fontSize: 'clamp(40px, 5.5vw, 66px)', fontWeight: 900,
            letterSpacing: '-0.035em', lineHeight: 1.08,
            maxWidth: 680, margin: '0 auto 20px',
          }}
        >
          How Bulqit works
        </h1>

        <p style={{ fontSize: 18, color: '#555', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
          Join a buying group, sit back, and watch procurement costs drop by 15–40%.
          The AI handles everything else.
        </p>
      </section>

      {/* -- WHO IS THIS FOR ------------------------------------------------ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 32px' }}>
        <SectionLabel>Built for</SectionLabel>
        <h2 style={sectionTitle}>Every kind of small retailer</h2>
        <p style={sectionSub}>
          Whether you sell groceries, medicines, or meals — Bulqit finds the right group for your products.
        </p>

        <div
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            background: '#fff',
            border: '1px dashed rgba(0,0,0,0.12)', borderRadius: 20, overflow: 'hidden',
            marginTop: 48,
          }}
        >
          {[
            { emoji: '🛒', title: 'Kirana Stores',  save: 'Avg. save ₹12,000/mo',
              desc: 'Rice, dal, oil, spices, packaged goods — join bulk groups with nearby kirana owners and cut wholesale costs.' },
            { emoji: '💊', title: 'Pharmacies',     save: 'Avg. save ₹18,000/mo',
              desc: 'Pool orders for generic medicines and supplements with other pharmacies to unlock distributor-level pricing.' },
            { emoji: '🍽️', title: 'Restaurants',   save: 'Avg. save ₹22,000/mo',
              desc: 'Join groups for vegetables, cooking oil, packaging, and dry goods. Get supplier prices without minimums.' },
          ].map((r, i, arr) => (
            <div
              key={r.title}
              style={{
                padding: '32px 28px',
                borderRight: i < arr.length - 1 ? '1px dashed rgba(0,0,0,0.12)' : 'none',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}
            >
              <span style={{ fontSize: 32 }}>{r.emoji}</span>
              <strong style={{ fontSize: 16, fontWeight: 700 }}>{r.title}</strong>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.65 }}>{r.desc}</p>
              <span
                style={{
                  display: 'inline-block', fontSize: 12, fontWeight: 700,
                  padding: '4px 12px', borderRadius: 100, marginTop: 4, alignSelf: 'flex-start',
                  background: 'rgba(255,184,0,0.12)', color: '#7A5800',
                }}
              >
                {r.save}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* -- 3 STEPS -------------------------------------------------------- */}
      <section
        style={{
          maxWidth: 1100, margin: '0 auto', padding: '88px 32px',
          borderTop: '1px dashed rgba(0,0,0,0.12)',
        }}
      >
        <SectionLabel>The Process</SectionLabel>
        <h2 style={sectionTitle}>3 steps. That's all.</h2>
        <p style={sectionSub}>
          No coordination. No supplier calls. No spreadsheets. Just savings every cycle.
        </p>

        <div
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2,
            border: '1px dashed rgba(0,0,0,0.12)', borderRadius: 20, overflow: 'hidden',
            marginTop: 52,
          }}
        >
          {/* Step 1 */}
          <StepCard
            num="01"
            icon={<Search size={20} strokeWidth={1.8} />}
            title="Browse active groups"
            desc="See live buying groups forming near you for exactly the products you stock. Filter by category, order size, or schedule."
          >
            <div style={mockupBox}>
              <MockupRow label="📦 Basmati Rice Group" badge="47 / 50" badgeColor="green" />
              <MockupRow label="💊 Generic OTC Group"  badge="32 / 40" badgeColor="orange" />
              <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>📍 Within 3 km of you</div>
            </div>
          </StepCard>

          {/* Step 2 */}
          <StepCard
            num="02"
            icon={<Users size={20} strokeWidth={1.8} />}
            title="Join with one tap"
            desc="Tap Join Group, enter your quantity, confirm. You're in. No forms, no calls, no coordination with other retailers."
            border
          >
            <button
              style={{
                marginTop: 20, width: '100%', background: '#111', color: '#fff',
                border: 'none', borderRadius: 100, padding: '12px 20px',
                fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <CheckCircle size={15} /> Join Group
            </button>
            <div style={{ fontSize: 12, color: '#999', textAlign: 'center', marginTop: 8 }}>
              ✓ Takes under 10 seconds
            </div>
          </StepCard>

          {/* Step 3 */}
          <StepCard
            num="03"
            icon={<TrendingDown size={20} strokeWidth={1.8} />}
            title="Save automatically"
            desc="Orders run on schedule. Goods delivered to your store. Savings show up every cycle — zero effort required."
          >
            <div style={mockupBox}>
              <MockupRow label="Regular price" value="₹85/kg" strikethrough />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Your group price</span>
                <span style={{ fontSize: 24, fontWeight: 900 }}>₹70/kg</span>
              </div>
              <div style={{ fontSize: 12, color: '#15803D', marginTop: 4 }}>↓ You save ₹15/kg this cycle</div>
            </div>
          </StepCard>
        </div>
      </section>

      {/* -- AI DARK SECTION ------------------------------------------------ */}
      <section
        style={{
          background: '#0D0D0D', padding: '88px 32px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,184,0,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <Sparkles size={32} color="#FFB800" style={{ marginBottom: 12 }} />
            <SectionLabel light>Under the hood</SectionLabel>
            <h2 style={{ ...sectionTitle, color: '#fff', marginTop: 8 }}>The AI working while you sleep</h2>
            <p style={{ ...sectionSub, color: 'rgba(255,255,255,0.42)', margin: '0 auto' }}>
              You focus on your customers. Our AI handles the rest — 24/7, automatically.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
            {[
              { icon: <Users size={20} />,        color: '#FFB800', bg: 'rgba(255,184,0,0.15)',
                title: 'Smart Group Formation',
                desc:  'AI scans purchase patterns across thousands of retailers and auto-forms optimal groups for maximum collective discount.' },
              { icon: <ShoppingCart size={20} />, color: '#38B295', bg: 'rgba(56,178,149,0.12)',
                title: 'Verified Supplier Matching',
                desc:  'We source and vet the best supplier for each group on price, reliability, and quality — guaranteed.' },
              { icon: <Clock size={20} />,        color: '#6474F0', bg: 'rgba(100,116,240,0.12)',
                title: 'Auto-Scheduling',
                desc:  'Groups run on fixed cycles — weekly, bi-weekly, or monthly. Orders fire automatically. You just receive the goods.' },
              { icon: <TrendingDown size={20} />, color: '#F0648C', bg: 'rgba(240,100,140,0.12)',
                title: 'Real-Time Price Optimisation',
                desc:  'As groups grow, discount tiers unlock automatically. More members always means better prices — zero renegotiation.' },
            ].map((c, i) => (
              <div
                key={c.title}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '36px 40px',
                  display: 'flex', gap: 22, alignItems: 'flex-start',
                  borderRadius: [
                    '16px 0 0 0', '0 16px 0 0', '0 0 0 16px', '0 0 16px 0',
                  ][i],
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: c.bg, border: `1px solid ${c.color}40`,
                  color: c.color,
                }}>
                  {c.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- TIMELINE ------------------------------------------------------- */}
      <section style={{ background: '#fff', borderBottom: '1px dashed rgba(0,0,0,0.12)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '88px 32px' }}>
          <SectionLabel>A real example</SectionLabel>
          <h2 style={sectionTitle}>Your first order, step by step</h2>
          <p style={{ ...sectionSub, marginBottom: 0 }}>
            A kirana store owner joins the Basmati Rice Group on Monday.
          </p>

          <div style={{ marginTop: 52, position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: 22, top: 0, bottom: 0, width: 1,
              borderLeft: '1px dashed rgba(0,0,0,0.12)',
            }} />

            {[
              { icon: <Users size={18} />,        day: 'Monday, 9:14 AM',    title: 'You join the group',
                desc: 'One tap. 47 other retailers already in. 3 spots remain. You enter your order: 50 kg.' },
              { icon: <CheckCircle size={18} />,  day: 'Tuesday, 11:30 AM',  title: 'Group fills — best tier unlocked',
                desc: 'All 50 slots filled. The 18% discount tier activates. AI confirms order with the supplier automatically.' },
              { icon: <ShoppingCart size={18} />, day: 'Wednesday, 8:00 AM', title: 'Supplier ships 2,500 kg total',
                desc: 'Bulk order dispatched. Each retailer\'s share is pre-split. No coordination needed.' },
              { icon: <TrendingDown size={18} />, day: 'Thursday, 2:30 PM',  title: 'Delivered to your store',
                desc: '50 kg Basmati delivered. You paid ₹70/kg instead of ₹85/kg. Savings auto-credited to your Bulqit wallet.',
                result: '🎉 You saved ₹750 this cycle — with zero phone calls or negotiation.' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: 28, paddingBottom: 40 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(255,184,0,0.1)', border: '2px solid rgba(255,184,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: 1, color: '#996600',
                }}>
                  {item.icon}
                </div>
                <div style={{ paddingTop: 10, flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>
                    {item.day}
                  </div>
                  <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{item.desc}</p>
                  {item.result && (
                    <div style={{
                      marginTop: 12, padding: '14px 18px',
                      background: 'rgba(255,184,0,0.08)', border: '1px solid rgba(255,184,0,0.25)',
                      borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#7A5800',
                    }}>
                      {item.result}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- COMPARISON ----------------------------------------------------- */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 32px' }}>
        <SectionLabel>Why Bulqit</SectionLabel>
        <h2 style={sectionTitle}>Old way vs. the Bulqit way</h2>
        <p style={sectionSub}>Group buying existed before. We just made it actually work.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 52 }}>
          {/* Bad */}
          <div style={{
            borderRadius: 20, padding: '40px 36px',
            background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 28 }}>❌ Traditional group buying</h3>
            {[
              { title: 'Hours of WhatsApp coordination', sub: 'Chasing 20 retailers to confirm orders every week' },
              { title: 'Hard to find trusted partners',  sub: 'Who do you ask? Are they reliable? Will they pay?' },
              { title: 'Manual supplier negotiation',    sub: 'You negotiate yourself — no leverage, mediocre deals' },
              { title: 'Falls apart after 1–2 cycles',  sub: 'Someone drops out, group collapses, back to square one' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px dashed rgba(0,0,0,0.08)' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(239,68,68,0.1)', color: '#DC2626',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, marginTop: 1,
                }}>✗</div>
                <div>
                  <strong style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</strong>
                  <span style={{ fontSize: 13, color: '#999' }}>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Good */}
          <div style={{
            borderRadius: 20, padding: '40px 36px', background: '#000',
            boxShadow: '0 0 0 1.5px rgba(255,184,0,0.4), 0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 28, color: '#FFB800' }}>✦ The Bulqit way</h3>
            {[
              { title: 'Join in 10 seconds',             sub: 'One tap. AI coordinates everything behind the scenes' },
              { title: 'Pre-formed, verified groups',    sub: '47 retailers already waiting — all vetted by Bulqit' },
              { title: 'AI negotiates for you',          sub: 'Best prices from verified suppliers, guaranteed' },
              { title: 'Runs forever, automatically',   sub: 'Weekly orders, consistent savings, no group drama' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(255,184,0,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                }}>
                  <CheckCircle size={13} color="#FFB800" strokeWidth={2.5} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 2, color: '#fff' }}>{item.title}</strong>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- CTA ------------------------------------------------------------ */}
      <section
        style={{
          background: '#000', padding: '100px 32px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: -150, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 350, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,184,0,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900,
            letterSpacing: '-0.035em', color: '#fff', marginBottom: 16,
          }}>
            Ready to start saving?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 420, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Join 500+ retailers already cutting costs by 15–40% every month — without a single phone call.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: '#FFB800', color: '#000',
                border: 'none', borderRadius: 100,
                padding: '16px 32px', fontSize: 16, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 4px 24px rgba(255,184,0,0.35)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              Join as a Retailer <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'transparent', color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100,
                padding: '15px 30px', fontSize: 16, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              See active groups →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

/* -----------------------------------------------------------------------------
   SHARED STYLE TOKENS
----------------------------------------------------------------------------- */
const sectionTitle: CSSProperties = {
  fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 800,
  letterSpacing: '-0.03em', color: '#111', lineHeight: 1.1, marginBottom: 12,
};
const sectionSub: CSSProperties = {
  fontSize: 17, color: '#555', lineHeight: 1.65, maxWidth: 500,
};
const mockupBox: CSSProperties = {
  marginTop: 24, background: '#F0EFED',
  border: '1px dashed rgba(0,0,0,0.12)', borderRadius: 12, padding: 16,
};

/* -----------------------------------------------------------------------------
   SUB-COMPONENTS
----------------------------------------------------------------------------- */
function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
      color: light ? 'rgba(255,255,255,0.3)' : '#999', marginBottom: 12,
    }}>
      <span style={{ width: 20, height: 1, background: light ? 'rgba(255,255,255,0.3)' : '#999', display: 'inline-block' }} />
      {children}
    </div>
  );
}

function StepCard({
  num, icon, title, desc, children, border = false,
}: {
  num: string; icon: ReactNode; title: string; desc: string;
  children?: ReactNode; border?: boolean;
}) {
  return (
    <div style={{
      background: '#fff', padding: '44px 36px', position: 'relative',
      borderRight: border ? '1px dashed rgba(0,0,0,0.12)' : undefined,
      borderLeft: border ? '1px dashed rgba(0,0,0,0.12)' : undefined,
    }}>
      <div style={{
        position: 'absolute', top: 24, right: 28,
        fontSize: 72, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
        color: 'rgba(0,0,0,0.05)',
      }}>{num}</div>
      <div style={{
        width: 52, height: 52, borderRadius: 14, background: '#F0EFED',
        border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginBottom: 24, color: '#111',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 15, color: '#555', lineHeight: 1.65 }}>{desc}</p>
      {children}
    </div>
  );
}

function MockupRow({
  label, badge, badgeColor, value, strikethrough,
}: {
  label?: string; badge?: string; badgeColor?: 'green' | 'orange';
  value?: string; strikethrough?: boolean;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontSize: 13, color: '#555', padding: '6px 0',
      borderBottom: '1px dashed rgba(0,0,0,0.1)',
    }}>
      <span>{label}</span>
      {badge && (
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
          background: badgeColor === 'orange' ? 'rgba(251,146,60,0.15)' : 'rgba(34,197,94,0.12)',
          color: badgeColor === 'orange' ? '#C2410C' : '#15803D',
        }}>{badge}</span>
      )}
      {value && (
        <span style={strikethrough ? { textDecoration: 'line-through', color: '#999' } : {}}>
          {value}
        </span>
      )}
    </div>
  );
}


