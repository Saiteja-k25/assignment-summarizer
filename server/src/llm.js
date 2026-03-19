import Groq from "groq-sdk";
import dotenv from "dotenv";
import { buildPrompt } from "./prompt.js";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function summarizeText(text) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: buildPrompt(text),
      },
    ],
    temperature: 0.3,
  });

  const raw = response.choices[0]?.message?.content;

  if (!raw) {
    throw new Error("Empty response from LLM.");
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("LLM returned malformed JSON. Could not parse response.");
  }
}
