const generate = require("../gemini_client");

async function main() {
  const prompt = "Introduce yourself in 20 words or less.";

  const result = await generate(prompt);
  console.log(result);
}

main();
