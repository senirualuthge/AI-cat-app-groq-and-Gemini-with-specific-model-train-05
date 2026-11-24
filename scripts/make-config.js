// Generates config.js from .env for the static browser app.
// Usage: node scripts/make-config.js
//
// .env  ->  config.js  (gitignored, loaded by index.html before script.js)

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env");
const outPath = path.join(root, "config.js");

if (!fs.existsSync(envPath)) {
  console.error("No .env found. Copy .env.example to .env and fill in your keys.");
  process.exit(1);
}

const env = {};
for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  let value = trimmed.slice(eq + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  env[key] = value;
}

const config = {
  GROQ_API_KEY: env.GROQ_API_KEY || "",
  GROQ_MODEL: env.GROQ_MODEL || "openai/gpt-oss-20b",
  GROQ_API_URL: env.GROQ_API_URL || "https://api.groq.com/openai/v1/responses",
  GEMINI_API_KEY: env.GEMINI_API_KEY || "",
  GEMINI_MODEL: env.GEMINI_MODEL || "gemini-2.5-flash",
};

const body = `// AUTO-GENERATED from .env by scripts/make-config.js — do not edit or commit.
window.APP_CONFIG = ${JSON.stringify(config, null, 2)};
`;

fs.writeFileSync(outPath, body);
const missing = Object.entries(config)
  .filter(([k, v]) => !v && k.endsWith("_KEY"))
  .map(([k]) => k);
console.log("Wrote config.js");
if (missing.length) console.warn("Warning: empty value(s): " + missing.join(", "));
