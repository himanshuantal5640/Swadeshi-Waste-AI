
const express = require("express");
const router = express.Router();

const firebaseAuth = require("../middleware/firebaseAuth");
const { sendMessage, getChats } = require("../controllers/chatController");

router.post("/send", firebaseAuth, sendMessage);
router.get("/history/:email", firebaseAuth, getChats);

module.exports = router;
