// 📁 File: backend/services/groq.service.js
const OpenAI = require("openai");
const ChatMessage = require("../models/ChatMessage.model.js");

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const groqChecker = async (req, res) => {
  try {
    const { text, userId } = req.body;

    const history = await ChatMessage.find({ userId }).sort({ timestamp: 1 }).limit(10);
    const messages = history.map(msg => ({ role: msg.role, content: msg.content }));
    messages.push({ role: "user", content: text });

    const response = await openai.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a helpful assistant..." },
        ...messages
      ],
    });

    const reply = response.choices[0].message.content;

    await ChatMessage.create([
      { userId, role: "user", content: text },
      { userId, role: "assistant", content: reply },
    ]);

    res.json({ reply });
  } catch (err) {
    console.error("Groq error:", err.message);
    res.status(500).json({ error: "Groq API failed" });
  }
};

module.exports = { groqChecker };