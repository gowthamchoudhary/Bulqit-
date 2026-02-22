import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useAuth } from '@/contexts/AuthContext';
import { GeneratedEmail } from '@/types/retailer';
import { Copy, RefreshCw, Edit3, Mail, Check, Loader2, Star } from 'lucide-react';
import { generateEmail } from '@/hooks/useEmailGenerator';
import { toast } from 'sonner';

export default function EmailResultPage() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState<GeneratedEmail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const [editBody, setEditBody] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = location.state as GeneratedEmail | null;
    if (data) {
      // Simulate AI generation delay
      setTimeout(() => {
        setEmail(data);
        setEditBody(data.body);
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [location.state]);

  if (!isAuthenticated) return <Navigate to="/register" replace />;
  if (!loading && !email) return <Navigate to="/group-form" replace />;

  const handleCopy = () => {
    if (!email) return;
    navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${editable ? editBody : email.body}`);
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      const newEmail = generateEmail(email.groupName, ['Groceries', 'Medicines'], email.totalValue, 2);
      setEmail(newEmail);
      setEditBody(newEmail.body);
      setEditable(false);
      setLoading(false);
    }, 2000);
  };

  const handleSendGmail = () => {
    if (!email) return;
    const subject = encodeURIComponent(email.subject);
    const body = encodeURIComponent(editable ? editBody : email.body);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <button onClick={() => navigate('/group-form')} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">
          ← Back to Group Formation
        </button>

        <h1 className="text-2xl font-bold text-foreground mb-6">AI-Generated Negotiation Email</h1>

        {loading ? (
          <div className="rounded-xl border border-border bg-card p-12 flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-lg font-medium text-foreground">Generating your email...</p>
            <p className="text-sm text-muted-foreground mt-1">Our AI is crafting a professional negotiation email</p>
          </div>
        ) : email ? (
          <div className="space-y-5">
            {/* Quality Score */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full gradient-primary px-4 py-1.5">
                <Star className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-bold text-primary-foreground">{email.qualityScore}/10</span>
              </div>
              <span className="text-sm text-muted-foreground">Quality Score</span>
            </div>

            {/* Email Card */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="border-b border-border px-6 py-4 bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Subject</p>
                <p className="font-semibold text-foreground">{email.subject}</p>
              </div>
              <div className="p-6">
                {editable ? (
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    rows={20}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed text-card-foreground font-sans">
                    {email.body}
                  </pre>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button onClick={handleCopy} className="flex items-center gap-2 rounded-lg gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground btn-scale">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button onClick={() => setEditable(!editable)} className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted btn-scale">
                <Edit3 className="h-4 w-4" /> {editable ? 'Preview' : 'Edit'}
              </button>
              <button onClick={handleRegenerate} className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted btn-scale">
                <RefreshCw className="h-4 w-4" /> Regenerate
              </button>
              <button onClick={handleSendGmail} className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted btn-scale">
                <Mail className="h-4 w-4" /> Send via Email
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}
