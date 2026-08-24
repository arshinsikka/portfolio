import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

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
    <p className="font-mono text-label uppercase text-ink-muted">Thinking</p>
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
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed top-0 left-0 z-50 flex h-dvh w-full flex-col overflow-hidden border-rule bg-paper md:inset-auto md:bottom-[84px] md:right-s5 md:h-[520px] md:w-[380px] md:rounded-sm md:border">
          {/* Header */}
          <div className="flex shrink-0 items-start justify-between gap-s4 border-b border-rule px-s4 py-s3">
            <div className="flex flex-col gap-s1">
              <span className="font-mono text-label uppercase text-ink">
                Chat with My AI ✨
              </span>
              <span className="font-mono text-label uppercase text-ink-muted">
                Powered by AI · Knows everything about my work
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="-mr-s1 grid h-7 w-7 shrink-0 place-items-center rounded-sm text-ink-muted transition-colors duration-150 hover:bg-rule hover:text-ink"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-auto space-y-s5 overflow-y-auto px-s4 py-s4">
            {/* Welcome message */}
            <div>
              <p className="font-mono text-label uppercase text-ink-muted">
                My AI
              </p>
              <p className="mt-s1 text-small text-ink">
                Hi! I'm an AI assistant on Arshin's portfolio. Ask me anything
                about his experience, projects, or background.
              </p>
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user"
                    ? "border-l-2 border-rule-strong pl-s3"
                    : undefined
                }
              >
                <p className="font-mono text-label uppercase text-ink-muted">
                  {msg.role === "user" ? "You" : "My AI"}
                </p>
                <p className="mt-s1 whitespace-pre-wrap text-small text-ink">
                  {msg.text}
                </p>
              </div>
            ))}

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter chips */}
          {showChips && (
            <div className="flex shrink-0 flex-wrap gap-s2 px-s4 pb-s3">
              {STARTER_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="rounded-sm border border-rule-strong px-s3 py-s1 font-mono text-label text-ink-muted transition-colors duration-150 hover:border-ink hover:text-ink"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="shrink-0 border-t border-rule px-s4 pt-s3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="flex items-center gap-s2 rounded-sm border border-rule-strong px-s3 py-s2 focus-within:border-accent">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isLoading
                    ? "Thinking…"
                    : isCoolingDown
                    ? "Just a moment…"
                    : "Ask something…"
                }
                className="flex-1 bg-transparent text-small text-ink outline-none placeholder:text-ink-muted"
                disabled={isLoading || isCoolingDown}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading || isCoolingDown}
                className="p-3 text-accent transition-colors duration-150 hover:text-accent-hover disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <div className="group fixed bottom-s5 right-s5 z-50">
        {/* "Try me!" nudge bubble */}
        {showNudge && !isOpen && (
          <div className="pointer-events-none absolute bottom-full right-0 mb-3 animate-nudge-in">
            <div className="whitespace-nowrap rounded-sm bg-ink px-s3 py-s2 font-mono text-label uppercase text-on-ink">
              Try me! 👋
            </div>
            {/* Caret */}
          </div>
        )}

        {/* Hover tooltip (only when nudge is not showing) */}
        {!showNudge && !isOpen && (
          <div className="pointer-events-none absolute bottom-full right-0 mb-s2 whitespace-nowrap rounded-sm bg-ink px-s3 py-s1 font-mono text-label uppercase text-on-ink opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            Ask my AI anything!
          </div>
        )}

        <button
          onClick={() => setIsOpen((o) => !o)}
          className={`h-12 w-12 place-items-center rounded-sm border border-rule-strong bg-paper text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-on-ink ${
            isOpen ? "hidden" : "grid"
          }`}
          aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        >
          {/*
            A mono "AI" wordmark, not an icon. A speech bubble is the universal
            mark for human customer support, which is precisely what this is not;
            and the conventional alternatives (sparkles, a robot face) are the
            gimmick. The site already states what things are in 11px tracked mono
            in the margin — this is that same device applied to the launcher, and
            it matches the theme toggle beside it in the navbar exactly.
          */}
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <span className="font-mono text-label uppercase">AI</span>
          )}
        </button>
      </div>
    </>
  );
}
