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

async function main() {
  
  const prompt = `What is the current weather in Bangalore?`;  

  const result = await generate(prompt);
  console.log(result);
}  

main();
