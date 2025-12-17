
const mongoose = require("mongoose");

const WasteValueSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  query: { type: String, required: true },
  structuredResult: { type: Object, required: true }, 
  rawText: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WasteValue", WasteValueSchema);
