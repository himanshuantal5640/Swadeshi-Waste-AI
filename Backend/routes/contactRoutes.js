const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
const { sendContactMessage } = require("../controllers/contactController");

router.post("/contact", firebaseAuth, sendContactMessage);

module.exports = router;
