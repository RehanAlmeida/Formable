import {Component, OnInit} from '@angular/core';
import {QuizType} from "../../../app/types/quiz.type";
import {QuizService} from "../../services/quiz.service";
import {ApiResponseType} from "../../../app/types/api-response.type";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss'
})
export class QuizListComponent implements OnInit {
  allQuiz: QuizType[] = [];

  constructor(private qs: QuizService) {
  }

  ngOnInit() {
    this.getAllQuiz()
  }

  getAllQuiz() {
    this.qs.getAllQuiz().subscribe((r: ApiResponseType) => {
      console.log(r)
      this.allQuiz = r.data
    })
  }

  startQuiz(q: QuizType) {
    q.status = true
    this.qs.updateQuiz(q._id || '', q).subscribe({
      next: (result) => {
        console.log(result)
        this.getAllQuiz()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  endQuiz(q: QuizType) {
    q.status = false
    this.qs.updateQuiz(q._id || '', q).subscribe({
      next: (result) => {
        console.log(result)
        this.getAllQuiz()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteQuiz(id: string | undefined) {
    this.qs.deleteQuiz(id || '').subscribe({
      next: (result) => {
        console.log(result)
        this.getAllQuiz()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
