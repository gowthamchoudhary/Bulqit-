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

export interface ChatContext {
  storeName?: string;
  storeType?: string;
  route?: string;
  monthlySavings?: number;
}

export async function chatWithAI(message: string, context: ChatContext) {
  const client = getGroq();
  if (!client) return 'AI assistant is not configured. Please set the GROQ API key.';

  const response = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are a helpful procurement assistant for restaurant/hotel owners.
You help them save money through smart group buying.
Be concise and actionable.
If context is provided, use it.
Context: ${JSON.stringify(context)}`,
      },
      { role: 'user', content: message },
    ],
    model: 'llama-3.1-8b-instant',
    temperature: 0.5,
    max_tokens: 300,
  });

  return response.choices[0]?.message?.content ?? 'I could not generate a response.';
}
