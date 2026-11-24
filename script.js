// setTimeout(() => {
//   console.log("First timeout finished");

//     setTimeout(() => {
//         console.log("Second timeout finished");
//     }, 1000);
//     setTimeout(() => {
//     console.log("third timeout finished");
//     }, 2000);
//     setTimeout(() => {
//     console.log("fourth timeout finished");
//     }, 3000);
//     setTimeout(() => {
//     console.log("fifth timeout finished"); 
//     },4000);   


// }, 2000);

// setTimeout(() => {
//   console.log("Fifth timeout finished");

//     setTimeout(() => {
//         console.log("Sixth timeout finished");

//             setTimeout(() => {
//                 console.log("Seventh timeout finished");

//                 setTimeout(() => {
//                     console.log("Eighth timeout finished");
//                     setTimeout(() => {
//                         console.log("Ninth timeout finished");
//                             setTimeout(() => {
//                                 console.log("Tenth timeout finished");
//                             },1000);
//                     }, 2000);

//                 }, 3000);

//             }, 4000);

//     }, 5000);

// }, 6000);


// Keys are NOT stored in this file. They come from config.js, which is
// generated from .env by `node scripts/make-config.js` and is gitignored.
const CONFIG = window.APP_CONFIG || {};

const GROQ_API_URL = CONFIG.GROQ_API_URL || "https://api.groq.com/openai/v1/responses";
const GROQ_MODEL = CONFIG.GROQ_MODEL || "openai/gpt-oss-20b";

const btnSend = document.getElementById("btnSend");
const txtInput = document.getElementById("txtInput");
const lblDisplay = document.getElementById("lblDisplay");

if (!CONFIG.GROQ_API_KEY) {
  addMessage(
    "No GROQ_API_KEY found. Create a .env file, add your key, then run: node scripts/make-config.js",
    "bot"
  );
  btnSend.disabled = true;
}

async function askModel() {
  const question = txtInput.value.trim();
  if (!question) return;

  btnSend.disabled = true;
  console.log("Sending:", question);

  const requestOptions = {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + CONFIG.GROQ_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      input: question
    })
  };

  try {
    const response = await fetch(GROQ_API_URL, requestOptions);

    if (!response.ok) {
      throw new Error("HTTP " + response.status + " - " + (await response.text()));
    }

    const result = await response.json();
    console.log("Raw response:", result);

    const message = result.output.find((item) => item.type === "message");
    const answer = message?.content?.find((part) => part.type === "output_text")?.text;

    addMessage(question, "user");
    addMessage(answer || "No answer returned.", "bot");
    txtInput.value = "";
  } catch (error) {
    console.error(error);
    addMessage("Error: " + error.message, "bot");
  } finally {
    btnSend.disabled = false;
    txtInput.focus();
  }
}

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = "message " + sender;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  message.appendChild(bubble);
  lblDisplay.appendChild(message);
  lblDisplay.scrollTop = lblDisplay.scrollHeight;
}

btnSend.addEventListener("click", askModel);
txtInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") askModel();
});