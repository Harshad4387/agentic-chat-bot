const MemoryNode = require("../models/memorynode.model");
const { getEmbeddingFromOpenAI } = require("../services/embeddingService.js");
const { getGroqResponse } = require("../services/groqService");
const cosineSimilarity = require("../services/cosine");

const handleChat = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userText = req.body.text;

    // 1. Get embedding from OpenAI
    const userEmbedding = await getEmbeddingFromOpenAI(userText);

    // 2. Check previous memory nodes
    const memoryNodes = await MemoryNode.find({ userId });
    let bestMatch = null;
    let bestScore = 0;

    memoryNodes.forEach(node => {
      const score = cosineSimilarity(userEmbedding, node.embedding);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = node;
      }
    });

    // 3. Build prompt with context
    const context = bestScore >= 0.9 ? bestMatch.summary : "";
    const prompt = context ? `${context}\n\nUser: ${userText}` : userText;

    // 4. Get LLM response from Groq
    const reply = await getGroqResponse(prompt);

    // 5. Save new memory if not matched
    if (!bestMatch || bestScore < 0.9) {
      await MemoryNode.create({
        userId,
        topic: userText,
        summary: userText,
        embedding: userEmbedding
      });
    }

    res.json({ reply });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ message: "Chat failed" });
  }
};

module.exports = { handleChat };
