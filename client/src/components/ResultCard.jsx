import React from "react";

export default function ResultCard({ result }) {
  const sentimentColor = {
    positive: "#22c55e",
    neutral: "#f59e0b",
    negative: "#ef4444",
  };

  return (
    <div style={styles.card}>
      <div style={styles.section}>
        <h3 style={styles.label}>Summary</h3>
        <p style={styles.text}>{result.summary}</p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.label}>Key Points</h3>
        <ul style={styles.list}>
          {result.keyPoints.map((point, i) => (
            <li key={i} style={styles.listItem}>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h3 style={styles.label}>Sentiment</h3>
        <span
          style={{
            ...styles.badge,
            backgroundColor: sentimentColor[result.sentiment] || "#6b7280",
          }}
        >
          {result.sentiment}
        </span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "24px",
    marginTop: "24px",
    backgroundColor: "#f9fafb",
  },
  section: {
    marginBottom: "16px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#6b7280",
    marginBottom: "6px",
  },
  text: {
    fontSize: "15px",
    color: "#111827",
    lineHeight: "1.6",
  },
  list: {
    paddingLeft: "20px",
    margin: 0,
  },
  listItem: {
    fontSize: "15px",
    color: "#111827",
    marginBottom: "4px",
    lineHeight: "1.6",
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "999px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
};
