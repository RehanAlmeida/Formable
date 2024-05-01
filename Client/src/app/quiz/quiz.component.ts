import {Component, OnInit} from '@angular/core';
import {QuizType} from "../types/quiz.type";
import {ActivatedRoute} from "@angular/router";
import {MainService} from "../services/main.service";
import {QuestionType} from "../types/question.type";
import {AnswerType} from "../types/answer.type";
import {ResultType} from "../types/result.type";
import {ApiResponseType} from "../types/api-response.type";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {

  quiz: QuizType = {
    createdAt: null,
    createdBy: "",
    modifiedAt: null,
    modifiedBy: "",
    participants: [],
    questions: [],
    status: false,
    title: ""
  }

  currentQuestion: QuestionType = {answer: "", options: [], question: "", type: 'multiple-choice'}
  questionIndex: number = 0;
  answers: AnswerType[] = []

  questionStartTime: number = 0;

  isParticipated: boolean = false

  constructor(private route: ActivatedRoute, private ms: MainService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params['id'])
      this.getQuizById(params['id'])
    })
  }

  getQuizById(id: string) {
    this.ms.getQuizById(id).subscribe({
      next: (result) => {
        console.log(result)
        this.quiz = result.data
        if (this.quiz.participants.includes(localStorage.getItem('userId') || '')) {
          this.isParticipated = true
        } else {
          this.setQuizQuestion()
          this.initAnswer(result.data)
        }
      }
    })
  }

  initAnswer(quiz: QuizType) {
    this.answers = []
    for (let i = 0; i < quiz.questions.length; i++) {
      this.answers.push({
        answer: "", questionIndex: i, timeTaken: 0
      })
    }
  }

  setQuizQuestion() {
    this.currentQuestion = this.quiz.questions[this.questionIndex]
    this.questionStartTime = Date.now()
  }

  nextQuestion() {
    this.answers[this.questionIndex].timeTaken = Math.floor((Date.now() - this.questionStartTime) / 1000);
    if (this.questionIndex + 1 < this.quiz.questions.length) {
      this.currentQuestion = this.quiz.questions[this.questionIndex + 1]
      this.questionIndex++;
      this.questionStartTime = Date.now()
    }
  }

  previousQuestion() {
    console.log(this.questionIndex)
    if (this.questionIndex > 0) {
      this.currentQuestion = this.quiz.questions[this.questionIndex - 1]
      this.questionIndex--
    }
  }

  saveQuiz() {
    this.answers[this.questionIndex].timeTaken = Math.floor((Date.now() - this.questionStartTime) / 1000);
    console.log(this.answers)
    let result: ResultType = {
      answers: this.answers,
      completedAt: null,
      quizId: this.quiz._id || '',
      score: 0,
      userId: localStorage.getItem('userId') || '',
    }

    this.ms.addNewResult(result).subscribe({
      next: (result: ApiResponseType) => {
        console.log(result)
        this.ms.isQuizCompleted.set(true)
        window.close()
      }, error: (err: any) => {
        console.log(err)
      }
    })

  }

  protected readonly window = window;
}
