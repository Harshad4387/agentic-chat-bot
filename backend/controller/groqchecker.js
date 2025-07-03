const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const ChatMessage = require('../models/ChatMessage.model.js');
const userModel = require("../models/user.model.js");

const groqChecker = async (req, res) => {
  try {
    const userId = req.user._id;
    const { text }= req.body;

    // 1. Get last 10 messages for this user
    const history = await ChatMessage.find({ userId })
      .sort({ timestamp: 1 }) // oldest to newest
      .limit(10);

    // 2. Build message array
    const messages = history.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add the latest user input
    messages.push({ role: 'user', content: text });

    // 3. Query Groq
    const response = await openai.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a helpful assistant..." },
        ...messages
      ],
    });

    const reply = response.choices[0].message.content;

    // 4. Save new messages
    await ChatMessage.create([
      { userId, role: 'user', content: text },
      { userId, role: 'assistant', content: reply },
    ]);

    res.json({ reply });

  } catch (err) {
    console.error("Groq error:", err.message);
    res.status(500).json({ error: "Groq API failed" });
  }
};


module.exports = { groqChecker };
