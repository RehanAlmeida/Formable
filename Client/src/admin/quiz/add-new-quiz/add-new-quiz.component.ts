import {Component, OnInit, ViewChild} from '@angular/core';
import {QuizType} from "../../../app/types/quiz.type";
import {QuestionType} from "../../../app/types/question.type";
import {QuizService} from "../../services/quiz.service";
import {AlertService} from "../../../shared/services/alert.service";
import {ApiResponseType} from "../../../app/types/api-response.type";

@Component({
  selector: 'app-add-new-quiz',
  templateUrl: './add-new-quiz.component.html',
  styleUrl: './add-new-quiz.component.scss'
})
export class AddNewQuizComponent implements OnInit {
  @ViewChild('addForm') addForm!: HTMLFormElement;
  questions: QuestionType[] = []

  quiz: QuizType = {
    createdAt: null,
    createdBy: "",
    modifiedAt: null,
    modifiedBy: "",
    participants: [],
    questions: this.questions,
    status: false,
    title: ""
  }

  question: QuestionType = {
    answer: "", options: [], question: "", type: 'multiple-choice'
  }
  private optionIndex: number = 0;
  optionError: string = '';
  questionError: string = '';

  constructor(private qs: QuizService, private as: AlertService) {
  }

  customTrackBy(index: number): any {
    return index;
  }

  ngOnInit() {
    this.questions.push(this.question)
  }

  onSubmit() {
    this.onQuestionChange()
    this.onOptionChange()
    if (this.quiz.title.length < 3) {
      this.questionError = 'The Quiz Title is mandatory and must be at least 3 characters'
      return;
    }
    if (this.questions.length === 0) {
      this.questionError = 'There should be at-least 1 question.';
      return
    }
    if (!this.validateQuestionAndOptions()) return;
    console.log(this.quiz)
    this.qs.addNewQuiz(this.quiz).subscribe({
      next: (r: ApiResponseType) => {
        console.log(r)
        this.as.showAlert('success', 'Quiz has been added successfully!')
        this.questions = []
        this.addForm.reset()
      }, error: (err) => {
        console.log(err)
        this.as.showAlert('error', 'Failed to add new quiz. Try again!')
      }
    })
  }

  validateQuestionAndOptions(): boolean {
    let prevQuestion = this.questions[this.questions.length - 1];
    // console.log(prevQuestion)
    if (prevQuestion.type === "multiple-choice") {
      if (prevQuestion.options.length < 3) {
        this.optionError = 'There should be at least 3 options'
        return false;
      }
      if (prevQuestion.options[prevQuestion.options.length - 1].length === 0) {
        this.optionError = 'Option should not be empty'
        return false;
      }
    }
    if (prevQuestion.question.length < 3) {
      this.questionError = 'The Question Text is mandatory'
      return false;
    }

    if (prevQuestion.answer.length === 0) {
      this.questionError = 'The Answers Text is mandatory'
      return false;
    }

    return true;
  }

  addOption(questionIndex: number) {
    this.onOptionChange()
    this.onQuestionChange()
    if (this.questions[questionIndex].options.length === 0 || this.questions[questionIndex].options[this.optionIndex].length >= 1) {
      this.quiz.questions[questionIndex].options.push('')
      this.optionIndex = this.questions[questionIndex].options.length - 1
    } else {
      this.optionError = 'Option should not be empty'
    }
  }

  removeOption(questionIndex: number, optionIndex: number) {
    this.quiz.questions[questionIndex].options.splice(optionIndex, 1);
    this.onOptionChange()
    this.onQuestionChange()
  }

  addNewQuestion() {
    if (this.questions.length !== 0) {
      if (!this.validateQuestionAndOptions()) return
    }
    this.questions.push({answer: "", options: [], question: "", type: 'multiple-choice'})
    this.onOptionChange()
    this.onQuestionChange()
  }

  removeQuestion(questionIndex: number) {
    this.quiz.questions.splice(questionIndex, 1)
    this.onOptionChange()
    this.onQuestionChange()
  }

  onOptionChange() {
    this.optionError = ''
  }

  onQuestionChange() {
    this.questionError = ''
  }
}
