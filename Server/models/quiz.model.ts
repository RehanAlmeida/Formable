import {model, Schema} from "mongoose";

interface IQuestion {
    type: 'multiple-choice' | 'true/false' | 'fill-in-the-blank';
    question: string;
    answer: string;
    options: string[];
}

interface IQuiz {
    id?: string;
    title: string;
    questions: IQuestion[];
    participants: string[];
    status: boolean;
    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy: string;
}

const questionSchema = new Schema({
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

const quizSchema = new Schema<IQuiz>({
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
})

const Quiz = model<IQuiz>('quiz', quizSchema)

export {Quiz, IQuiz, IQuestion}
