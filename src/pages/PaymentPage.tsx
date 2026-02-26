import { useState, type ReactNode } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useProductGroups } from '@/hooks/useProductGroups';
import { useAuth } from '@/contexts/AuthContext';
import {
  CreditCard, Smartphone, Building2, CheckCircle,
  ArrowLeft, Shield, Lock, AlertCircle, TrendingDown,
  Star, Zap,
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { DemoModeBanner } from '@/components/features/DemoModeBanner';

const T = {
  bg: '#F0EFED',
  bgWhite: '#ffffff',
  textDark: '#111111',
  textMid: '#555555',
  textLight: '#999999',
  border: 'rgba(0,0,0,0.08)',
  borderDash: 'rgba(0,0,0,0.12)',
  gold: '#FFB800',
  goldSoft: 'rgba(255,184,0,0.12)',
  goldBorder: 'rgba(255,184,0,0.35)',
  font: "'DM Sans', sans-serif",
};

type PaymentMethod = 'upi' | 'card' | 'netbanking';

export function PaymentPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { getGroupById, joinGroup } = useProductGroups();
  const { t, i18n } = useTranslation();

  const group = getGroupById(groupId || '');
  const quantity = Number(searchParams.get('quantity')) || group?.minQuantity || 0;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');

  const [upiId, setUpiId] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  if (!group) {
    return (
      <CenteredCard>
        <AlertCircle size={48} color="#DC2626" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{t('payment.paymentError')}</h2>
        <p style={{ fontSize: 14, color: T.textMid, marginBottom: 24 }}>{t('payment.groupNotFound')}</p>
        <DarkBtn onClick={() => navigate('/dashboard')} gold>{t('groupDetails.backDashboard')}</DarkBtn>
      </CenteredCard>
    );
  }

  const totalAmount = group.groupPrice * quantity;
  const advanceAmount = Math.round(totalAmount * (group.advancePaymentPercent / 100));
  const remaining = totalAmount - advanceAmount;
  const regularTotal = group.regularPrice * quantity;
  const totalSavings = regularTotal - totalAmount;
  const savingsPct = ((totalSavings / regularTotal) * 100).toFixed(0);
  const annualSavings = totalSavings * 12;

  const handlePayment = async () => {
    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      toast.error(t('payment.upiHint'));
      return;
    }
    if (paymentMethod === 'card' && (!cardNum || !cardExp || !cardCvv || !cardName)) {
      toast.error(t('payment.cardHint'));
      return;
    }
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 3000));
    if (user?.id) joinGroup(group.id, user.id);
    else { toast.error(t('nav.signIn')); setIsProcessing(false); return; }
    setIsProcessing(false);
    setPaymentSuccess(true);
    setTimeout(() => navigate('/dashboard?tab=my-groups'), 5000);
  };

  if (paymentSuccess) {
    return (
      <div style={{
        minHeight: '100vh', fontFamily: T.font, color: T.textDark,
        background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,184,0,0.15) 0%, transparent 60%)',
          animation: 'pulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 300,
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 28, padding: 'clamp(32px, 5vw, 56px)',
          maxWidth: 520, width: '100%', textAlign: 'center',
          position: 'relative', zIndex: 1,
          boxShadow: `0 0 0 1px ${T.goldBorder}, 0 24px 80px rgba(255,184,0,0.12)`,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 24px',
            background: 'rgba(255,184,0,0.15)', border: `2px solid ${T.goldBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <CheckCircle size={36} color={T.gold} strokeWidth={2} />
          </div>

          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            padding: '4px 12px', borderRadius: 100, marginBottom: 16,
            background: T.goldSoft, color: '#7A5800', border: `1px solid ${T.goldBorder}`,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {t('payment.paymentSuccess')}
          </div>

          <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 900, letterSpacing: '-0.035em', color: '#fff', marginBottom: 8 }}>
            {t('payment.successTitle')}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 32, lineHeight: 1.6 }}>
            {t('payment.successSub', { name: group.productName })}
          </p>

          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              {t('payment.advancePaid')}
            </div>
            <div style={{ fontSize: 34, fontWeight: 900, color: T.gold, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {formatCurrency(advanceAmount, i18n.language)}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>
              {t('payment.remainingDelivery', { amount: formatNumber(remaining, i18n.language) })}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
            <div style={{
              background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 14, padding: '16px 14px', textAlign: 'center',
            }}>
              <TrendingDown size={18} color="#22C55E" style={{ marginBottom: 6 }} />
              <div style={{ fontSize: 22, fontWeight: 900, color: '#22C55E', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {formatCurrency(totalSavings, i18n.language)}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>
                {t('payment.savedThisOrder', { percent: savingsPct })}
              </div>
            </div>
            <div style={{
              background: T.goldSoft, border: `1px solid ${T.goldBorder}`,
              borderRadius: 14, padding: '16px 14px', textAlign: 'center',
            }}>
              <Zap size={18} color={T.gold} style={{ marginBottom: 6 }} />
              <div style={{ fontSize: 22, fontWeight: 900, color: T.gold, letterSpacing: '-0.02em', lineHeight: 1 }}>
                {formatCurrency(annualSavings, i18n.language)}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>
                {t('payment.projectedAnnual')}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
            {[t('payment.escrow'), `${group.supplierRating}* Supplier`, t('payment.refundable')].map((badge) => (
              <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                <CheckCircle size={11} color="rgba(34,197,94,0.6)" /> {badge}
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            {t('payment.redirecting')}
          </div>
        </div>

        <style>{`
          @keyframes pulse { 0%,100%{opacity:0.7;transform:translateX(-50%) scale(1)} 50%{opacity:1;transform:translateX(-50%) scale(1.08)} }
          @keyframes popIn { 0%{transform:scale(0.5);opacity:0} 100%{transform:scale(1);opacity:1} }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', fontFamily: T.font, color: T.textDark,
      backgroundColor: T.bg,
      backgroundImage: `linear-gradient(${T.borderDash} 1px, transparent 1px), linear-gradient(90deg, ${T.borderDash} 1px, transparent 1px)`,
      backgroundSize: '80px 80px',
    }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(240,239,237,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: `1px dashed ${T.borderDash}`,
        padding: 'clamp(12px, 2vw, 18px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <button
            onClick={() => navigate(`/group/${group.id}`)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 600, color: T.textMid,
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: T.font, marginBottom: 6, padding: 0,
            }}
          >
            <ArrowLeft size={14} /> {t('common.back')}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 900, letterSpacing: '-0.03em' }}>
              {t('payment.securePayment')}
            </h1>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(34,197,94,0.09)', border: '1px solid rgba(34,197,94,0.22)',
              borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: '#15803D',
            }}>
              <Lock size={10} strokeWidth={2.5} /> {t('payment.sslEncrypted')}
            </div>
          </div>
          <p style={{ fontSize: 13, color: T.textMid, marginTop: 2 }}>
            {t('payment.completeSub')}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(16px, 3vw, 32px)' }}>
        <div style={{ marginBottom: 16 }}>
          <DemoModeBanner />
        </div>
        <div className="pay-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,340px)', gap: 20, alignItems: 'start' }}>
          <div style={{ background: T.bgWhite, border: `1px solid ${T.border}`, borderRadius: 20, padding: 'clamp(20px, 3vw, 32px)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 24 }}>{t('payment.paymentMethod')}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {([
                { id: 'upi', icon: <Smartphone size={18} color="#7C3AED" />, label: t('payment.upi'), sub: t('payment.upiSub'), recommended: true },
                { id: 'card', icon: <CreditCard size={18} color="#2563EB" />, label: t('payment.card'), sub: t('payment.cardSub') },
                { id: 'netbanking', icon: <Building2 size={18} color="#C2410C" />, label: t('payment.netbanking'), sub: t('payment.netbankingSub') },
              ] as { id: PaymentMethod; icon: ReactNode; label: string; sub: string; recommended?: boolean }[]).map((m) => {
                const active = selectedMethod === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => { setSelectedMethod(m.id); setPaymentMethod(m.id); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '16px 18px', borderRadius: 14, cursor: 'pointer',
                      border: active ? `1.5px solid ${T.textDark}` : `1px solid ${T.borderDash}`,
                      background: active ? T.bg : T.bgWhite,
                      transition: 'all 0.15s ease',
                      boxShadow: active ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                      border: `2px solid ${active ? T.textDark : T.borderDash}`,
                      background: active ? T.textDark : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}>
                      {active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                    </div>

                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: T.bg, border: `1px solid ${T.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {m.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.textDark }}>{m.label}</div>
                      <div style={{ fontSize: 12, color: T.textLight, marginTop: 2 }}>{m.sub}</div>
                    </div>

                    {m.recommended && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100,
                        background: T.goldSoft, color: '#7A5800', border: `1px solid ${T.goldBorder}`,
                        letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}>
                        Recommended
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {paymentMethod === 'upi' && (
              <div style={{ marginBottom: 24 }}>
                <FieldLabel>{t('payment.upiId')}</FieldLabel>
                <StyledInput
                  placeholder={t('payment.upiPlaceholder')}
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                <Hint>{t('payment.upiHint')}</Hint>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                <div>
                  <FieldLabel>{t('payment.cardNumber')}</FieldLabel>
                  <StyledInput
                    placeholder="1234 5678 9012 3456"
                    value={cardNum}
                    onChange={(e) => setCardNum(e.target.value)}
                    maxLength={19}
                  />
                  <Hint>{t('payment.cardHint')}</Hint>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <FieldLabel>{t('payment.expiry')}</FieldLabel>
                    <StyledInput placeholder="12/28" value={cardExp} onChange={(e) => setCardExp(e.target.value)} maxLength={5} />
                  </div>
                  <div>
                    <FieldLabel>{t('payment.cvv')}</FieldLabel>
                    <StyledInput placeholder="***" type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} maxLength={3} />
                  </div>
                </div>
                <div>
                  <FieldLabel>{t('payment.cardholderName')}</FieldLabel>
                  <StyledInput placeholder="RAJESH KUMAR" value={cardName} onChange={(e) => setCardName(e.target.value.toUpperCase())} />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div style={{ marginBottom: 24 }}>
                <FieldLabel>{t('payment.selectBank')}</FieldLabel>
                <select style={{
                  width: '100%', fontFamily: T.font, fontSize: 14,
                  padding: '11px 14px', borderRadius: 10, marginTop: 6,
                  border: `1px solid ${T.border}`, background: T.bg,
                  color: T.textDark, outline: 'none', cursor: 'pointer',
                }}>
                  {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank'].map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
                <Hint>{t('payment.bankHint')}</Hint>
              </div>
            )}

            <div style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              background: 'rgba(100,116,240,0.07)', border: '1px solid rgba(100,116,240,0.18)',
              borderRadius: 12, padding: '14px 16px', marginBottom: 24,
            }}>
              <Lock size={15} color="#3D4FD6" style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 13 }}>
                <div style={{ fontWeight: 700, color: '#3D4FD6', marginBottom: 3 }}>{t('payment.secureNote')}</div>
                <div style={{ color: T.textMid, lineHeight: 1.6 }}>
                  {t('payment.secureNoteText')}
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '16px 24px', borderRadius: 100, border: 'none',
                background: isProcessing ? '#E8E7E4' : T.gold,
                color: isProcessing ? T.textLight : '#000',
                fontSize: 16, fontWeight: 800,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                fontFamily: T.font,
                boxShadow: isProcessing ? 'none' : '0 6px 28px rgba(255,184,0,0.4)',
                transition: 'all 0.2s ease',
                letterSpacing: '-0.01em',
              }}
            >
              {isProcessing ? (
                <>
                  <span style={{
                    width: 16, height: 16, border: '2.5px solid rgba(0,0,0,0.15)',
                    borderTopColor: T.textMid, borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite', display: 'inline-block',
                  }} />
                  {t('payment.processing')}
                </>
              ) : (
                <>
                  <Shield size={18} strokeWidth={2.5} />
                  {t('payment.payBtn', { amount: formatNumber(advanceAmount, i18n.language) })}
                </>
              )}
            </button>
          </div>

          <div style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: T.bgWhite, border: `1px solid ${T.border}`, borderRadius: 20, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>{t('payment.orderSummary')}</h3>
              <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: `1px dashed ${T.borderDash}` }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.textDark, marginBottom: 4 }}>{group.productName}</div>
                <div style={{ fontSize: 13, color: T.textMid, marginBottom: 8 }}>{group.supplierName}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: T.bg, border: `1px solid ${T.borderDash}`, color: T.textMid }}>
                    {group.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: T.textMid }}>
                    <Star size={11} fill={T.gold} color={T.gold} /> {group.supplierRating}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 14 }}>
                {[
                  { label: t('payment.quantity'), val: `${quantity} ${group.unit}`, color: T.textDark },
                  { label: t('payment.unitPrice'), val: formatCurrency(group.groupPrice, i18n.language), color: T.textDark },
                  { label: t('payment.regularTotal'), val: formatCurrency(group.regularPrice * quantity, i18n.language), color: T.textLight, strike: true },
                  { label: t('payment.discount', { percent: group.discountPercent }), val: `-${formatCurrency((group.regularPrice - group.groupPrice) * quantity, i18n.language)}`, color: '#15803D', bold: true },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontSize: 13, padding: '8px 0',
                    borderBottom: i < 3 ? `1px dashed ${T.borderDash}` : 'none',
                  }}>
                    <span style={{ color: T.textMid }}>{row.label}</span>
                    <span style={{ fontWeight: row.bold ? 700 : 600, color: row.color, textDecoration: row.strike ? 'line-through' : 'none' }}>
                      {row.val}
                    </span>
                  </div>
                ))}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: 12, marginTop: 4, borderTop: `1px solid ${T.border}`,
                }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{t('payment.totalValue')}</span>
                  <span style={{ fontWeight: 900, fontSize: 17 }}>{formatCurrency(totalAmount, i18n.language)}</span>
                </div>
              </div>

              <div style={{
                background: T.goldSoft, border: `1px solid ${T.goldBorder}`,
                borderRadius: 14, padding: '14px 16px',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#7A5800', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                  {t('payment.paymentPlan')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#7A5800' }}>{t('payment.advance', { percent: group.advancePaymentPercent })}</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: T.textDark }}>{formatCurrency(advanceAmount, i18n.language)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: `1px dashed ${T.goldBorder}` }}>
                  <span style={{ fontSize: 12, color: '#7A5800' }}>{t('payment.onDelivery')}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.textDark }}>{formatCurrency(remaining, i18n.language)}</span>
                </div>
              </div>
            </div>

            <div style={{
              background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20, padding: 24,
              boxShadow: `0 0 0 1px ${T.goldBorder}, 0 8px 32px rgba(255,184,0,0.08)`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                {t('payment.savingsPreview')}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{t('payment.thisOrder')}</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#22C55E' }}>{formatCurrency(totalSavings, i18n.language)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{t('payment.projectedYear')}</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: T.gold }}>{formatCurrency(annualSavings, i18n.language)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: <CheckCircle size={13} color="#22C55E" />, text: t('payment.refundable') },
                { icon: <Shield size={13} color="#3D4FD6" />, text: t('payment.escrow') },
                { icon: <Star size={13} fill={T.gold} color={T.gold} />, text: t('payment.supplierRating', { rating: group.supplierRating }) },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: T.textMid }}>
                  <span style={{ flexShrink: 0, marginTop: 1 }}>{t.icon}</span> {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 820px) {
          .pay-grid { grid-template-columns: 1fr !important; }
        }
        input:focus { border-color: #111 !important; box-shadow: 0 0 0 3px rgba(0,0,0,0.06) !important; outline: none !important; }
      `}</style>
    </div>
  );
}

function CenteredCard({ children }: { children: ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh', fontFamily: T.font,
      backgroundColor: T.bg,
      backgroundImage: `linear-gradient(${T.borderDash} 1px, transparent 1px), linear-gradient(90deg, ${T.borderDash} 1px, transparent 1px)`,
      backgroundSize: '80px 80px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{
        background: T.bgWhite, borderRadius: 20, padding: 48, textAlign: 'center',
        border: `1px solid ${T.border}`, boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        maxWidth: 400, width: '100%',
      }}>
        {children}
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <label style={{ fontSize: 13, fontWeight: 600, color: T.textDark, display: 'block', marginBottom: 6 }}>{children}</label>;
}

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: '100%', fontFamily: T.font, fontSize: 14,
        padding: '11px 14px', borderRadius: 10,
        border: `1px solid ${T.border}`, background: T.bg,
        color: T.textDark, outline: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        ...props.style,
      }}
    />
  );
}

function Hint({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 11, color: T.textLight, marginTop: 5 }}>{children}</div>;
}

function DarkBtn({ children, onClick, gold }: { children: ReactNode; onClick?: () => void; gold?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px 28px', borderRadius: 100, border: 'none',
        background: gold ? T.gold : T.textDark,
        color: gold ? '#000' : '#fff',
        fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: T.font,
        boxShadow: gold ? '0 4px 20px rgba(255,184,0,0.35)' : '0 2px 12px rgba(0,0,0,0.18)',
      }}
    >
      {children}
    </button>
  );
}

void RadioGroup;
void RadioGroupItem;
