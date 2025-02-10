const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 

async function askPrompt(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text; // Return the generated text
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw error; // Throw error to be caught by the calling function
  }
}

module.exports = askPrompt;
