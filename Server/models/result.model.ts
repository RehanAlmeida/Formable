import {model, Schema} from "mongoose";

interface IAnswers {
    answer: string;
    timeTaken: number;
    questionIndex: number;
}

interface IResult {
    userId: string;
    quizId: Schema.Types.ObjectId;
    score: number;
    completedAt: Date;
    answers: IAnswers[]
}

const AnswerSchema = new Schema<IAnswers>({
    answer: String,
    timeTaken: Number,
    questionIndex: Number,
})

const resultSchema = new Schema<IResult>({
    userId: {
        type: String,
        required: true,
    },
    quizId: {
        type: Schema.Types.ObjectId,
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
    answers:[AnswerSchema]
});

const Result = model<IResult>('Result', resultSchema)

export {Result, IResult}
