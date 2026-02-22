import { Package } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold gradient-text">BulkBridge AI</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Empowering Indian retailers through collective buying power. Built for Scale-A-Thon 2026.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
