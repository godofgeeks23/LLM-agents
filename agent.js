const generate = require("./gemini_client");

function getWeatherDetails(city = '') {
    if(city.toLowerCase() === 'bangalore') {
        return {
            temperature: 30,
            humidity: 80
        }
    } else if(city.toLowerCase() === 'chennai') {
        return {
            temperature: 25,
            humidity: 90
        }
    } else if (city.toLowerCase() === 'mumbai') {
        return {
            temperature: 35,
            humidity: 75
        }
    }
}

const AGENT_PROMPT = `
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
     `;

async function main() {
  
//   const prompt = `What is the weather in Bangalore?`;  
const prompt = "Who are you?";

  const result = await generate(prompt);
  console.log(result);
}  

main();
