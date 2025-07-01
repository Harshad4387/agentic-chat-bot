const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
});

const getEmbeddingFromOpenAI = async (text) => {
  try {
    const result = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text
    });
    return result.data[0].embedding;
  } catch (error) {
    console.error("OpenAI Embedding error:", error.message);
    throw error;
  }
};

module.exports = { getEmbeddingFromOpenAI };
