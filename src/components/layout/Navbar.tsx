import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import {
  Package,
  Menu,
  X,
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  Sparkles,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const navLinks = [
  { to: "/dashboard", key: "nav.dashboard", icon: LayoutDashboard },
  { to: "/group-form", key: "nav.createGroup", icon: Users },
  { to: "/analytics", key: "nav.analytics", icon: BarChart3 },
];

const T = {
  bg: "#F0EFED",
  bgWhite: "#ffffff",
  textDark: "#111111",
  textMid: "#555555",
  border: "rgba(0,0,0,0.08)",
  borderDash: "rgba(0,0,0,0.12)",
  gold: "#FFB800",
  goldSoft: "rgba(255,184,0,0.12)",
  goldBorder: "rgba(255,184,0,0.35)",
  font: "'DM Sans', sans-serif",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        borderBottom: `1px solid ${T.border}`,
        background: "rgba(240,239,237,0.88)",
        backdropFilter: "blur(10px)",
        fontFamily: T.font,
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
          style={{
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "-0.02em",
            color: T.textDark,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: T.textDark,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <Package className="h-5 w-5" />
          </div>
          <span>{t("app.name")}</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {isAuthenticated &&
            navLinks.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <button
                  key={l.to}
                  onClick={() => navigate(l.to)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    borderRadius: 999,
                    border: `1px solid ${isActive ? T.goldBorder : "transparent"}`,
                    background: isActive ? T.goldSoft : "transparent",
                    color: isActive ? "#7A5800" : T.textMid,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: T.font,
                  }}
                >
                  <l.icon className="h-4 w-4" />
                  {t(l.key)}
                </button>
              );
            })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => navigate("/supplier/register")}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: `1px solid ${T.goldBorder}`,
              background: T.goldSoft,
              color: "#7A5800",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: T.font,
            }}
          >
            Become a Supplier
          </button>
          <button
            onClick={() => navigate("/pricing")}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: `1px solid ${T.border}`,
              background: T.bgWhite,
              color: T.textDark,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: T.font,
            }}
          >
            Pricing
          </button>
          {isAuthenticated && (
            <button
              onClick={() => navigate("/negotiate")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 14px",
                borderRadius: 999,
                border: `1px solid ${T.goldBorder}`,
                background: T.goldSoft,
                color: "#7A5800",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: T.font,
              }}
            >
              <Sparkles className="w-4 h-4" />
              AI Negotiation
            </button>
          )}
          <LanguageSwitcher />
          {isAuthenticated ? (
            <>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.textMid,
                  maxWidth: 140,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.storeName}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: `1px solid ${T.border}`,
                  background: T.bgWhite,
                  color: T.textMid,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: T.font,
                }}
              >
                <LogOut className="h-4 w-4" />
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/register")}
              style={{
                borderRadius: 999,
                border: "none",
                background: T.textDark,
                color: "#fff",
                padding: "9px 16px",
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: T.font,
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              }}
            >
              {t("nav.getStarted")}
            </button>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            color: T.textDark,
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            width: "32px",
            height: "32px",
          }}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="md:hidden"
          style={{
            borderTop: `1px solid ${T.border}`,
            background: T.bg,
            padding: "12px 16px",
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <LanguageSwitcher />
          </div>
          {isAuthenticated &&
            navLinks.map((l) => (
              <button
                key={l.to}
                onClick={() => {
                  navigate(l.to);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 12,
                  padding: "10px 12px",
                  marginBottom: 6,
                  border: `1px solid ${T.border}`,
                  background: T.bgWhite,
                  color: T.textMid,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: T.font,
                }}
              >
                <l.icon className="h-4 w-4" />
                {t(l.key)}
              </button>
            ))}
          {isAuthenticated && (
            <button
              onClick={() => {
                navigate("/negotiate");
                setOpen(false);
              }}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 8,
                borderRadius: 12,
                padding: "10px 12px",
                marginBottom: 6,
                border: `1px solid ${T.goldBorder}`,
                background: T.goldSoft,
                color: "#7A5800",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: T.font,
              }}
            >
              <Sparkles className="w-4 h-4" />
              AI Negotiation
            </button>
          )}
          <button
            onClick={() => {
              navigate("/pricing");
              setOpen(false);
            }}
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: 8,
              borderRadius: 12,
              padding: "10px 12px",
              marginBottom: 6,
              border: `1px solid ${T.border}`,
              background: T.bgWhite,
              color: T.textMid,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: T.font,
            }}
          >
            Pricing
          </button>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
                setOpen(false);
              }}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 8,
                borderRadius: 12,
                padding: "10px 12px",
                border: `1px solid ${T.border}`,
                background: T.bgWhite,
                color: T.textMid,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: T.font,
              }}
            >
              <LogOut className="h-4 w-4" /> {t("nav.logout")}
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/register");
                setOpen(false);
              }}
              style={{
                marginTop: 6,
                width: "100%",
                borderRadius: 999,
                border: "none",
                background: T.textDark,
                color: "#fff",
                padding: "11px 16px",
                fontSize: 13,
                fontWeight: 800,
                fontFamily: T.font,
              }}
            >
              {t("nav.getStarted")}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
