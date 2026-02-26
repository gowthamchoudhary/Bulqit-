import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles } from 'lucide-react';

export function DemoModeBanner() {
  return (
    <Alert className="border-2 border-blue-500 bg-blue-50">
      <div className="flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-blue-900 mb-1">
            🎬 Demo Mode - AMD Slingshot Hackathon
          </div>
          <AlertDescription className="text-blue-800 text-sm">
            This is a fully functional prototype showcasing AI-powered group buying for small retailers.
            All data is simulated but represents realistic scenarios. Real AI (Groq + Llama 3.1) powers
            the negotiation emails. Built in 3 days to demonstrate the vision.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
