
const SupportMessage = require("../models/SupportMessage");

exports.sendContactMessage = async (req, res) => {
  try {
  
    const firebaseUser = req.user;

    if (!firebaseUser || !firebaseUser.email) {
      return res.status(401).json({ success: false, msg: "Unauthorized" });
    }

    const { message, phone, name } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        msg: "Message cannot be empty.",
      });
    }

    const saved = await SupportMessage.create({
      name: name || "",
      email: firebaseUser.email,
      phone: phone || "",
      message,
      userUid: firebaseUser.uid,
      metadata: {
        userAgent: req.get("User-Agent"),
        ip: req.ip,
      },
    });

    return res.json({
      success: true,
      msg: "Message stored successfully.",
      data: saved,
    });
  } catch (err) {
    console.error("Contact error:", err);
    return res.status(500).json({
      success: false,
      msg: "Something went wrong.",
    });
  }
};
