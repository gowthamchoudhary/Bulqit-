import { useState } from "react";
import {
  Sparkles,
  MessageSquare,
  Copy,
  RefreshCw,
  Send,
  CheckCircle,
  TrendingUp,
  Zap,
  Mail,
  Users,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Star,
  Clock,
  Building2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { generateNegotiationEmail } from "@/lib/aiNegotiation";
import { mockSuppliers } from "@/data/mockSuppliers";
import { DemoModeBanner } from "@/components/features/DemoModeBanner";

const T = {
  bg: "#F0EFED",
  bgWhite: "#ffffff",
  textDark: "#111111",
  textMid: "#555555",
  textLight: "#999999",
  border: "rgba(0,0,0,0.08)",
  borderDash: "rgba(0,0,0,0.12)",
  gold: "#FFB800",
  goldSoft: "rgba(255,184,0,0.12)",
  goldBorder: "rgba(255,184,0,0.35)",
  font: "'DM Sans', sans-serif",
};

const TONES = [
  {
    id: "professional",
    label: "Professional",
    desc: "Formal B2B tone",
    emoji: "🤝",
  },
  {
    id: "assertive",
    label: "Assertive",
    desc: "Confident & direct",
    emoji: "💪",
  },
  {
    id: "friendly",
    label: "Friendly",
    desc: "Warm & collaborative",
    emoji: "😊",
  },
  {
    id: "urgent",
    label: "Urgent",
    desc: "Time-sensitive pressure",
    emoji: "⚡",
  },
];

const EMAIL_GOALS = [
  {
    id: "discount",
    label: "Request Discount",
    desc: "Negotiate better pricing for bulk",
  },
  {
    id: "credit",
    label: "Credit Terms",
    desc: "Ask for Net-15/Net-30 payment terms",
  },
  {
    id: "priority",
    label: "Priority Delivery",
    desc: "Ensure on-time group delivery",
  },
  {
    id: "exclusive",
    label: "Exclusive Deal",
    desc: "Lock in rates for repeat orders",
  },
  {
    id: "samples",
    label: "Free Samples",
    desc: "Request product samples before order",
  },
  {
    id: "introduce",
    label: "Introduction",
    desc: "First contact with a new supplier",
  },
];

export function NegotiationCenterPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [groupName, setGroupName] = useState("Jayanagar Medical Alliance");
  const [memberCount, setMemberCount] = useState(5);
  const [selectedSupplier, setSelectedSupplier] = useState(mockSuppliers[0].id);
  const [totalValue, setTotalValue] = useState(125000);
  const [targetDiscount, setTargetDiscount] = useState(18);
  const [tone, setTone] = useState("professional");
  const [goal, setGoal] = useState("discount");
  const [senderName, setSenderName] = useState("");
  const [senderStore, setSenderStore] = useState("");
  const [urgency, setUrgency] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [products, setProducts] = useState([
    { name: "Paracetamol 500mg", quantity: 1000, unit: "strips" },
    { name: "Cough Syrup 100ml", quantity: 200, unit: "bottles" },
  ]);

  const supplier = mockSuppliers.find((s) => s.id === selectedSupplier);
  const estimatedSavings = Math.round(totalValue * (targetDiscount / 100));

  const handleGenerate = async () => {
    if (!senderName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    setIsGenerating(true);
    setGeneratedEmail(null);
    try {
      const email = await generateNegotiationEmail({
        groupName,
        memberCount,
        products,
        totalValue,
        supplierName: supplier?.name || "Supplier",
        targetDiscount,
      });
      setGeneratedEmail({
        ...email,
        tone: TONES.find((t) => t.id === tone)?.label,
      });
      toast.success("Email generated! ✨");
    } catch {
      toast.error("Failed to generate. Using template.");
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (generatedEmail) {
      navigator.clipboard.writeText(
        `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`,
      );
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const addProduct = () =>
    setProducts((p) => [...p, { name: "", quantity: 0, unit: "units" }]);
  const removeProduct = (i: number) =>
    setProducts((p) => p.filter((_, idx) => idx !== i));
  const updateProduct = (i: number, field: string, val: string | number) =>
    setProducts((p) =>
      p.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)),
    );

  /* ── Sidebar content (shared between desktop sidebar + mobile accordion) ── */
  const SidebarContent = () => (
    <>
      {/* AI Engine card */}
      <div
        style={{
          background: "#0D0D0D",
          border: `1px solid rgba(255,255,255,0.07)`,
          borderRadius: 20,
          padding: 24,
          boxShadow: `0 0 0 1px ${T.goldBorder}, 0 8px 32px rgba(255,184,0,0.08)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: T.goldSoft,
              border: `1px solid ${T.goldBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={15} color={T.gold} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>
              AI Engine
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
              Llama 3.1 · Groq API
            </div>
          </div>
        </div>
        {[
          { label: "Generation Speed", val: "2.8s", pct: 95, color: "#22C55E" },
          { label: "Quality Score", val: "9.2/10", pct: 92, color: T.gold },
          { label: "Success Rate", val: "87%", pct: 87, color: "#A78BFA" },
        ].map((stat) => (
          <div key={stat.label} style={{ marginBottom: 14 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                {stat.label}
              </span>
              <span
                style={{ fontSize: 12, fontWeight: 700, color: stat.color }}
              >
                {stat.val}
              </span>
            </div>
            <div
              style={{
                height: 4,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${stat.pct}%`,
                  background: stat.color,
                  borderRadius: 100,
                }}
              />
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 16,
          }}
        >
          {[
            "Context-aware negotiation",
            "Indian B2B market trained",
            "Multi-language support (soon)",
          ].map((f) => (
            <div
              key={f}
              style={{
                display: "flex",
                gap: 8,
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              <CheckCircle
                size={13}
                color={T.gold}
                style={{ flexShrink: 0, marginTop: 1 }}
              />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Deal summary */}
      <div
        style={{
          background: T.bgWhite,
          border: `1px solid ${T.border}`,
          borderRadius: 18,
          padding: 22,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: T.textDark,
            marginBottom: 14,
          }}
        >
          Your Deal Summary
        </div>
        {[
          {
            label: "Order Value",
            val: `₹${totalValue.toLocaleString()}`,
            color: T.textDark,
          },
          { label: "Target Disc.", val: `${targetDiscount}%`, color: T.gold },
          {
            label: "Est. Savings",
            val: `₹${estimatedSavings.toLocaleString()}`,
            color: "#22C55E",
          },
          {
            label: "Group Size",
            val: `${memberCount} retailers`,
            color: "#6474F0",
          },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "9px 0",
              borderBottom: `1px dashed ${T.borderDash}`,
            }}
          >
            <span style={{ fontSize: 12, color: T.textLight }}>
              {row.label}
            </span>
            <span style={{ fontSize: 14, fontWeight: 800, color: row.color }}>
              {row.val}
            </span>
          </div>
        ))}
      </div>

      {/* Pro tips */}
      <div
        style={{
          background: T.bgWhite,
          border: `1px solid ${T.border}`,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <button
          onClick={() => setShowTips(!showTips)}
          style={{
            width: "100%",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: T.font,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 700,
              color: T.textDark,
            }}
          >
            <TrendingUp size={15} /> Negotiation Pro Tips
          </div>
          {showTips ? (
            <ChevronUp size={15} color={T.textLight} />
          ) : (
            <ChevronDown size={15} color={T.textLight} />
          )}
        </button>
        {showTips && (
          <div
            style={{
              padding: "16px 20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              borderTop: `1px dashed ${T.borderDash}`,
            }}
          >
            {[
              {
                emoji: "💡",
                tip: "Mention your group size first — it shows combined buying power suppliers can't ignore.",
              },
              {
                emoji: "📞",
                tip: "End with a call-to-action — ask for a 15-minute call, not just a reply.",
              },
              {
                emoji: "💳",
                tip: "Highlight payment reliability. Guaranteed payment within 48hrs is a huge motivator.",
              },
              {
                emoji: "📅",
                tip: "Mention repeat order frequency. Monthly orders beat a one-time bulk deal.",
              },
              {
                emoji: "🤝",
                tip: 'Offer a "pilot order" at your target price. Lower risk gets more yes-es.',
              },
              {
                emoji: "📊",
                tip: "Include the rupee value you're asking for — makes it concrete, not abstract.",
              },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "10px 12px",
                  background: T.bg,
                  borderRadius: 10,
                  fontSize: 12,
                  color: T.textMid,
                  lineHeight: 1.6,
                }}
              >
                <span style={{ flexShrink: 0 }}>{t.emoji}</span>
                {t.tip}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Best results hint */}
      <div
        style={{
          background: T.goldSoft,
          border: `1px solid ${T.goldBorder}`,
          borderRadius: 16,
          padding: 20,
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <AlertCircle
            size={15}
            color="#7A5800"
            style={{ flexShrink: 0, marginTop: 1 }}
          />
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#7A5800",
                marginBottom: 8,
              }}
            >
              For Best Results
            </div>
            {[
              "Fill in your actual group name",
              "Set a realistic discount (15–25%)",
              "Add all products you want to order",
              "Mention any deadline or urgency",
            ].map((tip) => (
              <div
                key={tip}
                style={{
                  display: "flex",
                  gap: 6,
                  fontSize: 12,
                  color: "#7A5800",
                  marginBottom: 4,
                }}
              >
                <span>•</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: T.font,
        color: T.textDark,
        backgroundColor: T.bg,
        backgroundImage: `linear-gradient(${T.borderDash} 1px, transparent 1px), linear-gradient(90deg, ${T.borderDash} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }}
    >
      {/* HERO */}
      <div
        style={{
          background: "#0D0D0D",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(40px,6vw,72px) clamp(20px,4vw,48px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "40%",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,184,0,0.09) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: T.goldSoft,
                border: `1px solid ${T.goldBorder}`,
                borderRadius: 100,
                padding: "5px 14px 5px 5px",
              }}
            >
              <span
                style={{
                  background: T.gold,
                  color: "#000",
                  borderRadius: 100,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                }}
              >
                AI-Powered
              </span>
              <span style={{ fontSize: 12, color: "#7A5800" }}>
                Llama 3.1 via Groq
              </span>
            </div>
          </div>
          <h1
            style={{
              fontSize: "clamp(26px,4.5vw,48px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#fff",
              marginBottom: 10,
              lineHeight: 1.05,
            }}
          >
            AI Negotiation Center
          </h1>
          <p
            style={{
              fontSize: "clamp(13px,1.8vw,17px)",
              color: "rgba(255,255,255,0.45)",
              maxWidth: 520,
              lineHeight: 1.7,
            }}
          >
            Generate professional supplier negotiation emails in seconds. Tell
            us your deal details — AI writes the perfect email for you.
          </p>
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 28,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Avg generation time", val: "2.8s" },
              { label: "Negotiation success rate", val: "87%" },
              { label: "Avg discount won", val: "19%" },
              { label: "Emails generated", val: "12,400+" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: "clamp(18px,2.5vw,24px)",
                    fontWeight: 900,
                    color: T.gold,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.3)",
                    marginTop: 3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(20px,3vw,36px) clamp(16px,3vw,32px)",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <DemoModeBanner />
        </div>

        {/* ── MOBILE SIDEBAR ACCORDION (hidden on desktop) ── */}
        <div className="m-sidebar-wrap">
          <button
            className="m-sidebar-toggle"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            <span>⚡ AI Stats & Deal Summary</span>
            {mobileSidebarOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {mobileSidebarOpen && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                paddingTop: 14,
              }}
            >
              <SidebarContent />
            </div>
          )}
        </div>

        {/* MAIN GRID */}
        <div
          className="nego-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,340px)",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* YOUR DETAILS */}
            <FormCard
              title="Your Details"
              icon={<Users size={16} color={T.textMid} />}
            >
              <div
                className="g2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <Field label="Your Name" required>
                  <SI
                    placeholder="Rajesh Kumar"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                </Field>
                <Field label="Store / Business Name">
                  <SI
                    placeholder="Rajesh Medical Store"
                    value={senderStore}
                    onChange={(e) => setSenderStore(e.target.value)}
                  />
                </Field>
              </div>
              <div
                className="g2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginTop: 14,
                }}
              >
                <Field label="Group Name">
                  <SI
                    placeholder="Jayanagar Medical Alliance"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </Field>
                <Field label="Group Members">
                  <div style={{ position: "relative" }}>
                    <Users
                      size={14}
                      color={T.textLight}
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                    <SI
                      type="number"
                      min={2}
                      max={50}
                      value={memberCount}
                      onChange={(e) => setMemberCount(Number(e.target.value))}
                      style={{ paddingLeft: 34 }}
                    />
                  </div>
                </Field>
              </div>
            </FormCard>

            {/* SUPPLIER & ORDER */}
            <FormCard
              title="Supplier & Order Details"
              icon={<Building2 size={16} color={T.textMid} />}
            >
              <Field label="Select Supplier">
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  style={{
                    width: "100%",
                    fontFamily: T.font,
                    fontSize: 14,
                    padding: "11px 14px",
                    borderRadius: 10,
                    border: `1px solid ${T.border}`,
                    background: T.bg,
                    color: T.textDark,
                    outline: "none",
                  }}
                >
                  {mockSuppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.rating}★)
                    </option>
                  ))}
                </select>
              </Field>
              {supplier && (
                <div
                  style={{
                    marginTop: 10,
                    padding: "12px 14px",
                    background: T.bg,
                    border: `1px dashed ${T.borderDash}`,
                    borderRadius: 12,
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    { label: "Rating", val: `${supplier.rating}★` },
                    { label: "Category", val: supplier.type },
                    { label: "Type", val: supplier.type },
                  ].map((info) => (
                    <div key={info.label}>
                      <div
                        style={{
                          fontSize: 10,
                          color: T.textLight,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {info.label}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          marginTop: 2,
                          textTransform: "capitalize",
                        }}
                      >
                        {info.val}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 16 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.textDark,
                    marginBottom: 10,
                  }}
                >
                  Products & Quantities <span style={{ color: T.gold }}>*</span>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {products.map((p, i) => (
                    <div
                      key={i}
                      className="prod-row"
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <SI
                        placeholder="Product name (e.g. Paracetamol 500mg)"
                        value={p.name}
                        onChange={(e) =>
                          updateProduct(i, "name", e.target.value)
                        }
                        style={{ flex: 2, minWidth: 0 }}
                      />
                      <SI
                        type="number"
                        placeholder="Qty"
                        value={p.quantity}
                        onChange={(e) =>
                          updateProduct(i, "quantity", Number(e.target.value))
                        }
                        style={{ width: 70, flexShrink: 0 }}
                      />
                      <select
                        value={p.unit}
                        onChange={(e) =>
                          updateProduct(i, "unit", e.target.value)
                        }
                        style={{
                          padding: "11px 6px",
                          borderRadius: 10,
                          border: `1px solid ${T.border}`,
                          background: T.bg,
                          fontSize: 12,
                          color: T.textMid,
                          outline: "none",
                          fontFamily: T.font,
                          flexShrink: 0,
                          cursor: "pointer",
                        }}
                      >
                        {[
                          "units",
                          "kg",
                          "L",
                          "strips",
                          "boxes",
                          "bottles",
                          "packets",
                          "cartons",
                        ].map((u) => (
                          <option key={u}>{u}</option>
                        ))}
                      </select>
                      {products.length > 1 && (
                        <button
                          onClick={() => removeProduct(i)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#DC2626",
                            padding: 4,
                            flexShrink: 0,
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addProduct}
                  style={{
                    marginTop: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "transparent",
                    border: `1px dashed ${T.borderDash}`,
                    color: T.textMid,
                    cursor: "pointer",
                    fontFamily: T.font,
                  }}
                >
                  <Plus size={13} /> Add Product
                </button>
              </div>

              <div
                className="g2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginTop: 14,
                }}
              >
                <Field label="Total Order Value (₹)">
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 14,
                        fontWeight: 700,
                        color: T.textMid,
                        pointerEvents: "none",
                      }}
                    >
                      ₹
                    </span>
                    <SI
                      type="number"
                      value={totalValue}
                      onChange={(e) => setTotalValue(Number(e.target.value))}
                      style={{ paddingLeft: 28 }}
                    />
                  </div>
                </Field>
                <Field label="Target Discount (%)">
                  <div style={{ position: "relative" }}>
                    <SI
                      type="number"
                      min={5}
                      max={40}
                      value={targetDiscount}
                      onChange={(e) =>
                        setTargetDiscount(Number(e.target.value))
                      }
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 13,
                        fontWeight: 700,
                        color: T.gold,
                        pointerEvents: "none",
                      }}
                    >
                      %
                    </span>
                  </div>
                </Field>
              </div>

              <div
                style={{
                  marginTop: 12,
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: T.goldSoft,
                  border: `1px solid ${T.goldBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{ fontSize: 12, color: "#7A5800", fontWeight: 600 }}
                >
                  Estimated Savings if Negotiation Succeeds
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: T.textDark,
                    letterSpacing: "-0.02em",
                  }}
                >
                  ₹{estimatedSavings.toLocaleString()}
                </div>
              </div>
            </FormCard>

            {/* GOAL & TONE */}
            <FormCard
              title="Email Goal & Tone"
              icon={<Mail size={16} color={T.textMid} />}
            >
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.textDark,
                    marginBottom: 10,
                  }}
                >
                  What's the main goal?
                </div>
                <div
                  className="goals-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: 8,
                  }}
                >
                  {EMAIL_GOALS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        cursor: "pointer",
                        fontFamily: T.font,
                        textAlign: "left",
                        background: goal === g.id ? T.textDark : T.bg,
                        border: `1px solid ${goal === g.id ? T.textDark : T.borderDash}`,
                        transition: "all 0.15s",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: goal === g.id ? "#fff" : T.textDark,
                          marginBottom: 3,
                        }}
                      >
                        {g.label}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color:
                            goal === g.id
                              ? "rgba(255,255,255,0.5)"
                              : T.textLight,
                          lineHeight: 1.4,
                        }}
                      >
                        {g.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.textDark,
                    marginBottom: 10,
                  }}
                >
                  Email Tone
                </div>
                <div
                  className="tones-row"
                  style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                >
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "9px 16px",
                        borderRadius: 100,
                        cursor: "pointer",
                        fontFamily: T.font,
                        fontSize: 13,
                        fontWeight: 600,
                        background: tone === t.id ? T.textDark : "transparent",
                        color: tone === t.id ? "#fff" : T.textMid,
                        border: `1px solid ${tone === t.id ? T.textDark : T.borderDash}`,
                        transition: "all 0.15s",
                      }}
                    >
                      <span>{t.emoji}</span> {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </FormCard>

            {/* EXTRA CONTEXT */}
            <FormCard
              title="Extra Context"
              icon={<Sparkles size={16} color={T.textMid} />}
            >
              <Field
                label="Urgency / Deadline (Optional)"
                hint="e.g. 'Need delivery before Diwali season'"
              >
                <div style={{ position: "relative" }}>
                  <Clock
                    size={14}
                    color={T.textLight}
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  />
                  <SI
                    placeholder="Delivery needed before March 15"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    style={{ paddingLeft: 34 }}
                  />
                </div>
              </Field>
              <div style={{ marginTop: 14 }}>
                <Field
                  label="Custom Instructions (Optional)"
                  hint="e.g. 'Mention we've been reliable customers for 2 years'"
                >
                  <textarea
                    rows={3}
                    placeholder="Any special points to mention, past relationship context, or specific asks..."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    style={{
                      width: "100%",
                      fontFamily: T.font,
                      fontSize: 14,
                      padding: "11px 14px",
                      borderRadius: 10,
                      border: `1px solid ${T.border}`,
                      background: T.bg,
                      color: T.textDark,
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.6,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#111";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(0,0,0,0.06)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = T.border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </Field>
              </div>
            </FormCard>

            {/* GENERATE BUTTON */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 100,
                border: "none",
                background: isGenerating ? "#E8E7E4" : T.gold,
                color: isGenerating ? T.textLight : "#000",
                fontSize: 16,
                fontWeight: 800,
                cursor: isGenerating ? "not-allowed" : "pointer",
                fontFamily: T.font,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: isGenerating
                  ? "none"
                  : "0 6px 28px rgba(255,184,0,0.40)",
                transition: "all 0.2s ease",
                letterSpacing: "-0.01em",
              }}
            >
              {isGenerating ? (
                <>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      border: "2.5px solid rgba(0,0,0,0.15)",
                      borderTopColor: T.textMid,
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                      display: "inline-block",
                    }}
                  />{" "}
                  AI is Writing Your Email…
                </>
              ) : (
                <>
                  <Sparkles size={18} strokeWidth={2.5} /> Generate Negotiation
                  Email
                </>
              )}
            </button>

            {/* GENERATED EMAIL */}
            {generatedEmail && (
              <div
                style={{
                  background: T.bgWhite,
                  border: `1px solid ${T.border}`,
                  borderRadius: 20,
                  padding: "clamp(16px,3vw,28px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  animation: "fadeIn 0.35s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(34,197,94,0.09)",
                        border: "1px solid rgba(34,197,94,0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckCircle size={18} color="#15803D" />
                    </div>
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Your Email is Ready
                    </h3>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 100,
                        background: T.goldSoft,
                        color: "#7A5800",
                        border: `1px solid ${T.goldBorder}`,
                      }}
                    >
                      <Star
                        size={10}
                        style={{ display: "inline", marginRight: 4 }}
                      />
                      {generatedEmail.qualityScore}/10
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 100,
                        background: T.bg,
                        color: T.textMid,
                        border: `1px solid ${T.borderDash}`,
                      }}
                    >
                      {generatedEmail.tone}
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: T.textLight,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 6,
                    }}
                  >
                    Subject Line
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      background: T.goldSoft,
                      border: `1px solid ${T.goldBorder}`,
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#7A5800",
                      wordBreak: "break-word",
                    }}
                  >
                    {generatedEmail.subject}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: T.textLight,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 6,
                    }}
                  >
                    Email Body
                  </div>
                  <div
                    style={{
                      padding: "16px 18px",
                      background: T.bg,
                      border: `1px dashed ${T.borderDash}`,
                      borderRadius: 12,
                      fontSize: 13,
                      lineHeight: 1.85,
                      color: T.textDark,
                      whiteSpace: "pre-wrap",
                      fontFamily: "'Georgia', serif",
                      maxHeight: 420,
                      overflowY: "auto",
                    }}
                  >
                    {generatedEmail.body}
                  </div>
                </div>

                {generatedEmail.keyPoints && (
                  <div style={{ marginBottom: 20 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: T.textLight,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: 8,
                      }}
                    >
                      Key Points Used
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {generatedEmail.keyPoints.map((pt: string, i: number) => (
                        <span
                          key={i}
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "4px 12px",
                            borderRadius: 100,
                            background: T.bg,
                            border: `1px solid ${T.borderDash}`,
                            color: T.textMid,
                          }}
                        >
                          ✓ {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className="action-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 10,
                  }}
                >
                  <ActionBtn
                    icon={<Copy size={14} />}
                    label={copied ? "Copied!" : "Copy Email"}
                    onClick={handleCopy}
                    variant={copied ? "green" : "ghost"}
                  />
                  <ActionBtn
                    icon={<RefreshCw size={14} />}
                    label="Regenerate"
                    onClick={() => {
                      setGeneratedEmail(null);
                      handleGenerate();
                    }}
                    variant="ghost"
                  />
                  <ActionBtn
                    icon={<Send size={14} />}
                    label="Send via Gmail"
                    onClick={() => toast.info("Gmail integration coming soon!")}
                    variant="dark"
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR — desktop only */}
          <div
            className="d-sidebar"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              position: "sticky",
              top: 80,
            }}
          >
            <SidebarContent />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        * { box-sizing: border-box; }

        /* Mobile sidebar accordion — hidden on desktop */
        .m-sidebar-wrap { display: none; }

        /* ════════════════════════════════════════
           MOBILE ONLY  ≤ 768 px
           Strict rule: NOTHING above 768px changes
        ════════════════════════════════════════ */
        @media (max-width: 768px) {

          /* Show mobile accordion */
          .m-sidebar-wrap {
            display: block;
            background: ${T.bgWhite};
            border: 1px solid ${T.border};
            border-radius: 16px;
            padding: 14px 16px;
            margin-bottom: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          .m-sidebar-toggle {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: none;
            border: none;
            font-family: ${T.font};
            font-size: 14px;
            font-weight: 700;
            color: ${T.textDark};
            cursor: pointer;
            padding: 0;
          }

          /* Hide desktop sidebar */
          .d-sidebar { display: none !important; }

          /* Stack main 2-col grid to 1 col */
          .nego-grid { grid-template-columns: 1fr !important; }

          /* Stack all internal 2-col grids */
          .g2 { grid-template-columns: 1fr !important; }

          /* Goals: 2 per row on mobile (still readable) */
          .goals-grid { grid-template-columns: 1fr 1fr !important; }
          .goals-grid button { padding: 10px 10px !important; }
          .goals-grid button div:first-child { font-size: 12px !important; }
          .goals-grid button div:last-child  { font-size: 10px !important; display: none; }

          /* Tone buttons: wrap into 2x2 */
          .tones-row { gap: 6px !important; }
          .tones-row button { font-size: 12px !important; padding: 8px 12px !important; }

          /* Product row: name full width, qty+unit+trash on same line below */
          .prod-row { flex-wrap: wrap; }
          .prod-row > input:first-child { flex: 1 1 100% !important; width: 100% !important; }
          .prod-row > input:nth-child(2) { flex: 1 1 80px; width: auto !important; }
          .prod-row > select { flex-shrink: 0; }

          /* Action buttons: stack */
          .action-row { grid-template-columns: 1fr !important; }
        }

        textarea:focus, select:focus {
          outline: none;
          border-color: #111 !important;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  );
}

/* ── Micro components — identical to original ── */
function FormCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: T.bgWhite,
        border: `1px solid ${T.border}`,
        borderRadius: 20,
        padding: "clamp(20px,3vw,28px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: T.bg,
            border: `1px solid ${T.borderDash}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <h2
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: T.textDark,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  required,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: T.textDark,
          display: "block",
          marginBottom: 6,
        }}
      >
        {label}
        {required && <span style={{ color: T.gold, marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {hint && (
        <div style={{ fontSize: 11, color: T.textLight, marginTop: 5 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

function SI(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        fontFamily: T.font,
        fontSize: 14,
        padding: "11px 14px",
        borderRadius: 10,
        border: `1px solid ${T.border}`,
        background: T.bg,
        color: T.textDark,
        outline: "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
        ...props.style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#111";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.06)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = T.border;
        e.currentTarget.style.boxShadow = "none";
        props.onBlur?.(e);
      }}
    />
  );
}

function ActionBtn({
  icon,
  label,
  onClick,
  variant = "ghost",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "ghost" | "dark" | "green";
}) {
  const [hov, setHov] = useState(false);
  const styles = {
    ghost: {
      bg: hov ? T.bg : "transparent",
      color: T.textMid,
      border: T.borderDash,
    },
    dark: { bg: hov ? "#222" : T.textDark, color: "#fff", border: T.textDark },
    green: {
      bg: "rgba(34,197,94,0.09)",
      color: "#15803D",
      border: "rgba(34,197,94,0.22)",
    },
  }[variant];
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "11px",
        borderRadius: 100,
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
        fontFamily: T.font,
        background: styles.bg,
        color: styles.color,
        border: `1px solid ${styles.border}`,
        transition: "all 0.15s ease",
      }}
    >
      {icon}
      {label}
    </button>
  );
}
