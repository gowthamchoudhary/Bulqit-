import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useProductGroups } from '@/hooks/useProductGroups';
import { useMatching } from '@/hooks/useMatching';
import { ProductGroupCard } from '@/components/features/ProductGroupCard';
import { DemoModeBanner } from '@/components/features/DemoModeBanner';
import { AIPredictionCard } from '@/components/features/AIPredictionCard';
import { AIPriceIntelligenceWidget } from '@/components/features/AIPriceIntelligenceWidget';
import { AIOrderOptimizerCard } from '@/components/features/AIOrderOptimizerCard';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingDown, Users, Package, Zap, ChevronRight, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/lib/formatters';

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

export default function DashboardPage() {
  const { user: currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const { joinGroup, leaveGroup, isUserInGroup, getUserGroups, getAvailableGroups } = useProductGroups();
  const { matches, loading: aiLoading, error: aiError } = useMatching(currentUser);
  const initialTab = searchParams.get('tab') === 'my-groups' ? 'my-groups' : 'all';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(searchParams.get('tab') === 'my-groups' ? 'my-groups' : 'all');
  }, [searchParams]);

  if (!isAuthenticated || !currentUser) return <Navigate to="/register" replace />;

  const myGroups = getUserGroups();
  const availableGroups = getAvailableGroups(currentUser.storeType);
  const almostFull = availableGroups.filter((g) => g.isAlmostFull).slice(0, 4);
  const totalSavings = myGroups.reduce((s, g) => s + g.savingsPerOrder, 0);

  const handleJoinGroup = (groupId: string) => {
    if (!currentUser) return;
    const group = [...availableGroups, ...myGroups].find((g) => g.id === groupId);
    const success = joinGroup(groupId, currentUser.id);
    if (success) {
      toast.success(t('toast.joinedGroup', { name: group?.productName ?? 'Group' }), {
        description: group ? t('toast.joinedGroupDesc', { amount: group.savingsPerOrder.toLocaleString() }) : undefined,
      });
    } else {
      toast.error(t('toast.failedJoin'));
    }
  };

  const handleLeaveGroup = (groupId: string) => {
    if (!currentUser) return;
    const success = leaveGroup(groupId, currentUser.id);
    if (success) toast.info(t('toast.leftGroup'));
    else toast.error(t('toast.failedLeave'));
  };

  return (
    <PageLayout>
      <div
        style={{
          fontFamily: T.font,
          backgroundColor: T.bg,
          backgroundImage: `linear-gradient(${T.borderDash} 1px, transparent 1px), linear-gradient(90deg, ${T.borderDash} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          minHeight: '100vh',
          color: T.textDark,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(16px, 3vw, 32px)' }}>
          <div style={{ marginBottom: 16 }}>
            <DemoModeBanner />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 32,
              paddingBottom: 24,
              borderBottom: `1px dashed ${T.borderDash}`,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h1
                  style={{
                    fontSize: 'clamp(22px, 3.5vw, 32px)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    color: T.textDark,
                  }}
                >
                  {t('dashboard.welcome')}
                </h1>
                <span
                  style={{
                    background: T.textDark,
                    color: '#fff',
                    borderRadius: 100,
                    padding: '4px 14px',
                    fontSize: 'clamp(13px, 2vw, 15px)',
                    fontWeight: 700,
                  }}
                >
                  {currentUser.storeName}
                </span>
              </div>
              <p style={{ fontSize: 14, color: T.textMid, marginTop: 6 }}>
                {t('dashboard.subtitle')}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <LanguageSwitcher />
              <button
                onClick={() => navigate('/buyers')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 600,
                  background: T.bgWhite,
                  color: T.textDark,
                  border: `1px solid ${T.border}`,
                  cursor: 'pointer',
                  fontFamily: T.font,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('nav.directory')} <ChevronRight size={14} />
              </button>
              <button
                onClick={() => navigate('/suppliers')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 600,
                  background: T.bgWhite,
                  color: T.textDark,
                  border: `1px solid ${T.border}`,
                  cursor: 'pointer',
                  fontFamily: T.font,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('nav.suppliers')} <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <button
              onClick={() => navigate('/savings-calculator')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 700,
                background: T.textDark,
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontFamily: T.font,
                boxShadow: '0 2px 12px rgba(0,0,0,0.14)',
              }}
            >
              {t('savingsPage.openButton', { defaultValue: 'Open Savings Calculator' })}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2">
              <AIPredictionCard />
            </div>
            <AIPriceIntelligenceWidget />
            <div className="lg:col-span-3">
              <AIOrderOptimizerCard />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              marginBottom: 32,
            }}
          >
            <StatCard
              icon={<Package size={20} />}
              label={t('dashboard.yourGroups')}
              value={myGroups.length.toString()}
              sub={t('dashboard.activeMemberships')}
              accent={T.gold}
            />
            <StatCard
              icon={<TrendingDown size={20} />}
              label={t('dashboard.estimatedSavings')}
              value={formatCurrency(totalSavings, i18n.language)}
              sub={t('common.perMonth')}
              accent="#38B295"
            />
            <StatCard
              icon={<Users size={20} />}
              label={t('dashboard.availableGroups')}
              value={availableGroups.length.toString()}
              sub={t('dashboard.forStoreType', { type: currentUser.storeType })}
              accent="#6474F0"
            />
          </div>

          <div
            style={{
              background: T.bgWhite,
              border: `1px solid ${T.border}`,
              borderRadius: 20,
              padding: 'clamp(20px, 3vw, 32px)',
              marginBottom: 32,
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                flexWrap: 'wrap',
                marginBottom: 20,
              }}
            >
              <h2 style={{ fontSize: 'clamp(17px, 2.5vw, 20px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                {t('dashboard.aiMatches')}
              </h2>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'rgba(255,184,0,0.12)',
                  color: '#7A5800',
                  border: `1px solid ${T.goldBorder}`,
                  borderRadius: 100,
                  padding: '3px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                <Zap size={10} fill="#FFB800" color="#FFB800" /> {t('dashboard.liveAI')}
              </span>
            </div>

            {aiLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: T.textMid, fontSize: 14 }}>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    border: '2px solid rgba(0,0,0,0.1)',
                    borderTopColor: T.textDark,
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                {t('dashboard.aiLoading')}
              </div>
            )}

            {aiError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: '#DC2626',
                  padding: '10px 14px',
                  background: 'rgba(220,38,38,0.06)',
                  borderRadius: 10,
                }}
              >
                <AlertCircle size={14} /> {t('dashboard.aiFailed', { error: aiError })}
              </div>
            )}

            {!aiLoading && !aiError && matches.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {matches.slice(0, 3).map((m) => (
                  <div
                    key={m.retailer.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 8,
                      padding: '14px 16px',
                      borderRadius: 12,
                      border: `1px dashed ${T.borderDash}`,
                      background: T.bg,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: T.textDark }}>{m.retailer.storeName}</div>
                      <div style={{ fontSize: 13, color: T.textMid, marginTop: 2 }}>{m.explanation}</div>
                    </div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 18,
                        color: T.textDark,
                        background: T.goldSoft,
                        border: `1px solid ${T.goldBorder}`,
                        borderRadius: 100,
                        padding: '2px 12px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {m.matchScore}%
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!aiLoading && !aiError && matches.length === 0 && (
              <p style={{ fontSize: 14, color: T.textLight }}>{t('dashboard.noMatches')}</p>
            )}
          </div>

          {almostFull.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  flexWrap: 'wrap',
                  marginBottom: 16,
                }}
              >
                <h2 style={{ fontSize: 'clamp(17px, 2.5vw, 20px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {t('dashboard.fillingFast')}
                </h2>
                <span
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    color: '#DC2626',
                    borderRadius: 100,
                    padding: '3px 10px',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {t('dashboard.limitedSpots')}
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
                  gap: 16,
                }}
              >
                {almostFull.map((group) => (
                  <ProductGroupCard
                    key={group.id}
                    group={group}
                    isJoined={isUserInGroup(group.id)}
                    onJoin={() => handleJoinGroup(group.id)}
                    onLeave={() => handleLeaveGroup(group.id)}
                  />
                ))}
              </div>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              style={{
                display: 'inline-flex',
                gap: 4,
                background: T.bgWhite,
                border: `1px solid ${T.border}`,
                borderRadius: 100,
                padding: 4,
                marginBottom: 24,
              }}
            >
              <TabsTrigger
                value="all"
                style={{
                  borderRadius: 100,
                  padding: '8px 18px',
                  fontSize: 14,
                  fontWeight: 600,
                  background: activeTab === 'all' ? T.textDark : 'transparent',
                  color: activeTab === 'all' ? '#fff' : T.textMid,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: T.font,
                  transition: 'all 0.2s ease',
                }}
              >
                {t('dashboard.allGroups', { count: availableGroups.length })}
              </TabsTrigger>
              <TabsTrigger
                value="my-groups"
                style={{
                  borderRadius: 100,
                  padding: '8px 18px',
                  fontSize: 14,
                  fontWeight: 600,
                  background: activeTab === 'my-groups' ? T.textDark : 'transparent',
                  color: activeTab === 'my-groups' ? '#fff' : T.textMid,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: T.font,
                  transition: 'all 0.2s ease',
                }}
              >
                {t('dashboard.myGroups', { count: myGroups.length })}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {t('dashboard.activeGroupsTitle')}
                </h2>
                <p style={{ fontSize: 14, color: T.textMid, marginTop: 4 }}>
                  {t('dashboard.activeGroupsSub', { type: currentUser.storeType })}
                </p>
              </div>

              {availableGroups.length > 0 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                    gap: 16,
                  }}
                >
                  {availableGroups.map((group) => (
                    <ProductGroupCard
                      key={group.id}
                      group={group}
                      isJoined={isUserInGroup(group.id)}
                      onJoin={() => handleJoinGroup(group.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  emoji="🔍"
                  title={t('dashboard.noGroupsAvailable')}
                  sub={t('dashboard.noGroupsAvailable')}
                />
              )}
            </TabsContent>

            <TabsContent value="my-groups">
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {t('dashboard.myGroupsTitle')}
                </h2>
                <p style={{ fontSize: 14, color: T.textMid, marginTop: 4 }}>
                  {t('dashboard.myGroupsSub')}
                </p>
              </div>

              {myGroups.length > 0 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                    gap: 16,
                  }}
                >
                  {myGroups.map((group) => (
                    <ProductGroupCard
                      key={group.id}
                      group={group}
                      isJoined={true}
                      onJoin={() => {}}
                      onLeave={() => handleLeaveGroup(group.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  emoji="📦"
                  title={t('dashboard.noGroupsJoined')}
                  sub={t('dashboard.noGroupsJoinedSub')}
                  action={{ label: t('dashboard.browseGroups'), onClick: () => setActiveTab('all') }}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 480px) {
          .stat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: T.bgWhite,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        padding: '24px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: accent,
          borderRadius: '16px 16px 0 0',
        }}
      />

      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: `${accent}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accent,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: T.textLight,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: T.textDark }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: T.textMid }}>{sub}</div>
    </div>
  );
}

function EmptyState({
  emoji,
  title,
  sub,
  action,
}: {
  emoji: string;
  title: string;
  sub: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div
      style={{
        background: T.bgWhite,
        border: `1px dashed ${T.borderDash}`,
        borderRadius: 20,
        padding: 'clamp(32px, 5vw, 56px)',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>{emoji}</div>
      <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 14, color: T.textMid, maxWidth: 320, margin: '0 auto', lineHeight: 1.6 }}>{sub}</p>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            marginTop: 24,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 24px',
            borderRadius: 100,
            fontSize: 14,
            fontWeight: 700,
            background: T.textDark,
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontFamily: T.font,
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          }}
        >
          {action.label} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
