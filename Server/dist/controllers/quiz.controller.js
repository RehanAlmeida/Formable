"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuizForStudent = exports.deleteQuiz = exports.updateQuiz = exports.createQuiz = exports.getQuizById = exports.getAllQuizzes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const quiz_model_1 = require("../models/quiz.model");
const user_model_1 = require("../models/user.model");
const email_util_1 = require("../utils/email-util");
const getAllQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield quiz_model_1.Quiz.find();
        res.send({ data: quizzes });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllQuizzes = getAllQuizzes;
const getQuizForStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const quizzes = yield quiz_model_1.Quiz.find({ status: true });
        if (quizzes.length === 0) {
            return res.send({ msg: 'No quizzes present', data: [] });
        }
        const data = yield Promise.all(quizzes.map((q) => __awaiter(void 0, void 0, void 0, function* () {
            const isParticipated = q.participants.includes(userId);
            return { isParticipated, quiz: q };
        })));
        res.send({ data });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getQuizForStudent = getQuizForStudent;
const getQuizById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        return res.status(400).json({ msg: 'Invalid quiz ID' });
    }
    try {
        const quiz = yield quiz_model_1.Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }
        res.send({ msg: '', data: quiz });
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
});
exports.getQuizById = getQuizById;
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, questions, participants, status } = req.body;
    const newQuiz = new quiz_model_1.Quiz({
        title: title,
        questions: questions,
        participants: participants,
        status: status,
        createdAt: new Date(),
        createdBy: 'Admin'
    });
    try {
        const savedQuiz = yield newQuiz.save();
        res.status(201).send({ msg: 'quiz saved successfully', data: savedQuiz });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createQuiz = createQuiz;
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, questions, participants, status } = req.body;
    if (!mongoose_1.default.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid quiz ID' });
    }
    const update = { title, questions, participants, status };
    try {
        const updatedQuiz = yield quiz_model_1.Quiz.findByIdAndUpdate(id, update, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        let data = ``;
        if (status) {
            user_model_1.User.find({ user_type: 1 }).then(r => {
                r.forEach((u) => {
                    (0, email_util_1.prepareEmail)(u.email, 'quiz', `Hi ${u.name}, <br> A new quiz with title ${title} has been added to the application`);
                });
            });
        }
        res.json(updatedQuiz);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateQuiz = updateQuiz;
const deleteQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid quiz ID' });
    }
    try {
        const deletedQuiz = yield quiz_model_1.Quiz.findByIdAndDelete(id);
        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteQuiz = deleteQuiz;
