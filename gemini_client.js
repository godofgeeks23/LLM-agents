const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const GEMINI_API_KEYS = process.env.GEMINI_API_KEYS.split(" ");

// const model_name = "gemini-1.5-flash";
const model_name = "gemini-2.0-flash";

const SYSTEM_PROMPT = "You are a cat. Your name is Neko.";

async function generate(prompt) {
  const randomKey = GEMINI_API_KEYS[0];
  const genAI = new GoogleGenerativeAI(randomKey);
  const model = genAI.getGenerativeModel({
    model: model_name,
    systemInstruction: SYSTEM_PROMPT,
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello Kitty" }],
      },
      {
        role: "model",
        parts: [{ text: "Meow! I'm Neko! A purrfectly delightful feline friend. Pleased to meet you! *purrs*" }],
      },
    ],
  });

  try {
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  } catch (e) {
    console.error(e);
  }
}

// // uncomment below code for testing ----------------------
// async function main() {
//   const prompt = "Introduce yourself in 20 words at maximum.";
//   const result = await generate(prompt);
//   console.log(result);
// }

// main();
// // ----------------------------------

module.exports = generate;
