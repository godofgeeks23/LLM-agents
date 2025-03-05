const generate = require("./gemini_client");

function getWeatherDetails(city = "") {
  if (city.toLowerCase() === "bangalore") {
    return {
      temperature: 30,
      humidity: 80,
    };
  } else if (city.toLowerCase() === "chennai") {
    return {
      temperature: 25,
      humidity: 90,
    };
  } else if (city.toLowerCase() === "mumbai") {
    return {
      temperature: 35,
      humidity: 75,
    };
  }
}

const chatHistory = [{"role": "user", "user": "Hey lets start"}];

const availableTools = {
  getWeatherDetails: getWeatherDetails,
};

var current_trial = 1;
const total_trials = 2;

async function main() {
  const prompt = `What is the weather in Bangalore?`;
  console.log("User prompt: ", prompt);
  while (current_trial <= total_trials) {
    console.log("Trial: ", current_trial);

    console.log("Chat History:", JSON.stringify(chatHistory, null, 2));

    chatHistory.push({ type: "user", user: prompt });
    const unclean_result = await generate(prompt, chatHistory);
    const result = unclean_result.replace(/^```json/, '').replace(/```$/, '').trim();
    console.log("AI Response: ", result);
    console.log(typeof result);

    chatHistory.push(JSON.parse(result));

    current_trial++;
    // const response = JSON.parse(result);
    const response = result;
    if (response.type === "action") {
      const tool = availableTools[response.function];
      console.log("Tool: ", response.function);
      const output = tool(response.input);
      console.log("Output: ", output);
    }
  }
}

main();
