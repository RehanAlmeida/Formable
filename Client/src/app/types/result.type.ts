import {AnswerType} from "./answer.type";

export interface ResultType {
  userId: string;
  quizId: string;
  score: number;
  completedAt: Date | null;
  answers: AnswerType[]
}
