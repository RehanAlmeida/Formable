import {Request, Response} from "express";
import mongoose from "mongoose";
import {Quiz} from "../models/quiz.model";
import {User} from "../models/user.model";
import {prepareEmail} from "../utils/email-util";

const getAllQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await Quiz.find();
        res.send({data: quizzes});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

const getQuizForStudent = async (req: Request, res: Response) => {
    const {userId} = req.body;

    try {
        const quizzes = await Quiz.find({status: true});

        if (quizzes.length === 0) {
            return res.send({msg: 'No quizzes present', data: []});
        }

        const data = await Promise.all(quizzes.map(async (q) => {
            const isParticipated = q.participants.includes(userId);
            return {isParticipated, quiz: q};
        }));

        res.send({data});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}


const getQuizById = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({msg: 'Invalid quiz ID'});
    }
    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({msg: 'Quiz not found'});
        }
        res.send({msg: '', data: quiz});
    } catch (err: any) {
        res.status(500).json({msg: err.message});
    }
};

const createQuiz = async (req: Request, res: Response) => {
    const {title, questions, participants, status} = req.body;

    const newQuiz = new Quiz({
        title: title,
        questions: questions,
        participants: participants,
        status: status,
        createdAt: new Date(),
        createdBy: 'Admin'
    });

    try {
        const savedQuiz = await newQuiz.save();
        res.status(201).send({msg: 'quiz saved successfully', data: savedQuiz});
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
};

const updateQuiz = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {title, questions, participants, status} = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({message: 'Invalid quiz ID'});
    }

    const update = {title, questions, participants, status};

    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, update, {new: true});
        if (!updatedQuiz) {
            return res.status(404).json({message: 'Quiz not found'});
        }
        let data = ``
        if (status) {
            User.find({user_type: 1}).then(r => {

                r.forEach((u) => {
                    prepareEmail(u.email, 'quiz', `Hi ${u.name}, <br> A new quiz with title ${title} has been added to the application`)
                })
            })
        }

        res.json(updatedQuiz);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

const deleteQuiz = async (req: Request, res: Response) => {
    const {id} = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({message: 'Invalid quiz ID'});
    }

    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(id);
        if (!deletedQuiz) {
            return res.status(404).json({message: 'Quiz not found'});
        }
        res.json({message: 'Quiz deleted'});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export {getAllQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz, getQuizForStudent};
