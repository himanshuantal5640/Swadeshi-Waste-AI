const axios = require("axios");
const Chat = require("../models/Chat");

async function callGemini(prompt) {
  const apiKey = process.env.OPENAI_API_KEY; 
  if (!apiKey) throw new Error("OPENAI_API_KEY missing in .env");

  const url = "https://openrouter.ai/api/v1/chat/completions";

  const body = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are EcoVision, an eco-friendly AI assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.4,
    max_tokens: 500
  };

  const response = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "EcoVision-App"
    }
  });

  const result = response.data?.choices?.[0]?.message?.content;
  return result || "Sorry, I couldn't generate a response.";
}

exports.sendMessage = async (req, res) => {
  try {
    const email = req.user?.email;
    const { message, chatId } = req.body;

    if (!email || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    let chat = chatId ? await Chat.findById(chatId) : null;
    if (!chat) chat = await Chat.create({ email, messages: [] });

    chat.messages.push({ role: "user", content: message });
    await chat.save();

    const recent = chat.messages.slice(-10);
    const textConversation = recent
      .map(m => `${m.role === "user" ? "User" : "EcoChat"}: ${m.content}`)
      .join("\n");

    const systemInstruction = `
You are EcoVision, an eco-friendly AI assistant focused on sustainability, climate awareness, waste management, and environmental protection.

### Formatting Rules (IMPORTANT)
- Use clear Markdown formatting.
- Each numbered step must start on its own new line.
- Add one blank line between steps.
- Use bullet points, headings, and spacing for readability.
- NEVER merge multiple steps into one paragraph.
- Output must be readable on mobile screens.


### Behavioral Rules
- Only answer environmental, sustainability, climate, ecology, and waste-management topics.
- Redirect the user politely if they ask unrelated questions.
- Keep tone friendly, inspiring, and supportive.
- Provide practical, actionable, real-world tips.
- Ensure explanations are simple, clear, and scientifically correct.
- Do not break character.

### Your Goal
Educate users about nature, sustainability, pollution reduction, waste handling, and eco-friendly lifestyles. Help them take meaningful steps toward a cleaner planet.
`;
    const prompt = `${systemInstruction}\nConversation:\n${textConversation}\nEcoChat:`;

    const reply = await callGemini(prompt);

    chat.messages.push({ role: "assistant", content: reply });
    await chat.save();

    return res.json({
      success: true,
      reply,
      chatId: chat._id
    });

  } catch (err) {
    console.error("Chat error:", err?.response?.data || err);
    return res.status(500).json({
      success: false,
      message: "Chat failed",
      error: err?.response?.data || err.message
    });
  }
};


exports.getChats = async (req, res) => {
  try {
    const emailParam = req.params.email;
    const callerEmail = req.user?.email;

  
    if (!callerEmail || callerEmail !== decodeURIComponent(emailParam)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const chats = await Chat.find({ email: callerEmail }).sort({ createdAt: -1 });

    res.json({ success: true, chats });
  } catch (err) {
    console.error("getChats error:", err);
    res.status(500).json({ success: false });
  }
};
