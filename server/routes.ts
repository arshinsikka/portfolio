import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { SYSTEM_PROMPT } from "../shared/system-prompt";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "API key not configured" });
      return;
    }

    const { messages } = req.body as {
      messages: Array<{ role: string; content: string }>;
    };

    try {
      const groqRes = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!groqRes.ok) {
        const errText = await groqRes.text();
        console.error("Groq error:", errText);
        res.status(groqRes.status).json({ error: errText });
        return;
      }

      const data = (await groqRes.json()) as any;
      const text =
        data.choices?.[0]?.message?.content ??
        "I couldn't generate a response. Please try again.";

      res.json({ text });
    } catch (err) {
      console.error("Chat route error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
