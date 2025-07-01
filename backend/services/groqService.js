const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const getGroqResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Groq response error:", error.message);
    return "Sorry, Groq is currently overloaded. Please try again later.";
  }
};

module.exports = { getGroqResponse };
