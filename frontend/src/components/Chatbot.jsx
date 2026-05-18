import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minus, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { matchIntent } from '../lib/chatbotIntents';

const SESSION_KEY = 'ethioexplore_chat';

function formatMessage(text) {
  // Convert **bold**, newlines, and bullet points to JSX-friendly HTML
  return text
    .split('\n')
    .map((line, i) => {
      // Bold: **text**
      const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j} className="font-bold text-white/95">{part}</strong> : part
      );
      return <span key={i} className="block">{parts}</span>;
    });
}

export default function Chatbot() {
  const { t, language } = useLanguage();

  const initMessages = () => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return [{ id: 1, role: 'bot', text: t('chatbot.welcome'), ts: Date.now() }];
  };

  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState(initMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Persist messages
  useEffect(() => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages)); } catch { /* ignore */ }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, minimized]);

  // Focus input when opened
  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, minimized]);

  // Track unread when closed
  useEffect(() => {
    if (!open || minimized) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.role === 'bot') setUnread((u) => u + 1);
    }
  }, [messages]);

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
    setUnread(0);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');

    const userMsg = { id: Date.now(), role: 'user', text, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    // Simulate typing delay for realism
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));

    const botText = matchIntent(text, language);
    const botMsg = { id: Date.now() + 1, role: 'bot', text: botText, ts: Date.now() };
    setMessages((prev) => [...prev, botMsg]);
    setTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* Floating Bubble */}
      {!open && (
        <button
          id="chatbot-bubble"
          onClick={handleOpen}
          aria-label="Open chat assistant"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#013220] text-white shadow-xl shadow-black/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 border-2 border-white/20"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#013220] animate-ping opacity-25" />
          <MessageCircle className="h-6 w-6 relative z-10" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#070e1a]">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div
          id="chatbot-panel"
          className="fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl border border-white/12 bg-[#0a1628]/95 backdrop-blur-xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          style={{
            maxHeight: minimized ? '64px' : '520px',
            transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#013220]/60 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#013220] border-2 border-[#c8e6d5]/40 flex items-center justify-center">
                <Bot className="h-4 w-4 text-[#c8e6d5]" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">{t('chatbot.title')}</p>
                <p className="text-emerald-400/80 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized((v) => !v)}
                aria-label={t('chatbot.minimize')}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label={t('chatbot.close')}
                className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!minimized && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border ${
                      msg.role === 'bot'
                        ? 'bg-[#013220] border-[#c8e6d5]/30'
                        : 'bg-white/10 border-white/20'
                    }`}>
                      {msg.role === 'bot'
                        ? <Bot className="h-3.5 w-3.5 text-[#c8e6d5]" />
                        : <User className="h-3.5 w-3.5 text-white/70" />
                      }
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === 'bot'
                        ? 'bg-white/8 text-white/85 rounded-tl-sm border border-white/10'
                        : 'bg-[#013220]/70 text-white/90 rounded-tr-sm border border-[#013220]/40'
                    }`}>
                      <div className="space-y-0.5">{formatMessage(msg.text)}</div>
                      <p className="text-[9px] text-white/25 mt-1.5 text-right">{formatTime(msg.ts)}</p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#013220] border border-[#c8e6d5]/30 flex items-center justify-center shrink-0">
                      <Bot className="h-3.5 w-3.5 text-[#c8e6d5]" />
                    </div>
                    <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/40"
                          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-3 py-3 border-t border-white/10 bg-white/3 shrink-0">
                <div className="flex items-center gap-2 bg-white/6 rounded-xl border border-white/10 px-3 py-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('chatbot.placeholder')}
                    className="flex-1 bg-transparent text-white/85 text-xs placeholder-white/30 outline-none"
                    maxLength={300}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || typing}
                    aria-label={t('chatbot.send')}
                    className="w-7 h-7 rounded-lg bg-[#013220] flex items-center justify-center text-white disabled:opacity-40 hover:bg-[#025430] transition-colors shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
