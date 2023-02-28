const express = require("express");

const router = express.Router();
const quizController = require("../controllers/quiz");

router.get("/", quizController.getCompleteQuiz);
router.post("/result", quizController.calculateResult)

module.exports = router;
