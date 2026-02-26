import { useState, type CSSProperties, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProductGroups } from '@/hooks/useProductGroups';
import { DynamicDiscountWidget } from '@/components/features/DynamicDiscountWidget';
import { mockSuppliers } from '@/data/mockSuppliers';
import { AlertCircle, ArrowLeft, Calendar, CheckCircle, Clock, ShieldCheck, TrendingDown, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { DemoModeBanner } from '@/components/features/DemoModeBanner';

const T = {
  bg: '#F0EFED',
  bgWhite: '#ffffff',
  bgCard: '#E8E7E4',
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

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  active: { bg: 'rgba(34,197,94,0.09)', color: '#15803D', border: 'rgba(34,197,94,0.22)' },
  confirming: { bg: 'rgba(255,184,0,0.12)', color: '#7A5800', border: 'rgba(255,184,0,0.35)' },
  completed: { bg: 'rgba(0,0,0,0.06)', color: '#666666', border: 'rgba(0,0,0,0.12)' },
};

export function GroupDetailsPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getGroupById, isUserInGroup, joinGroup } = useProductGroups();
  const { t, i18n } = useTranslation();
  const group = getGroupById(groupId || '');

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [quantity, setQuantity] = useState(group?.minQuantity || 50);
  const [isConfirming, setIsConfirming] = useState(false);

  if (!group) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: T.bg, fontFamily: T.font }}>
        <Section>
          <div style={{ textAlign: 'center' }}>
            <AlertCircle size={44} color="#DC2626" style={{ marginBottom: 10 }} />
            <h2>{t('groupDetails.groupNotFound')}</h2>
            <p style={{ color: T.textMid }}>{t('groupDetails.groupNotFoundSub')}</p>
            <div style={{ marginTop: 14 }}><DarkBtn onClick={() => navigate('/dashboard')}>{t('groupDetails.backDashboard')}</DarkBtn></div>
          </div>
        </Section>
      </div>
    );
  }

  const progress = Math.min((group.currentMembers / group.targetMembers) * 100, 100);
  const isMember = isUserInGroup(group.id);
  const s = statusStyle[group.status] ?? statusStyle.completed;
  const total = group.groupPrice * quantity;
  const regular = group.regularPrice * quantity;
  const savings = regular - total;
  const adv = group.requiresAdvancePayment ? Math.round(total * (group.advancePaymentPercent / 100)) : 0;
  const rem = total - adv;

  const handleConfirmJoin = async () => {
    if (quantity < group.minQuantity) return toast.error(t('groupDetails.minQtyHint', { min: group.minQuantity, unit: group.unit }));
    setIsConfirming(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsConfirming(false);
    setShowConfirmation(false);
    if (group.requiresAdvancePayment) {
      toast.success(t('groupDetails.confirmOrder'), { description: t('groupDetails.advance', { percent: group.advancePaymentPercent }) + `: ${formatCurrency(adv, i18n.language)}` });
      return navigate(`/payment/${group.id}?quantity=${quantity}`);
    }
    if (!user?.id) return toast.error(t('nav.signIn'));
    const ok = joinGroup(group.id, user.id);
    if (!ok) return toast.error(t('groupDetails.groupNotFound'));
    toast.success(t('groupDetails.youreIn'));
    navigate('/dashboard?tab=my-groups');
  };

  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: T.font, color: T.textDark }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(240,239,237,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px dashed ${T.borderDash}`, padding: '12px 18px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: T.textMid, display: 'inline-flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={14} /> {t('groupDetails.backDashboard')}
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginTop: 10, gap: 12, flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ margin: 0 }}>{group.productName} Group</h1>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                <Pill>{group.category}</Pill>
                <Pill bg={s.bg} color={s.color} border={s.border}>{group.status}</Pill>
                {group.isAlmostFull && <Pill bg="rgba(239,68,68,0.09)" color="#DC2626" border="rgba(239,68,68,0.22)">{t('groupDetails.almostFull')}</Pill>}
              </div>
            </div>
            <div style={{ background: T.textDark, borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ color: T.gold, fontSize: 28, fontWeight: 900 }}>{group.discountPercent}%</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>{t('groupDetails.bulkDiscount')}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: 18 }}>
        <div style={{ marginBottom: 16 }}>
          <DemoModeBanner />
        </div>
        <div className="details-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,360px)', gap: 18 }}>
          <div style={{ display: 'grid', gap: 18 }}>
            <Section title={t('groupDetails.aboutGroup')}>
              <p style={{ color: T.textMid }}>{group.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 8 }}>
                <Stat label={t('groupDetails.orderFrequency')} value={group.orderFrequency} />
                <Stat label={t('groupDetails.nextOrder')} value={group.nextOrderDay} />
                <Stat label={t('groupDetails.minQuantity')} value={`${group.minQuantity} ${group.unit}`} />
                <Stat label={t('groupDetails.supplier')} value={`${group.supplierName} (${group.supplierRating}*)`} />
              </div>
            </Section>

            <Section title={t('groupDetails.groupMembers', { current: group.currentMembers, target: group.targetMembers })}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Users size={14} /> Member Progress</span>
                <span style={{ color: T.textLight }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 100, overflow: 'hidden', border: `1px solid ${T.borderDash}`, marginBottom: 10 }}>
                <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${T.gold}, #FFD700)` }} />
              </div>
              <div style={{ color: T.textMid, fontSize: 13 }}>{t('groupDetails.openSpot')} {group.spotsLeft}</div>
            </Section>

            <Section title={t('groupDetails.priceComparison')}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <Stat label={t('groupDetails.regularPrice')} value={formatCurrency(group.regularPrice, i18n.language)} />
                <Stat label={t('groupDetails.groupPriceLabel')} value={formatCurrency(group.groupPrice, i18n.language)} />
              </div>
              <div style={{ marginTop: 10, background: T.goldSoft, border: `1px solid ${T.goldBorder}`, borderRadius: 12, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#7A5800' }}>{t('groupDetails.savingsPerOrder')}</div>
                  <div style={{ fontSize: 26, fontWeight: 900 }}>{formatCurrency(group.savingsPerOrder, i18n.language)}</div>
                </div>
                <TrendingDown size={18} color="#7A5800" />
              </div>
            </Section>

            <Section title="Dynamic Pricing">
              <DynamicDiscountWidget
                basePrice={group.regularPrice}
                currentQuantity={group.currentMembers * group.minQuantity}
                discountTiers={mockSuppliers[0].discountTiers}
                currentMembers={group.currentMembers}
                avgQuantityPerMember={group.minQuantity}
                unit={group.unit}
              />
            </Section>
          </div>

          <div style={{ display: 'grid', gap: 18, alignSelf: 'start', position: 'sticky', top: 100 }}>
            {isMember ? (
              <Section>
                <div style={{ textAlign: 'center' }}>
                  <CheckCircle color={T.gold} />
                  <h3>{t('groupDetails.youreIn')}</h3>
                  <GhostBtn onClick={() => navigate('/dashboard?tab=my-groups')}>{t('groupDetails.viewMyGroups')}</GhostBtn>
                </div>
              </Section>
            ) : !showConfirmation ? (
              <Section title={t('groupDetails.joinGroup')}>
                <p style={{ color: T.textMid, fontSize: 13 }}>Save {formatCurrency(group.savingsPerOrder, i18n.language)} per order</p>
                {group.requiresAdvancePayment && <p style={{ color: '#3D4FD6', fontSize: 13 }}>{t('groupDetails.secureAdvance', { percent: group.advancePaymentPercent })}</p>}
                <DarkBtn full gold onClick={() => setShowConfirmation(true)} disabled={group.spotsLeft === 0}>
                  {group.spotsLeft === 0 ? t('groupDetails.groupFull') : t('groupDetails.joinGroup')}
                </DarkBtn>
              </Section>
            ) : (
              <Section title={t('groupDetails.confirmOrder')}>
                <label style={{ fontSize: 13 }}>{t('groupDetails.quantity', { unit: group.unit })}</label>
                <input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} type="number" min={group.minQuantity} style={{ width: '100%', marginTop: 6, marginBottom: 10, padding: '10px 12px', borderRadius: 10, border: `1px solid ${T.border}` }} />
                <div style={{ fontSize: 13, color: T.textMid, display: 'grid', gap: 6 }}>
                  <div>{t('groupDetails.totalAmount')}: <b>{formatCurrency(total, i18n.language)}</b></div>
                  <div>{t('groupDetails.savingsPerOrder')}: <b>{formatCurrency(savings, i18n.language)}</b></div>
                  {group.requiresAdvancePayment && <div>{t('groupDetails.advance', { percent: group.advancePaymentPercent })}: <b>{formatCurrency(adv, i18n.language)}</b> | {t('groupDetails.onDelivery')}: <b>{formatCurrency(rem, i18n.language)}</b></div>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
                  <GhostBtn onClick={() => setShowConfirmation(false)} disabled={isConfirming}>{t('common.cancel')}</GhostBtn>
                  <DarkBtn gold onClick={handleConfirmJoin} disabled={isConfirming || quantity < group.minQuantity}>
                    {isConfirming ? t('groupDetails.processing') : group.requiresAdvancePayment ? t('groupDetails.proceedPayment') : t('groupDetails.confirmJoin')}
                  </DarkBtn>
                </div>
              </Section>
            )}

            <Section title={t('groupDetails.upcomingOrder')}>
              <div style={{ display: 'grid', gap: 8, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span><Calendar size={14} /> {t('groupDetails.orderCloses')}</span><span>{group.nextOrderDay}</span></div>
                {group.advancePaymentDeadline && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span><Clock size={14} /> {t('groupDetails.paymentDeadline')}</span><span>{new Date(group.advancePaymentDeadline).toLocaleDateString()}</span></div>}
              </div>
            </Section>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 860px){.details-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div style={{ background: T.bgWhite, border: `1px solid ${T.border}`, borderRadius: 18, padding: 18, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: T.bg, border: `1px dashed ${T.borderDash}`, borderRadius: 10, padding: 10 }}>
      <div style={{ fontSize: 11, color: T.textLight }}>{label}</div>
      <div style={{ fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function Pill({ children, bg = T.bg, color = T.textMid, border = T.borderDash, style }: { children: ReactNode; bg?: string; color?: string; border?: string; style?: CSSProperties }) {
  return <span style={{ padding: '3px 10px', borderRadius: 999, border: `1px solid ${border}`, fontSize: 11, background: bg, color, fontWeight: 700, ...style }}>{children}</span>;
}

function DarkBtn({ children, onClick, disabled = false, full = false, gold = false }: { children: ReactNode; onClick?: () => void; disabled?: boolean; full?: boolean; gold?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: full ? '100%' : undefined, border: 'none', borderRadius: 999, padding: '11px 18px', background: disabled ? T.bgCard : gold ? T.gold : T.textDark, color: disabled ? T.textLight : gold ? '#000' : '#fff', fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: T.font }}>
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, disabled = false }: { children: ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: '100%', borderRadius: 999, padding: '11px 18px', background: 'transparent', border: `1px solid ${T.borderDash}`, color: T.textMid, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: T.font }}>
      {children}
    </button>
  );
}
