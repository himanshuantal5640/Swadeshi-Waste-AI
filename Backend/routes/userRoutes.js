
const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
const { createUser, getUserDetails } = require("../controllers/userController");


router.post("/create", firebaseAuth, createUser);


router.get("/details", firebaseAuth, getUserDetails);


router.get("/me", firebaseAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
