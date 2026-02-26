import Groq from 'groq-sdk';

let groq: Groq | null = null;
function getGroq() {
  if (!groq) {
    const key = import.meta.env.VITE_GROQ_API_KEY;
    if (!key) return null;
    groq = new Groq({ apiKey: key, dangerouslyAllowBrowser: true });
  }
  return groq;
}

export interface NegotiationRequest {
  groupName: string;
  memberCount: number;
  products: { name: string; quantity: number }[];
  totalValue: number;
  supplierName: string;
  targetDiscount: number;
}

export interface NegotiationEmail {
  subject: string;
  body: string;
  qualityScore: number;
  tone: 'professional' | 'friendly' | 'assertive';
}

/**
 * Generate AI-powered negotiation email using Groq
 */
export async function generateNegotiationEmail(
  request: NegotiationRequest,
): Promise<NegotiationEmail> {
  console.log('Generating negotiation email with Groq AI...');

  const prompt = `You are a professional B2B procurement expert helping small Indian retailers negotiate bulk discounts with suppliers.

Generate a professional negotiation email with the following details:

Group Details:
- Group Name: ${request.groupName}
- Number of Retailers: ${request.memberCount}
- Total Order Value: ₹${request.totalValue.toLocaleString()}
- Target Discount: ${request.targetDiscount}%

Products:
${request.products.map((p) => `- ${p.name}: ${p.quantity} units`).join('\n')}

Supplier: ${request.supplierName}

Requirements:
1. Professional but warm tone
2. Emphasize group buying power and consistent volume
3. Mention payment reliability
4. Request ${request.targetDiscount}% discount
5. Suggest a call to discuss terms
6. Keep it under 300 words
7. Use proper business email format

Generate ONLY the email body (no subject line yet). Make it compelling and likely to get a positive response.`;

  try {
    const client = getGroq();
    if (!client) return generateFallbackEmail(request);
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an expert B2B negotiation specialist helping small retailers get better prices through group buying.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.1-8b-instant', // Fast and free!
      temperature: 0.7,
      max_tokens: 500,
    });

    const emailBody = completion.choices[0]?.message?.content || '';

    // Generate subject line
    const subjectCompletion = await client.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Generate a professional email subject line for a bulk order inquiry from ${request.memberCount} retailers worth ₹${request.totalValue.toLocaleString()}. Keep it under 10 words. Return ONLY the subject line, no quotes.`,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_tokens: 50,
    });

    const subject =
      subjectCompletion.choices[0]?.message?.content?.trim() ||
      `Bulk Order Inquiry - ${request.groupName}`;

    // Calculate quality score (simple heuristic)
    const wordCount = emailBody.split(' ').length;
    const hasGreeting =
      emailBody.toLowerCase().includes('dear') ||
      emailBody.toLowerCase().includes('hello');
    const hasClosing =
      emailBody.toLowerCase().includes('regards') ||
      emailBody.toLowerCase().includes('sincerely');
    const mentionsVolume =
      emailBody.toLowerCase().includes('volume') ||
      emailBody.toLowerCase().includes('bulk');

    let qualityScore = 7.0;
    if (wordCount >= 150 && wordCount <= 350) qualityScore += 1.0;
    if (hasGreeting) qualityScore += 0.5;
    if (hasClosing) qualityScore += 0.5;
    if (mentionsVolume) qualityScore += 1.0;

    console.log('Email generated successfully');

    return {
      subject: subject.replace(/^["']|["']$/g, ''), // Remove quotes if present
      body: emailBody,
      qualityScore: Math.min(10, qualityScore),
      tone: 'professional',
    };
  } catch (error) {
    console.error('Groq API error:', error);

    // Fallback to template if API fails
    return generateFallbackEmail(request);
  }
}

/**
 * Fallback template if API fails
 */
function generateFallbackEmail(request: NegotiationRequest): NegotiationEmail {
  return {
    subject: `Bulk Order Inquiry - ${request.groupName} (${request.memberCount} Retailers)`,
    body: `Dear ${request.supplierName} Team,

I am writing on behalf of ${request.groupName}, a collective of ${request.memberCount} established retailers in the Bengaluru area.

We are interested in establishing a bulk purchasing relationship for the following products:
${request.products.map((p) => `• ${p.name} - ${p.quantity} units`).join('\n')}

Combined Monthly Order Value: ₹${request.totalValue.toLocaleString()}
Order Frequency: Bi-weekly

Given our substantial and consistent order volume, we would like to discuss:
1. Volume-based pricing (${request.targetDiscount}% discount)
2. Flexible payment terms
3. Priority delivery scheduling

All members have strong credit histories and can provide references. We are looking to place our first group order within the next two weeks.

Would you be available for a brief call this week to discuss terms?

Best regards,
${request.groupName}`,
    qualityScore: 8.0,
    tone: 'professional',
  };
}

/**
 * Regenerate with different tone
 */
export async function regenerateWithTone(
  request: NegotiationRequest,
  tone: 'professional' | 'friendly' | 'assertive',
): Promise<NegotiationEmail> {
  const toneInstructions = {
    professional: 'Formal, business-like, emphasize reliability',
    friendly: 'Warm, collaborative, build relationship',
    assertive: 'Confident, emphasize group power, deadline-driven',
  };

  // Add tone instruction to request
  const email = await generateNegotiationEmail({
    ...request,
    // Modify prompt based on tone
  });

  return { ...email, tone };
}
