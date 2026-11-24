# AI Cat App — Groq + Gemini

A small chat front-end that talks to the Groq API.

## Setup

1. Install dependencies — none. It is plain HTML/CSS/JS.

2. Create a `.env` file in the project root and add your keys:

   ```
   GROQ_API_KEY=your_key_here
   GROQ_MODEL=openai/gpt-oss-20b
   GROQ_API_URL=https://api.groq.com/openai/v1/responses

   GEMINI_API_KEY=your_key_here
   GEMINI_MODEL=gemini-2.5-flash
   ```

   `.env` is gitignored, so it stays on your machine.

3. Generate the browser config and open the app:

   ```bash
   node scripts/make-config.js
   open index.html
   ```

## How the config works

`.env` holds your real keys and is **gitignored**. The browser cannot read `.env`
directly, so `scripts/make-config.js` copies it into `config.js`, which
`index.html` loads before `script.js`.

| File | Committed? | Purpose |
| --- | --- | --- |
| `.env` | no | Real keys (gitignored) |
| `config.js` | no | Generated, read by the browser (gitignored) |
| `config.example.js` | yes | Template for `config.js` |

## Security note

This app calls the Groq API **from the browser**, so whatever key `config.js`
contains is downloadable by anyone who visits the deployed page. Keeping it out
of git stops the key leaking through the repository, but it does not make it
secret on a public site. For real deployment, put the key behind a small server
or serverless function that proxies the request.
