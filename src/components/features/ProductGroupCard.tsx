import { useState } from 'react';
import { ProductGroup } from '@/types/productGroup';
import { getGroupUrgencyBadge, formatNextOrderDate } from '@/lib/productGroupActions';
import { Star, Clock, Users, TrendingDown, CheckCircle, LogOut } from 'lucide-react';

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

const urgencyMap: Record<string, { bg: string; color: string; border: string; dot: string }> = {
  red: { bg: 'rgba(239,68,68,0.08)', color: '#DC2626', border: 'rgba(239,68,68,0.22)', dot: '#DC2626' },
  yellow: { bg: 'rgba(255,184,0,0.12)', color: '#7A5800', border: 'rgba(255,184,0,0.35)', dot: '#FFB800' },
  green: { bg: 'rgba(34,197,94,0.09)', color: '#15803D', border: 'rgba(34,197,94,0.22)', dot: '#22C55E' },
  blue: { bg: 'rgba(100,116,240,0.09)', color: '#3D4FD6', border: 'rgba(100,116,240,0.22)', dot: '#6474F0' },
};

interface ProductGroupCardProps {
  group: ProductGroup;
  isJoined: boolean;
  onJoin: () => void;
  onLeave?: () => void;
}

export function ProductGroupCard({ group, isJoined, onJoin, onLeave }: ProductGroupCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const urgencyBadge = getGroupUrgencyBadge(group);
  const progress = Math.min((group.currentMembers / group.targetMembers) * 100, 100);
  const nextOrderLabel = formatNextOrderDate(group.nextOrderDate);
  const uc = urgencyBadge ? urgencyMap[urgencyBadge.color] ?? urgencyMap.green : null;

  const handleJoin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      onJoin();
    } finally {
      setIsLoading(false);
    }
  };

  const cardShadow = isJoined
    ? `0 0 0 1.5px ${T.gold}, 0 8px 32px rgba(255,184,0,0.10), 0 2px 8px rgba(0,0,0,0.05)`
    : hovered
      ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
      : '0 2px 10px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: T.font,
        background: T.bgWhite,
        borderRadius: 18,
        border: isJoined ? `1.5px solid ${T.gold}` : `1px solid ${T.border}`,
        boxShadow: cardShadow,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.18s ease',
      }}
    >
      {isJoined && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${T.gold}, #FFD700)`,
            borderRadius: '18px 18px 0 0',
          }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: T.textDark,
              marginBottom: 6,
              lineHeight: 1.2,
            }}
          >
            {group.productName}
          </h3>
          <span
            style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 100,
              background: T.bg,
              border: `1px solid ${T.borderDash}`,
              color: T.textMid,
            }}
          >
            {group.category}
          </span>
        </div>

        <div
          style={{
            background: T.textDark,
            borderRadius: 12,
            padding: '8px 12px',
            minWidth: 54,
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 900, color: T.gold, lineHeight: 1 }}>{group.discountPercent}%</div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.4)',
              marginTop: 2,
              letterSpacing: '0.06em',
            }}
          >
            OFF
          </div>
        </div>
      </div>

      {urgencyBadge && uc && (
        <div style={{ marginBottom: 14 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 100,
              background: uc.bg,
              color: uc.color,
              border: `1px solid ${uc.border}`,
            }}
          >
            <span
              style={{ width: 6, height: 6, borderRadius: '50%', background: uc.dot, display: 'inline-block' }}
            />
            {urgencyBadge.text}
          </span>
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: T.textDark }}>
            <Users size={13} color={T.textMid} />
            {group.currentMembers} / {group.targetMembers} members
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: T.textLight,
              background: T.bg,
              padding: '2px 8px',
              borderRadius: 100,
              border: `1px solid ${T.borderDash}`,
            }}
          >
            {group.spotsLeft} left
          </span>
        </div>

        <div
          style={{
            height: 6,
            background: T.bg,
            borderRadius: 100,
            border: `1px solid ${T.borderDash}`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: 100,
              width: `${progress}%`,
              background:
                progress >= 90
                  ? 'linear-gradient(90deg, #DC2626, #F87171)'
                  : progress >= 70
                    ? `linear-gradient(90deg, ${T.gold}, #FFD700)`
                    : 'linear-gradient(90deg, #111, #444)',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <div
          style={{
            background: T.bg,
            border: `1px dashed ${T.borderDash}`,
            borderRadius: 12,
            padding: '12px 14px',
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: T.textLight,
              fontWeight: 600,
              marginBottom: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Regular
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: T.textLight, textDecoration: 'line-through' }}>
            ₹{group.regularPrice}
          </div>
        </div>
        <div style={{ background: T.textDark, borderRadius: 12, padding: '12px 14px' }}>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 600,
              marginBottom: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Group Price
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, color: T.gold }}>₹{group.groupPrice}</div>
        </div>
      </div>

      <div
        style={{
          background: T.goldSoft,
          border: `1px solid ${T.goldBorder}`,
          borderRadius: 12,
          padding: '14px 16px',
          marginBottom: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#7A5800',
              marginBottom: 3,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            You Save
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: T.textDark,
              lineHeight: 1,
            }}
          >
            ₹{group.savingsPerOrder.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: '#7A5800', marginTop: 3 }}>per order</div>
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'rgba(255,184,0,0.2)',
            border: `1px solid ${T.goldBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TrendingDown size={18} color="#7A5800" />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          paddingBottom: 16,
          marginBottom: 16,
          borderBottom: `1px dashed ${T.borderDash}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: T.textMid }}>
            <Clock size={13} color={T.textLight} />
            Next order: <strong style={{ color: T.textDark }}>{group.nextOrderDay}</strong>
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 100,
              background: T.bg,
              border: `1px solid ${T.borderDash}`,
              color: T.textMid,
            }}
          >
            {nextOrderLabel}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <Star size={13} fill={T.gold} color={T.gold} />
          <span style={{ fontWeight: 600, color: T.textDark }}>{group.supplierName}</span>
          <span style={{ color: T.textLight }}>({group.supplierRating}★)</span>
        </div>

        <div style={{ fontSize: 12, color: T.textLight }}>
          Min order: {group.minQuantity} {group.unit} · {group.orderFrequency}
        </div>
      </div>

      {isJoined ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '12px',
              borderRadius: 100,
              background: T.goldSoft,
              border: `1px solid ${T.goldBorder}`,
              fontSize: 14,
              fontWeight: 700,
              color: '#7A5800',
            }}
          >
            <CheckCircle size={15} color={T.gold} strokeWidth={2.5} /> Joined
          </div>

          {onLeave && (
            <button
              onClick={onLeave}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 7,
                width: '100%',
                padding: '11px',
                borderRadius: 100,
                background: 'transparent',
                color: T.textLight,
                border: `1px solid ${T.borderDash}`,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: T.font,
                transition: 'color 0.15s, border-color 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#DC2626';
                e.currentTarget.style.borderColor = 'rgba(220,38,38,0.28)';
                e.currentTarget.style.background = 'rgba(220,38,38,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = T.textLight;
                e.currentTarget.style.borderColor = T.borderDash;
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <LogOut size={13} /> Leave Group
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={handleJoin}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: 100,
            border: 'none',
            background: isLoading ? '#E8E7E4' : T.textDark,
            color: isLoading ? T.textLight : '#fff',
            fontSize: 14,
            fontWeight: 700,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontFamily: T.font,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: isLoading ? 'none' : '0 2px 14px rgba(0,0,0,0.18)',
            transition: 'background 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) e.currentTarget.style.background = '#2a2a2a';
          }}
          onMouseLeave={(e) => {
            if (!isLoading) e.currentTarget.style.background = T.textDark;
          }}
        >
          {isLoading ? (
            <>
              <span
                style={{
                  width: 13,
                  height: 13,
                  border: '2px solid rgba(0,0,0,0.15)',
                  borderTopColor: T.textMid,
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                  display: 'inline-block',
                }}
              />
              Joining...
            </>
          ) : (
            'Join Group ->'
          )}
        </button>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
