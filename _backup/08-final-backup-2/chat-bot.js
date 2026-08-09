const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const OpenAI = require("openai");

// Stored securely with `firebase functions:secrets:set OPENAI_API_KEY`.
// Never hardcode the key here or in any file that ships to the browser.
const OPENAI_API_KEY = defineSecret("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");

// This is the ONLY place the dream guide's persona/behavior is defined.
// Keeping it server-side means it can't be inspected or overridden by
// anything sent from the browser.
const SYSTEM_PROMPT = `
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

exports.dreamGuideChat = onCall(
  { secrets: [OPENAI_API_KEY], cors: true },
  async (request) => {
    const messages = request.data && request.data.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      throw new HttpsError("invalid-argument", "messages must be a non-empty array.");
    }
    if (messages.length > MAX_TURNS) {
      throw new HttpsError("invalid-argument", "Conversation is too long.");
    }

    // Only pass through role/content, and only user/assistant roles -- never
    // trust the client to set a "system" message.
    const safeMessages = messages.map((m) => {
      if (
        !m ||
        (m.role !== "user" && m.role !== "assistant") ||
        typeof m.content !== "string" ||
        m.content.length === 0 ||
        m.content.length > MAX_MESSAGE_LENGTH
      ) {
        throw new HttpsError("invalid-argument", "Invalid message in conversation.");
      }
      return { role: m.role, content: m.content };
    });

    const client = new OpenAI({ apiKey: OPENAI_API_KEY.value() });

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...safeMessages],
        max_tokens: 200,
        temperature: 0.8,
      });

      const reply = completion.choices[0].message.content.trim();
      return { reply };
    } catch (err) {
      console.error("OpenAI request failed:", err);
      throw new HttpsError("internal", "The dream guide couldn't respond right now.");
    }
  }
);
