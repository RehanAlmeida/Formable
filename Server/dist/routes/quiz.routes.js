"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quiz_controller_1 = require("../controllers/quiz.controller");
const router = express_1.default.Router();
router.get('/', quiz_controller_1.getAllQuizzes);
router.get('/:id', quiz_controller_1.getQuizById);
router.post('/', quiz_controller_1.createQuiz);
router.put('/:id', quiz_controller_1.updateQuiz);
router.delete('/:id', quiz_controller_1.deleteQuiz);
router.post('/student', quiz_controller_1.getQuizForStudent);
module.exports = router;
