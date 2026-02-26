import { FormEvent, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { chatWithAI } from '@/lib/aiChatbot';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const starterPrompts = [
  'Which group should I join?',
  'When is the best time to order rice?',
  'Can you negotiate better price with this supplier?',
  'Show me my savings this month',
];

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi, I am your AI procurement assistant. Ask me about groups, timing, pricing, or savings.',
    },
  ]);

  const location = useLocation();
  const { user } = useAuth();

  const context = useMemo(
    () => ({
      storeName: user?.storeName,
      storeType: user?.storeType,
      route: location.pathname,
      monthlySavings: user?.groupsJoined ? user.groupsJoined * 3000 : undefined,
    }),
    [location.pathname, user],
  );

  const sendMessage = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await chatWithAI(trimmed, context);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: reply,
        },
      ]);
    } catch (error) {
      console.error(error);
      toast.error('AI assistant unavailable right now.');
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: 'I am unavailable for a moment. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[70] w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <div>
                <div className="text-sm font-semibold">AI Procurement Assistant</div>
                <div className="text-xs opacity-90">Powered by Llama 3.1</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/15">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 border-b bg-gray-50 flex flex-wrap gap-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => void sendMessage(prompt)}
                className="text-xs px-2 py-1 rounded-full border border-gray-200 hover:bg-white"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="p-3 space-y-3 overflow-y-auto max-h-[42vh] bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.role === 'user' ? 'text-right' : 'text-left'}
              >
                <div
                  className={[
                    'inline-block max-w-[92%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap',
                    message.role === 'user'
                      ? 'bg-black text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-900 rounded-bl-sm',
                  ].join(' ')}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-xl rounded-bl-sm text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="p-3 border-t bg-white flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI about pricing, groups, or savings..."
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 w-10 rounded-xl bg-purple-600 text-white disabled:opacity-50 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-4 sm:right-6 z-[70] h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl flex items-center justify-center"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  );
}
