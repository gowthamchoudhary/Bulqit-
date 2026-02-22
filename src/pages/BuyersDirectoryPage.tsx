import { useState, type ReactNode } from 'react';
import { mockRetailers } from '@/data/mockRetailers';
import { Retailer, StoreType } from '@/types/retailer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search, Phone, Mail, Package, TrendingUp, MessageCircle, Users, Building, Calendar, X, Send } from 'lucide-react';
import { toast } from 'sonner';

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

const storeTypeStyle: Record<StoreType, { bg: string; color: string; border: string }> = {
  Medical: { bg: 'rgba(239,68,68,0.09)', color: '#DC2626', border: 'rgba(239,68,68,0.22)' },
  Kirana: { bg: 'rgba(34,197,94,0.09)', color: '#15803D', border: 'rgba(34,197,94,0.22)' },
  Restaurant: { bg: 'rgba(251,146,60,0.12)', color: '#C2410C', border: 'rgba(251,146,60,0.28)' },
  Stationery: { bg: 'rgba(100,116,240,0.10)', color: '#3D4FD6', border: 'rgba(100,116,240,0.25)' },
  Electronics: { bg: 'rgba(168,85,247,0.09)', color: '#7E22CE', border: 'rgba(168,85,247,0.22)' },
};

type DirectorySortBy = 'budget' | 'distance' | 'recent';

export function BuyersDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoreType, setSelectedStoreType] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [sortBy, setSortBy] = useState<DirectorySortBy>('budget');

  const allProducts = Array.from(new Set(mockRetailers.flatMap((r) => r.products))).sort();

  const filteredRetailers = mockRetailers.filter((retailer) => {
    const matchesSearch =
      retailer.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retailer.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedStoreType === 'all' || retailer.storeType === selectedStoreType;
    const matchesProduct = selectedProduct === 'all' || retailer.products.some((p) => p.toLowerCase() === selectedProduct.toLowerCase());
    return matchesSearch && matchesType && matchesProduct;
  });

  const sortedRetailers = [...filteredRetailers].sort((a, b) => {
    if (sortBy === 'budget') return b.monthlyBudget - a.monthlyBudget;
    if (sortBy === 'recent') return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    return 0;
  });

  return (
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
      <div
        style={{
          background: '#0D0D0D',
          padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -160,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,184,0,0.09) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100,
              padding: '5px 14px 5px 5px',
              marginBottom: 20,
            }}
          >
            <span
              style={{
                background: T.gold,
                color: '#000',
                borderRadius: 100,
                padding: '3px 10px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              {mockRetailers.length} Active Retailers
            </span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>All verified members</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              color: '#fff',
              marginBottom: 14,
              lineHeight: 1.08,
            }}
          >
            Buyers Directory
          </h1>
          <p
            style={{
              fontSize: 'clamp(14px, 2vw, 18px)',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 520,
              lineHeight: 1.65,
              marginBottom: 32,
            }}
          >
            Find nearby retailers to form buying groups with. Connect directly and start saving together.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: 10,
              maxWidth: 480,
            }}
          >
            {[
              { val: mockRetailers.length, label: 'Verified Retailers' },
              { val: allProducts.length, label: 'Products Available' },
              { val: 5, label: 'Store Categories' },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: 14,
                  padding: '16px 14px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', color: T.gold, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(16px, 3vw, 32px)' }}>
        <div
          style={{
            background: T.bgWhite,
            border: `1px solid ${T.border}`,
            borderRadius: 18,
            padding: 'clamp(16px, 2.5vw, 24px)',
            marginBottom: 16,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr) minmax(0,1fr)',
              gap: 12,
            }}
          >
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                color={T.textLight}
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
              <input
                placeholder="Search by store name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  fontFamily: T.font,
                  fontSize: 14,
                  padding: '10px 14px 10px 40px',
                  borderRadius: 10,
                  border: `1px solid ${T.border}`,
                  background: T.bg,
                  color: T.textDark,
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#111';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.06)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <BulqitSelect value={selectedStoreType} onChange={setSelectedStoreType}>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {(['Medical', 'Kirana', 'Restaurant', 'Stationery', 'Electronics'] as StoreType[]).map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </BulqitSelect>

            <BulqitSelect value={selectedProduct} onChange={setSelectedProduct}>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {allProducts.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </BulqitSelect>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              marginTop: 16,
              paddingTop: 16,
              borderTop: `1px dashed ${T.borderDash}`,
            }}
          >
            <span style={{ fontSize: 13, color: T.textMid }}>
              Found <strong style={{ color: T.textDark }}>{sortedRetailers.length}</strong> retailers
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: T.textLight }}>Sort by:</span>
              <BulqitSelect value={sortBy} onChange={(v) => setSortBy(v as DirectorySortBy)}>
                <SelectContent>
                  <SelectItem value="budget">Highest Budget</SelectItem>
                  <SelectItem value="recent">Recently Joined</SelectItem>
                </SelectContent>
              </BulqitSelect>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            background: T.goldSoft,
            border: `1px solid ${T.goldBorder}`,
            borderRadius: 14,
            padding: '14px 18px',
            marginBottom: 24,
          }}
        >
          <MessageCircle size={16} color="#7A5800" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 13 }}>
            <div style={{ fontWeight: 700, color: T.textDark, marginBottom: 3 }}>How to Form a Group</div>
            <div style={{ color: T.textMid, lineHeight: 1.6 }}>
              Found someone selling similar products? Click <strong>Contact</strong> to send a group invitation. Once both agree,
              start ordering together and unlock bulk discounts.
            </div>
          </div>
        </div>

        {sortedRetailers.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: 16,
            }}
          >
            {sortedRetailers.map((retailer) => (
              <RetailerCard key={retailer.id} retailer={retailer} />
            ))}
          </div>
        ) : (
          <div
            style={{
              background: T.bgWhite,
              border: `1px dashed ${T.borderDash}`,
              borderRadius: 20,
              padding: 'clamp(40px, 6vw, 64px)',
              textAlign: 'center',
            }}
          >
            <Users size={48} color={T.textLight} style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>No retailers found</h3>
            <p style={{ fontSize: 14, color: T.textMid }}>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

function RetailerCard({ retailer }: { retailer: Retailer }) {
  const [showContact, setShowContact] = useState(false);
  const [hovered, setHovered] = useState(false);

  const ts = storeTypeStyle[retailer.storeType];
  const joinedDate = new Date(retailer.joinedDate);
  const isRecent = Date.now() - joinedDate.getTime() < 7 * 24 * 60 * 60 * 1000;

  const handleContact = () => {
    toast.success('Contact request sent!', {
      description: `${retailer.storeName} will receive your group invitation.`,
    });
    setShowContact(false);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: T.font,
        background: T.bgWhite,
        borderRadius: 18,
        border: `1px solid ${hovered ? 'rgba(0,0,0,0.14)' : T.border}`,
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 2px 10px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.18s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Building size={15} color={T.textLight} />
            <h3 style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', color: T.textDark, lineHeight: 1.2 }}>
              {retailer.storeName}
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 100,
                background: ts.bg,
                color: ts.color,
                border: `1px solid ${ts.border}`,
              }}
            >
              {retailer.storeType}
            </span>
            {isRecent && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 100,
                  background: T.goldSoft,
                  color: '#7A5800',
                  border: `1px solid ${T.goldBorder}`,
                }}
              >
                ✦ New
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 7,
          fontSize: 13,
          color: T.textMid,
          lineHeight: 1.55,
          marginBottom: 16,
          paddingBottom: 16,
          borderBottom: `1px dashed ${T.borderDash}`,
        }}
      >
        <MapPin size={13} color={T.textLight} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>{retailer.location.address}</span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 700,
            color: T.textLight,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          <Package size={12} color={T.textLight} />
          Products ({retailer.products.length})
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {retailer.products.slice(0, 4).map((product, idx) => (
            <span
              key={idx}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 100,
                background: T.bg,
                border: `1px solid ${T.borderDash}`,
                color: T.textMid,
              }}
            >
              {product}
            </span>
          ))}
          {retailer.products.length > 4 && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 100,
                background: T.goldSoft,
                border: `1px solid ${T.goldBorder}`,
                color: '#7A5800',
              }}
            >
              +{retailer.products.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginBottom: 16,
          paddingBottom: 16,
          borderBottom: `1px dashed ${T.borderDash}`,
        }}
      >
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
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              color: T.textLight,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 5,
            }}
          >
            <TrendingUp size={11} /> Monthly Budget
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em', color: T.textDark }}>
            ₹{(retailer.monthlyBudget / 1000).toFixed(0)}K
          </div>
        </div>
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
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              color: T.textLight,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 5,
            }}
          >
            <Calendar size={11} /> Member Since
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: T.textDark }}>
            {joinedDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
          </div>
        </div>
      </div>

      {!showContact ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button
            onClick={() => setShowContact(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '11px 14px',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              background: 'transparent',
              color: T.textMid,
              border: `1px solid ${T.borderDash}`,
              cursor: 'pointer',
              fontFamily: T.font,
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.bg;
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = T.borderDash;
            }}
          >
            <MessageCircle size={14} /> Contact
          </button>
          <button
            onClick={() => window.open(`tel:${retailer.phone}`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '11px 14px',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 700,
              background: T.textDark,
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontFamily: T.font,
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2a2a2a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = T.textDark;
            }}
          >
            <Phone size={14} /> Call
          </button>
        </div>
      ) : (
        <div
          style={{
            background: T.bg,
            border: `1px dashed ${T.borderDash}`,
            borderRadius: 14,
            padding: 16,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: T.textDark }}>Contact Information</span>
            <button
              onClick={() => setShowContact(false)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: T.textLight,
                padding: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={15} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.textMid }}>
              <Phone size={13} color={T.textLight} />
              <span style={{ fontWeight: 600, color: T.textDark }}>{retailer.phone}</span>
            </div>
            {retailer.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.textMid }}>
                <Mail size={13} color={T.textLight} />
                <span>{retailer.email}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button
              onClick={() => setShowContact(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                background: 'transparent',
                color: T.textMid,
                border: `1px solid ${T.borderDash}`,
                cursor: 'pointer',
                fontFamily: T.font,
              }}
            >
              Close
            </button>
            <button
              onClick={handleContact}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '10px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                background: T.gold,
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                fontFamily: T.font,
                boxShadow: '0 2px 12px rgba(255,184,0,0.35)',
              }}
            >
              <Send size={13} /> Send Invite
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

function BulqitSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        style={{
          fontFamily: T.font,
          fontSize: 14,
          padding: '10px 14px',
          borderRadius: 10,
          border: `1px solid ${T.border}`,
          background: T.bg,
          color: T.textDark,
          width: '100%',
        }}
      >
        <SelectValue />
      </SelectTrigger>
      {children}
    </Select>
  );
}
