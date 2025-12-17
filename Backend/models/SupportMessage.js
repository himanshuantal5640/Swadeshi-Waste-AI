const mongoose = require("mongoose");

const supportMessageSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    message: { type: String, required: true },
    userUid: { type: String, default: null }, 
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupportMessage", supportMessageSchema);
