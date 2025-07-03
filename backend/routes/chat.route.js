const express = require("express");
const router = express.Router();
const verifyjwt = require("../middlewares/auth.middleware.js");
const { groqChecker } = require("../controller/groqchecker.js");

router.post("/groq", verifyjwt, groqChecker);

module.exports = router;
