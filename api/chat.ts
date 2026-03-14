import type { IncomingMessage, ServerResponse } from "http";
import { SYSTEM_PROMPT } from "../shared/system-prompt";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "API key not configured" }));
    return;
  }

  // Parse body
  let messages: Array<{ role: string; content: string }>;
  try {
    const raw = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];
      req.on("data", (chunk: Buffer) => chunks.push(chunk));
      req.on("end", () => resolve(Buffer.concat(chunks).toString()));
      req.on("error", reject);
    });
    ({ messages } = JSON.parse(raw) as {
      messages: Array<{ role: string; content: string }>;
    });
  } catch (parseErr) {
    console.error("Body parse error:", parseErr);
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid request body" }));
    return;
  }

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
      res.writeHead(groqRes.status, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: errText }));
      return;
    }

    const data = (await groqRes.json()) as any;
    const text =
      data.choices?.[0]?.message?.content ??
      "I couldn't generate a response. Please try again.";

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ text }));
  } catch (err) {
    console.error("Handler error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
  }
}
