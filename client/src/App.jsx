import React, { useState } from "react";
import ResultCard from "./components/ResultCard.jsx";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    if (!text.trim()) {
      setError("Please enter some text before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("https://assignment-summarizer-production-d947.up.railway.app/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setResult(data);
    } catch {
      setError("Could not reach the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Text Summarizer</h1>
      <p style={styles.subtitle}>
        Paste any unstructured text and get a structured summary powered by Groq AI.
      </p>

      <textarea
        style={styles.textarea}
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
      />

      <button
        style={{
          ...styles.button,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Summarize"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {result && <ResultCard result={result} />}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "680px",
    margin: "60px auto",
    padding: "0 24px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#6b7280",
    marginBottom: "24px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "15px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    color: "#111827",
  },
  button: {
    marginTop: "12px",
    padding: "10px 24px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
  },
  error: {
    marginTop: "16px",
    color: "#ef4444",
    fontSize: "14px",
  },
};
