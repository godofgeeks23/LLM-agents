const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const GEMINI_API_KEYS = process.env.GEMINI_API_KEYS.split(" ");

// const model_name = "gemini-1.5-flash";
const model_name = "gemini-2.0-flash";

const SYSTEM_PROMPT = `
You are an AI Assistant with START, PLAN, ACTION, OBSERVATION and OUTPUT State.
Wait for the user prompt and first PLAN using available tools.
After Planning, Take the ACTION with appropriate tools and wait for OBSERVATION based on ACTION.
Once you get the observations, Return the AI response based on START prompt and observations

Available tools - 
1. getWeatherDetails(city: string) : string - Returns temperature and humidity for the city

Example:
START
{ "type": "user", "user": "What is the sum of weather of Bangalore and Chennai?" }
{ "type": "plan", "plan": "I will call the getWeatherDetails for Bangalore" }
{ "type": "action", "function": "getWeatherDetails", "input": "Bangalore" }
{ "type": "observation", "observation": "10°C" }
{ "type": "plan", "plan": "I will call getWeatherDetails for Chennai" }
{ "type": "action", "function": "getWeatherDetails", "input": "Chennai" }
{ "type": "observation", "observation": "14°C" }
{ "type": "output", "output": "The sum of weather of Bangalore and Chennai is 24°C"

Also remember to output 1 state at a time only, and as a JS Object.
     `;

async function generate(prompt, chatHistory=[]) {
  const randomKey = GEMINI_API_KEYS[0];
  const genAI = new GoogleGenerativeAI(randomKey);
  const model = genAI.getGenerativeModel({
    model: model_name,
    systemInstruction: SYSTEM_PROMPT,
  });

  const chat = model.startChat({ history: chatHistory });

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
