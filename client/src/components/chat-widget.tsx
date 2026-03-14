import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "model";
  text: string;
}

const STARTER_CHIPS = [
  "What's Arshin working on now?",
  "Tell me about his AI experience",
  "What are his key projects?",
  "What makes him unique?",
];

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-end">
      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new content
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // "Try me!" nudge — show once per session, 2 s after load, auto-dismiss after 5 s
  useEffect(() => {
    if (sessionStorage.getItem("chatNudgeSeen")) return;

    const show = setTimeout(() => {
      setShowNudge(true);
      sessionStorage.setItem("chatNudgeSeen", "1");
    }, 2000);

    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!showNudge) return;
    const hide = setTimeout(() => setShowNudge(false), 5000);
    const dismiss = () => setShowNudge(false);
    document.addEventListener("click", dismiss, { once: true });
    return () => {
      clearTimeout(hide);
      document.removeEventListener("click", dismiss);
    };
  }, [showNudge]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading || isCoolingDown) return;

    const userMsg: Message = { role: "user", text: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    const attempt = async (): Promise<string> => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role === "model" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });

      if (!res.ok) {
        if (res.status === 429) throw new Error("rate_limited");
        throw new Error(`${res.status}`);
      }

      const data = await res.json();
      return data.text ?? "I couldn't generate a response. Please try again.";
    };

    try {
      const aiText = await attempt();
      setMessages([...nextMessages, { role: "model", text: aiText }]);
    } catch (err) {
      console.error("API Error:", err);
      const isRateLimited = err instanceof Error && err.message === "rate_limited";
      setMessages([
        ...nextMessages,
        {
          role: "model",
          text: isRateLimited
            ? "I'm getting a lot of questions right now. Please try again in a minute!"
            : "Sorry, I couldn't process that. Try again or reach out directly at arshin.sikka@u.nus.edu",
        },
      ]);
    } finally {
      setIsLoading(false);
      // 2-second cooldown after every request to prevent rapid-fire sends
      setIsCoolingDown(true);
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
      cooldownTimer.current = setTimeout(() => setIsCoolingDown(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showChips = messages.length === 0 && !isLoading;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed z-50 inset-0 md:inset-auto md:bottom-[88px] md:right-6 flex flex-col bg-slate-900 md:w-[400px] md:h-[520px] md:rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white/90" />
                <span className="font-semibold text-white text-sm tracking-tight">
                  Chat with ArshinAI ✨
                </span>
              </div>
              <span className="text-xs text-white/70 mt-0.5 pl-6">
                Powered by AI · Knows everything about my work
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
            {/* Welcome message */}
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm max-w-[85%] leading-relaxed">
                Hi! I'm an AI assistant on Arshin's portfolio. Ask me anything
                about his experience, projects, or background.
              </div>
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 items-end ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.role === "model" && (
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm max-w-[80%] leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-slate-800 text-slate-200 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter chips */}
          {showChips && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
              {STARTER_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="text-xs px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-5 pt-2 border-t border-slate-700 shrink-0">
            <div className="flex gap-2 items-center bg-slate-800 rounded-xl px-3 py-2.5">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? "Thinking…" : isCoolingDown ? "Just a moment…" : "Ask something…"}
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 outline-none"
                disabled={isLoading || isCoolingDown}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading || isCoolingDown}
                className="text-blue-400 hover:text-blue-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-0.5"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* "Try me!" nudge bubble */}
        {showNudge && !isOpen && (
          <div className="animate-nudge-in absolute bottom-full right-0 mb-3 pointer-events-none">
            <div className="px-3.5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-2xl rounded-br-sm whitespace-nowrap shadow-xl border border-slate-700 dark:border-slate-200">
              Try me! 👋
            </div>
            {/* Caret */}
            <div className="absolute top-full right-5 border-[6px] border-transparent border-t-slate-900 dark:border-t-white" />
          </div>
        )}

        {/* Hover tooltip (only when nudge is not showing) */}
        {!showNudge && !isOpen && (
          <div className="absolute bottom-full right-0 mb-2.5 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
            Ask my AI anything!
            <div className="absolute top-full right-4 border-4 border-transparent border-t-slate-900" />
          </div>
        )}

        <button
          onClick={() => setIsOpen((o) => !o)}
          className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 active:scale-95 text-white flex items-center justify-center transition-colors duration-200 chat-btn-hover ${!isOpen ? "animate-pulse-glow" : "shadow-xl"}`}
          aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
}
