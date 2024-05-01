import app from 'express'
import {
    createQuiz,
    deleteQuiz,
    getAllQuizzes,
    getQuizById,
    getQuizForStudent,
    updateQuiz
} from "../controllers/quiz.controller";

const router = app.Router()

router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);
router.post('/', createQuiz);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);
router.post('/student', getQuizForStudent);

module.exports = router;
