
const express = require("express");
const router = express.Router();

const firebaseAuth = require("../middleware/firebaseAuth");
const { generate, getHistory, getDetail } = require("../controllers/wasteValueController");


router.post("/generate", firebaseAuth, generate);


router.get("/history/:email", firebaseAuth, getHistory);


router.get("/detail/:id", getDetail);

module.exports = router;
