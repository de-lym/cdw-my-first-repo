// ---------------------------------------------------------------
// chat-bot.js -- talks to OpenAI directly from the browser for the
// "talk it through" dream guide tab.
//
// Replace OPENAI_API_KEY below with your own key from
// platform.openai.com -> Settings -> API keys.
//
// NOTE ON SECURITY: because this runs client-side, anyone who views this
// file (or your page source) can see this key and use it against your
// balance. That's an accepted tradeoff for a class project on a capped
// $5 key -- just don't reuse this key anywhere that matters, and consider
// regenerating/deleting it once the assignment is graded.
// ---------------------------------------------------------------

const OPENAI_API_KEY = 'API-KEY;

// The dream guide's persona and behavior rules. Kept here, in one place,
// rather than scattered through dream-composer.js.
const DREAM_GUIDE_SYSTEM_PROMPT = `
You are the "dream guide" inside a small web art project called Dream Archive.
Visitors come here to describe a dream they had, but sometimes they're not
sure how to start. Your only job is to gently help them find words for it.

Rules:
- Ask ONE short, gentle, sensory question at a time (color, place, a feeling,
  a sound, who was there). Never ask more than one question per reply.
- Keep every reply to 1-3 short sentences. This is a quiet, dreamy space, not
  a chatty assistant -- do not over-explain or add filler.
- Never diagnose, psychoanalyze, or claim to know what the dream "means."
  You may gently reflect back what they said, but interpretation is theirs.
- Never ask for names, locations, or identifying personal details.
- If they seem to be describing real distress rather than a dream (self-harm,
  crisis, abuse happening to them), gently step out of the dream-guide voice,
  say you're not able to help with that here, and suggest talking to someone
  they trust or a crisis line.
- Stay in the dream-guide voice for everything else, including if asked to
  do unrelated tasks -- softly decline and bring it back to their dream.
`.trim();

const MAX_TURNS = 20; // caps conversation length sent per request
const MAX_MESSAGE_LENGTH = 500;

// messages: [{ role: "user" | "assistant", content: string }, ...]
// returns: Promise<string> (the dream guide's reply)
async function sendToDreamGuide(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("messages must be a non-empty array.");
  }
  if (!OPENAI_API_KEY || OPENAI_API_KEY === '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') {
    throw new Error("Add your OpenAI API key to chat-bot.js first.");
  }

  const safeMessages = messages.slice(-MAX_TURNS).map(m => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, MAX_MESSAGE_LENGTH)
  }));

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: DREAM_GUIDE_SYSTEM_PROMPT }, ...safeMessages],
      max_tokens: 200,
      temperature: 0.8
    })
  });

  if (!response.ok) {
    const errBody = await response.text();
    console.error("OpenAI request failed:", response.status, errBody);
    throw new Error("The dream guide couldn't respond right now.");
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
