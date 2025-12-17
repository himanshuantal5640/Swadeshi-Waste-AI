const WasteValue = require("../models/WasteValue");
const { OpenAI } = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

async function callAI(prompt) {
  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a Waste-to-Value Advisor for Indian eco-entrepreneurs. Always return structured JSON first, then a short human summary."
      },
      { role: "user", content: prompt }
    ],
    temperature: 0.3,
    max_tokens: 700
  });

  return resp.choices[0].message.content;
}

function tryParseStructured(text) {
  if (!text || typeof text !== "string") return null;
  const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/m);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return null;
    }
  }
  return null;
}

exports.generate = async (req, res) => {
  try {
    const email = req.user?.email;
    const { item } = req.body;

    if (!email || !item) {
      return res.status(400).json({ success: false, message: "Missing email or item" });
    }

    const prompt = `
You are a Waste-to-Value Business Advisor for India.

User will enter ONE waste item name.
You must return:

1. FIRST → A PURE JSON OBJECT (no markdown, no commentary inside JSON)
2. AFTER JSON → A short human-readable business explanation (2–5 lines)

JSON FORMAT (STRICT):
{
  "products": [ {"name":"...", "description":"..."} ],
  "upcyclingSteps": ["step1", "step2", "..."],
  "toolsRequired": ["tool1", "tool2"],
  "estimatedCostINR": { "low": number, "typical": number, "high": number },
  "marketDemandIndia": "low|medium|high",
  "businessIdeaShort": "one-sentence idea",
  "notes": "safety, hygiene, or regulatory concerns"
}

Rules:
- Do NOT include emojis.
- Keep steps practical for India.
- Costs must be realistic for small businesses.
- Market demand must reflect Indian conditions.

USER ITEM:
${item}
`;

    const aiText = await callAI(prompt);

    const structured =
      tryParseStructured(aiText) || {
        products: [],
        upcyclingSteps: [],
        toolsRequired: [],
        estimatedCostINR: { low: 0, typical: 0, high: 0 },
        marketDemandIndia: "unknown",
        businessIdeaShort: "",
        notes: ""
      };

    const doc = await WasteValue.create({
      email,
      query: item,
      structuredResult: structured,
      rawText: aiText
    });

    return res.json({
      success: true,
      id: doc._id,
      structured,
      rawText: aiText
    });
  } catch (err) {
    console.error("wasteValue.generate error:", err?.response?.data || err.message || err);
    return res.status(500).json({
      success: false,
      message: "Failed to generate",
      error: err?.response?.data || err.message
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const emailParam = req.params.email;
    const callerEmail = req.user?.email;

    if (!callerEmail || callerEmail !== decodeURIComponent(emailParam)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const items = await WasteValue.find({ email: callerEmail })
      .sort({ createdAt: -1 })
      .limit(100);

    return res.json({ success: true, items });
  } catch (err) {
    console.error("wasteValue.getHistory error:", err);
    return res.status(500).json({ success: false });
  }
};

exports.getDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await WasteValue.findById(id);

    if (!item) {
      return res.json({ success: false, message: "Not found (DB returned null)" });
    }

    return res.json({ success: true, item });
  } catch (err) {
    console.error("wasteValue.getDetail error:", err);
    return res.status(500).json({ success: false });
  }
};

