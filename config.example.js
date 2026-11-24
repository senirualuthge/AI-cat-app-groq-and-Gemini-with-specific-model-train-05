// Template for the browser-readable config.
// Copy this file to config.js and fill in your key, or run:
//     node scripts/make-config.js
//
// config.js is gitignored so your key stays out of the repo.
// If it is missing, the app shows a clear error instead of failing silently.

window.APP_CONFIG = {
  GROQ_API_KEY: "",
  GROQ_MODEL: "openai/gpt-oss-20b",
  GROQ_API_URL: "https://api.groq.com/openai/v1/responses",
  GEMINI_API_KEY: "",
  GEMINI_MODEL: "gemini-2.5-flash",
};
