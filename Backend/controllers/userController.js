const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const email = req.user?.email;
    const name = req.body.name || req.user?.name || "User";

    if (!email) return res.status(400).json({ success: false, message: "Missing email in token" });

    let user = await User.findOne({ email });

    if (user) {
      return res.json({ success: true, user });
    }

    user = await User.create({ name, email });

    return res.json({ success: true, user });

  } catch (error) {
    console.error("Create user error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const email = req.user?.email;

    if (!email) return res.status(400).json({ success: false, message: "Missing email in token" });

    const user = await User.findOne({ email });

    if (!user)
      return res.json({ success: false, message: "User not found" });

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
