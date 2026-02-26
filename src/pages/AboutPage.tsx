import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Heart,
  TrendingUp,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';
import { DemoModeBanner } from '@/components/features/DemoModeBanner';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Badge className="mb-4 bg-white text-green-600">Our Mission</Badge>
          <h1 className="text-5xl font-bold mb-6">
            Empowering India's 13 Million Small Retailers
          </h1>
          <p className="text-2xl opacity-90 mb-8">
            We're leveling the playing field with AI-powered group buying
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <section className="mb-8">
          <DemoModeBanner />
        </section>
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">The Problem We're Solving</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-red-50 border-2 border-red-500">
              <div className="text-4xl mb-4">😔</div>
              <h3 className="font-bold text-xl mb-3">Small Shops Pay 20% More</h3>
              <p className="text-gray-700">
                Individual retailers have no bargaining power. They pay inflated prices while
                big stores get bulk discounts.
              </p>
            </Card>

            <Card className="p-6 bg-yellow-50 border-2 border-yellow-500">
              <div className="text-4xl mb-4">😓</div>
              <h3 className="font-bold text-xl mb-3">Amazon & Reliance Crushing Them</h3>
              <p className="text-gray-700">
                Big chains negotiate huge discounts and pass savings to customers.
                Small retailers can't compete.
              </p>
            </Card>

            <Card className="p-6 bg-orange-50 border-2 border-orange-500">
              <div className="text-4xl mb-4">😤</div>
              <h3 className="font-bold text-xl mb-3">Group Buying is Too Hard</h3>
              <p className="text-gray-700">
                Coordination via WhatsApp groups fails. Trust issues, payment hassles,
                and logistics nightmares.
              </p>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How Bulqit Changes Everything</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <h3 className="text-2xl font-bold">AI-Powered Matching</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Our AI analyzes product needs, location, and order patterns to automatically
                form optimal buying groups. No manual coordination needed.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Vector embeddings for smart product matching</li>
                <li>✓ Geographic clustering (within 5km)</li>
                <li>✓ Order frequency synchronization</li>
                <li>✓ Budget-based grouping</li>
              </ul>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
                <h3 className="text-2xl font-bold">One-Click Groups</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Pre-formed groups exist for popular products. Just click &quot;Join&quot; and you&apos;re in.
                Orders happen automatically every week/month.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Zero coordination effort</li>
                <li>✓ Automatic scheduling</li>
                <li>✓ Secure advance payments</li>
                <li>✓ Verified suppliers only</li>
              </ul>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold">Trust & Safety</h3>
              </div>
              <p className="text-gray-700 mb-4">
                All suppliers GST-verified. Advance payments held in escrow.
                Money-back guarantee if group doesn&apos;t meet minimum.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Supplier background checks</li>
                <li>✓ Payment protection</li>
                <li>✓ Quality guarantees</li>
                <li>✓ Dispute resolution</li>
              </ul>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-green-600" />
                <h3 className="text-2xl font-bold">Dynamic Discounts</h3>
              </div>
              <p className="text-gray-700 mb-4">
                As groups grow, discounts automatically increase. Real-time tier tracking
                shows exactly how much more you&apos;ll save.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Tier 1: 500+ units = 12% off</li>
                <li>✓ Tier 2: 1000+ units = 18% off</li>
                <li>✓ Tier 3: 5000+ units = 25% off</li>
                <li>✓ Live progress tracking</li>
              </ul>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <Card className="p-12 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-500">
            <div className="text-center">
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">The Impact</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                This isn&apos;t just about saving money. It&apos;s about saving India&apos;s retail backbone -
                13 million small businesses that employ 40 million people.
              </p>
              <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">₹18K</div>
                  <div className="text-sm text-gray-600">Avg monthly savings per retailer</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">15-20%</div>
                  <div className="text-sm text-gray-600">Typical discount achieved</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">40%</div>
                  <div className="text-sm text-gray-600">Less delivery trips (greener)</div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Built with AMD-Optimized AI</h2>
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Core Technologies</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Badge className="mt-0.5">AI</Badge>
                    <div>
                      <div className="font-semibold">Sentence Transformers</div>
                      <div className="text-sm text-gray-600">Vector embeddings for product matching</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge className="mt-0.5">LLM</Badge>
                    <div>
                      <div className="font-semibold">Llama 3.1 8B (Groq)</div>
                      <div className="text-sm text-gray-600">AI-powered negotiation emails</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge className="mt-0.5">Web</Badge>
                    <div>
                      <div className="font-semibold">React + TypeScript</div>
                      <div className="text-sm text-gray-600">Modern, responsive interface</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">AMD Optimization</h3>
                <p className="text-gray-700 mb-4">
                  Our AI models are optimized for AMD Ryzen processors, delivering fast inference
                  at lower cost than competitors.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ 3x faster embedding generation</li>
                  <li>✓ 50% lower inference costs</li>
                  <li>✓ Runs on commodity hardware</li>
                  <li>✓ Scalable to millions of users</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        <section className="text-center">
          <Card className="p-12 bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
            <p className="text-xl mb-8 opacity-90">
              Help us save India&apos;s small retailers. One group at a time.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
                onClick={() => navigate('/register')}
              >
                Register Your Store
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600"
                onClick={() => navigate('/dashboard')}
              >
                Explore Groups
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
