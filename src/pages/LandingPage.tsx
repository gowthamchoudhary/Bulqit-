import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  Users,
  IndianRupee,
  Star,
  Quote,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Menu,
  X,
  Search,
  ShoppingCart,
  TrendingDown,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { mockTestimonials } from "@/data/mockTestimonials";

/* ─────────────────────────────────────────────────────────────────────────
   ROLLING WORD CONFIG
───────────────────────────────────────────────────────────────────────── */
type RollingWord = {
  text: string;
  color: string;
  bg: string;
  border: string;
  glow: string;
};
const words: RollingWord[] = [
  {
    text: "Negotiator",
    color: "#B8480A",
    bg: "rgba(236,131,60,0.13)",
    border: "rgba(236,131,60,0.38)",
    glow: "rgba(236,131,60,0.30)",
  },
  {
    text: "Connector",
    color: "#0F6B54",
    bg: "rgba(56,178,153,0.13)",
    border: "rgba(56,178,153,0.38)",
    glow: "rgba(56,178,153,0.28)",
  },
  {
    text: "Powerhouse",
    color: "#2D3FCC",
    bg: "rgba(100,116,240,0.13)",
    border: "rgba(100,116,240,0.38)",
    glow: "rgba(100,116,240,0.28)",
  },
  {
    text: "Cost Cutter",
    color: "#9B1845",
    bg: "rgba(220,80,120,0.13)",
    border: "rgba(220,80,120,0.38)",
    glow: "rgba(220,80,120,0.26)",
  },
  {
    text: "Organiser",
    color: "#7A5A00",
    bg: "rgba(180,140,40,0.13)",
    border: "rgba(180,140,40,0.38)",
    glow: "rgba(180,140,40,0.26)",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   HOW IT WORKS — sub-components (defined here so no separate file needed)
───────────────────────────────────────────────────────────────────────── */
const hiwSectionTitle: React.CSSProperties = {
  fontSize: "clamp(28px, 3.2vw, 42px)",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  color: "#111",
  lineHeight: 1.1,
  marginBottom: 12,
};
const hiwSectionSub: React.CSSProperties = {
  fontSize: 17,
  color: "#555",
  lineHeight: 1.65,
  maxWidth: 500,
};
const hiwMockupBox: React.CSSProperties = {
  marginTop: 24,
  background: "#F0EFED",
  border: "1px dashed rgba(0,0,0,0.12)",
  borderRadius: 12,
  padding: 16,
};

function HIWSectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: light ? "rgba(255,255,255,0.3)" : "#999",
        marginBottom: 12,
      }}
    >
      <span
        style={{
          width: 20,
          height: 1,
          background: light ? "rgba(255,255,255,0.3)" : "#999",
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
}

function StepCard({
  num,
  icon,
  title,
  desc,
  children,
  border = false,
}: {
  num: string;
  icon: ReactNode;
  title: string;
  desc: string;
  children?: ReactNode;
  border?: boolean;
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "44px 36px",
        position: "relative",
        borderRight: border ? "1px dashed rgba(0,0,0,0.12)" : undefined,
        borderLeft: border ? "1px dashed rgba(0,0,0,0.12)" : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 28,
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "rgba(0,0,0,0.05)",
        }}
      >
        {num}
      </div>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: "#F0EFED",
          border: "1px solid rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          color: "#111",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginBottom: 10,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.65 }}>{desc}</p>
      {children}
    </div>
  );
}

function MockupRow({
  label,
  badge,
  badgeColor,
  value,
  strikethrough,
}: {
  label?: string;
  badge?: string;
  badgeColor?: "green" | "orange";
  value?: string;
  strikethrough?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 13,
        color: "#555",
        padding: "6px 0",
        borderBottom: "1px dashed rgba(0,0,0,0.1)",
      }}
    >
      <span>{label}</span>
      {badge && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 100,
            background:
              badgeColor === "orange"
                ? "rgba(251,146,60,0.15)"
                : "rgba(34,197,94,0.12)",
            color: badgeColor === "orange" ? "#C2410C" : "#15803D",
          }}
        >
          {badge}
        </span>
      )}
      {value && (
        <span
          style={
            strikethrough
              ? { textDecoration: "line-through", color: "#999" }
              : {}
          }
        >
          {value}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HOW IT WORKS — main section (rendered inside LandingPage below)
───────────────────────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const navigate = useNavigate();
  return (
    <div
      className="hiw-root"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: "#F0EFED",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        color: "#111111",
        overflowX: "hidden",
        width: "100%",
      }}
    >
      {/* HERO */}
      <section
        style={{
          textAlign: "center",
          padding: "96px 24px 80px",
          borderBottom: "1px dashed rgba(0,0,0,0.12)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 100,
            padding: "5px 14px 5px 5px",
            fontSize: 13,
            color: "#555",
            marginBottom: 28,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <span
            style={{
              background: "#FFB800",
              color: "#000",
              borderRadius: 100,
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            Simple
          </span>
          No coordination. No calls. Just savings.
        </div>
        <h1
          style={{
            fontSize: "clamp(40px, 5.5vw, 66px)",
            fontWeight: 900,
            letterSpacing: "-0.035em",
            lineHeight: 1.08,
            maxWidth: 680,
            margin: "0 auto 20px",
          }}
        >
          How Bulqit works
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#555",
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.65,
          }}
        >
          Join a buying group, sit back, and watch procurement costs drop by
          15–40%. The AI handles everything else.
        </p>
      </section>

      {/* WHO IS THIS FOR */}
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "88px 32px" }}
      >
        <HIWSectionLabel>Built for</HIWSectionLabel>
        <h2 style={hiwSectionTitle}>Every kind of small retailer</h2>
        <p style={hiwSectionSub}>
          Whether you sell groceries, medicines, or meals — Bulqit finds the
          right group for your products.
        </p>
        <div
          className="hiw-retailer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            background: "#fff",
            border: "1px dashed rgba(0,0,0,0.12)",
            borderRadius: 20,
            overflow: "hidden",
            marginTop: 48,
          }}
        >
          {[
            {
              emoji: "🛒",
              title: "Kirana Stores",
              save: "Avg. save ₹12,000/mo",
              desc: "Rice, dal, oil, spices, packaged goods — join bulk groups with nearby kirana owners and cut wholesale costs.",
            },
            {
              emoji: "🍞",
              title: "Bakeries",
              save: "Avg. save ₹12,000/mo",
              desc: "Pool orders for flour, sugar, butter and baking ingredients with other bakeries to unlock distributor-level pricing.",
            },
            {
              emoji: "🍽️",
              title: "Restaurants",
              save: "Avg. save ₹22,000/mo",
              desc: "Join groups for vegetables, cooking oil, packaging, and dry goods. Get supplier prices without minimums.",
            },
          ].map((r, i, arr) => (
            <div
              key={r.title}
              className="hiw-retailer-cell"
              style={{
                padding: "32px 28px",
                borderRight:
                  i < arr.length - 1 ? "1px dashed rgba(0,0,0,0.12)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 32 }}>{r.emoji}</span>
              <strong style={{ fontSize: 16, fontWeight: 700 }}>
                {r.title}
              </strong>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.65 }}>
                {r.desc}
              </p>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: 100,
                  marginTop: 4,
                  alignSelf: "flex-start",
                  background: "rgba(255,184,0,0.12)",
                  color: "#7A5800",
                }}
              >
                {r.save}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3 STEPS */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "88px 32px",
          borderTop: "1px dashed rgba(0,0,0,0.12)",
        }}
      >
        <HIWSectionLabel>The Process</HIWSectionLabel>
        <h2 style={hiwSectionTitle}>3 steps. That's all.</h2>
        <p style={hiwSectionSub}>
          No coordination. No supplier calls. No spreadsheets. Just savings
          every cycle.
        </p>
        <div
          className="hiw-steps-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 2,
            border: "1px dashed rgba(0,0,0,0.12)",
            borderRadius: 20,
            overflow: "hidden",
            marginTop: 52,
          }}
        >
          <StepCard
            num="01"
            icon={<Search size={20} strokeWidth={1.8} />}
            title="Browse active groups"
            desc="See live buying groups forming near you for exactly the products you stock. Filter by category, order size, or schedule."
          >
            <div style={hiwMockupBox}>
              <MockupRow
                label="📦 Basmati Rice Group"
                badge="47 / 50"
                badgeColor="green"
              />
              <MockupRow
                label="💊 Generic OTC Group"
                badge="32 / 40"
                badgeColor="orange"
              />
              <div style={{ fontSize: 12, color: "#999", marginTop: 8 }}>
                📍 Within 3 km of you
              </div>
            </div>
          </StepCard>
          <StepCard
            num="02"
            icon={<Users size={20} strokeWidth={1.8} />}
            title="Join with one tap"
            desc="Tap Join Group, enter your quantity, confirm. You're in. No forms, no calls, no coordination with other retailers."
            border
          >
            <button
              style={{
                marginTop: 20,
                width: "100%",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: 100,
                padding: "12px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <CheckCircle size={15} /> Join Group
            </button>
            <div
              style={{
                fontSize: 12,
                color: "#999",
                textAlign: "center",
                marginTop: 8,
              }}
            >
              ✓ Takes under 10 seconds
            </div>
          </StepCard>
          <StepCard
            num="03"
            icon={<TrendingDown size={20} strokeWidth={1.8} />}
            title="Save automatically"
            desc="Orders run on schedule. Goods delivered to your store. Savings show up every cycle — zero effort required."
          >
            <div style={hiwMockupBox}>
              <MockupRow label="Regular price" value="₹85/kg" strikethrough />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: 6,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700 }}>
                  Your group price
                </span>
                <span style={{ fontSize: 24, fontWeight: 900 }}>₹70/kg</span>
              </div>
              <div style={{ fontSize: 12, color: "#15803D", marginTop: 4 }}>
                ↓ You save ₹15/kg this cycle
              </div>
            </div>
          </StepCard>
        </div>
      </section>

      {/* AI DARK SECTION */}
      <section
        style={{
          background: "#0D0D0D",
          padding: "88px 32px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,184,0,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <Sparkles size={32} color="#FFB800" style={{ marginBottom: 12 }} />
            <HIWSectionLabel light>Under the hood</HIWSectionLabel>
            <h2 style={{ ...hiwSectionTitle, color: "#fff", marginTop: 8 }}>
              The AI working while you sleep
            </h2>
            <p
              style={{
                ...hiwSectionSub,
                color: "rgba(255,255,255,0.42)",
                margin: "0 auto",
              }}
            >
              You focus on your customers. Our AI handles the rest — 24/7,
              automatically.
            </p>
          </div>
          <div
            className="hiw-ai-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 2,
            }}
          >
            {[
              {
                icon: <Users size={20} />,
                color: "#FFB800",
                bg: "rgba(255,184,0,0.15)",
                title: "Smart Group Formation",
                desc: "AI scans purchase patterns across thousands of retailers and auto-forms optimal groups for maximum collective discount.",
              },
              {
                icon: <ShoppingCart size={20} />,
                color: "#38B295",
                bg: "rgba(56,178,149,0.12)",
                title: "Verified Supplier Matching",
                desc: "We source and vet the best supplier for each group on price, reliability, and quality — guaranteed.",
              },
              {
                icon: <Clock size={20} />,
                color: "#6474F0",
                bg: "rgba(100,116,240,0.12)",
                title: "Auto-Scheduling",
                desc: "Groups run on fixed cycles — weekly, bi-weekly, or monthly. Orders fire automatically. You just receive the goods.",
              },
              {
                icon: <TrendingDown size={20} />,
                color: "#F0648C",
                bg: "rgba(240,100,140,0.12)",
                title: "Real-Time Price Optimisation",
                desc: "As groups grow, discount tiers unlock automatically. More members always means better prices — zero renegotiation.",
              },
            ].map((c, i) => (
              <div
                key={c.title}
                className="hiw-ai-cell"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "36px 40px",
                  display: "flex",
                  gap: 22,
                  alignItems: "flex-start",
                  borderRadius: [
                    "16px 0 0 0",
                    "0 16px 0 0",
                    "0 0 0 16px",
                    "0 0 16px 0",
                  ][i],
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: c.bg,
                    border: `1px solid ${c.color}40`,
                    color: c.color,
                  }}
                >
                  {c.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 8,
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.42)",
                      lineHeight: 1.65,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section
        style={{
          background: "#fff",
          borderBottom: "1px dashed rgba(0,0,0,0.12)",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "88px 32px" }}>
          <HIWSectionLabel>A real example</HIWSectionLabel>
          <h2 style={hiwSectionTitle}>Your first order, step by step</h2>
          <p style={{ ...hiwSectionSub, marginBottom: 0 }}>
            A kirana store owner joins the Basmati Rice Group on Monday.
          </p>
          <div style={{ marginTop: 52, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 22,
                top: 0,
                bottom: 0,
                width: 1,
                borderLeft: "1px dashed rgba(0,0,0,0.12)",
              }}
            />
            {[
              {
                icon: <Users size={18} />,
                day: "Monday, 9:14 AM",
                title: "You join the group",
                desc: "One tap. 47 other retailers already in. 3 spots remain. You enter your order: 50 kg.",
              },
              {
                icon: <CheckCircle size={18} />,
                day: "Tuesday, 11:30 AM",
                title: "Group fills — best tier unlocked",
                desc: "All 50 slots filled. The 18% discount tier activates. AI confirms order with the supplier automatically.",
              },
              {
                icon: <ShoppingCart size={18} />,
                day: "Wednesday, 8:00 AM",
                title: "Supplier ships 2,500 kg total",
                desc: "Bulk order dispatched. Each retailer's share is pre-split. No coordination needed.",
              },
              {
                icon: <TrendingDown size={18} />,
                day: "Thursday, 2:30 PM",
                title: "Delivered to your store",
                desc: "50 kg Basmati delivered. You paid ₹70/kg instead of ₹85/kg. Savings auto-credited to your Bulqit wallet.",
                result:
                  "🎉 You saved ₹750 this cycle — with zero phone calls or negotiation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{ display: "flex", gap: 28, paddingBottom: 40 }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "rgba(255,184,0,0.1)",
                    border: "2px solid rgba(255,184,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 1,
                    color: "#996600",
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ paddingTop: 10, flex: 1 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#999",
                      marginBottom: 4,
                    }}
                  >
                    {item.day}
                  </div>
                  <h4
                    style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                  {item.result && (
                    <div
                      style={{
                        marginTop: 12,
                        padding: "14px 18px",
                        background: "rgba(255,184,0,0.08)",
                        border: "1px solid rgba(255,184,0,0.25)",
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#7A5800",
                      }}
                    >
                      {item.result}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "88px 32px" }}
      >
        <HIWSectionLabel>Why Bulqit</HIWSectionLabel>
        <h2 style={hiwSectionTitle}>Old way vs. the Bulqit way</h2>
        <p style={hiwSectionSub}>
          Group buying existed before. We just made it actually work.
        </p>
        <div
          className="hiw-compare-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginTop: 52,
          }}
        >
          <div
            style={{
              borderRadius: 20,
              padding: "40px 36px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 28 }}>
              ❌ Traditional group buying
            </h3>
            {[
              {
                title: "Hours of WhatsApp coordination",
                sub: "Chasing 20 retailers to confirm orders every week",
              },
              {
                title: "Hard to find trusted partners",
                sub: "Who do you ask? Are they reliable? Will they pay?",
              },
              {
                title: "Manual supplier negotiation",
                sub: "You negotiate yourself — no leverage, mediocre deals",
              },
              {
                title: "Falls apart after 1–2 cycles",
                sub: "Someone drops out, group collapses, back to square one",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "14px 0",
                  borderBottom: "1px dashed rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "rgba(239,68,68,0.1)",
                    color: "#DC2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    marginTop: 1,
                  }}
                >
                  ✗
                </div>
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 2,
                    }}
                  >
                    {item.title}
                  </strong>
                  <span style={{ fontSize: 13, color: "#999" }}>
                    {item.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              borderRadius: 20,
              padding: "40px 36px",
              background: "#000",
              boxShadow:
                "0 0 0 1.5px rgba(255,184,0,0.4), 0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                marginBottom: 28,
                color: "#FFB800",
              }}
            >
              ✦ The Bulqit way
            </h3>
            {[
              {
                title: "Join in 10 seconds",
                sub: "One tap. AI coordinates everything behind the scenes",
              },
              {
                title: "Pre-formed, verified groups",
                sub: "47 retailers already waiting — all vetted by Bulqit",
              },
              {
                title: "AI negotiates for you",
                sub: "Best prices from verified suppliers, guaranteed",
              },
              {
                title: "Runs forever, automatically",
                sub: "Weekly orders, consistent savings, no group drama",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "rgba(255,184,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  <CheckCircle size={13} color="#FFB800" strokeWidth={2.5} />
                </div>
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 2,
                      color: "#fff",
                    }}
                  >
                    {item.title}
                  </strong>
                  <span
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.38)" }}
                  >
                    {item.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#000",
          padding: "100px 32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,184,0,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Ready to start saving?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 420,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            Join 500+ retailers already cutting costs by 15–40% every month —
            without a single phone call.
          </p>
          <div
            className="hiw-cta-btns"
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/register")}
              style={{
                background: "#FFB800",
                color: "#000",
                border: "none",
                borderRadius: 100,
                padding: "16px 32px",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 24px rgba(255,184,0,0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Join as a Retailer <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 100,
                padding: "15px 30px",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
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

/* ═════════════════════════════════════════════════════════════════════════
   LANDING PAGE — main export
═════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isSiteReady, setIsSiteReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  /* ── Loader animation (unchanged) ── */
  useEffect(() => {
    const loader = document.getElementById("loader");
    const site = document.getElementById("site");
    const glowBg = document.getElementById("loader-glow-bg");
    const shockRing = document.getElementById("shock-ring");
    const logoImg = document.getElementById(
      "logo-reveal",
    ) as HTMLImageElement | null;
    const barEl = document.getElementById(
      "loader-bar",
    ) as HTMLDivElement | null;
    const cards = ["hc1", "hc2", "hc3", "hc4", "hc5"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLDivElement[];
    if (
      !loader ||
      !site ||
      !glowBg ||
      !shockRing ||
      !logoImg ||
      !barEl ||
      cards.length !== 5
    )
      return;

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
        const AudioCtx =
          window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        [
          [880, 0.28, 1.4],
          [1760, 0.12, 0.9],
          [2640, 0.06, 0.6],
        ].forEach(([freq, vol, dur]) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.connect(g);
          g.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(
            freq * 0.5,
            ctx.currentTime + dur * 0.4,
          );
          g.gain.setValueAtTime(0, ctx.currentTime);
          g.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.012);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + dur + 0.1);
        });
      } catch {}
    }
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOutBack = (t: number) => {
      const c1 = 1.70158,
        c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
    const easeOutElastic = (t: number) => {
      if (t === 0 || t === 1) return t;
      return (
        Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) +
        1
      );
    };
    function tween(dur: number, fn: (t: number) => void, done?: () => void) {
      const start = performance.now();
      function frame(now: number) {
        if (canceled) return;
        const t = Math.min((now - start) / dur, 1);
        fn(t);
        if (t < 1) {
          rafs.push(requestAnimationFrame(frame));
        } else if (done) done();
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
      for (let i = 0; i < 20; i++) {
        const sp = document.createElement("div");
        sp.className = "spark";
        loader.appendChild(sp);
        const angle = (i / 20) * Math.PI * 2,
          speed = 70 + Math.random() * 110,
          size = 2 + Math.random() * 5;
        sp.style.width = `${size}px`;
        sp.style.height = `${size}px`;
        const tx = Math.cos(angle) * speed,
          ty = Math.sin(angle) * speed;
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
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2,
        sx = Math.cos(angle) * scatter,
        sy = Math.sin(angle) * scatter,
        rot = i * 72;
      card.style.transform = `translate(calc(-50% + ${sx}px), calc(-50% + ${sy}px)) rotate(${rot}deg) scale(0.65)`;
      card.style.opacity = "0";
      return { card, sx, sy, angle, rot };
    });
    function phase5() {
      const logoText = document.getElementById("loader-logo"),
        tagEl = document.getElementById("loader-tagline");
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
        loader.classList.add("exit");
        schedule(() => {
          loader.style.display = "none";
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
              const e = easeOutElastic(t),
                glowPx = Math.round(t * 80);
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
        const img = card.querySelector("img") as HTMLImageElement | null;
        if (!img) return;
        img.style.filter = "brightness(0) invert(1) brightness(4)";
        schedule(() => {
          img.style.transition = "filter 0.35s ease";
          img.style.filter = "brightness(0) invert(1)";
        }, 60);
      });
      playJoinSound();
      spawnSparks();
      glowBg.classList.add("bloom");
      shockRing.style.opacity = "1";
      shockRing.style.transform = "translate(-50%, -50%) scale(0)";
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
              const cx = sx * (1 - e),
                cy = sy * (1 - e),
                cr = rot * (1 - e * 0.72),
                sc = 0.65 + 0.38 * e,
                spi = Math.sin(t * Math.PI) * 18,
                spx = cx + Math.sin(angle + Math.PI / 2) * spi,
                spy = cy + Math.cos(angle + Math.PI / 2) * spi;
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
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
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
      {/* Loader */}
      <div id="loader">
        <div id="loader-glow-bg" />
        <div id="shock-ring" />
        <div id="hand-canvas">
          {["hc1", "hc2", "hc3", "hc4", "hc5"].map((id) => (
            <div className="hand-card" id={id} key={id}>
              <img src="/placeholder.svg" alt="" draggable="false" />
            </div>
          ))}
          <img
            id="logo-reveal"
            src="/placeholder.svg"
            alt="Bulqit"
            draggable="false"
          />
        </div>
        <div id="loader-logo">Bulqit</div>
        <div id="loader-tagline">Collective Power. Smarter Buying.</div>
        <div id="loader-bar-track">
          <div id="loader-bar" />
        </div>
      </div>

      <div id="site" className={isSiteReady ? "show" : ""}>
        {isSiteReady && (
          <>
            {/* ── NAV ── */}
            <nav className="bulqit-nav" style={{ position: "relative" }}>
              <div className="bulqit-nav-logo">Bulqit</div>

              {/* Desktop links */}
              <ul className="bulqit-nav-links hidden lg:flex">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHowItWorks();
                    }}
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#">For Retailers</a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/supplier/register");
                    }}
                  >
                    Suppliers
                  </a>
                </li>
              </ul>
              <button
                className="bulqit-nav-cta hidden lg:block"
                onClick={() => navigate("/pricing")}
              >
                Plans and Pricing
              </button>

              {/* Mobile hamburger — inline styles guarantee it's always visible */}
              <button
                className="lp-hamburger lg:hidden"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#111",
                  flexShrink: 0,
                  zIndex: 201,
                }}
              >
                {mobileMenuOpen ? (
                  <X size={26} color="#111" strokeWidth={2.5} />
                ) : (
                  <Menu size={26} color="#111" strokeWidth={2.5} />
                )}
              </button>

              {/* Mobile dropdown */}
              {mobileMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "#fff",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    zIndex: 200,
                    padding: "8px 20px 20px",
                  }}
                >
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 12px 0",
                    }}
                  >
                    {[
                      { label: "How it Works", fn: scrollToHowItWorks },
                      {
                        label: "For Retailers",
                        fn: () => setMobileMenuOpen(false),
                      },
                      {
                        label: "Suppliers",
                        fn: () => {
                          navigate("/supplier/register");
                          setMobileMenuOpen(false);
                        },
                      },
                      {
                        label: "Pricing",
                        fn: () => {
                          navigate("/pricing");
                          setMobileMenuOpen(false);
                        },
                      },
                    ].map((item) => (
                      <li key={item.label}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            item.fn();
                          }}
                          style={{
                            display: "block",
                            padding: "13px 0",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#111",
                            borderBottom: "1px solid rgba(0,0,0,0.07)",
                            textDecoration: "none",
                          }}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="bulqit-nav-cta"
                    style={{ width: "100%" }}
                    onClick={() => {
                      navigate("/pricing");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Plans and Pricing
                  </button>
                </div>
              )}
            </nav>

            {/* ── HERO ── */}
            <section className="bulqit-hero">
              <div
                className="bulqit-banner bulqit-fade-up bulqit-delay-1"
                onClick={() => navigate("/dashboard")}
                style={{ cursor: "pointer" }}
              >
                <div className="bulqit-banner-badge">
                  <span>🔥</span> New
                </div>
                <span>Bangalore — </span>
                <span className="bulqit-banner-link">
                  500+ kirana stores joined
                </span>
                <span className="bulqit-banner-arrow">›</span>
              </div>

              <h1 className="bulqit-headline bulqit-fade-up bulqit-delay-2">
                A buying group
              </h1>
              <div className="bulqit-headline bulqit-headline-line2 bulqit-fade-up bulqit-delay-2">
                <span className="bulqit-headline-static">acting like a</span>
                <div className="bulqit-rolling-wrapper">
                  <span
                    className={`bulqit-rolling-pill-word ${isExiting ? "bulqit-word-exit" : "bulqit-word-enter"}`}
                    style={
                      {
                        ["--pill-tint-bg" as keyof CSSProperties]:
                          activeWord.bg,
                        ["--pill-tint-border" as keyof CSSProperties]:
                          activeWord.border,
                        ["--pill-tint-glow" as keyof CSSProperties]:
                          activeWord.glow,
                        color: activeWord.color,
                        textShadow: `0 1px 0 rgba(255,255,255,0.45), 0 2px 16px ${activeWord.glow}`,
                      } as CSSProperties
                    }
                  >
                    {activeWord.text}
                  </span>
                </div>
              </div>

              <p className="bulqit-subheadline bulqit-fade-up bulqit-delay-3">
                Not your average procurement tool. <strong>Bulqit</strong> is an
                AI-powered buying group that connects kirana stores, Bakeries
                &amp; restaurants — slashing costs by <strong>15–40%</strong>{" "}
                through collective bargaining.
              </p>

              <div className="bulqit-cta-group bulqit-fade-up bulqit-delay-4">
                <button
                  className="bulqit-btn-primary"
                  onClick={() => navigate("/register")}
                >
                  <ArrowRight size={18} /> Join as a Retailer
                </button>
                <button
                  className="bulqit-btn-secondary"
                  onClick={scrollToHowItWorks}
                >
                  <div className="bulqit-btn-secondary-avatar">₹</div> See How
                  It Works
                </button>
              </div>

              <div className="bulqit-features-strip bulqit-fade-up bulqit-delay-5">
                <div className="bulqit-feature-item">
                  <div className="bulqit-feature-icon">
                    <Users size={18} />
                  </div>
                  <span>AI-Matched Buying Groups</span>
                </div>
                <div className="bulqit-feature-item">
                  <div className="bulqit-feature-icon">
                    <IndianRupee size={18} />
                  </div>
                  <span>Save ₹15,000+ Per Month</span>
                </div>
                <div className="bulqit-feature-item">
                  <div className="bulqit-feature-icon">
                    <Mail size={18} />
                  </div>
                  <span>Instant AI Negotiation Emails</span>
                </div>
              </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section id="how-it-works-section">
              <HowItWorksSection />
            </section>

            {/* ── RESULTS / STATS ── */}
            <section className="py-16 bg-gradient-to-b from-white via-slate-50 to-indigo-50 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                  <Badge className="mb-2 bg-emerald-500/90 text-white">
                    Real Results from Demo Users
                  </Badge>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mt-3">
                    Bulqit is already negotiating better deals for retailers
                    like you
                  </h2>
                  <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto mt-3">
                    Live numbers from our demo cohorts — total savings, active
                    users, AI negotiation success rate and more.
                  </p>
                </div>

                <div
                  className="lp-results-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0,2fr) minmax(0,1.25fr)",
                    gap: 24,
                    marginBottom: 32,
                  }}
                >
                  <div
                    className="lp-stat-cards"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 16,
                    }}
                  >
                    {[
                      {
                        label: "Total Savings",
                        val: "₹2.4Cr",
                        sub: "Across all demo buying groups",
                        cls: "from-emerald-500 to-emerald-600",
                      },
                      {
                        label: "Active Retailers",
                        val: "500+",
                        sub: "Kirana, medical & restaurant stores",
                        cls: "from-sky-500 to-sky-600",
                      },
                      {
                        label: "AI Deal Success",
                        val: "87%",
                        sub: "AI-negotiated emails that improved pricing",
                        cls: "from-violet-500 to-indigo-600",
                      },
                    ].map((c) => (
                      <Card
                        key={c.label}
                        className={`lp-stat-card p-4 bg-gradient-to-br ${c.cls} text-white border-none shadow-lg`}
                      >
                        <div className="text-[10px] uppercase tracking-wide opacity-90 mb-1">
                          {c.label}
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold">
                          {c.val}
                        </div>
                        <div className="text-[10px] mt-2 opacity-90">
                          {c.sub}
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Card className="relative overflow-hidden border border-indigo-100/80 bg-white/70 backdrop-blur-sm shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-sky-500/5 to-emerald-500/5 pointer-events-none" />
                    <div className="relative p-5 space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 border border-indigo-100">
                        <Sparkles className="w-3 h-3" />
                        AI Negotiator
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-indigo-600" />
                        See how AI writes your supplier emails
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Bulqit's AI Negotiation Center turns your order details
                        into a polished, B2B-ready email — usually in under{" "}
                        <span className="font-semibold text-slate-900">
                          3 seconds
                        </span>
                        .
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-slate-900 text-slate-50 px-3 py-3">
                          <div className="opacity-80 mb-1 text-[10px]">
                            Avg. Rating
                          </div>
                          <div className="text-lg font-semibold">
                            4.8<span className="text-amber-300">★</span>
                          </div>
                          <div className="mt-1 text-[10px] opacity-80">
                            From demo user feedback
                          </div>
                        </div>
                        <div className="rounded-xl bg-slate-100 px-3 py-3">
                          <div className="text-slate-500 mb-1 text-[10px]">
                            Negotiation Speed
                          </div>
                          <div className="text-lg font-semibold text-slate-900">
                            2.8s
                          </div>
                          <div className="mt-1 text-[10px] text-slate-500">
                            Avg. email generation time
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate("/register")}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-slate-50 px-4 py-2 text-xs font-medium w-full justify-center hover:bg-black transition-colors"
                      >
                        Try the AI Negotiator <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </Card>
                </div>

                {/* Testimonials */}
                <div
                  className="lp-testimonials"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 24,
                  }}
                >
                  {mockTestimonials.map((t) => (
                    <Card
                      key={t.id}
                      className="p-5 border border-slate-200/80 bg-white/80 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-xl shadow-sm flex-shrink-0">
                          {t.photo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 text-sm">
                              {t.name}
                            </h3>
                            {t.verified && (
                              <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {t.storeName}
                          </div>
                          <Badge
                            variant="outline"
                            className="text-[10px] px-2 py-0.5 border-slate-200 text-slate-700 mt-1"
                          >
                            {t.storeType}
                          </Badge>
                        </div>
                      </div>
                      <div className="relative mb-4">
                        <Quote className="w-6 h-6 text-slate-200 absolute -top-2 -left-2" />
                        <p className="text-xs text-slate-700 italic pl-4 leading-relaxed">
                          "{t.quote}"
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div>
                          <div className="text-[10px] text-slate-500">
                            Monthly Savings
                          </div>
                          <div className="text-base font-semibold text-emerald-600">
                            ₹{t.savings.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-3 flex items-center gap-1">
                        <span>📍</span>
                        <span className="truncate">{t.location}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ALL MOBILE-ONLY STYLES — ≤ 768px
          STRICT RULE: zero effect on desktop (> 768px)
      ═══════════════════════════════════════════════════════════════════ */}
      <style>{`
        @media (max-width: 768px) {

          /* 1. Stop all horizontal scroll / white space */
          html, body { overflow-x: hidden !important; width: 100% !important; }
          .bulqit-page, #site { overflow-x: hidden !important; width: 100% !important; max-width: 100vw !important; }

          /* 2. Nav — hamburger always visible, padding tight */
          .bulqit-nav {
            padding: 0 16px !important;
            height: 56px !important;
          }
          .bulqit-nav-links { display: none !important; }
          .lp-hamburger {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            flex-shrink: 0 !important;
          }

          /* 3. Hero — stop left clip, constrain width */
          .bulqit-hero {
            padding: 80px 20px 48px !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .bulqit-hero::before, .bulqit-hero::after { display: none !important; }
          .bulqit-headline {
            font-size: clamp(26px, 8.5vw, 38px) !important;
            word-break: break-word !important;
          }
          .bulqit-subheadline {
            font-size: 14px !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
          .bulqit-rolling-wrapper { max-width: 92vw !important; overflow: visible !important; display: flex !important; justify-content: center !important; width: 100% !important; }
          .bulqit-rolling-pill-word {
            font-size: clamp(24px, 8vw, 36px) !important;
            padding: 10px 18px !important;
            max-width: 92vw !important;
            white-space: normal !important;
            text-align: center !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            /* Enhanced glassmorphism for mobile */
            background: var(--pill-tint-bg, rgba(236,131,60,0.15)) !important;
            backdrop-filter: blur(12px) saturate(1.4) !important;
            -webkit-backdrop-filter: blur(12px) saturate(1.4) !important;
            border: 1px solid var(--pill-tint-border, rgba(236,131,60,0.4)) !important;
            outline: 1px solid rgba(255,255,255,0.5) !important;
            box-shadow: 
              0 4px 16px -2px var(--pill-tint-glow, rgba(236,131,60,0.25)),
              0 2px 6px rgba(0,0,0,0.1),
              inset 0 1px 0 rgba(255,255,255,0.6) !important;
          }
          .bulqit-banner { max-width: calc(100vw - 40px) !important; flex-wrap: wrap !important; font-size: 12px !important; }

          /* 4. CTA buttons — full width, stacked */
          .bulqit-cta-group {
            flex-direction: column !important;
            gap: 12px !important;
            width: 100% !important;
          }
          .bulqit-btn-primary, .bulqit-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }

          /* 5. Features strip — stack vertically */
          .bulqit-features-strip {
            flex-direction: column !important;
            gap: 10px !important;
            align-items: flex-start !important;
          }
          .bulqit-feature-item {
            border-right: none !important;
            border-bottom: 1px dashed rgba(0,0,0,0.1) !important;
            padding-bottom: 10px !important;
            width: 100% !important;
          }
          .bulqit-feature-item:last-child { border-bottom: none !important; }

          /* 6. HowItWorks — all sections constrained, no overflow */
          .hiw-root { overflow-x: hidden !important; width: 100% !important; }
          .hiw-root section {
            padding: 52px 16px !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .hiw-root section > div { padding: 0 !important; max-width: 100% !important; }

          /* Retailer cards: 3-col → 1-col */
          .hiw-retailer-grid { grid-template-columns: 1fr !important; }
          .hiw-retailer-cell { border-right: none !important; border-bottom: 1px dashed rgba(0,0,0,0.12) !important; }
          .hiw-retailer-cell:last-child { border-bottom: none !important; }

          /* 3 Steps: 3-col → 1-col */
          .hiw-steps-grid { grid-template-columns: 1fr !important; border: none !important; gap: 12px !important; }
          .hiw-steps-grid > div { border: 1px solid rgba(0,0,0,0.08) !important; border-radius: 16px !important; padding: 24px 20px !important; }

          /* AI 2×2 → 1-col */
          .hiw-ai-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .hiw-ai-cell { border-radius: 14px !important; padding: 20px 18px !important; }

          /* Comparison: 2-col → 1-col */
          .hiw-compare-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .hiw-compare-grid > div { padding: 24px 20px !important; }

          /* HIW CTA buttons */
          .hiw-cta-btns { flex-direction: column !important; padding: 0 !important; }
          .hiw-cta-btns button { width: 100% !important; justify-content: center !important; }

          /* 7. Results grid: 2-col → 1-col */
          .lp-results-grid { grid-template-columns: 1fr !important; gap: 16px !important; }

          /* Stat cards: 3-col → 2-col, 3rd full width */
          .lp-stat-cards { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .lp-stat-card:nth-child(3) { grid-column: 1 / -1 !important; }

          /* Testimonials: 3-col → 1-col */
          .lp-testimonials { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
      `}</style>
    </div>
  );
}
