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
exports.getResultByQuizIdForStudent = exports.addNewResult = exports.getResultsByQuizId = exports.getResultsByUserId = exports.getResultById = exports.getAllResults = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const result_model_1 = require("../models/result.model");
const quiz_model_1 = require("../models/quiz.model"); // Replace with path to your Result schema
const getAllResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield result_model_1.Result.find().populate('quizId'); // Populate quiz details
        res.json(results);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllResults = getAllResults;
const getResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid result ID' });
    }
    try {
        const result = yield result_model_1.Result.findById(id).populate('quizId'); // Populate quiz details
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getResultById = getResultById;
const getResultsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!mongoose_1.default.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const results = yield result_model_1.Result.find({ userId }).populate('quizId'); // Populate quiz details
        res.json(results);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getResultsByUserId = getResultsByUserId;
const getResultsByQuizId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quizId } = req.params;
    if (!mongoose_1.default.isValidObjectId(quizId)) {
        return res.status(400).json({ message: 'Invalid quiz ID' });
    }
    try {
        const results = yield result_model_1.Result.find({ quizId }); // Populate quiz details
        res.send({ msg: '', data: results });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getResultsByQuizId = getResultsByQuizId;
const getResultByQuizIdForStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quizId, userId } = req.params;
    if (!mongoose_1.default.isValidObjectId(quizId)) {
        return res.status(400).json({ message: 'Invalid quiz ID' });
    }
    try {
        const results = yield result_model_1.Result.find({ quizId, userId });
        if (results.length === 0) {
            return res.status(404).json({ message: 'No results found for the given quiz and user' });
        }
        res.status(200).json({ data: results });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getResultByQuizIdForStudent = getResultByQuizIdForStudent;
const addNewResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, quizId, answers } = req.body;
    try {
        const quiz = yield quiz_model_1.Quiz.findById(quizId);
        if (!quiz) {
            return res.status(400).json({ msg: 'Quiz not present' });
        }
        let score = 0;
        const quizQuestions = quiz.questions || [];
        quiz.participants.push(userId); // Adding userId to participants array
        quizQuestions.forEach((q, i) => {
            if (q.answer.toLowerCase() === answers[i].answer.toLowerCase()) {
                score++;
            }
        });
        const newResult = yield result_model_1.Result.create({
            userId: userId,
            quizId: quizId,
            score: score,
            completedAt: new Date(),
            answers: answers
        });
        yield quiz.save(); // Saving the updated quiz with added participant
        const savedResult = yield newResult.save();
        res.status(201).send({ msg: 'Result saved successfully', data: savedResult });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.addNewResult = addNewResult;
