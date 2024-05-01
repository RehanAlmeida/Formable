export interface QuestionType {
  type: 'multiple-choice' | 'true/false' | 'fill-in-the-blank';
  question: string;
  answer: string;
  options: string[];
}

