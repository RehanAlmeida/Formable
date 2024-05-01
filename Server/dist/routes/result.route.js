"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const result_controller_1 = require("../controllers/result.controller");
const router = express_1.default.Router();
router.get('/', result_controller_1.getAllResults);
router.get('/:id', result_controller_1.getResultById);
router.get('/user/:userId', result_controller_1.getResultsByUserId);
router.get('/quiz/:quizId', result_controller_1.getResultsByQuizId);
router.get('/quiz/:quizId/student/:userId', result_controller_1.getResultByQuizIdForStudent);
router.post('/', result_controller_1.addNewResult);
module.exports = router;
