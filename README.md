# Text Summarizer

A small full-stack app that accepts unstructured text and returns a structured summary using an LLM API.

Built as part of the AI Developer Intern take-home assignment.

---

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **LLM:** Groq API (llama3-8b-8192)
- **Other:** dotenv, cors

---

## Setup & Running Locally

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd assignment-summarizer
```

### 2. Setup the backend

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and add your Groq API key:

```
GROQ_API_KEY=your_groq_api_key_here
```

Start the backend:

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### 3. Setup the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Which LLM API and Why

I used **Groq** with the `llama3-8b-8192` model for two reasons:

1. It has a generous free tier with high rate limits — reliable for demos without hitting quota issues.
2. Its API is OpenAI-compatible, which keeps the integration simple and easy to swap out if needed.

---

## Prompt Design

The prompt instructs the model to act as a strict JSON extractor, not a conversational assistant. It defines the exact output shape, constrains the sentiment to three allowed values, and explicitly forbids markdown or extra keys.

This reduces the chance of malformed output without needing complex post-processing. A lower temperature (0.3) further keeps the output consistent.

---

## Example Output

**Input:**
```
NASA's Perseverance rover has been exploring Mars since February 2021. 
It has collected rock samples, studied the Martian atmosphere, and 
helped test oxygen production on the planet. Scientists are excited 
about the potential clues these samples may offer about ancient life on Mars.
```

**Output:**
```json
{
  "summary": "NASA's Perseverance rover has been actively exploring Mars since 2021, collecting samples and conducting experiments that could reveal evidence of ancient life.",
  "keyPoints": [
    "Perseverance has collected rock samples and studied the Martian atmosphere",
    "The rover successfully tested oxygen production on Mars",
    "Scientists believe the samples may contain clues about ancient Martian life"
  ],
  "sentiment": "positive"
}
```
![Example Output](./Screenshot%202026-03-20%20022157.png)
---

## Known Trade-offs

- Used a simple fixed output schema instead of supporting user-defined fields — sufficient for the assignment scope.
- Kept a single backend route rather than splitting into service layers — easier to read and explain.
- No authentication — not needed for a local assignment demo.
- No test coverage — kept within the 1–2 hour time budget.

---

## What I Would Improve With More Time

- Add file upload support so users can summarize `.txt` files directly
- Stream the LLM response for faster perceived performance
- Add schema validation on the LLM output using `zod`
- Support batch processing of multiple texts
