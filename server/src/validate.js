export function validateInput(text) {
  if (!text || typeof text !== "string") {
    return "Input must be a string.";
  }
  if (text.trim().length === 0) {
    return "Input text cannot be empty.";
  }
  if (text.trim().length < 20) {
    return "Input text is too short to summarize.";
  }
  return null; // null means valid
}
