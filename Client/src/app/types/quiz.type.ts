import {QuestionType} from "./question.type";

export interface QuizType {
  _id?: string;
  title: string;
  questions: QuestionType[];
  participants: string[];
  status: boolean;
  createdAt: Date | null;
  createdBy: string;
  modifiedAt: Date | null;
  modifiedBy: string;
}
