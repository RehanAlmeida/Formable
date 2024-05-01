"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const mongoose_1 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
        enum: ['multiple-choice', 'true/false', 'fill-in-the-blank']
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    }
});
const quizSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [questionSchema], // Use the Question schema for the questions array
    participants: [String],
    status: Boolean,
    createdAt: Date,
    createdBy: String,
    modifiedAt: Date,
    modifiedBy: String,
});
const Quiz = (0, mongoose_1.model)('quiz', quizSchema);
exports.Quiz = Quiz;
