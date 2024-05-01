import {Request, Response} from 'express';

import mongoose from "mongoose";
import {Result} from "../models/result.model";
import {IQuestion, Quiz} from "../models/quiz.model"; // Replace with path to your Result schema

const getAllResults = async (req: Request, res: Response) => {
    try {
        const results = await Result.find().populate('quizId'); // Populate quiz details
        res.json(results);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

const getResultById = async (req: Request, res: Response) => {
    const {id} = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({message: 'Invalid result ID'});
    }

    try {
        const result = await Result.findById(id).populate('quizId'); // Populate quiz details
        if (!result) {
            return res.status(404).json({message: 'Result not found'});
        }
        res.json(result);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

const getResultsByUserId = async (req: Request, res: Response) => {
    const {userId} = req.params;

    if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({message: 'Invalid user ID'});
    }

    try {
        const results = await Result.find({userId}).populate('quizId'); // Populate quiz details
        res.json(results);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

const getResultsByQuizId = async (req: Request, res: Response) => {
    const {quizId} = req.params;

    if (!mongoose.isValidObjectId(quizId)) {
        return res.status(400).json({message: 'Invalid quiz ID'});
    }

    try {
        const results = await Result.find({quizId}) // Populate quiz details
        res.send({msg: '', data: results});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

const getResultByQuizIdForStudent = async (req: Request, res: Response) => {
    const {quizId, userId} = req.params;

    if (!mongoose.isValidObjectId(quizId)) {
        return res.status(400).json({message: 'Invalid quiz ID'});
    }

    try {
        const results = await Result.find({quizId, userId})

        if (results.length === 0) {
            return res.status(404).json({message: 'No results found for the given quiz and user'});
        }

        res.status(200).json({data: results});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};


const addNewResult = async (req: Request, res: Response) => {
    const {
        userId,
        quizId,
        answers
    } = req.body

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(400).json({msg: 'Quiz not present'});
        }

        let score = 0
        const quizQuestions: IQuestion[] = quiz.questions || []

        quiz.participants.push(userId); // Adding userId to participants array

        quizQuestions.forEach((q, i) => {
            if (q.answer.toLowerCase() === answers[i].answer.toLowerCase()) {
                score++;
            }
        })

        const newResult = await Result.create({
            userId: userId,
            quizId: quizId,
            score: score,
            completedAt: new Date(),
            answers: answers
        });

        await quiz.save(); // Saving the updated quiz with added participant
        const savedResult = await newResult.save();
        res.status(201).send({msg: 'Result saved successfully', data: savedResult});
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
}


export {
    getAllResults,
    getResultById,
    getResultsByUserId,
    getResultsByQuizId, addNewResult, getResultByQuizIdForStudent
};
