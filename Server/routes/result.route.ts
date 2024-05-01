import express from "express";
import {
    addNewResult,
    getAllResults,
    getResultById,
    getResultByQuizIdForStudent,
    getResultsByQuizId,
    getResultsByUserId
} from "../controllers/result.controller";

const router = express.Router();

router.get('/', getAllResults);
router.get('/:id', getResultById);
router.get('/user/:userId', getResultsByUserId);
router.get('/quiz/:quizId', getResultsByQuizId);
router.get('/quiz/:quizId/student/:userId', getResultByQuizIdForStudent);
router.post('/', addNewResult);


module.exports = router
