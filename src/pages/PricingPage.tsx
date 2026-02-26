import { useState, type ElementType } from 'react';
import { useNavigate } from 'react-router-dom';
import { pricingPlans, addons } from '@/data/pricingPlans';
import {
  Check, X, Sparkles, Crown, Zap, TrendingUp, ChevronDown, ChevronUp,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────────────────────── */
const T = {
  bg:         '#F0EFED',
  bgWhite:    '#ffffff',
  textDark:   '#111111',
  textMid:    '#555555',
  textLight:  '#999999',
  border:     'rgba(0,0,0,0.08)',
  borderDash: 'rgba(0,0,0,0.12)',
  gold:       '#FFB800',
  goldSoft:   'rgba(255,184,0,0.12)',
  goldBorder: 'rgba(255,184,0,0.35)',
  font:       "'DM Sans', sans-serif",
};

/* Tier palettes — normal(bronze) / silver / gold */
const TIERS: Record<string, {
  name: string;
  label: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  accentDark: string;
  glow: string;
  icon: ElementType;
  emoji: string;
}> = {
  free: {
    name:        'Starter',
    label:       'Bronze',
    accent:      '#CD7F32',
    accentSoft:  'rgba(205,127,50,0.10)',
    accentBorder:'rgba(205,127,50,0.30)',
    accentDark:  '#8B5E23',
    glow:        '0 12px 40px rgba(205,127,50,0.18)',
    icon:        Sparkles,
    emoji:       '🥉',
  },
  pro: {
    name:        'Professional',
    label:       'Silver',
    accent:      '#A8A9AD',
    accentSoft:  'rgba(168,169,173,0.12)',
    accentBorder:'rgba(168,169,173,0.35)',
    accentDark:  '#606166',
    glow:        '0 12px 40px rgba(168,169,173,0.22)',
    icon:        Crown,
    emoji:       '🥈',
  },
  enterprise: {
    name:        'Enterprise',
    label:       'Gold',
    accent:      '#FFB800',
    accentSoft:  'rgba(255,184,0,0.12)',
    accentBorder:'rgba(255,184,0,0.38)',
    accentDark:  '#7A5800',
    glow:        '0 12px 40px rgba(255,184,0,0.22)',
    icon:        Zap,
    emoji:       '🥇',
  },
};

const ADDON_EMOJI = ['✉️', '⭐', '💳', '👤'];

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'Can I switch plans anytime?',         a: "Yes! Upgrade or downgrade anytime. Changes take effect immediately, and we'll prorate the difference." },
  { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and for Enterprise plans, invoice billing.' },
  { q: 'Is there a free trial?',              a: 'Professional plan comes with a 14-day free trial. No credit card required to start!' },
  { q: "What if I don't save money?",         a: "We offer a 30-day money-back guarantee. If you don't save at least 2x your subscription cost, we'll refund 100%." },
];

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */
export function PricingPage() {
  const navigate        = useNavigate();
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getAnnualPrice = (p: number) => Math.round(p * 10);

  return (
    <div style={{
      fontFamily: T.font, color: T.textDark,
      backgroundColor: T.bg,
      backgroundImage: `linear-gradient(${T.borderDash} 1px, transparent 1px), linear-gradient(90deg, ${T.borderDash} 1px, transparent 1px)`,
      backgroundSize: '80px 80px',
      minHeight: '100vh',
    }}>

      {/* ── HERO ── */}
      <div style={{
        background: '#0D0D0D',
        padding: 'clamp(48px, 7vw, 88px) clamp(20px, 4vw, 48px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,184,0,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '5px 14px 5px 5px', marginBottom: 20,
          }}>
            <span style={{
              background: T.gold, color: '#000', borderRadius: 100,
              padding: '3px 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
            }}>
              Simple, Transparent Pricing
            </span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>No hidden fees</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 5.5vw, 56px)', fontWeight: 900,
            letterSpacing: '-0.04em', color: '#fff', marginBottom: 14, lineHeight: 1.05,
          }}>
            Choose Your Growth Plan
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 2vw, 18px)', color: 'rgba(255,255,255,0.45)',
            marginBottom: 36, lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px',
          }}>
            Start free, upgrade when you're ready. All plans include core group buying features.
          </p>

          {/* Billing toggle */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '10px 20px',
          }}>
            <button
              onClick={() => setAnnual(false)}
              style={{
                fontSize: 14, fontWeight: annual ? 500 : 700,
                color: annual ? 'rgba(255,255,255,0.4)' : '#fff',
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.font,
              }}
            >Monthly</button>

            {/* Custom toggle */}
            <div
              onClick={() => setAnnual(!annual)}
              style={{
                width: 44, height: 24, borderRadius: 100, cursor: 'pointer',
                background: annual ? T.gold : 'rgba(255,255,255,0.15)',
                position: 'relative', transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: 3, borderRadius: '50%',
                width: 18, height: 18, background: '#fff',
                left: annual ? 23 : 3, transition: 'left 0.2s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }} />
            </div>

            <button
              onClick={() => setAnnual(true)}
              style={{
                fontSize: 14, fontWeight: annual ? 700 : 500,
                color: annual ? '#fff' : 'rgba(255,255,255,0.4)',
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.font,
              }}
            >Annual</button>

            {annual && (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
                background: T.goldSoft, color: '#7A5800', border: `1px solid ${T.goldBorder}`,
                letterSpacing: '0.04em',
              }}>
                Save 17%
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(16px, 3vw, 48px) clamp(16px, 3vw, 32px)' }}>

        {/* ── PRICING CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 20, marginBottom: 64,
          alignItems: 'start',
        }}>
          {pricingPlans.map((plan) => {
            const tier   = TIERS[plan.id] ?? TIERS.free;
            const Icon   = tier.icon;
            const price  = annual && plan.price > 0 ? getAnnualPrice(plan.price) : plan.price;
            const isGold = plan.id === 'enterprise';

            return (
              <PricingCard
                key={plan.id}
                plan={plan}
                tier={tier}
                Icon={Icon}
                price={price}
                annual={annual}
                isGold={isGold}
                onCta={() => navigate('/register')}
              />
            );
          })}
        </div>

        {/* ── COMPARISON TABLE ── */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 32 }}>
            Detailed Feature Comparison
          </h2>

          <div style={{
            background: T.bgWhite, border: `1px solid ${T.border}`,
            borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: T.font }}>
                <thead>
                  <tr style={{ background: T.bg }}>
                    <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: 13, fontWeight: 700, color: T.textMid, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      Feature
                    </th>
                    {pricingPlans.map(plan => {
                      const tier = TIERS[plan.id] ?? TIERS.free;
                      return (
                        <th key={plan.id} style={{ textAlign: 'center', padding: '16px 20px', fontSize: 14, fontWeight: 800, color: T.textDark }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                            <span>{tier.emoji}</span> {plan.name}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Group Memberships', key: (p: typeof pricingPlans[0]) => p.limits.groupJoins === 'unlimited' ? '∞' : p.limits.groupJoins },
                    { label: 'AI Email Generation', key: (p: typeof pricingPlans[0]) => p.limits.aiEmails === 'unlimited' ? '∞' : `${p.limits.aiEmails}/month` },
                    { label: 'Supplier Access',     key: (p: typeof pricingPlans[0]) => p.limits.supplierAccess },
                    { label: 'Payment Terms',       key: (p: typeof pricingPlans[0]) => p.limits.paymentTerms },
                    { label: 'Support Level',       key: (p: typeof pricingPlans[0]) => p.limits.support },
                  ].map((row, i) => (
                    <tr key={row.label} style={{ borderTop: `1px dashed ${T.borderDash}`, background: i % 2 === 1 ? T.bg : T.bgWhite }}>
                      <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 600, color: T.textDark }}>{row.label}</td>
                      {pricingPlans.map(plan => {
                        const tier = TIERS[plan.id] ?? TIERS.free;
                        const val  = row.key(plan);
                        return (
                          <td key={plan.id} style={{ textAlign: 'center', padding: '14px 20px', fontSize: 14, color: T.textMid }}>
                            <span style={{ fontWeight: 700, color: val === '∞' ? tier.accent : T.textDark }}>{val}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── ADD-ONS ── */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 32 }}>
            Optional Add-ons
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
            gap: 16,
          }}>
            {addons.map((addon, idx) => (
              <AddonCard key={idx} addon={addon} emoji={ADDON_EMOJI[idx]} />
            ))}
          </div>
        </div>

        {/* ── ROI CALCULATOR ── */}
        <div style={{
          background: '#0D0D0D', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
          marginBottom: 64, textAlign: 'center',
          border: `1px solid rgba(255,255,255,0.07)`,
          boxShadow: `0 0 0 1px ${T.goldBorder}, 0 12px 48px rgba(255,184,0,0.10)`,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
            width: 500, height: 300, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,184,0,0.10) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <TrendingUp size={40} color={T.gold} style={{ marginBottom: 20 }} />
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', marginBottom: 12 }}>
              Calculate Your ROI
            </h2>
            <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.45)', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
              Average retailer on Professional plan saves <strong style={{ color: '#22C55E' }}>₹18,000/month</strong> through bulk discounts.
              That's a <strong style={{ color: T.gold }}>36× return</strong> on the ₹499 subscription.
            </p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 12, maxWidth: 520, margin: '0 auto',
            }}>
              {[
                { val: '₹18K', label: 'Avg monthly savings', color: '#22C55E' },
                { val: '₹499', label: 'Subscription cost',   color: T.gold   },
                { val: '36×',  label: 'ROI multiplier',      color: '#A78BFA' },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16, padding: '20px 14px',
                }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.color, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6 }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 32 }}>
            Frequently Asked Questions
          </h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 460px), 1fr))',
            gap: 12, maxWidth: 1000, margin: '0 auto',
          }}>
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i} faq={faq} open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* ── CTA SECTION ── */}
        <div style={{
          background: '#0D0D0D', borderRadius: 24,
          padding: 'clamp(40px, 6vw, 64px)',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.07)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)',
            width: 600, height: 300, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,184,0,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-0.035em', color: '#fff', marginBottom: 12 }}>
              Ready to Start Saving?
            </h2>
            <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.4)', marginBottom: 36 }}>
              Join 500+ retailers already saving thousands every month
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '14px 32px', borderRadius: 100, border: 'none',
                  background: T.gold, color: '#000',
                  fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: T.font,
                  boxShadow: '0 6px 28px rgba(255,184,0,0.40)',
                }}
              >
                Start Free Today →
              </button>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  padding: '14px 32px', borderRadius: 100,
                  background: 'transparent', color: 'rgba(255,255,255,0.65)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: T.font,
                }}
              >
                Talk to Sales
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRICING CARD
───────────────────────────────────────────────────────────────────────────── */
function PricingCard({ plan, tier, Icon, price, annual, isGold, onCta }: {
  plan: any; tier: typeof TIERS[string]; Icon: ElementType;
  price: number; annual: boolean; isGold: boolean; onCta: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const cardShadow = hovered
    ? `0 0 0 1.5px ${tier.accent}, ${tier.glow}`
    : isGold
    ? `0 0 0 1.5px ${T.goldBorder}, 0 8px 32px rgba(255,184,0,0.10)`
    : `0 2px 10px rgba(0,0,0,0.06)`;

  const cardBorder = hovered
    ? `1.5px solid ${tier.accent}`
    : isGold
    ? `1.5px solid ${T.gold}`
    : `1px solid ${T.border}`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: T.font,
        background: T.bgWhite,
        borderRadius: 20,
        border: cardBorder,
        boxShadow: cardShadow,
        padding: 28,
        position: 'relative', overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : isGold ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.22s ease',
      }}
    >
      {/* Accent top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: hovered
          ? `linear-gradient(90deg, ${tier.accent}, ${tier.accentDark})`
          : isGold
          ? `linear-gradient(90deg, ${T.gold}, #FFD700)`
          : `linear-gradient(90deg, ${tier.accent}60, ${tier.accent}20)`,
        borderRadius: '20px 20px 0 0',
        transition: 'background 0.22s ease',
      }} />

      {/* Popular badge */}
      {plan.popular && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100,
          background: T.goldSoft, color: '#7A5800', border: `1px solid ${T.goldBorder}`,
          letterSpacing: '0.04em',
        }}>
          ⭐ Most Popular
        </div>
      )}

      {/* Icon + tier label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, marginTop: 8 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: hovered ? `${tier.accent}18` : T.bg,
          border: `1px solid ${hovered ? tier.accentBorder : T.borderDash}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease',
        }}>
          <Icon size={22} color={hovered ? tier.accent : T.textMid} />
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em', color: T.textDark }}>{plan.name}</div>
          <div style={{
            fontSize: 11, fontWeight: 700, color: hovered ? tier.accent : T.textLight,
            letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.2s',
          }}>
            {tier.emoji} {tier.label} Tier
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p style={{ fontSize: 13, color: T.textMid, marginBottom: 20, lineHeight: 1.6 }}>{plan.tagline}</p>

      {/* Price */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 'clamp(34px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', color: T.textDark, lineHeight: 1 }}>
            ₹{price.toLocaleString()}
          </span>
          {plan.price > 0 && (
            <span style={{ fontSize: 14, color: T.textLight, fontWeight: 500 }}>
              /{annual ? 'year' : 'month'}
            </span>
          )}
        </div>
        {annual && plan.price > 0 && (
          <div style={{ fontSize: 12, color: T.textLight, marginTop: 4 }}>
            ₹{Math.round(price / 12).toLocaleString()}/month billed annually
          </div>
        )}
        {plan.discount && (
          <span style={{
            display: 'inline-block', marginTop: 8,
            fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
            background: hovered ? `${tier.accent}18` : T.bg,
            border: `1px solid ${hovered ? tier.accentBorder : T.borderDash}`,
            color: hovered ? tier.accent : T.textMid,
            transition: 'all 0.2s ease',
          }}>
            {plan.discount}
          </span>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={onCta}
        style={{
          width: '100%', padding: '13px', borderRadius: 100, border: 'none',
          background: hovered ? tier.accent : T.textDark,
          color: hovered ? (plan.id === 'pro' ? '#111' : '#fff') : '#fff',
          fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: T.font,
          boxShadow: hovered ? tier.glow : '0 2px 12px rgba(0,0,0,0.16)',
          transition: 'all 0.2s ease',
          marginBottom: 24,
          letterSpacing: '-0.01em',
        }}
      >
        {plan.cta}
      </button>

      {/* Divider */}
      <div style={{ height: 1, background: T.borderDash, marginBottom: 20 }} />

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {plan.features.map((feature: any, idx: number) => (
          <div key={idx} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1,
              background: feature.included
                ? (hovered ? `${tier.accent}18` : 'rgba(34,197,94,0.09)')
                : 'rgba(0,0,0,0.04)',
              border: `1px solid ${feature.included
                ? (hovered ? tier.accentBorder : 'rgba(34,197,94,0.22)')
                : T.borderDash}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}>
              {feature.included
                ? <Check size={11} color={hovered ? tier.accent : '#15803D'} strokeWidth={2.5} />
                : <X size={11} color={T.textLight} strokeWidth={2} />
              }
            </div>
            <span style={{
              color: feature.included ? T.textDark : T.textLight,
              fontWeight: feature.highlight ? 700 : 400,
              lineHeight: 1.5,
            }}>
              {feature.text}
              {feature.highlight && (
                <span style={{
                  marginLeft: 6, fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 100,
                  background: hovered ? `${tier.accent}18` : T.goldSoft,
                  color: hovered ? tier.accent : '#7A5800',
                  border: `1px solid ${hovered ? tier.accentBorder : T.goldBorder}`,
                  transition: 'all 0.2s ease',
                }}>
                  ✦ Key
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADDON CARD
───────────────────────────────────────────────────────────────────────────── */
function AddonCard({ addon, emoji }: { addon: any; emoji: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: T.font,
        background: T.bgWhite, borderRadius: 18,
        border: `1px solid ${hovered ? 'rgba(0,0,0,0.14)' : T.border}`,
        padding: 24,
        boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.05)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'all 0.18s ease',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 12 }}>{emoji}</div>
      <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6 }}>{addon.name}</div>
      <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.6, marginBottom: 14 }}>{addon.description}</p>
      <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 16 }}>
        ₹{addon.price}
        <span style={{ fontSize: 13, fontWeight: 500, color: T.textLight }}>/month</span>
      </div>
      <button
        style={{
          width: '100%', padding: '10px', borderRadius: 100,
          background: hovered ? T.textDark : 'transparent',
          color: hovered ? '#fff' : T.textMid,
          border: `1px solid ${hovered ? T.textDark : T.borderDash}`,
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: T.font,
          transition: 'all 0.15s ease',
        }}
      >
        Add to Plan
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────────────────────────────────────── */
function FaqItem({ faq, open, onToggle }: { faq: { q: string; a: string }; open: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: T.bgWhite, border: `1px solid ${open ? T.borderDash : T.border}`,
        borderRadius: 14, padding: '18px 20px', cursor: 'pointer',
        boxShadow: open ? '0 4px 20px rgba(0,0,0,0.07)' : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'all 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.textDark }}>{faq.q}</div>
        {open ? <ChevronUp size={16} color={T.textLight} /> : <ChevronDown size={16} color={T.textLight} />}
      </div>
      {open && (
        <div style={{ fontSize: 13, color: T.textMid, marginTop: 12, lineHeight: 1.7, paddingTop: 12, borderTop: `1px dashed ${T.borderDash}` }}>
          {faq.a}
        </div>
      )}
    </div>
  );
}
