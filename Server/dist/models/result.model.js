"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const mongoose_1 = require("mongoose");
const AnswerSchema = new mongoose_1.Schema({
    answer: String,
    timeTaken: Number,
    questionIndex: Number,
});
const resultSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    quizId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    completedAt: {
        type: Date,
        required: true,
    },
    answers: [AnswerSchema]
});
const Result = (0, mongoose_1.model)('Result', resultSchema);
exports.Result = Result;
