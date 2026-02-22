import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Package, Menu, X, LayoutDashboard, Users, Mail, BarChart3, LogOut } from 'lucide-react';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/group-form', label: 'Create Group', icon: Users },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="gradient-text font-extrabold">BulkBridge AI</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {isAuthenticated && navLinks.map((l) => (
            <button
              key={l.to}
              onClick={() => navigate(l.to)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground">{user?.storeName}</span>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/register')}
              className="rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground btn-scale"
            >
              Get Started
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4 animate-fade-in">
          {isAuthenticated && navLinks.map((l) => (
            <button
              key={l.to}
              onClick={() => { navigate(l.to); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </button>
          ))}
          {isAuthenticated ? (
            <button
              onClick={() => { logout(); navigate('/'); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm text-destructive"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          ) : (
            <button
              onClick={() => { navigate('/register'); setOpen(false); }}
              className="mt-2 w-full rounded-lg gradient-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              Get Started
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
