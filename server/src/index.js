import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { summarizeText } from "./llm.js";
import { validateInput } from "./validate.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/api/summarize", async (req, res) => {
  const text = req.body?.text;

  const error = validateInput(text);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const result = await summarizeText(text.trim());
    return res.json(result);
  } catch (err) {
    console.error("Summarization error:", err.message);
    return res.status(500).json({ error: "Failed to summarize text. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
