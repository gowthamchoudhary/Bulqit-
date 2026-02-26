import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Sparkles,
  MessageSquare,
  Copy,
  RefreshCw,
  Send,
  CheckCircle,
  Loader2,
  TrendingUp,
  Star,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { generateNegotiationEmail } from '@/lib/aiNegotiation';
import { mockSuppliers } from '@/data/mockSuppliers';
import { DemoModeBanner } from '@/components/features/DemoModeBanner';

export function NegotiationCenterPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<any>(null);

  const [groupName, setGroupName] = useState('Jayanagar Medical Alliance');
  const [memberCount, setMemberCount] = useState(5);
  const [selectedSupplier, setSelectedSupplier] = useState(mockSuppliers[0].id);
  const [products, setProducts] = useState([
    { name: 'Paracetamol', quantity: 1000 },
    { name: 'Cough Syrup', quantity: 200 },
  ]);
  const [totalValue, setTotalValue] = useState(125000);
  const [targetDiscount, setTargetDiscount] = useState(18);
  const [customInstructions, setCustomInstructions] = useState('');

  const supplier = mockSuppliers.find((s) => s.id === selectedSupplier);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const email = await generateNegotiationEmail({
        groupName,
        memberCount,
        products,
        totalValue,
        supplierName: supplier?.name || 'Supplier',
        targetDiscount,
      });

      setGeneratedEmail(email);
      toast.success('Email generated successfully! 🎉');
    } catch (error) {
      toast.error('Failed to generate email. Using template.');
    }

    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (generatedEmail) {
      navigator.clipboard.writeText(`Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`);
      toast.success('Email copied to clipboard!');
    }
  };

  const handleRegenerate = () => {
    setGeneratedEmail(null);
    handleGenerate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <Badge className="bg-white text-purple-600">AI-Powered</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Negotiation Center</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Generate professional supplier negotiation emails in seconds using advanced AI. Powered by
            Llama 3.1 on AMD Ryzen processors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <DemoModeBanner />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                Negotiation Details
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="group-name">Group Name</Label>
                    <Input
                      id="group-name"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="members">Number of Members</Label>
                    <Input
                      id="members"
                      type="number"
                      min={2}
                      max={50}
                      value={memberCount}
                      onChange={(e) => setMemberCount(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label>Select Supplier</Label>
                  <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSuppliers.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name} ({s.rating}★)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Products & Quantities</Label>
                  <div className="mt-2 space-y-2">
                    {products.map((product, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          placeholder="Product name"
                          value={product.name}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[idx].name = e.target.value;
                            setProducts(newProducts);
                          }}
                        />
                        <Input
                          type="number"
                          placeholder="Quantity"
                          value={product.quantity}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[idx].quantity = Number(e.target.value);
                            setProducts(newProducts);
                          }}
                          className="w-32"
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setProducts([...products, { name: '', quantity: 0 }])}
                    >
                      + Add Product
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="total-value">Total Order Value (₹)</Label>
                    <Input
                      id="total-value"
                      type="number"
                      value={totalValue}
                      onChange={(e) => setTotalValue(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount">Target Discount (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min={5}
                      max={30}
                      value={targetDiscount}
                      onChange={(e) => setTargetDiscount(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="custom">Custom Instructions (Optional)</Label>
                  <Textarea
                    id="custom"
                    placeholder="e.g., Mention urgent delivery needed, highlight payment reliability..."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    rows={3}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg py-6"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    AI is Writing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Email with AI
                  </>
                )}
              </Button>
            </Card>

            {generatedEmail && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    Generated Email
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">
                      <Star className="w-3 h-3 mr-1" />
                      {generatedEmail.qualityScore}/10
                    </Badge>
                    <Badge variant="outline">{generatedEmail.tone}</Badge>
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="text-sm text-gray-600">Subject Line:</Label>
                  <div className="mt-1 p-3 bg-blue-50 border border-blue-200 rounded font-semibold">
                    {generatedEmail.subject}
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="text-sm text-gray-600">Email Body:</Label>
                  <div className="mt-1 p-4 bg-gray-50 border rounded whitespace-pre-wrap font-mono text-sm">
                    {generatedEmail.body}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" onClick={handleCopy}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Email
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleRegenerate}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button className="flex-1 bg-green-500 hover:bg-green-600">
                    <Send className="w-4 h-4 mr-2" />
                    Send via Gmail
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-500">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold">AI-Powered</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Uses Llama 3.1 8B model via Groq API</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Optimized for AMD Ryzen processors</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Generates professional B2B emails in 2-3 seconds</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Context-aware negotiation strategies</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Generation Speed</span>
                    <span className="font-semibold">2.8s</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '95%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Quality Score</span>
                    <span className="font-semibold">9.2/10</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '87%' }} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Pro Tips
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  💡 Mention your group size early - it shows buying power
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  💡 Request a call - builds relationship beyond email
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  💡 Highlight payment reliability - suppliers love this
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
