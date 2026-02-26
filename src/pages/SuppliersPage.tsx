import { useState, type ReactNode } from 'react';
import { getSuppliersByCategory, mockSuppliers } from '@/data/mockSuppliers';
import { Supplier } from '@/types/supplier';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Package, CheckCircle, Search, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/lib/formatters';
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

const typeStyle: Record<string, { bg: string; color: string; border: string }> = {
  wholesaler: { bg: 'rgba(100,116,240,0.1)', color: '#3D4FD6', border: 'rgba(100,116,240,0.25)' },
  distributor: { bg: 'rgba(180,140,40,0.12)', color: '#7A5800', border: 'rgba(255,184,0,0.35)' },
  manufacturer: { bg: 'rgba(34,197,94,0.09)', color: '#15803D', border: 'rgba(34,197,94,0.22)' },
};

type SupplierSortBy = 'rating' | 'orders';

export function SuppliersPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState<SupplierSortBy>('rating');

  const filteredSuppliers = mockSuppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.products.some((p) => p.productName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || getSuppliersByCategory(selectedCategory).some((s) => s.id === supplier.id);
    const matchesType = selectedType === 'all' || supplier.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) =>
    sortBy === 'rating' ? b.rating - a.rating : b.metrics.totalOrders - a.metrics.totalOrders,
  );

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
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
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
              {t('common.verified')}
            </span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>GST Â· Licences Â· Quality checks</span>
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
            {t('suppliers.heroTitle')}
          </h1>
          <p
            style={{
              fontSize: 'clamp(14px, 2vw, 18px)',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 560,
              lineHeight: 1.65,
              marginBottom: 28,
            }}
          >
            {t('suppliers.heroSub')}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[t('suppliers.gstVerified'), t('suppliers.qualityCertified'), t('suppliers.securePayments')].map((label) => (
              <div
                key={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 100,
                  padding: '6px 14px',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                <CheckCircle size={13} color={T.gold} strokeWidth={2.5} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(16px, 3vw, 32px)' }}>
        <div style={{ marginBottom: 16 }}>
          <DemoModeBanner />
        </div>
        <div
          style={{
            background: T.bgWhite,
            border: `1px solid ${T.border}`,
            borderRadius: 18,
            padding: 'clamp(16px, 2.5vw, 24px)',
            marginBottom: 24,
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
            <div style={{ position: 'relative', gridColumn: 'span 1' }}>
              <Search
                size={16}
                color={T.textLight}
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
              <input
                placeholder={t('suppliers.searchPlaceholder')}
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

            <StyledSelect value={selectedCategory} onChange={setSelectedCategory} placeholder={t('suppliers.allCategories')}>
              <SelectContent>
                {['all', 'Medical', 'Kirana', 'Restaurant', 'Stationery', 'Electronics'].map((c) => (
                  <SelectItem key={c} value={c}>
                    {c === 'all' ? t('suppliers.allCategories') : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </StyledSelect>

            <StyledSelect value={selectedType} onChange={setSelectedType} placeholder={t('suppliers.allTypes')}>
              <SelectContent>
                {['all', 'wholesaler', 'distributor', 'manufacturer'].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? t('suppliers.allTypes') : type === 'wholesaler' ? t('suppliers.wholesaler') : type === 'distributor' ? t('suppliers.distributor') : t('suppliers.manufacturer')}
                  </SelectItem>
                ))}
              </SelectContent>
            </StyledSelect>
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
              {t('suppliers.foundSuppliers', { count: sortedSuppliers.length })}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: T.textLight }}>{t('common.sortBy')}</span>
              <StyledSelect value={sortBy} onChange={(v) => setSortBy(v as SupplierSortBy)} placeholder="Sort">
                <SelectContent>
                  <SelectItem value="rating">{t('suppliers.highestRated')}</SelectItem>
                  <SelectItem value="orders">{t('suppliers.mostOrders')}</SelectItem>
                </SelectContent>
              </StyledSelect>
            </div>
          </div>
        </div>

        {sortedSuppliers.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 440px), 1fr))',
              gap: 16,
            }}
          >
            {sortedSuppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
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
            <Package size={48} color={T.textLight} style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{t('suppliers.noSuppliers')}</h3>
            <p style={{ fontSize: 14, color: T.textMid }}>{t('suppliers.noSuppliersSub')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SupplierCard({ supplier }: { supplier: Supplier }) {
  const { t, i18n } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const [hovered, setHovered] = useState(false);

  const ts = typeStyle[supplier.type] ?? typeStyle.wholesaler;
  const maxDiscount = Math.max(...supplier.discountTiers.map((tier) => tier.discountPercent));

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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: T.textDark }}>{supplier.name}</h3>
            {supplier.verified && <CheckCircle size={16} color="#3D4FD6" strokeWidth={2.5} />}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 100,
                background: ts.bg,
                color: ts.color,
                border: `1px solid ${ts.border}`,
                textTransform: 'capitalize',
              }}
            >
              {supplier.type}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: T.textMid }}>
              <Star size={13} fill={T.gold} color={T.gold} />
              <strong style={{ color: T.textDark }}>{supplier.rating}</strong>
              <span style={{ color: T.textLight }}>({supplier.metrics.totalOrders} orders)</span>
            </span>
          </div>
        </div>

        <div
          style={{
            background: T.textDark,
            borderRadius: 12,
            padding: '8px 12px',
            minWidth: 60,
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 2, letterSpacing: '0.05em' }}>
            {t('suppliers.upTo')}
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: T.gold, lineHeight: 1 }}>{maxDiscount}%</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginTop: 2, letterSpacing: '0.05em' }}>
            OFF
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
          marginBottom: 16,
          paddingBottom: 16,
          borderBottom: `1px dashed ${T.borderDash}`,
        }}
      >
        {[
          { val: `${supplier.metrics.fulfillmentRate}%`, label: t('suppliers.fulfilled'), accent: '#15803D' },
          { val: `${supplier.metrics.avgDeliveryTime}h`, label: t('suppliers.avgDelivery'), accent: '#3D4FD6' },
          { val: `${supplier.metrics.qualityScore}`, label: t('suppliers.quality'), accent: '#7A5800' },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              textAlign: 'center',
              background: T.bg,
              borderRadius: 12,
              padding: '12px 8px',
              border: `1px solid ${T.borderDash}`,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em', color: m.accent, lineHeight: 1 }}>
              {m.val}
            </div>
            <div style={{ fontSize: 11, color: T.textLight, marginTop: 4, fontWeight: 500 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: T.textLight,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          {t('suppliers.productsAvailable')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {supplier.products.slice(0, 5).map((p) => (
            <span
              key={p.productName}
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
              {p.productName}
            </span>
          ))}
          {supplier.products.length > 5 && (
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
              +{supplier.products.length - 5} more
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginBottom: 16,
          paddingBottom: 16,
          borderBottom: `1px dashed ${T.borderDash}`,
          fontSize: 13,
          color: T.textMid,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <MapPin size={13} color={T.textLight} />
          <span>{t('suppliers.deliveryRadius', { km: supplier.deliveryRadius })}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <ShoppingCart size={13} color={T.textLight} />
          <span>{t('suppliers.minOrder', { amount: formatCurrency(supplier.minOrderValue, i18n.language).replace('₹', '').trim() })}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '11px 16px',
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
          {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showDetails ? t('suppliers.hideDetails') : t('suppliers.viewDetails')}
        </button>

        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '11px 16px',
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
          {t('suppliers.contactSupplier')}
        </button>
      </div>

      {showDetails && (
        <div
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: `1px dashed ${T.borderDash}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.textLight,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              {t('suppliers.fullAddress')}
            </div>
            <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.6 }}>{supplier.location.address}</div>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.textLight,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              {t('suppliers.discountTiers')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {supplier.discountTiers.map((tier) => (
                <div
                  key={`${tier.minQuantity}-${tier.maxQuantity}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: T.bg,
                    border: `1px dashed ${T.borderDash}`,
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: T.textMid }}>
                    {tier.minQuantity} â€“ {tier.maxQuantity === Infinity ? 'âˆž' : tier.maxQuantity} units
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 100,
                      background: T.goldSoft,
                      color: '#7A5800',
                      border: `1px solid ${T.goldBorder}`,
                    }}
                  >
                    {tier.discountPercent}% {t('common.off')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.textLight,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              {t('suppliers.productCatalog')}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
                gap: 8,
              }}
            >
              {supplier.products.map((product) => (
                <div
                  key={`${product.productName}-${product.unit}`}
                  style={{
                    background: T.bg,
                    border: `1px dashed ${T.borderDash}`,
                    borderRadius: 10,
                    padding: '10px 12px',
                    opacity: product.available ? 1 : 0.5,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.textDark, marginBottom: 3 }}>{product.productName}</div>
                  <div style={{ fontSize: 11, color: T.textLight }}>
                    {formatCurrency(product.basePrice, i18n.language)}/{product.unit} ? MOQ: {product.moq}
                  </div>
                  {!product.available && (
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: 5,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 100,
                        background: 'rgba(239,68,68,0.08)',
                        color: '#DC2626',
                        border: '1px solid rgba(239,68,68,0.2)',
                      }}
                    >
                      {t('suppliers.outOfStock')}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StyledSelect({
  value,
  onChange,
  placeholder,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
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
          color: value === 'all' || !value ? T.textLight : T.textDark,
          width: '100%',
        }}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {children}
    </Select>
  );
}

